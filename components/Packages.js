'use client';

import { useEffect, useState } from 'react';
import useDragScroll from '@/components/useDragScroll';

export default function Packages({ packages = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref: railRef } = useDragScroll();

  useEffect(() => {
    if (!packages.length || paused) return undefined;
    const id = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % packages.length;
        const rail = railRef.current;
        const child = rail?.children?.[next];
        if (rail && child) {
          const left = child.offsetLeft - (rail.clientWidth - child.offsetWidth) / 2;
          rail.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
        }
        return next;
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [packages.length, paused, railRef]);

  return (
    <section
      className="band screen"
      id="packages"
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <header className="band-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Packages</p>
        <h2>Engagement models that scale with you</h2>
      </header>
      <div className="pack-rail reveal-child drag-rail" style={{ '--i': 1 }} ref={railRef}>
        {packages.map((pkg, i) => (
          <article
            key={pkg.name}
            className={`pack tilt ${pkg.highlight ? 'hot' : ''} ${active === i ? 'pack-live' : ''}`}
            onMouseEnter={() => setActive(i)}
          >
            <div className="pack-glow" aria-hidden="true" />
            {pkg.badge && <span className="hot-flag bounce-soft">{pkg.badge}</span>}
            <h3>{pkg.name}</h3>
            <p>{pkg.desc}</p>
            <ul>
              {pkg.items.map((item, j) => (
                <li key={item} style={{ '--j': j }}>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="ghost">
              Talk to us
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
