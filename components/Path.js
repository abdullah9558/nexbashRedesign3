'use client';

import { useEffect, useState } from 'react';

export default function Path({ process = [] }) {
  const [hot, setHot] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = process[hot] || process[0];

  useEffect(() => {
    if (!process.length || paused) return undefined;
    const id = window.setInterval(() => {
      setHot((h) => (h + 1) % process.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [process.length, paused]);

  if (!current) return null;

  return (
    <section className="band screen" id="process" data-reveal>
      <header className="band-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Process · Flow path</p>
        <h2>From idea to launch — the journey we take together</h2>
        <p className="lede">Hover any station — the path lights up and details slide in.</p>
      </header>

      <div
        className="flow reveal-child"
        style={{ '--i': 1, '--hot': hot }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg className="flow-svg" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="flow-line flow-line-base"
            d="M40 100 C 160 20, 280 140, 400 80 S 640 20, 760 100 S 900 140, 960 70"
          />
          <path
            className="flow-line flow-line-run"
            d="M40 100 C 160 20, 280 140, 400 80 S 640 20, 760 100 S 900 140, 960 70"
          />
        </svg>

        <div className="flow-stations">
          {process.map((p, idx) => (
            <button
              key={p.name}
              type="button"
              className={`station ${hot === idx ? 'on' : ''}`}
              style={{ left: `${6 + idx * 14.5}%`, '--si': idx }}
              onMouseEnter={() => setHot(idx)}
              onFocus={() => setHot(idx)}
              onClick={() => setHot(idx)}
            >
              <span className="station-dot">{p.step}</span>
              <span className="station-name">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="flow-tip slide-next" key={current.name}>
          <strong>{current.name}</strong>
          <p>{current.tip}</p>
        </div>
      </div>
    </section>
  );
}
