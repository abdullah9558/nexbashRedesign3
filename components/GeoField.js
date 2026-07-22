'use client';

import { useEffect, useRef } from 'react';

/** Geospatial field — lat/long grid, radar sweep, satellite links. */
export default function GeoField() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      root.style.setProperty('--gx', `${mx * 18}px`);
      root.style.setProperty('--gy', `${my * 12}px`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const meridians = Array.from({ length: 13 }, (_, i) => ((i + 1) / 14) * 100);
  const parallels = Array.from({ length: 9 }, (_, i) => ((i + 1) / 10) * 100);

  const nodes = [
    { x: 18, y: 28 },
    { x: 32, y: 52 },
    { x: 48, y: 22 },
    { x: 58, y: 62 },
    { x: 72, y: 34 },
    { x: 84, y: 58 },
    { x: 26, y: 74 },
    { x: 66, y: 18 },
  ];

  const arcs = [
    [0, 2],
    [2, 4],
    [4, 5],
    [1, 3],
    [3, 5],
    [0, 1],
    [6, 1],
    [7, 2],
    [7, 4],
  ];

  return (
    <div className="geo" ref={rootRef} aria-hidden="true">
      <div className="geo-vignette" />
      <div className="geo-grid">
        {meridians.map((x) => (
          <span key={`m-${x}`} className="geo-meridian" style={{ left: `${x}%` }} />
        ))}
        {parallels.map((y) => (
          <span key={`p-${y}`} className="geo-parallel" style={{ top: `${y}%` }} />
        ))}
      </div>

      <div className="geo-radar">
        <span className="geo-radar-ring r-a" />
        <span className="geo-radar-ring r-b" />
        <span className="geo-radar-ring r-c" />
        <span className="geo-radar-sweep" />
      </div>

      <svg className="geo-links" viewBox="0 0 100 100" preserveAspectRatio="none">
        {arcs.map(([a, b], i) => {
          const n1 = nodes[a];
          const n2 = nodes[b];
          const mx = (n1.x + n2.x) / 2;
          const my = (n1.y + n2.y) / 2 - 8;
          return (
            <path
              key={`arc-${i}`}
              className="geo-arc"
              style={{ animationDelay: `${i * 0.35}s` }}
              d={`M ${n1.x} ${n1.y} Q ${mx} ${my} ${n2.x} ${n2.y}`}
            />
          );
        })}
      </svg>

      <div className="geo-nodes">
        {nodes.map((n, i) => (
          <span
            key={`n-${i}`}
            className="geo-node"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="geo-scan" />
      <div className="geo-orbit o-a" />
      <div className="geo-orbit o-b" />
    </div>
  );
}
