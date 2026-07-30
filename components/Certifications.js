export default function Certifications() {
  return (
    <section className="band certifications awards-exact" id="certifications" data-reveal>
      <header className="awards-exact-head reveal-child" style={{ '--i': 0 }}>
        <p className="kicker">Achievements</p>
        <h2>Awards And <span>Certifications</span></h2>
      </header>
      <div className="awards-logo-strip reveal-child" style={{ '--i': 1 }}>
        <div className="awards-logo-track">
          {[0, 1].map((copy) => (
            <div className="awards-logo-frame" key={copy} aria-hidden={copy === 1}>
              <img
                src="/assets/awards-certifications-reference.png"
                alt={copy === 0 ? 'Clutch, ISO, PEC, OGC, P@SHA, ISPRS, and PSEB awards and certifications' : ''}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
