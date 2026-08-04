'use client';

import { useCallback, useEffect, useState } from 'react';
import useDragScroll from '@/components/useDragScroll';
import useDragSlide from '@/components/useDragSlide';
import { ChevronLeft, ChevronRight } from '@/components/NavArrows';
import Link from 'next/link';

/** Shatter gallery for previous projects */
const PROJECT_IMAGES = {
  geospatial: '/assets/project-geospatial-16x9.webp',
  'healthcare-ai': '/assets/project-healthcare-ai-16x9.webp',
  'work-os': '/assets/project-work-os-16x9.webp',
  'fashion-ree': '/assets/project-fashion-ree-16x9.webp',
  'market-insights': '/assets/project-market-insights-16x9.webp',
  'smart-home': '/assets/project-smart-home-16x9.webp',
  'digital-archive': '/assets/project-digital-archive-16x9.webp',
  'property-regtech': '/assets/project-property-regtech-16x9.webp',
};

const DetailModal = () => null;

export default function Shatter({ projects = [] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const { ref: railRef, didDrag } = useDragScroll();
  const total = projects.length;
  const p = projects[idx] || projects[0];
  const detail = null;
  const detailOpen = false;
  const closeDetail = () => {};

  const scrollRailTo = (i) => {
    const rail = railRef.current;
    const child = rail?.children?.[i];
    if (!rail || !child) return;
    const left = child.offsetLeft - (rail.clientWidth - child.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  };

  const select = (i) => {
    if (i === idx) return;
    setPaused(true);
    setDir(i > idx ? 1 : -1);
    setIdx(i);
    scrollRailTo(i);
    window.setTimeout(() => setPaused(false), 6000);
  };

  const step = useCallback(
    (delta) => {
      if (!total) return;
      setPaused(true);
      setDir(delta);
      setIdx((n) => {
        const next = (n + delta + total) % total;
        window.requestAnimationFrame(() => scrollRailTo(next));
        return next;
      });
      window.setTimeout(() => setPaused(false), 6000);
    },
    [total]
  );

  const { viewportRef, trackRef } = useDragSlide(step);

  useEffect(() => {
    if (!projects.length || paused) return undefined;
    const id = window.setInterval(() => {
      setIdx((n) => {
        const next = (n + 1) % projects.length;
        setDir(1);
        window.requestAnimationFrame(() => scrollRailTo(next));
        return next;
      });
    }, 4500);
    return () => window.clearInterval(id);
  }, [projects.length, paused]);

  if (!p) return null;

  const img = PROJECT_IMAGES[p.id] || `/assets/project-${p.id}.png`;
  const stats = Array.isArray(p.stats)
    ? p.stats.map((s) => (typeof s === 'string' ? s : `${s.value} · ${s.label}`))
    : [];

  return (
    <section
      className="band screen previous-projects"
      id="projects"
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <header className="band-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Previous projects · Shatter view</p>
        <h2>Case studies from the field</h2>
      </header>

      <div className="shatter-main-wrap reveal-child" style={{ '--i': 1 }}>
        <button type="button" className="project-nav project-nav-prev" onClick={() => step(-1)} aria-label="Previous project">
          <ChevronLeft />
        </button>
        <div className="shatter-stage drag-swipe" ref={viewportRef}>
          <div
            className={`shatter-glass slide-${dir > 0 ? 'next' : 'prev'}`}
            key={p.id}
            ref={trackRef}
          >
            <div className="shard s1" style={{ backgroundImage: `url('${img}')` }} />
            <div className="shard s2" style={{ backgroundImage: `url('${img}')` }} />
            <div className="shard s3" style={{ backgroundImage: `url('${img}')` }} />
            <div className="shard s4" style={{ backgroundImage: `url('${img}')` }} />
            <div className="shatter-meta">
              <span>{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <Link className="case-detail-button" href={`/projects/${p.id}`}>
                View full case study
              </Link>
            </div>
          </div>
        </div>
        <button type="button" className="project-nav project-nav-next" onClick={() => step(1)} aria-label="Next project">
          <ChevronRight />
        </button>
      </div>

      <div className="project-rail-wrap reveal-child" style={{ '--i': 2 }}>
        <button type="button" className="project-rail-nav" onClick={() => step(-1)} aria-label="Previous project card">
          <ChevronLeft />
        </button>
        <div className="shatter-rail drag-rail" ref={railRef}>
          {projects.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`shard-thumb ${i === idx ? 'on' : ''}`}
              onClick={() => {
                if (didDrag.current) {
                  didDrag.current = false;
                  return;
                }
                select(i);
              }}
            >
              <span
                className="shard-thumb-media"
                style={{
                  backgroundImage: `url('${PROJECT_IMAGES[item.id] || `/assets/project-${item.id}.png`}')`,
                }}
              />
              <span className="shard-thumb-label">{item.title}</span>
            </button>
          ))}
        </div>
        <button type="button" className="project-rail-nav" onClick={() => step(1)} aria-label="Next project card">
          <ChevronRight />
        </button>
      </div>
      {false && <DetailModal
        open={detailOpen}
        onClose={closeDetail}
        eyebrow={detail?.industry || p?.tag}
        title={detail?.title || p?.title || ''}
        image={detail?.image || img}
      >
        <p className="detail-page-lede">{detail?.description || p?.desc}</p>
        {detail?.duration && <p className="detail-page-meta"><strong>Engagement:</strong> {detail.duration}</p>}
        {detail?.metrics?.length > 0 && (
          <div className="detail-metrics">
            {detail.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
          </div>
        )}
        <div className="detail-page-columns">
          <section><h3>The challenge</h3><p>{detail?.challenge}</p></section>
          <section><h3>The solution</h3><p>{detail?.solution}</p></section>
        </div>
        {detail?.implementation?.length > 0 && (
          <section className="detail-page-section">
            <h3>Implementation approach</h3>
            <div className="detail-steps">{detail.implementation.map((item, index) => (
              <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></article>
            ))}</div>
          </section>
        )}
        {detail?.stack && (
          <section className="detail-page-section"><h3>Technical stack</h3><div className="detail-stack">
            {Object.entries(detail.stack).map(([group, items]) => <div key={group}><h4>{group}</h4><p>{items.join(' · ')}</p></div>)}
          </div></section>
        )}
        {detail?.achievements?.length > 0 && (
          <section className="detail-page-section"><h3>Key achievements</h3><ul>{detail.achievements.map((item) => <li key={item}>{item}</li>)}</ul></section>
        )}
      </DetailModal>}
    </section>
  );
}
