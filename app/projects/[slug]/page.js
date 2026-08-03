import { notFound } from 'next/navigation';
import DetailExperience from '@/components/DetailExperience';
import { projectDetail, site } from '@/lib/detailContent';

export function generateStaticParams() { return site.projects.map((item) => ({ slug: item.id })); }
export async function generateMetadata({ params }) { const { slug } = await params; const data = projectDetail(slug); return data ? { title: `${data.title} | Nexbash Case Study`, description: data.intro } : {}; }
export default async function ProjectPage({ params }) { const { slug } = await params; const data = projectDetail(slug); if (!data) notFound(); return <DetailExperience data={data} />; }
