'use client';

import { useEffect, useState } from 'react';

export default function Industries({ industries = [] }) {
  const [open, setOpen] = useState(false);
  const featured = industries.slice(0, 10);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (!industries.length) return null;

  return (
    <>
      <section className="band screen industries-impact" id="help" data-reveal>
        <header className="band-head row-head industries-impact-head">
          <div>
            <p className="kicker">Who we help</p>
            <h2>Industries we serve</h2>
            <p className="lede">
              If your organization runs on complex data or critical operations, we likely already
              work in your field.
            </p>
          </div>
        </header>

        <div className="industries-impact-grid reveal-child" style={{ '--i': 1 }}>
          {featured.map((industry, index) => (
            <article className="industries-impact-row" key={industry.name}>
              <span
                className="industries-impact-icon"
                style={{ backgroundImage: `url('${industry.image}')` }}
                aria-hidden="true"
              />
              <div>
                <span className="industries-impact-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{industry.name}</h3>
              </div>
              <span className="industries-impact-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>

        <div className="industries-impact-footer reveal-child" style={{ '--i': 2 }}>
          <span>{industries.length} industries. One delivery standard.</span>
          <button type="button" className="ghost" onClick={() => setOpen(true)}>
            Explore all industries
          </button>
        </div>
      </section>

      <div
        className={`ap-modal${open ? ' open' : ''}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="ap-modal-card" key={open ? 'industries-open' : 'industries'}>
          <button type="button" className="modal-close" aria-label="Close" onClick={() => setOpen(false)}>
            ×
          </button>
          <h3>All Industries We Serve</h3>
          <p className="lede">
            Organizations across sectors rely on Nexbash for AI, geospatial, and software systems.
          </p>
          <div className="ap-modal-grid">
            {industries.map((industry) => (
              <article className="ap-modal-item" key={industry.name}>
                <div
                  className="ap-modal-thumb"
                  style={industry.image ? { backgroundImage: `url('${industry.image}')` } : undefined}
                />
                <h4>{industry.name}</h4>
                <p>{industry.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
