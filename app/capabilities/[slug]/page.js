import { notFound } from 'next/navigation';
import DetailExperience from '@/components/DetailExperience';
import { capabilityDetail, site } from '@/lib/detailContent';

export function generateStaticParams() { return site.capabilities.map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }) { const { slug } = await params; const data = capabilityDetail(slug); return data ? { title: `${data.title} | Nexbash Systems`, description: data.intro } : {}; }
export default async function CapabilityPage({ params }) { const { slug } = await params; const data = capabilityDetail(slug); if (!data) notFound(); return <DetailExperience data={data} />; }
