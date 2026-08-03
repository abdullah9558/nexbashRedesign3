import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GeoField from '@/components/GeoField';
import Bloom from '@/components/Bloom';
import { site, slugify } from '@/lib/detailContent';

export const metadata = { title: 'Industries We Serve | Nexbash Systems', description: 'Explore Nexbash industry solutions.' };

export default function IndustriesDirectory() {
  return <><GeoField className="detail-geo" /><Bloom /><Nav forceSolid /><main className="directory-page" id="top">
    <div className="detail-backbar"><Link href="/#help">← Back home</Link></div>
    <header><p className="kicker">Who we help</p><h1>Industries we serve</h1><p>Explore the operating environments where Nexbash applies AI, geospatial intelligence, data engineering, cloud, and product development.</p></header>
    <section className="directory-grid">{site.industries.map((industry, index) => <Link href={`/industries/${slugify(industry.name)}`} key={industry.name}><img src={industry.image} alt="" /><span>{String(index + 1).padStart(2, '0')}</span><h2>{industry.name}</h2><p>{industry.desc}</p><b>Explore solution →</b></Link>)}</section>
  </main><Footer /></>;
}
