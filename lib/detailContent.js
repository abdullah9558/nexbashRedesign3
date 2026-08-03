import site from '@/data/site';

export const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const capabilityImages = {
  'ai-ml': '/assets/studio-ai-ml.png', geospatial: '/assets/studio-gis.png',
  'data-science': '/assets/studio-data-science.png', blockchain: '/assets/studio-blockchain.png',
  'web-mobile': '/assets/studio-web-mobile.png', 'design-ux': '/assets/studio-design-ux.png',
  qa: '/assets/studio-qa-security.png', 'devops-cloud': '/assets/studio-cloud-devops.png',
};

const capabilityDeliverables = {
  'ai-ml': ['Computer vision and natural-language systems', 'Predictive models and intelligent automation', 'Production model monitoring and retraining'],
  geospatial: ['Interactive mapping and spatial portals', 'Geoprocessing automation and location analytics', 'Digital twins and field intelligence'],
  'data-science': ['Governed data pipelines and warehouses', 'Decision dashboards and reporting layers', 'Forecasting and performance analytics'],
  blockchain: ['Smart contracts and tokenization', 'Secure digital identity and permissions', 'Verifiable records and audit trails'],
  'web-mobile': ['Responsive enterprise web platforms', 'Native and cross-platform mobile applications', 'Secure APIs, databases, and integrations'],
  'design-ux': ['User research and service blueprints', 'Interface systems and interactive prototypes', 'Accessibility and usability validation'],
  qa: ['Automated functional and regression testing', 'Performance, reliability, and security validation', 'Release-quality engineering and reporting'],
  'devops-cloud': ['Cloud-native architecture and migration', 'CI/CD and infrastructure automation', 'Observability, resilience, and cost governance'],
};

const commonSteps = [
  { title: 'Discover the operating context', text: 'We map users, systems, constraints, data, risks, and measurable outcomes before committing to architecture.' },
  { title: 'Design the solution blueprint', text: 'Product, experience, data, security, and infrastructure decisions are aligned into a delivery-ready plan.' },
  { title: 'Build in operational releases', text: 'Cross-functional teams deliver testable increments, demonstrate progress, and incorporate stakeholder feedback continuously.' },
  { title: 'Validate under real conditions', text: 'Quality, performance, security, accessibility, and operational readiness are tested against agreed acceptance criteria.' },
  { title: 'Deploy and transfer knowledge', text: 'We automate deployment, document the system, train teams, and establish ownership across the production lifecycle.' },
  { title: 'Measure and evolve', text: 'Telemetry, support feedback, and business performance guide the next set of improvements.' },
];

export function studioDetail(slug) {
  const item = site.studios.find((entry) => entry.id === slug);
  if (!item) return null;
  return {
    type: 'Nexbash Studio', title: item.title, image: item.image, intro: item.modalDesc,
    backHref: '/#studios', backLabel: 'Back to Studios',
    deliveryEyebrow: `${item.title} workflow`, deliveryTitle: `How the ${item.title} moves from discovery to production`,
    foundationTitle: `${item.title} engineering foundations`, ctaTitle: `Put the ${item.title} to work on your next challenge.`,
    metrics: [{ value: '01', label: 'Dedicated delivery team' }, { value: '06', label: 'Delivery stages' }, { value: '100%', label: 'Source ownership' }],
    panels: [
      { id: 'overview', label: 'Overview', intro: `${item.title} combines product thinking, senior engineering, and operational delivery into one accountable team.`, blocks: [
        { title: `Where ${item.title} creates value`, text: item.forText },
        { title: `${item.title} problem profile`, text: `${item.solves} We address the root workflow, data, integration, and adoption constraints rather than treating the visible symptom alone.` },
        { title: `${item.title} delivery scope`, text: 'Every engagement is scoped around concrete production outcomes.', items: item.included },
      ]},
      { id: 'delivery', label: 'Delivery model', intro: 'A transparent delivery system keeps stakeholders close to decisions while the engineering team remains focused on quality.', blocks: [
        { title: 'Architecture before acceleration', text: 'We validate critical assumptions, identify integration boundaries, define quality attributes, and select technologies based on the operating environment.' },
        { title: 'Visible progress', text: 'Working releases, decision logs, demonstrations, and risk reviews make progress observable throughout the engagement.' },
        { title: 'Production ownership', text: 'Deployment automation, monitoring, documentation, training, and support are included in the definition of done.' },
      ]},
      { id: 'outcomes', label: 'Outcomes', intro: 'The studio is measured by durable operational value, not output volume.', blocks: [
        { title: 'Expected impact', text: 'Faster workflows, clearer information, reduced manual effort, dependable releases, and a platform that can evolve without repeated rework.' },
        { title: 'Governance and quality', text: 'Security, access controls, testing, documentation, and traceability are built into delivery from the start.' },
        { title: 'A team that transfers capability', text: 'Your internal team receives the context, documentation, and practical knowledge required to operate and extend the solution.' },
      ]},
    ],
    steps: commonSteps,
    highlights: item.modalItems,
  };
}

export function industryDetail(slug) {
  const item = site.industries.find((entry) => slugify(entry.name) === slug);
  if (!item) return null;
  return {
    type: 'Industry Solution', title: item.name, image: item.image, intro: item.desc,
    backHref: '/industries', backLabel: 'All Industries',
    deliveryEyebrow: `${item.name} transformation path`, deliveryTitle: `A delivery model designed for ${item.name}`,
    foundationTitle: `The digital foundation ${item.name} teams need`, ctaTitle: `Modernize ${item.name} operations with a system built for the real environment.`,
    metrics: [{ value: '360°', label: 'Operational visibility' }, { value: '1', label: 'Governed source of truth' }, { value: '24/7', label: 'Production observability' }],
    panels: [
      { id: 'landscape', label: 'Industry landscape', intro: `${item.name} organizations need systems that reflect real operational rules, data relationships, and accountability.`, blocks: [
        { title: `${item.name}: the operating reality`, text: `Teams in ${item.name} frequently operate across disconnected applications, spreadsheets, legacy databases, and manual approval chains. The result is delayed decisions, duplicated work, inconsistent records, and limited visibility across the organization.` },
        { title: `The modernization priority`, text: `For ${item.name}, the digital layer must unify information without disrupting critical operations. It must support field and office users, preserve governance, integrate with existing systems, and remain understandable to the teams who own it.` },
        { title: `Nexbash focus for ${item.name}`, text: item.desc, items: ['Operational workflow design', 'Data governance and integration', 'Role-based decision support'] },
      ]},
      { id: 'solutions', label: 'Solutions', intro: 'Nexbash combines AI, geospatial intelligence, data engineering, and application development around the highest-value workflows.', blocks: [
        { title: `${item.name} operations hub`, text: `Secure web and mobile applications give ${item.name} teams one place to manage work, records, approvals, assets, and communication.` },
        { title: `Intelligence for sector decisions`, text: 'Dashboards, predictive models, document intelligence, alerts, and rules engines reduce repetitive effort and expose the decisions that require human judgment.' },
        { title: `A connected sector data layer`, text: 'APIs, governed pipelines, spatial databases, and integration services create a reliable information layer across new and legacy systems.' },
      ]},
      { id: 'assurance', label: 'Assurance', intro: 'Mission-critical software requires more than feature delivery.', blocks: [
        { title: 'Security and access', text: 'Identity, least-privilege permissions, audit trails, encryption, and environment controls protect sensitive operational information.' },
        { title: 'Reliability and adoption', text: 'Automated testing, performance validation, observability, training, and staged rollout reduce operational risk and improve adoption.' },
        { title: 'Long-term value', text: 'Modular architecture, documentation, support, and knowledge transfer keep the platform adaptable as policy, demand, and technology change.' },
      ]},
    ],
    steps: commonSteps,
    highlights: ['Role-based platforms', 'AI and workflow automation', 'Analytics and reporting', 'Cloud and systems integration'],
  };
}

export function capabilityDetail(slug) {
  const item = site.capabilities.find((entry) => entry.id === slug);
  if (!item) return null;
  const delivers = capabilityDeliverables[item.id] || [];
  return {
    type: 'Capability Spotlight', title: item.name, image: capabilityImages[item.id], intro: item.desc,
    backHref: '/#capabilities', backLabel: 'Back to Capabilities',
    deliveryEyebrow: `${item.name} delivery system`, deliveryTitle: `How Nexbash operationalizes ${item.name}`,
    foundationTitle: `${item.name} production foundations`, ctaTitle: `Apply ${item.name} to a measurable business outcome.`,
    metrics: [{ value: '01', label: 'Outcome-led architecture' }, { value: '06', label: 'Quality gates' }, { value: '∞', label: 'Designed to evolve' }],
    panels: [
      { id: 'capability', label: 'Capability', intro: `${item.name} is delivered as an operational capability—not a disconnected proof of concept.`, blocks: [
        { title: `${item.name} solution portfolio`, text: 'Solutions are shaped around users, decisions, data, integrations, and measurable performance.', items: delivers },
        { title: `Making ${item.name} production-ready`, text: 'Architecture, security, testing, observability, documentation, and deployment are planned together from the beginning.' },
        { title: `${item.name} integration model`, text: 'New capabilities connect cleanly with existing platforms, identity systems, data sources, and team workflows.' },
      ]},
      { id: 'engineering', label: 'Engineering', intro: 'Senior engineering judgment is applied across the full lifecycle.', blocks: [
        { title: 'Architecture and data', text: 'We define service boundaries, information models, performance targets, failure modes, and ownership before scaling implementation.' },
        { title: 'Quality and security', text: 'Automated testing, code review, threat-aware design, access control, and measurable non-functional requirements protect every release.' },
        { title: 'Operations', text: 'Infrastructure automation, monitoring, incident readiness, runbooks, and support make the capability dependable after launch.' },
      ]},
      { id: 'value', label: 'Business value', intro: 'Technology choices remain tied to operational outcomes.', blocks: [
        { title: 'Efficiency', text: 'Reduce manual coordination, repeated data handling, slow reporting, and avoidable handoffs.' },
        { title: 'Decision quality', text: 'Give teams reliable information, useful context, and clear actions at the moment decisions are made.' },
        { title: 'Adaptability', text: 'Create modular foundations that support new users, data, services, and policy without replacing the whole system.' },
      ]},
    ],
    steps: commonSteps,
    highlights: delivers,
  };
}

export function projectDetail(slug) {
  const story = site.stories.find((entry) => entry.id === slug);
  const project = site.projects.find((entry) => entry.id === slug);
  if (!story && !project) return null;
  const source = story || project;
  return {
    type: source.industry || source.tag || 'Case Study', title: source.title,
    image: source.image || `/assets/project-${slug}-16x9.webp`, intro: source.description || source.desc,
    backHref: '/#projects', backLabel: 'Back to Previous Projects', duration: source.duration,
    deliveryEyebrow: `${source.title} build journey`, deliveryTitle: `Inside the delivery of ${source.title}`,
    foundationTitle: `Technology behind ${source.title}`, ctaTitle: `Build the next operational success story with Nexbash.`,
    metrics: source.metrics || (project?.stats || []).map((metric) => typeof metric === 'string' ? { value: metric, label: 'Measured result' } : metric),
    panels: [
      { id: 'case', label: 'Case study', intro: 'The engagement was structured around a measurable operational problem and a production-ready response.', blocks: [
        { title: 'The challenge', text: source.challenge || project?.desc },
        { title: 'The solution', text: source.solution || 'Nexbash designed and delivered a secure, scalable platform connecting the required workflows, data, and users.' },
      ]},
      { id: 'implementation', label: 'Implementation', intro: 'Delivery moved from discovery through architecture, iterative implementation, validation, and operational rollout.', blocks: (source.implementation || commonSteps.slice(0, 4)).map((item) => ({ title: item.title, text: item.text })) },
      { id: 'impact', label: 'Impact', intro: 'Outcomes were measured through operational performance, reliability, adoption, and decision quality.', blocks: [
        { title: 'Operational outcomes', text: (source.achievements || []).join('. ') || 'The solution reduced operational friction and created a reliable platform for continued improvement.' },
        { title: 'Durable foundation', text: 'Documentation, deployment automation, observability, and knowledge transfer prepared the platform for long-term ownership.' },
      ]},
    ],
    steps: source.implementation || commonSteps,
    stack: source.stack,
    highlights: source.achievements || [],
  };
}

export { site };
