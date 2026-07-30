'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const consoleRef = useRef(null);
  const capability = capabilities[active];

  useEffect(() => {
    if (!capabilities.length || paused) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % capabilities.length),
      4800
    );
    return () => window.clearInterval(timer);
  }, [capabilities.length, paused]);

  if (!capability) return null;

  const image = CAP_IMAGES[capability.id] || '/assets/studio-ai-ml.png';

  const trackPointer = (event) => {
    const node = consoleRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--console-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--console-y', `${event.clientY - rect.top}px`);
  };

  return (
    <section className="band screen capability-section" id="capabilities" data-reveal>
      <header className="band-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Capabilities Spotlight · Signal Console</p>
        <h2>What we build, and why it matters</h2>
        <p className="lede">Move through the signal matrix to inspect each engineering capability.</p>
      </header>

      <div
        className="capability-console reveal-child"
        style={{ '--i': 1 }}
        ref={consoleRef}
        onPointerMove={trackPointer}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="capability-console-glow" />
        <div className="capability-index">
          {capabilities.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={index === active ? 'on' : ''}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.name}
            </button>
          ))}
        </div>

        <div className="capability-hologram" key={`visual-${capability.id}`}>
          <div className="capability-orbit orbit-a" />
          <div className="capability-orbit orbit-b" />
          <div className="capability-scan" />
          <img src={image} alt="" />
          <span className="capability-live">LIVE SIGNAL</span>
        </div>

        <div className="capability-readout" key={`copy-${capability.id}`}>
          <span className="mono">{capability.tag}</span>
          <h3>{capability.name}</h3>
          <p>{capability.desc}</p>
          <div className="capability-meter">
            <span style={{ width: `${68 + active * 4}%` }} />
          </div>
          <div className="capability-meta">
            <span>MODULE {String(active + 1).padStart(2, '0')}</span>
            <span>{String(capabilities.length).padStart(2, '0')} ACTIVE NODES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
