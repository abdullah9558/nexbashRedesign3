'use client';

import { useEffect, useRef } from 'react';

/** Living topographic field — contours warp & breathe with the pointer. */
export default function TopoField() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const paths = [...svg.querySelectorAll('path')];
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let t = 0;

    const onMove = (e) => {
      const r = svg.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const tick = () => {
      t += 0.008;
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      paths.forEach((p, i) => {
        const k = (i % 5) * 0.4 + 0.5;
        const wave = Math.sin(t + i * 0.35) * 4;
        p.style.transform = `translate(${mx * 14 * k + wave}px, ${my * 10 * k}px) scale(${1 + Math.abs(mx) * 0.01})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const lines = Array.from({ length: 18 }, (_, i) => {
    const y = 30 + i * 48;
    const wobble = 22 + (i % 5) * 7;
    return `M0 ${y} Q 160 ${y - wobble}, 320 ${y} T 640 ${y} T 960 ${y} T 1280 ${y} T 1440 ${y}`;
  });

  return (
    <svg
      className="topo"
      ref={svgRef}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {lines.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
