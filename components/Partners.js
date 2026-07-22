'use client';

export default function Partners({ partners }) {
  const loop = [...partners, ...partners];
  const reverse = [...partners].reverse();
  const loopB = [...reverse, ...reverse];

  return (
    <section className="partners screen" data-reveal>
      <p className="kicker reveal-child" style={{ '--i': 0 }}>
        Trusted nodes
      </p>
      <div className="partner-rail reveal-child" style={{ '--i': 1 }}>
        <div className="partner-track">
          {loop.map((p, i) => (
            <span key={`a-${p.alt}-${i}`} className="partner-chip tilt">
              <img src={p.src} alt={p.alt} />
            </span>
          ))}
        </div>
      </div>
      <div className="partner-rail partner-rail-b reveal-child" style={{ '--i': 2 }}>
        <div className="partner-track partner-track-rev">
          {loopB.map((p, i) => (
            <span key={`b-${p.alt}-${i}`} className="partner-chip tilt">
              <img src={p.src} alt={p.alt} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
