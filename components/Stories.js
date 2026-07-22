'use client';

import { useCallback, useEffect, useState } from 'react';
import useDragSlide from '@/components/useDragSlide';

export default function Stories({ stories = [] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [paused, setPaused] = useState(false);
  const total = stories.length;

  const step = useCallback(
    (delta) => {
      setDir(delta);
      setIdx((i) => (i + delta + total) % total);
    },
    [total]
  );

  const { viewportRef, trackRef, didDrag } = useDragSlide(step);

  useEffect(() => {
    if (!total || paused || activeStory || viewAllOpen) return undefined;
    const timer = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total, paused, activeStory, viewAllOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (activeStory) setActiveStory(null);
      else setViewAllOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeStory]);

  const openStory = (story) => {
    if (didDrag.current) return;
    setActiveStory(story);
    setViewAllOpen(false);
  };

  if (!total) return null;

  const visible = [
    stories[(idx - 1 + total) % total],
    stories[idx],
    stories[(idx + 1) % total],
  ];

  return (
    <>
      <section className="band screen" id="stories" data-reveal>
        <header className="band-head row-head reveal-child" style={{ '--i': 0 }}>
          <div>
            <p className="kicker">Success stories</p>
            <h2>Real problems, real solutions, real results</h2>
            <p className="lede">Click any story to open the full case study.</p>
          </div>
          <button type="button" className="ghost" onClick={() => setViewAllOpen(true)}>
            View All
          </button>
        </header>

        <div
          className="story-deck reveal-child"
          style={{ '--i': 1 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button type="button" className="ghost ind-nav" onClick={() => step(-1)} aria-label="Previous">
            ←
          </button>
          <div className="story-viewport drag-swipe" ref={viewportRef}>
            <div className={`story-strip slide-${dir > 0 ? 'next' : 'prev'}`} key={idx} ref={trackRef}>
              {visible.map((s, pos) => (
                <button
                  type="button"
                  key={`${s.id}-${pos}`}
                  className={`story-card tilt ${pos === 1 ? 'on' : ''}`}
                  onClick={() => openStory(s)}
                >
                  <div className="story-card-media" style={{ backgroundImage: `url('${s.image}')` }} />
                  <div className="story-card-body">
                    <span className="story-tag">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <span className="story-open">Open case study →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <button type="button" className="ghost ind-nav" onClick={() => step(1)} aria-label="Next">
            →
          </button>
        </div>
      </section>

      <div
        className={`ap-modal${viewAllOpen ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setViewAllOpen(false);
        }}
      >
        <div className="ap-modal-card">
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={() => setViewAllOpen(false)}
          >
            ×
          </button>
          <h3>All Success Stories</h3>
          <p className="lede">Browse every case study. Click any story to open full detail.</p>
          <div className="ap-modal-grid">
            {stories.map((s) => (
              <button
                type="button"
                className="ap-modal-item story-pick"
                key={s.id}
                onClick={() => openStory(s)}
              >
                <div className="ap-modal-thumb" style={{ backgroundImage: `url('${s.image}')` }} />
                <h4>{s.title}</h4>
                <p>{s.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`ap-modal${activeStory ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveStory(null);
        }}
      >
        {activeStory && (
          <div className="ap-modal-card story-detail">
            <button
              type="button"
              className="modal-close"
              aria-label="Close"
              onClick={() => setActiveStory(null)}
            >
              ×
            </button>
            <div
              className="story-detail-hero"
              style={{ backgroundImage: `url('${activeStory.image}')` }}
            />
            <span className="story-tag">{activeStory.tag}</span>
            <h3>{activeStory.title}</h3>
            <p className="lede">{activeStory.description}</p>

            {activeStory.metrics?.length > 0 && (
              <div className="story-metrics">
                {activeStory.metrics.map((m) => (
                  <div key={`${m.value}-${m.label}`}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="story-meta-row">
              <div>
                <span className="mono">Industry</span>
                <p>{activeStory.industry}</p>
              </div>
              <div>
                <span className="mono">Duration</span>
                <p>{activeStory.duration}</p>
              </div>
            </div>

            <div className="story-block">
              <h4>The Challenge</h4>
              <p>{activeStory.challenge}</p>
            </div>
            <div className="story-block">
              <h4>The Solution</h4>
              <p>{activeStory.solution}</p>
            </div>

            {activeStory.implementation?.length > 0 && (
              <div className="story-block">
                <h4>Implementation Approach</h4>
                <div className="impl-grid">
                  {activeStory.implementation.map((stepItem, i) => (
                    <div key={stepItem.title}>
                      <span className="mono">{i + 1}</span>
                      <strong>{stepItem.title}</strong>
                      <p>{stepItem.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStory.stack && (
              <div className="story-block">
                <h4>Technical Stack</h4>
                <div className="stack-grid">
                  {Object.entries(activeStory.stack).map(([group, items]) => (
                    <div key={group}>
                      <span className="mono">{group}</span>
                      <div className="chips">
                        {items.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStory.achievements?.length > 0 && (
              <div className="story-block">
                <h4>Key Achievements</h4>
                <ul className="check">
                  {activeStory.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
