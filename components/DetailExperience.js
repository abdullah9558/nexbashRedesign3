'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GeoField from '@/components/GeoField';
import Bloom from '@/components/Bloom';

export default function DetailExperience({ data }) {
  const [active, setActive] = useState(data.panels[0]?.id);
  const panel = data.panels.find((item) => item.id === active) || data.panels[0];

  return (<>
    <GeoField className="detail-geo" />
    <Bloom />
    <Nav forceSolid />
    <main className="long-detail-page" id="top">
      <header className="long-detail-hero">
        <div className="long-detail-copy">
          <p className="kicker">{data.type}</p><h1>{data.title}</h1><p>{data.intro}</p>
          {data.duration && <span>{data.duration}</span>}
          {data.highlights?.length > 0 && <div className="long-detail-chips">{data.highlights.slice(0, 4).map((item) => <b key={item}>{item}</b>)}</div>}
          <div className="long-detail-hero-actions"><Link className="go" href="/#contact">Discuss your project</Link><a className="ghost" href="#explore-detail">Explore the brief ↓</a></div>
        </div>
        <div className="long-detail-visual"><img src={data.image} alt="" /><span>{data.type} · Nexbash Systems</span><div className="long-detail-visual-index">01</div></div>
      </header>

      {data.metrics?.length > 0 && <section className="long-detail-metrics">{data.metrics.slice(0, 4).map((metric) => <article key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}</section>}

      <section className="long-detail-explorer" id="explore-detail">
        <div className="long-detail-tabs" role="tablist">{data.panels.map((item, index) => <button key={item.id} type="button" className={active === item.id ? 'on' : ''} onClick={() => setActive(item.id)}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}</div>
        <div className="long-detail-panel" key={panel.id}><p className="long-detail-panel-intro">{panel.intro}</p><div className="long-detail-blocks">{panel.blocks.map((block) => <article key={block.title}><h2>{block.title}</h2><p>{block.text}</p>{block.items?.length > 0 && <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>}</article>)}</div></div>
      </section>

      <section className="long-detail-gallery"><div><img src={data.image} alt="" /></div><div><img src={data.image} alt="" /></div><div><img src={data.image} alt="" /></div></section>

      {data.steps?.length > 0 && <section className="long-detail-timeline"><p className="kicker">{data.deliveryEyebrow}</p><h2>{data.deliveryTitle}</h2><div>{data.steps.map((step, index) => <article key={`${step.title}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>}

      {(data.stack || data.highlights?.length > 0) && <section className="long-detail-foundation">
        <div><p className="kicker">Built to last</p><h2>{data.foundationTitle}</h2><p>Every engagement includes the engineering practices required to operate, secure, understand, and extend the solution after launch.</p></div>
        <div className="long-detail-tags">{data.stack ? Object.entries(data.stack).flatMap(([group, items]) => items.map((item) => <span key={`${group}-${item}`}>{item}</span>)) : data.highlights.map((item) => <span key={item}>{item}</span>)}</div>
      </section>}

      <section className="long-detail-cta"><p className="kicker">Start a conversation</p><h2>{data.ctaTitle}</h2><Link className="go" href="/#contact">Send Us Your Query</Link></section>
    </main>
    <Footer />
  </>);
}
