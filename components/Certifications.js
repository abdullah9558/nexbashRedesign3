const certifications = [
  { name: 'Clutch Top Software Developers', image: '/assets/award-clutch-software.png' },
  { name: 'Clutch Top App Development Company', image: '/assets/award-clutch-app.png' },
  { name: 'ISO 27001 Certified', image: '/assets/award-iso-27001.png' },
  { name: 'ISO 9001:2015 Certified', image: '/assets/award-iso-9001.png' },
  { name: 'Pakistan Engineering Council', image: '/assets/award-pec.png' },
  { name: 'OGC Member', image: '/assets/award-ogc.png' },
  { name: 'P@SHA', image: '/assets/award-pasha.png' },
  { name: 'ISPRS', image: '/assets/award-isprs.png' },
  { name: 'PSEB', image: '/assets/award-pseb.png' },
];

export default function Certifications() {
  const loop = [...certifications, ...certifications];

  return (
    <section className="band certifications awards-exact" id="certifications" data-reveal>
      <header className="awards-exact-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Achievements</p>
      </header>
      <div className="awards-logo-strip reveal-child" style={{ '--i': 1 }}>
        <div className="awards-logo-track">
          {loop.map((item, index) => (
            <div className="site-logo-cell" key={`${item.name}-${index}`} aria-hidden={index >= certifications.length}>
              <img
                src={item.image}
                alt={index < certifications.length ? item.name : ''}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
