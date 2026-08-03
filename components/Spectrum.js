import Link from 'next/link';

export default function Spectrum({ studios = [] }) {
  if (!studios.length) return null;

  return (
    <section className="band screen studio-services is-expanded" id="studios" data-reveal>
      <header className="band-head row-head">
        <div>
          <p className="kicker">Studios</p>
          <h2>Pick where you need us</h2>
          <p className="lede">Each studio is a full delivery team. Tune a band, or open the full rack.</p>
        </div>
      </header>
      <div className="studio-service-grid">
        {studios.map((studio) => (
          <Link className="studio-service-card" key={studio.id} href={`/studios/${studio.id}`}>
            <img src={studio.image} alt="" />
            <div className="studio-service-shade" />
            <div className="studio-service-copy"><h3>{studio.title}</h3><p>{studio.modalDesc}</p></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
