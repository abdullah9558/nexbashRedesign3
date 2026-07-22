'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useDragScroll from '@/components/useDragScroll';
import useDragSlide from '@/components/useDragSlide';

/** Shatter gallery for previous projects */
const PROJECT_IMAGES = {
  geospatial: '/assets/project-geospatial.png',
  'healthcare-ai': '/assets/project-healthcare-ai.png',
  'work-os': '/assets/project-work-os.png',
  'fashion-ree': '/assets/project-fashion-ree.png',
  'market-insights': '/assets/project-market-insights.png',
  'smart-home': '/assets/project-smart-home.png',
  'digital-archive': '/assets/project-digital-archive.png',
  'property-regtech': '/assets/project-property-regtech.png',
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
      className="band screen"
      id="projects"
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <header className="band-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Previous projects · Shatter view</p>
        <h2>Case studies from the field</h2>
      </header>

      <div className="shatter-stage reveal-child drag-swipe" style={{ '--i': 1 }} ref={viewportRef}>
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

      <div className="shatter-rail reveal-child drag-rail" style={{ '--i': 2 }} ref={railRef}>
        {projects.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`shard-thumb ${i === idx ? 'on' : ''}`}
            onPointerUp={(e) => {
              if (e.pointerType === 'mouse' && e.button !== 0) return;
              if (didDrag.current) return;
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
    </section>
  );
}
