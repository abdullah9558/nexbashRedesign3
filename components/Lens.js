'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useDragSlide from '@/components/useDragSlide';

const CAP_IMAGES = {
  'ai-ml': '/assets/studio-ai-ml.png',
  geospatial: '/assets/studio-gis.png',
  'data-science': '/assets/studio-data-science.png',
  blockchain: '/assets/studio-blockchain.png',
  'web-mobile': '/assets/studio-web-mobile.png',
  'design-ux': '/assets/studio-design-ux.png',
  qa: '/assets/studio-qa-security.png',
  'devops-cloud': '/assets/studio-cloud-devops.png',
};

export default function Lens({ capabilities = [] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [spinDrag, setSpinDrag] = useState(0);
  const wheelDrag = useRef({ active: false, startX: 0, startI: 0 });
  const total = capabilities.length;
  const c = capabilities[i];

  const step = useCallback(
    (delta) => {
      if (!total) return;
      setDir(delta);
      setI((n) => (n + delta + total) % total);
    },
    [total]
  );

  const { viewportRef, trackRef } = useDragSlide(step);

  useEffect(() => {
    if (!total || paused) return undefined;
    const timer = setInterval(() => {
      setDir(1);
      setI((n) => (n + 1) % total);
    }, 4300);
    return () => clearInterval(timer);
  }, [total, paused]);

  if (!c) return null;

  const angle = (360 / total) * i + spinDrag;
  const image = CAP_IMAGES[c.id] || '/assets/studio-ai-ml.png';

  const goTo = (next) => {
    const wrapped = (next + total) % total;
    setDir(wrapped > i || (i === total - 1 && wrapped === 0) ? 1 : -1);
    if (i === 0 && wrapped === total - 1) setDir(-1);
    setI(wrapped);
  };

  return (
    <section className="band screen" id="capabilities" data-reveal>
      <header className="band-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Capabilities Spotlight · Aperture</p>
        <h2>What we build, and why it matters</h2>
        <p className="lede">Drag the rings, tap a node, or let the aperture cycle through each capability.</p>
      </header>

      <div
        className="lens reveal-child"
        style={{ '--i': 1 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`lens-wheel${spinDrag ? ' is-spinning' : ''}`}
          style={{ transform: `rotate(${-angle}deg)` }}
          onPointerDown={(e) => {
            if (e.target.closest('.lens-node')) return;
            e.currentTarget.setPointerCapture?.(e.pointerId);
            wheelDrag.current = { active: true, startX: e.clientX, startI: i };
            setSpinDrag(0);
          }}
          onPointerMove={(e) => {
            if (!wheelDrag.current.active) return;
            const dx = e.clientX - wheelDrag.current.startX;
            setSpinDrag(dx * 0.35);
          }}
          onPointerUp={(e) => {
            if (!wheelDrag.current.active) return;
            const dx = e.clientX - wheelDrag.current.startX;
            wheelDrag.current.active = false;
            setSpinDrag(0);
            const steps = Math.round(dx / 48);
            if (steps === 0) return;
            setDir(steps > 0 ? 1 : -1);
            setI((wheelDrag.current.startI + steps + total * 20) % total);
          }}
          onPointerCancel={() => {
            wheelDrag.current.active = false;
            setSpinDrag(0);
          }}
        >
          {capabilities.map((cap, idx) => {
            const a = (360 / total) * idx;
            return (
              <button
                key={cap.id}
                type="button"
                className={`lens-node ${idx === i ? 'on' : ''}`}
                style={{
                  transform: `rotate(${a}deg) translateY(calc(-1 * var(--orbit))) rotate(${-a + angle}deg)`,
                }}
                onClick={() => goTo(idx)}
              >
                {cap.name.split('&')[0].trim().split(' ')[0]}
              </button>
            );
          })}
          <div className="lens-ring lr1" />
          <div className="lens-ring lr2" />
          <div className="lens-ring lr3" />
        </div>

        <div className="lens-core-slot drag-swipe" ref={viewportRef}>
          <div className={`lens-core slide-${dir > 0 ? 'next' : 'prev'}`} key={c.id} ref={trackRef}>
            <img src={image} alt="" />
            <div>
              <span className="mono">{c.tag}</span>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <p className="lens-count">
                {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
