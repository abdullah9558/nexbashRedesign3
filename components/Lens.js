'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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

const CAP_DETAILS = {
  'ai-ml': ['Computer vision and NLP', 'Predictive decision systems', 'Model deployment and monitoring'],
  geospatial: ['Interactive mapping platforms', 'Spatial analytics and automation', 'Digital twins and location intelligence'],
  'data-science': ['Data pipelines and warehousing', 'Decision dashboards', 'Forecasting and operational analytics'],
  blockchain: ['Smart contracts and tokenization', 'Secure digital identity', 'Verifiable records and audit trails'],
  'web-mobile': ['Responsive web platforms', 'Native and cross-platform apps', 'Secure APIs and backend systems'],
  'design-ux': ['User research and journey mapping', 'Interface systems and prototypes', 'Accessibility and usability testing'],
  qa: ['Automated functional testing', 'Performance and security validation', 'Release quality engineering'],
  'devops-cloud': ['Cloud-native architecture', 'CI/CD and infrastructure automation', 'Monitoring, resilience, and cost control'],
};

const DetailModal = () => null;

export default function Lens({ capabilities = [] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const consoleRef = useRef(null);
  const capability = capabilities[active];
  const selected = null;
  const closeDetail = () => {};

  useEffect(() => {
    if (!capabilities.length || paused) return undefined;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % capabilities.length),
      6500
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
            <Link
              key={item.id}
              className={index === active ? 'on' : ''}
              href={`/capabilities/${item.id}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.name}
            </Link>
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
          <h3>{capability.name}</h3>
          <p>{capability.desc}</p>
          <div className="capability-meter">
            <span style={{ width: `${68 + active * 4}%` }} />
          </div>
          <div className="capability-meta">
            <span>MODULE {String(active + 1).padStart(2, '0')}</span>
            <span>{String(capabilities.length).padStart(2, '0')} ACTIVE NODES</span>
          </div>
          <Link className="case-detail-button capability-detail-button" href={`/capabilities/${capability.id}`}>
            Explore capability
          </Link>
        </div>
      </div>
      {false && <DetailModal
        open={Boolean(selected)}
        onClose={closeDetail}
        eyebrow="Capability Spotlight"
        title={selected?.name || ''}
        image={selected ? CAP_IMAGES[selected.id] : undefined}
      >
        <p className="detail-page-lede">{selected?.desc}</p>
        <div className="detail-page-columns">
          <section>
            <h3>What we deliver</h3>
            <ul>{(CAP_DETAILS[selected?.id] || []).map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section>
            <h3>Engineering foundations</h3>
            <ul><li>Production-ready architecture</li><li>Security and quality built in</li><li>Documentation and knowledge transfer</li></ul>
          </section>
        </div>
        <section className="detail-page-section">
          <h3>Delivery model</h3>
          <p>We begin with discovery and technical validation, deliver an operational first release, and expand through measured iterations backed by testing, deployment automation, and ongoing support.</p>
        </section>
        <section className="detail-page-section">
          <h3>Business value</h3>
          <p>Each capability is tied to a measurable operational outcome: faster decisions, reduced manual work, resilient service delivery, clearer data, or improved customer experience.</p>
        </section>
      </DetailModal>}
    </section>
  );
}
