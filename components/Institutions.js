const institutions = [
  { name: 'Sindh Irrigation and Drainage Authority', image: '/assets/institution-sida.png' },
  { name: 'Punjab Information Technology Board', image: '/assets/institution-pitb.png' },
  { name: 'Ministry of Climate Change', image: '/assets/institution-climate-ministry.png' },
  { name: 'Pakistan Council of Research in Water Resources', image: '/assets/institution-pcrwr-exact.png' },
  { name: 'European Union', image: '/assets/institution-eu.png' },
  { name: 'Green Climate Fund', image: '/assets/institution-green-climate-fund.png' },
  { name: 'United Nations', image: '/assets/institution-un.png' },
  { name: 'Food and Agriculture Organization', image: '/assets/institution-fao-exact.png' },
  { name: 'Government Institution', image: '/assets/institution-forest.png' },
];

export default function Institutions() {
  const loop = [...institutions, ...institutions];

  return (
    <section className="institution-trust" aria-label="Trusted by Governments and Institutions">
      <p className="kicker">Trusted by Governments &amp; Institutions</p>
      <div className="institution-grid">
        <div className="institution-track">
          {loop.map((institution, index) => (
            <article
              className="institution-logo-card site-logo-cell"
              key={`${institution.name}-${index}`}
              aria-hidden={index >= institutions.length}
            >
              <img src={institution.image} alt={index < institutions.length ? institution.name : ''} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
