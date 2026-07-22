'use client';

import { useCallback, useEffect, useState } from 'react';
import useDragSlide from '@/components/useDragSlide';

/** Studios — large detail card with prev/next + dots */
export default function Spectrum({ studios = [] }) {
  const [live, setLive] = useState(0);
  const [dir, setDir] = useState(1);
  const [allOpen, setAllOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const active = studios[live] || studios[0];
  const total = studios.length;

  const goTo = (i) => {
    if (!total || i === live) return;
    setDir(i > live ? 1 : -1);
    setLive(i);
  };

  const step = useCallback(
    (delta) => {
      if (!total) return;
      setDir(delta);
      setLive((n) => (n + delta + total) % total);
    },
    [total]
  );

  const { viewportRef, trackRef } = useDragSlide(step);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setAllOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (allOpen || paused || !total) return undefined;
    const id = window.setInterval(() => {
      setDir(1);
      setLive((n) => (n + 1) % total);
    }, 4200);
    return () => window.clearInterval(id);
  }, [allOpen, paused, total]);

  if (!active) return null;

  return (
    <>
      <section className="band screen" id="studios" data-reveal>
        <header className="band-head row-head reveal-child" style={{ '--i': 0 }}>
          <div>
            <p className="kicker">Studios</p>
            <h2>Pick where you need us</h2>
            <p className="lede">Each studio is a full delivery team. Tune a band, or open the full rack.</p>
          </div>
          <button type="button" className="ghost" onClick={() => setAllOpen(true)}>
            View All
          </button>
        </header>

        <div
          className="spectrum reveal-child"
          style={{ '--i': 1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="spectrum-stage">
            <button type="button" className="ghost ind-nav" onClick={() => step(-1)} aria-label="Previous studio">
              ←
            </button>

            <div className="spectrum-viewport drag-swipe" ref={viewportRef}>
              <div
                className={`spectrum-panel slide-${dir > 0 ? 'next' : 'prev'}`}
                key={active.id}
                ref={trackRef}
              >
                <div className="spectrum-media">
                  <img src={active.image} alt="" />
                </div>
                <div className="spectrum-copy">
                  <span className="mono">{active.timeline}</span>
                  <h3>{active.title}</h3>
                  <p className="blurb">
                    <strong>For</strong> {active.forText}
                  </p>
                  <p>
                    <strong>Solves</strong> {active.solves}
                  </p>
                  {active.included?.length > 0 && (
                    <ul className="check">
                      {active.included.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <button type="button" className="ghost ind-nav" onClick={() => step(1)} aria-label="Next studio">
              →
            </button>
          </div>

          <div className="ind-dots spectrum-dots" role="tablist" aria-label="Studios">
            {studios.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={live === i}
                className={`ind-dot ${live === i ? 'on' : ''}`}
                aria-label={s.title}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <div
        className={`ap-modal${allOpen ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setAllOpen(false);
        }}
      >
        <div className="ap-modal-card">
          <button type="button" className="modal-close" aria-label="Close" onClick={() => setAllOpen(false)}>
            ×
          </button>
          <h3>All Nexbash Studios</h3>
          <p className="lede">A complete view of the studio capabilities we bring to complex work.</p>
          <div className="ap-modal-grid">
            {studios.map((s) => (
              <article className="ap-modal-item" key={s.id}>
                <div className="ap-modal-thumb" style={{ backgroundImage: `url('${s.image}')` }} />
                <h4>{s.title}</h4>
                <p>{s.modalDesc}</p>
                <ul>
                  {(s.modalItems || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
