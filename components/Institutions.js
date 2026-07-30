const institutions = [
  { name: 'Food and Agriculture Organization', image: '/assets/institution-fao.png', short: 'FAO' },
  { name: 'Pakistan Meteorological Department', image: '/assets/institution-pmd.png', short: 'PMD' },
  { name: 'Pakistan Council of Research in Water Resources', image: '/assets/institution-pcrwr.png', short: 'PCRWR' },
  { name: 'Planning & Development Board Punjab', image: '/assets/institution-punjab.png', short: 'P&D Punjab' },
  { name: 'Planning & Development Department Balochistan', image: '/assets/institution-balochistan.png', short: 'P&D Balochistan' },
];

export default function Institutions() {
  return (
    <section className="institution-trust" aria-label="Trusted by Governments and Institutions">
      <p className="kicker">Trusted by Governments &amp; Institutions</p>
      <div className="institution-grid">
        {institutions.map((institution) => (
          <article className="institution-logo-card" key={institution.name}>
            <img src={institution.image} alt="" />
            <span>{institution.short}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
