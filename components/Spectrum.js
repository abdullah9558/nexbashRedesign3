'use client';

import { useState } from 'react';

export default function Spectrum({ studios = [] }) {
  const [expanded, setExpanded] = useState(false);

  if (!studios.length) return null;

  return (
    <section
      className={`band screen studio-services${expanded ? ' is-expanded' : ''}`}
      id="studios"
      data-reveal
    >
        <header className="band-head row-head">
          <div>
            <p className="kicker">Studios</p>
            <h2>Pick where you need us</h2>
            <p className="lede">Each studio is a full delivery team. Tune a band, or open the full rack.</p>
          </div>
        </header>

        <div className="studio-service-grid">
          {studios.map((studio, index) => (
            <article
              className={`studio-service-card${index >= 4 ? ' studio-service-extra' : ''}`}
              key={studio.id}
            >
              <img src={studio.image} alt="" />
              <div className="studio-service-shade" />
              <div className="studio-service-top">
                <span>{studio.timeline}</span>
                <span aria-hidden="true">-&gt;</span>
              </div>
              <div className="studio-service-copy">
                <h3>{studio.title}</h3>
                <p>{studio.modalDesc}</p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="studio-service-more"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          {expanded ? 'View Fewer Studios' : 'View More Studios'}
          <span aria-hidden="true">{expanded ? '-' : '+'}</span>
        </button>
    </section>
  );
}
