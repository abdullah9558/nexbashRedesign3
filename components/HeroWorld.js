'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ROUTES = [
  { from: [40.7, -74.0], to: [51.5, -0.1] },
  { from: [51.5, -0.1], to: [25.2, 55.3] },
  { from: [25.2, 55.3], to: [28.6, 77.2] },
  { from: [28.6, 77.2], to: [1.35, 103.8] },
  { from: [1.35, 103.8], to: [35.7, 139.7] },
  { from: [35.7, 139.7], to: [37.8, -122.4] },
  { from: [37.8, -122.4], to: [40.7, -74.0] },
  { from: [19.4, -99.1], to: [-23.5, -46.6] },
];

const HUBS = [
  [40.7, -74.0],
  [51.5, -0.1],
  [35.7, 139.7],
  [1.35, 103.8],
  [25.2, 55.3],
  [37.8, -122.4],
  [-23.5, -46.6],
  [39.9, 116.4],
];

function latLonToVec(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function makeArc(from, to, radius) {
  const start = latLonToVec(from[0], from[1], radius);
  const end = latLonToVec(to[0], to[1], radius);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(radius + dist * 0.32);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Soft elliptical land blobs — recognizable continents without a texture download */
const LAND_BLOBS = [
  { lat: 45, lon: -100, latR: 22, lonR: 38, w: 1 }, // N America
  { lat: 15, lon: -90, latR: 12, lonR: 10, w: 0.85 }, // Central America
  { lat: -15, lon: -60, latR: 28, lonR: 22, w: 1 }, // S America
  { lat: 55, lon: 15, latR: 18, lonR: 35, w: 1 }, // Europe
  { lat: 10, lon: 20, latR: 32, lonR: 28, w: 1 }, // Africa
  { lat: 55, lon: 90, latR: 22, lonR: 55, w: 1 }, // N Asia
  { lat: 30, lon: 100, latR: 18, lonR: 40, w: 0.95 }, // E Asia
  { lat: 20, lon: 78, latR: 14, lonR: 16, w: 0.9 }, // India
  { lat: -25, lon: 135, latR: 18, lonR: 22, w: 0.95 }, // Australia
  { lat: -80, lon: 0, latR: 12, lonR: 180, w: 0.55 }, // Antarctica hint
  { lat: 0, lon: 115, latR: 8, lonR: 18, w: 0.7 }, // SE Asia / Indo
  { lat: 65, lon: -40, latR: 12, lonR: 20, w: 0.75 }, // Greenland
];

function proceduralLandStrength(lat, lon) {
  let best = 0;
  for (let i = 0; i < LAND_BLOBS.length; i += 1) {
    const b = LAND_BLOBS[i];
    let dLon = Math.abs(lon - b.lon);
    if (dLon > 180) dLon = 360 - dLon;
    const nx = dLon / b.lonR;
    const ny = (lat - b.lat) / b.latR;
    const d = nx * nx + ny * ny;
    if (d < 1) {
      const s = (1 - d) * b.w;
      if (s > best) best = s;
    }
  }
  // Break up blobs into coast-like noise (cheap hash, no lib)
  const n =
    Math.sin(lat * 0.31 + lon * 0.17) * 0.12 +
    Math.sin(lat * 0.71 - lon * 0.43) * 0.08 +
    Math.sin((lat + lon) * 1.1) * 0.05;
  return best + n;
}

function landColor(lat, shade = 0.5) {
  // Warm digital earth — slightly greener interiors, brighter coasts
  const t = Math.max(0, Math.min(1, shade));
  const equator = 1 - Math.min(1, Math.abs(lat) / 70);
  const r = 0.92 + t * 0.08;
  const g = 0.38 + t * 0.22 + equator * 0.06;
  const b = 0.14 + t * 0.1;
  return [r, g, b];
}

/** Lightweight interactive Earth — drag to rotate */
export default function HeroWorld() {
  const stageRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const mount = mountRef.current;
    if (!stage || !mount) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let disposed = false;
    let raf = 0;
    let visible = true;
    const disposables = [];

    const width = mount.clientWidth || 420;
    const height = mount.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.55);
    camera.lookAt(0, 0, 0);

    const dpr = window.devicePixelRatio || 1;
    const renderer = new THREE.WebGLRenderer({
      antialias: dpr < 1.5,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(dpr, 1.5));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    globe.scale.setScalar(1);
    globe.rotation.y = 0.55;
    scene.add(globe);

    const radius = 1;

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x2e221c })
    );
    globe.add(core);
    disposables.push(core.geometry, core.material);

    // Faint graticule — cartographic detail for almost no GPU cost
    const gridPts = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const ring = [];
      for (let lon = -180; lon <= 180; lon += 6) {
        ring.push(latLonToVec(lat, lon, radius * 1.003));
      }
      for (let i = 0; i < ring.length - 1; i += 1) {
        gridPts.push(ring[i], ring[i + 1]);
      }
    }
    for (let lon = -150; lon <= 180; lon += 30) {
      const meridian = [];
      for (let lat = -80; lat <= 80; lat += 6) {
        meridian.push(latLonToVec(lat, lon, radius * 1.003));
      }
      for (let i = 0; i < meridian.length - 1; i += 1) {
        gridPts.push(meridian[i], meridian[i + 1]);
      }
    }
    const gridGeo = new THREE.BufferGeometry().setFromPoints(gridPts);
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x5a3a2e,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    globe.add(new THREE.LineSegments(gridGeo, gridMat));
    disposables.push(gridGeo, gridMat);

    const atmos = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.045, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff4a13,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    globe.add(atmos);
    disposables.push(atmos.geometry, atmos.material);

    const atmosRim = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.08, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0xff7a3a,
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    globe.add(atmosRim);
    disposables.push(atmosRim.geometry, atmosRim.material);

    const routesGroup = new THREE.Group();
    globe.add(routesGroup);

    const packets = [];
    const sharedPacketGeo = new THREE.SphereGeometry(0.014, 6, 6);
    const sharedHubGeo = new THREE.SphereGeometry(0.016, 6, 6);
    disposables.push(sharedPacketGeo, sharedHubGeo);

    ROUTES.forEach((route, i) => {
      const curve = makeArc(route.from, route.to, radius * 1.01);
      const pts = curve.getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xff4a13 : 0x4a3228,
        transparent: true,
        opacity: 0.75,
      });
      routesGroup.add(new THREE.Line(geo, mat));
      disposables.push(geo, mat);

      const packetMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xff7a3a : 0xffc4a8,
      });
      const packet = new THREE.Mesh(sharedPacketGeo, packetMat);
      routesGroup.add(packet);
      disposables.push(packetMat);
      packets.push({ mesh: packet, curve, speed: 0.07 + (i % 5) * 0.018, offset: i * 0.11 });
    });

    HUBS.forEach((hub) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0xff4a13 });
      const node = new THREE.Mesh(sharedHubGeo, mat);
      node.position.copy(latLonToVec(hub[0], hub[1], radius * 1.012));
      routesGroup.add(node);
      disposables.push(mat);
    });

    // Single light orbit ring
    const orbits = new THREE.Group();
    globe.add(orbits);
    const ringGroup = new THREE.Group();
    ringGroup.rotation.x = 1.05;
    ringGroup.rotation.z = 0.3;
    orbits.add(ringGroup);

    const ringGeo = new THREE.TorusGeometry(1.18, 0.0035, 6, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2a1c16,
      transparent: true,
      opacity: 0.8,
    });
    ringGroup.add(new THREE.Mesh(ringGeo, ringMat));
    disposables.push(ringGeo, ringMat);

    const satGeo = new THREE.SphereGeometry(0.016, 5, 5);
    disposables.push(satGeo);
    for (let s = 0; s < 8; s += 1) {
      const angle = (s / 8) * Math.PI * 2;
      const satMat = new THREE.MeshBasicMaterial({ color: s % 3 === 0 ? 0xff4a13 : 0x5a3a2e });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(Math.cos(angle) * 1.18, Math.sin(angle) * 1.18, 0);
      ringGroup.add(sat);
      disposables.push(satMat);
    }
    ringGroup.userData.speed = 0.1;

    const clock = new THREE.Clock();
    let t = 0;

    // Drag — bind to stage + window so it always receives events
    const drag = {
      active: false,
      pid: null,
      prevX: 0,
      prevY: 0,
      velY: 0,
      velX: 0,
    };

    stage.style.cursor = 'grab';
    stage.style.touchAction = 'none';
    stage.style.pointerEvents = 'auto';

    const onPointerDown = (e) => {
      e.preventDefault();
      drag.active = true;
      drag.pid = e.pointerId;
      drag.prevX = e.clientX;
      drag.prevY = e.clientY;
      drag.velY = 0;
      drag.velX = 0;
      stage.style.cursor = 'grabbing';
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const onPointerMove = (e) => {
      if (!drag.active) return;
      if (drag.pid != null && e.pointerId !== drag.pid) return;
      const dx = e.clientX - drag.prevX;
      const dy = e.clientY - drag.prevY;
      drag.prevX = e.clientX;
      drag.prevY = e.clientY;
      const sens = 0.008;
      globe.rotation.y += dx * sens;
      globe.rotation.x = Math.max(-1.0, Math.min(1.0, globe.rotation.x + dy * sens));
      drag.velY = dx * sens;
      drag.velX = dy * sens;
    };

    const endDrag = (e) => {
      if (!drag.active) return;
      if (e && drag.pid != null && e.pointerId !== drag.pid) return;
      drag.active = false;
      drag.pid = null;
      stage.style.cursor = 'grab';
    };

    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(stage);

    const addLandPoints = (positions, colors, pointSize) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const mat = new THREE.PointsMaterial({
        size: pointSize,
        vertexColors: true,
        depthWrite: false,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.92,
      });
      globe.add(new THREE.Points(geo, mat));
      disposables.push(geo, mat);
    };

    const buildProceduralLand = () => {
      const positions = [];
      const colors = [];
      // ~4° inland grid ≈ 4–6k land points — detailed, still cheap
      const stepLat = 2.2;
      const stepLon = 2.2;
      for (let lat = -82; lat <= 82; lat += stepLat) {
        const cosLat = Math.cos((lat * Math.PI) / 180);
        const lonStep = stepLon / Math.max(0.35, cosLat);
        for (let lon = -180; lon < 180; lon += lonStep) {
          const strength = proceduralLandStrength(lat, lon);
          if (strength < 0.28) continue;
          // Skip some interior samples for coast emphasis (lighter fill)
          if (strength > 0.72 && ((lat * 10 + lon * 7) | 0) % 3 === 0) continue;

          const elev = 1.004 + strength * 0.004;
          const v = latLonToVec(lat, lon, radius * elev);
          positions.push(v.x, v.y, v.z);
          const [cr, cg, cb] = landColor(lat, strength);
          colors.push(cr, cg, cb);
        }
      }
      addLandPoints(positions, colors, 0.011);
    };

    const buildLandDots = async () => {
      try {
        const img = await loadImage('/assets/earth-texture.jpg');
        if (disposed) return;
        const canvas = document.createElement('canvas');
        const size = 384;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          buildProceduralLand();
          return;
        }
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const positions = [];
        const colors = [];
        const step = 3;
        for (let y = 0; y < size; y += step) {
          for (let x = 0; x < size; x += step) {
            const i = (y * size + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const isOcean = b > r + 18 && b > g + 10 && r < 90;
            const isIce = r > 180 && g > 180 && b > 180;
            if (isOcean || isIce) continue;
            const lum = (r + g + b) / 3;
            if (lum < 35) continue;

            const lon = (x / size) * 360 - 180;
            const lat = 90 - (y / size) * 180;
            const shade = Math.max(0.25, Math.min(1, (lum - 40) / 140));
            const elev = 1.004 + shade * 0.003;
            const v = latLonToVec(lat, lon, radius * elev);
            positions.push(v.x, v.y, v.z);
            const [cr, cg, cb] = landColor(lat, shade);
            colors.push(cr, cg, cb);
          }
        }

        if (positions.length < 200) {
          buildProceduralLand();
          return;
        }
        addLandPoints(positions, colors, 0.01);
      } catch {
        if (!disposed) buildProceduralLand();
      }
    };

    buildLandDots();

    const tick = () => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      if (drag.active) {
        // manual control only
      } else if (Math.abs(drag.velY) > 0.00015 || Math.abs(drag.velX) > 0.00015) {
        globe.rotation.y += drag.velY;
        globe.rotation.x = Math.max(-1.0, Math.min(1.0, globe.rotation.x + drag.velX));
        drag.velY *= 0.9;
        drag.velX *= 0.9;
      } else if (!reduce) {
        drag.velY = 0;
        drag.velX = 0;
        globe.rotation.y += dt * 0.07;
      }

      if (!reduce) {
        ringGroup.rotation.z += dt * ringGroup.userData.speed;
        for (let i = 0; i < packets.length; i += 1) {
          const p = packets[i];
          const u = (t * p.speed + p.offset) % 1;
          p.mesh.position.copy(p.curve.getPointAt(u));
        }
      }

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      ro.disconnect();
      io.disconnect();
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="hero-world-stage"
      aria-label="Interactive globe — drag to rotate"
    >
      <div className="hero-world-glow digital" aria-hidden="true" />
      <div className="hero-world" ref={mountRef} />
    </div>
  );
}
