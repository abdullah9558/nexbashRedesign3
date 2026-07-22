'use client';

import { useEffect, useRef } from 'react';

/** Dual soft bloom + spark trail that follows the pointer with lerp. */
export default function Bloom() {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const a = aRef.current;
    const b = bRef.current;
    const trail = trailRef.current;
    if (!a || !b || !trail) return undefined;

    let x = -200;
    let y = -200;
    let bx = -200;
    let by = -200;
    let tx = -200;
    let ty = -200;
    let raf = 0;
    const sparks = [];

    const spawn = (cx, cy) => {
      if (sparks.length > 6) {
        const old = sparks.shift();
        old.remove();
      }
      const s = document.createElement('span');
      s.className = 'bloom-spark';
      s.style.left = `${cx}px`;
      s.style.top = `${cy}px`;
      trail.appendChild(s);
      sparks.push(s);
      window.setTimeout(() => {
        s.remove();
        const i = sparks.indexOf(s);
        if (i >= 0) sparks.splice(i, 1);
      }, 600);
    };

    let last = 0;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const now = performance.now();
      if (now - last > 90) {
        spawn(tx, ty);
        last = now;
      }
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      bx += (tx - bx) * 0.1;
      by += (ty - by) * 0.1;
      a.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      b.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', move, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div className="bloom bloom-a" ref={aRef} aria-hidden="true" />
      <div className="bloom bloom-b" ref={bRef} aria-hidden="true" />
      <div className="bloom-trail" ref={trailRef} aria-hidden="true" />
    </>
  );
}
