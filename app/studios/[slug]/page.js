import { notFound } from 'next/navigation';
import DetailExperience from '@/components/DetailExperience';
import { site, studioDetail } from '@/lib/detailContent';

export function generateStaticParams() { return site.studios.map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }) { const { slug } = await params; const data = studioDetail(slug); return data ? { title: `${data.title} | Nexbash Systems`, description: data.intro } : {}; }
export default async function StudioPage({ params }) { const { slug } = await params; const data = studioDetail(slug); if (!data) notFound(); return <DetailExperience data={data} />; }
