'use client';

import { useEffect, useState } from 'react';

export default function FAQ({ faq }) {
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!faq?.length || paused) return undefined;
    const id = window.setInterval(() => {
      setOpen((i) => (i + 1) % faq.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [faq?.length, paused]);

  return (
    <section
      className="band screen"
      id="faq"
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <header className="band-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">FAQ</p>
        <h2>Straight answers</h2>
      </header>
      <div className="faq">
        {faq.map((item, i) => (
          <div
            key={item.q}
            className={`faq-row reveal-child ${open === i ? 'open' : ''}`}
            style={{ '--i': i + 1 }}
            onMouseEnter={() => setOpen(i)}
          >
            <button type="button" onClick={() => setOpen(i)}>
              {item.q}
              <span className="faq-icon">{open === i ? '−' : '+'}</span>
            </button>
            <div className="faq-a">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
