'use client';

import { useCallback, useEffect, useState } from 'react';
import useDragSlide from '@/components/useDragSlide';

export default function Industries({ industries = [] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = industries.length;
  const active = industries[idx];

  const step = useCallback(
    (delta) => {
      setDir(delta);
      setIdx((i) => (i + delta + total) % total);
    },
    [total]
  );

  const { viewportRef, trackRef } = useDragSlide(step);

  const goTo = (next) => {
    setDir(next > idx || (idx === total - 1 && next === 0) ? 1 : -1);
    if (idx === 0 && next === total - 1) setDir(-1);
    setIdx(next);
  };

  useEffect(() => {
    if (!total || paused) return undefined;
    const timer = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % total);
    }, 4200);
    return () => clearInterval(timer);
  }, [total, paused]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (!active) return null;

  return (
    <>
      <section className="band screen" id="help" data-reveal>
        <header className="band-head row-head reveal-child" style={{ '--i': 0 }}>
          <div>
            <p className="kicker">Who we help</p>
            <h2>Industries we serve</h2>
            <p className="lede">
              If your organization runs on complex data or critical operations, we likely already
              work in your field.
            </p>
          </div>
          <button type="button" className="ghost" onClick={() => setOpen(true)}>
            View All
          </button>
        </header>

        <div
          className="ind-stage reveal-child"
          style={{ '--i': 1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button type="button" className="ghost ind-nav" onClick={() => step(-1)} aria-label="Previous">
            ←
          </button>
          <div className="ind-viewport drag-swipe" ref={viewportRef}>
            <div
              className={`ind-frame tilt slide-${dir > 0 ? 'next' : 'prev'}`}
              key={active.name}
              ref={trackRef}
            >
              <div className="ind-visual" style={{ backgroundImage: `url('${active.image}')` }} />
              <div className="ind-copy">
                <span className="mono">
                  {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h3>{active.name}</h3>
                <p>{active.desc}</p>
              </div>
            </div>
          </div>
          <button type="button" className="ghost ind-nav" onClick={() => step(1)} aria-label="Next">
            →
          </button>
        </div>

        <div className="ind-dots">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              type="button"
              className={`ind-dot ${i === idx ? 'on' : ''}`}
              aria-label={ind.name}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </section>

      <div
        className={`ap-modal${open ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="ap-modal-card">
          <button type="button" className="modal-close" aria-label="Close" onClick={() => setOpen(false)}>
            ×
          </button>
          <h3>All Industries We Serve</h3>
          <p className="lede">
            Organizations across sectors rely on Nexbash for AI, geospatial, and software systems.
          </p>
          <div className="ap-modal-grid">
            {industries.map((ind) => (
              <article className="ap-modal-item" key={ind.name}>
                <div
                  className="ap-modal-thumb"
                  style={ind.image ? { backgroundImage: `url('${ind.image}')` } : undefined}
                />
                <h4>{ind.name}</h4>
                <p>{ind.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
