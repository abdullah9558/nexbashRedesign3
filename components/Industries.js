'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Industries({ industries = [] }) {
  const [open, setOpen] = useState(false);
  const featured = industries.slice(0, 8);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!industries.length) return null;

  return <>
    <section className="band screen industries-impact" id="help" data-reveal>
      <header className="band-head row-head industries-impact-head"><div><p className="kicker">Who we help</p><h2>Industries we serve</h2><p className="lede">If your organization runs on complex data or critical operations, we likely already work in your field.</p></div></header>
      <div className="industries-impact-grid reveal-child" style={{ '--i': 1 }}>
        {featured.map((industry, index) => <Link className="industries-impact-row" key={industry.name} href={`/industries/${slugify(industry.name)}`}>
          <span className="industries-impact-icon" style={{ backgroundImage: `url('${industry.image}')` }} aria-hidden="true" />
          <div><span className="industries-impact-number">{String(index + 1).padStart(2, '0')}</span><h3>{industry.name}</h3></div><span className="industries-impact-arrow" aria-hidden="true">↗</span>
        </Link>)}
      </div>
      <div className="industries-impact-footer reveal-child" style={{ '--i': 2 }}><span>{industries.length} industries. One delivery standard.</span><button type="button" className="ghost" onClick={() => setOpen(true)}>Explore all industries</button></div>
    </section>

    <div className={`ap-modal industries-directory-modal${open ? ' open' : ''}`} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="ap-modal-card industries-modal-card">
        <button type="button" className="modal-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        <p className="kicker">Who we help</p><h3>Explore every industry</h3><p className="lede">Choose an operating environment to open its dedicated Nexbash solution page.</p>
        <div className="ap-modal-grid industries-route-grid">{industries.map((industry) => <Link className="ap-modal-item" href={`/industries/${slugify(industry.name)}`} key={industry.name} onClick={() => setOpen(false)}>
          <div className="ap-modal-thumb" style={{ backgroundImage: `url('${industry.image}')` }} /><h4>{industry.name}</h4><p>{industry.desc}</p><span>Open industry page →</span>
        </Link>)}</div>
      </div>
    </div>
  </>;
}
