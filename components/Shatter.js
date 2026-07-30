'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useDragScroll from '@/components/useDragScroll';
import useDragSlide from '@/components/useDragSlide';
import { ChevronLeft, ChevronRight } from '@/components/NavArrows';

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

export default function Shatter({ projects = [] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const { ref: railRef, didDrag } = useDragScroll();
  const skipScrollSync = useRef(false);
  const total = projects.length;
  const p = projects[idx] || projects[0];

  const scrollRailTo = (i) => {
    const rail = railRef.current;
    const child = rail?.children?.[i];
    if (!rail || !child) return;
    skipScrollSync.current = true;
    const left = child.offsetLeft - (rail.clientWidth - child.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
    window.setTimeout(() => {
      skipScrollSync.current = false;
    }, 450);
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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    let timer = 0;
    const onScroll = () => {
      if (skipScrollSync.current) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const cards = [...rail.querySelectorAll('.shard-thumb')];
        let best = 0;
        let bestDist = Infinity;
        const mid = rail.scrollLeft + rail.clientWidth / 2;
        cards.forEach((c, i) => {
          const center = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(center - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setIdx((prev) => {
          if (best === prev) return prev;
          setDir(best > prev ? 1 : -1);
          return best;
        });
      }, 80);
    };
    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      rail.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, [railRef]);

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
              <div className="shatter-stats">
                {stats.map((s) => (
                  <b key={s}>{s}</b>
                ))}
              </div>
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
    </section>
  );
}
