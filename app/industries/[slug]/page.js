import { notFound } from 'next/navigation';
import DetailExperience from '@/components/DetailExperience';
import { industryDetail, site, slugify } from '@/lib/detailContent';

export function generateStaticParams() { return site.industries.map((item) => ({ slug: slugify(item.name) })); }
export async function generateMetadata({ params }) { const { slug } = await params; const data = industryDetail(slug); return data ? { title: `${data.title} Solutions | Nexbash Systems`, description: data.intro } : {}; }
export default async function IndustryPage({ params }) { const { slug } = await params; const data = industryDetail(slug); if (!data) notFound(); return <DetailExperience data={data} />; }
