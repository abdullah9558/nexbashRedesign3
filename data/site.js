const site = {
  studios: [
    {
      id: 'gis',
      title: 'GIS Studio',
      forText: 'Organizations managing spatial data, mapping, and location intelligence.',
      solves: 'Fragmented location data with no unified mapping layer.',
      included: ['Custom GIS platform', 'Spatial database & APIs', 'Interactive map dashboards'],
      timeline: '6–10 weeks',
      image: '/assets/studio-gis.png',
      modalDesc: 'Spatial intelligence systems for critical infrastructure, land, and operations.',
      modalItems: ['Custom GIS platforms', 'Geospatial APIs', 'Map-based dashboards'],
    },
    {
      id: 'ai-ml',
      title: 'AI & ML Lab',
      forText: 'Teams wanting automation, insight, or a smarter product.',
      solves: 'Manual work, slow decisions, generic non-custom tools.',
      included: ['Custom AI/ML model', 'Data pipeline', 'Monitoring & retraining'],
      timeline: '4–12 weeks',
      image: '/assets/studio-ai-ml.png',
      modalDesc: 'Predictive, generative, and automation solutions built for production use.',
      modalItems: ['Model design', 'Data pipelines', 'Monitoring & retraining'],
    },
    {
      id: 'web-mobile',
      title: 'Web & Mobile',
      forText: 'Companies reaching customers on web, iOS, and Android.',
      solves: 'Slow, outdated, or non-existent digital presence.',
      included: ['Responsive website / app', 'Secure backend & database', 'Hosting, domain, SSL'],
      timeline: '2–8 weeks',
      image: '/assets/studio-web-mobile.png',
      modalDesc: 'Responsive products across web, iOS, Android, and internal tools.',
      modalItems: ['Responsive design', 'Secure backend', 'Cloud deployment'],
    },
    {
      id: 'data-science',
      title: 'Data Science',
      forText: 'Growing companies juggling disconnected data sources.',
      solves: 'No single source of truth across departments.',
      included: ['Data pipelines & warehousing', 'Reporting dashboards', 'Role-based access'],
      timeline: '4–8 weeks',
      image: '/assets/studio-data-science.png',
      modalDesc: 'Analytics layers that unify and surface operational decision-making data.',
      modalItems: ['Warehousing', 'Dashboards', 'Role-based reporting'],
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      forText: 'Teams needing reliable, scalable infrastructure.',
      solves: 'Downtime, manual deploys, unpredictable cloud costs.',
      included: ['Cloud-native infrastructure', 'CI/CD pipelines', 'Monitoring & cost optimization'],
      timeline: 'Ongoing',
      image: '/assets/studio-cloud-devops.png',
      modalDesc: 'Reliable infrastructure and delivery pipelines for scaling teams.',
      modalItems: ['DevOps automation', 'Cloud architecture', 'Security hardening'],
    },
    {
      id: 'blockchain',
      title: 'Blockchain',
      forText: 'Organizations needing secure, verifiable records.',
      solves: 'Tampering risk and lack of transparent audit trails.',
      included: ['Smart contracts', 'Secure record-keeping', 'Tokenization prototypes'],
      timeline: '6–12 weeks',
      image: '/assets/studio-blockchain.png',
      modalDesc: 'Secure and auditable record systems for high-trust use cases.',
      modalItems: ['Smart contracts', 'Identity flows', 'Auditability'],
    },
    {
      id: 'design-ux',
      title: 'Design UX/UI',
      forText: 'Products that need to feel intuitive and accessible.',
      solves: 'Confusing interfaces that users abandon.',
      included: ['UX research', 'Interface design', 'Usability testing'],
      timeline: '2–6 weeks',
      image: '/assets/studio-design-ux.png',
      modalDesc: 'Elegant experiences that improve clarity, adoption, and usability.',
      modalItems: ['Research', 'Prototyping', 'Usability testing'],
    },
    {
      id: 'qa-security',
      title: 'QA & Security',
      forText: 'Teams shipping mission-critical, high-stakes software.',
      solves: 'Bugs, vulnerabilities, and unreliable releases.',
      included: ['Automated testing', 'Security audits', 'Performance testing'],
      timeline: 'Ongoing',
      image: '/assets/studio-qa-security.png',
      modalDesc: 'System reliability and resilience for mission-critical products.',
      modalItems: ['Automated testing', 'Penetration testing', 'Performance analysis'],
    },
  ],

  projects: [
    {
      id: 'geospatial',
      tag: 'GEOSPATIAL INTELLIGENCE · LIDAR PROCESSING · DIGITAL TWINS',
      title: 'Enterprise 3D Geospatial Intelligence Platform',
      desc: 'A SaaS platform eliminating data silos by integrating satellite imagery, aerial photogrammetry, and ground-sensor feeds into a single, high-performance 3D rendering pipeline for real-time situational awareness.',
      stats: [
        { value: '45%', label: 'Faster analysis cycle' },
        { value: '10GB+', label: 'Daily data processed' },
      ],
    },
    {
      id: 'healthcare-ai',
      tag: 'HEALTHCARE · MACHINE LEARNING · DIAGNOSTICS',
      title: 'AI-Enabled Early Cancer Detection Platform',
      desc: 'A clinical deep-dive into pixel-level diagnostic accuracy with real-time implementation for early-stage pulmonary nodule detection using neural networks.',
      stats: [
        { value: '98.4%', label: 'Total detection rate' },
        { value: '2.4x', label: 'Efficiency multiplier' },
      ],
    },
    {
      id: 'work-os',
      tag: 'PRODUCTIVITY · COLLABORATION · SAAS · iOS',
      title: 'The Operating System for Modern Work',
      desc: 'A comprehensive project to streamline organizational workflows by centralizing communication, task management, and file storage into a single, synchronized interface.',
      stats: [
        { value: '2.5h/day', label: 'Saved per user' },
        { value: '+40%', label: 'Sprint velocity' },
      ],
    },
    {
      id: 'fashion-ree',
      tag: 'FASHION · ECOMMERCE · SUSTAINABILITY',
      title: 'Ree: The Future of P2P Fashion',
      desc: 'A mobile-first marketplace designed to revolutionize the circular fashion economy by building trust, simplifying the listing process, and creating a social shopping experience.',
      stats: [
        { value: '64%', label: 'Sustainable, repeat usage' },
        { value: '3.2x', label: 'Inventory turnover' },
      ],
    },
    {
      id: 'market-insights',
      tag: 'GEOSPATIAL INTELLIGENCE · MARKET INSIGHTS · BUSINESS INTELLIGENCE',
      title: 'Business Intelligence & Market Insights Platform',
      desc: 'A GIS-based SaaS platform unifying fragmented business registration data and consumer behavior silos to drive smarter site selection and targeted marketing campaigns.',
      stats: [
        { value: '92%', label: 'Growth prediction accuracy' },
        { value: '4x', label: 'Optimized marketing' },
      ],
    },
    {
      id: 'smart-home',
      tag: 'INTERNET OF THINGS · ECOMMERCE · SUSTAINABILITY',
      title: 'Smart Living & Device Management Platform',
      desc: 'A unified digital experience merging smart home controls with personal health metrics, eliminating app fragmentation and enabling context-aware automation.',
      stats: [
        { value: '+45%', label: 'Higher engagement' },
        { value: '1 App', label: 'Simplified management' },
      ],
    },
    {
      id: 'digital-archive',
      tag: 'ENTERPRISE SEARCH · KNOWLEDGE MANAGEMENT · PUBLIC SECTOR',
      title: 'National Digital Archive & Information Gateway',
      desc: 'Unifying 50+ years of archived research, multimedia assets, and institutional records into a single, searchable, governed digital ecosystem.',
      stats: [
        { value: '40,000+', label: 'Documents processed' },
        { value: '~92%', label: 'Reduction in retrieval time' },
      ],
    },
    {
      id: 'property-regtech',
      tag: 'REAL ESTATE · REGULATORY TECH · AUTOMATION',
      title: 'Property Management & Regulatory Intelligence Platform',
      desc: 'A chaotic web of local bylaws turned into a single, intelligent engine — using ElasticSearch to let enterprise portfolios get NOCs automatically with instant, data-backed clarity.',
      stats: [
        { value: '10x', label: 'Regulatory speed' },
        { value: '-85%', label: 'Compliance overhead' },
      ],
    },
  ],

  packages: [
    {
      name: 'Starter',
      desc: 'For a first, credible digital presence.',
      highlight: false,
      items: ['Responsive website', 'UI/UX design', 'Hosting + domain + SSL', 'Basic analytics', 'Launch support'],
    },
    {
      name: 'Growth',
      desc: 'For businesses ready to scale.',
      highlight: true,
      badge: 'MOST POPULAR',
      items: ['Everything in Starter', 'Secure backend & database', 'Admin dashboard', 'API integrations', 'Documentation & 30-day support'],
    },
    {
      name: 'Enterprise',
      desc: 'For complex, multi-system products.',
      highlight: false,
      items: ['Everything in Growth', 'Custom architecture', 'Advanced security & compliance', 'Dedicated deployment pipeline', 'Full source code ownership'],
    },
  ],

  industries: [
    { name: 'Startups & Founders', desc: 'Launch-ready platforms, investor decks, and founder-led product systems.', image: '/assets/startupsFounders.png' },
    { name: 'Healthcare & Clinical Diagnostics', desc: 'Patient portals, diagnostics support, and secure clinical data systems.', image: '/assets/healthcare.png' },
    { name: 'Public Sector & Government', desc: 'Citizen portals, internal tools, and modernized legacy systems.', image: '/assets/government.png' },
    { name: 'Utilities & Public Works', desc: 'Asset monitoring, GIS mapping, and infrastructure management systems.', image: '/assets/utility.png' },
    { name: 'Urban Planning & Smart Cities', desc: 'Digital twins and spatial analytics for city-scale planning.', image: '/assets/urbanPlanning.png' },
    { name: 'Real Estate & Property Mgmt', desc: 'Listing platforms, CRM integrations, and property intelligence.', image: '/assets/realEstate.png' },
    { name: 'Retail & Market Intelligence', desc: 'Location intelligence and customer profiling for smarter site selection.', image: '/assets/retailMarket.png' },
    { name: 'Logistics & Supply Chain', desc: 'Fleet tracking, route optimization, and ERP integrations.', image: '/assets/logistics.png' },
    { name: 'Manufacturing & Industrial', desc: 'ERP systems and IoT dashboards for full operational visibility.', image: '/assets/manufacturing.png' },
    { name: 'Finance & Fintech', desc: 'Secure, audit-ready backends and compliance-first architecture.', image: '/assets/financial.png' },
    { name: 'Insurance', desc: 'Claims automation and risk analytics platforms.', image: '/assets/insurance.png' },
    { name: 'Education & EdTech', desc: 'LMS platforms, student portals, and content delivery systems.', image: '/assets/education.png' },
    { name: 'E-commerce & Marketplaces', desc: 'Storefronts, checkout systems, and inventory dashboards.', image: '/assets/ecommerce.png' },
    { name: 'Fashion & Circular Economy', desc: 'Marketplace platforms for resale, listing, and discovery.', image: '/assets/fashion.png' },
    { name: 'Hospitality & Travel', desc: 'Booking engines and guest management applications.', image: '/assets/hospitality.png' },
    { name: 'Media & Entertainment', desc: 'Streaming platforms and content management systems.', image: '/assets/media.png' },
    { name: 'Non-Profits & NGOs', desc: 'Donor portals, campaign sites, and reporting dashboards.', image: '/assets/ngo.png' },
    { name: 'Telecommunications', desc: 'Network monitoring dashboards and customer service platforms.', image: '/assets/telecom.png' },
    { name: 'Energy & Oil / Gas', desc: 'Asset monitoring and geospatial analytics for field operations.', image: '/assets/energyOil.png' },
    { name: 'Agriculture & AgTech', desc: 'Crop monitoring, satellite imagery, and yield prediction tools.', image: '/assets/agriculture.png' },
    { name: 'Environmental Monitoring', desc: 'Remote sensing and environmental data analytics platforms.', image: '/assets/environmentalMonitoring.png' },
    { name: 'Disaster & Emergency Mgmt', desc: 'Real-time situational awareness and response coordination tools.', image: '/assets/disaster.png' },
    { name: 'Defense & Homeland Security', desc: 'Secure geospatial intelligence and mission-critical systems.', image: '/assets/defense.png' },
    { name: 'Drone & UAV Programs', desc: 'Aerial data processing and imagery analysis pipelines.', image: '/assets/drone.png' },
    { name: 'Land Registration & Cadastral', desc: 'Digitized land records and automated regulatory workflows.', image: '/assets/land.png' },
    { name: 'Transportation & Fleet Mgmt', desc: 'Real-time tracking and route optimization systems.', image: '/assets/transportation.png' },
    { name: 'Smart Home & IoT', desc: 'Connected device management and automation platforms.', image: '/assets/smartHome.png' },
    { name: 'Legal & RegTech', desc: 'Compliance automation and document intelligence systems.', image: '/assets/legal.png' },
    { name: 'Knowledge Mgmt & Archives', desc: 'Searchable digital archives and unified metadata systems.', image: '/assets/knowledge.png' },
    { name: 'Research Institutions', desc: 'Data platforms for large-scale research collaboration.', image: '/assets/research.png' },
    { name: 'Construction & AEC', desc: 'Project tracking and BIM-integrated dashboards.', image: '/assets/construction.png' },
    { name: 'Mining & Natural Resources', desc: 'Resource mapping and operational monitoring systems.', image: '/assets/mining.png' },
    { name: 'AI-Driven Enterprises', desc: 'Custom ML models, automation pipelines.', image: '/assets/ai.png' },
    { name: 'SaaS Companies', desc: 'Multi-tenant platforms, admin consoles, billing systems.', image: '/assets/saas.png' },
    { name: 'Agencies & Consultancies', desc: 'White-label dev partnerships, scalable delivery.', image: '/assets/agencies.png' },
    { name: 'Enterprises & Corporates', desc: 'Custom architecture, legacy system modernization.', image: '/assets/tech.png' },
  ],

  capabilities: [
    { id: 'ai-ml', name: 'AI & Machine Learning', desc: 'Computer vision, NLP, and predictive analytics pipelines that automate decisions.', tag: '4–12 weeks' },
    { id: 'geospatial', name: 'Geospatial Systems', desc: 'Mapping, spatial analysis, and location intelligence on Esri and open-source stacks.', tag: '6–10 weeks' },
    { id: 'data-science', name: 'Data Science & Analytics', desc: 'Pipelines and dashboards that turn raw data into monitored, reportable performance.', tag: '4–8 weeks' },
    { id: 'blockchain', name: 'Blockchain & Crypto', desc: 'Secure record-keeping, traceability, smart contracts, and tokenization prototypes.', tag: '6–12 weeks' },
    { id: 'web-mobile', name: 'Web & Mobile Engineering', desc: 'Enterprise-grade responsive web, native iOS/Android, and cross-platform apps.', tag: '2–8 weeks' },
    { id: 'design-ux', name: 'Design UX/UI', desc: 'Research, interface design, and usability testing for intuitive enterprise products.', tag: '2–6 weeks' },
    { id: 'qa', name: 'Quality Assurance', desc: 'Reliability, performance, and security testing integrated into every release cycle.', tag: 'Ongoing' },
    { id: 'devops-cloud', name: 'DevOps & Cloud', desc: 'Cloud-native infrastructure for reliable, scalable, cost-efficient deployments.', tag: 'Ongoing' },
  ],

  stories: [
    {
      id: 'geospatial',
      tag: 'Utilities · Public Works · Urban Planning',
      title: 'Enterprise 3D Geospatial Intelligence Platform',
      description: 'A SaaS platform eliminating data silos by integrating satellite imagery, aerial photogrammetry, and ground-sensor feeds into a single, high-performance 3D rendering pipeline for real-time situational awareness.',
      image: '/assets/project-geospatial.png',
      industry: 'Utilities · Public Works · Urban Planning',
      duration: '14 months (ongoing) · 8-12 engineers and data scientists',
      metrics: [
        {
          value: '45%',
          label: 'Faster Analysis Time'
        },
        {
          value: '99.9%',
          label: 'System Uptime'
        },
        {
          value: '10TB+',
          label: 'Daily Data Processing'
        }
      ],
      challenge: 'Legacy systems created data silos preventing real-time decision making. Teams operated with disconnected tools across satellite imagery, aerial surveys, and ground sensors. This fragmentation resulted in delayed analysis, missed insights, and inability to coordinate emergency response or infrastructure planning across departments.',
      solution: 'We built a unified 3D geospatial platform integrating multi-source sensor data into a high-performance rendering pipeline. The system combines satellite imagery, aerial photogrammetry, and IoT ground sensors into coherent 3D models. Real-time processing engines enable instant analysis and cross-departmental coordination with sub-second query response times.',
      implementation: [
        {
          title: 'Multi-Source Data Integration',
          text: 'Standardized and ingested satellite, photogrammetry, and sensor data'
        },
        {
          title: '3D Rendering Pipeline',
          text: 'Built high-performance WebGL/Three.js rendering for 100TB+ datasets'
        },
        {
          title: 'Real-Time Query Engine',
          text: 'Implemented spatial indexing for sub-second analysis queries'
        },
        {
          title: 'Cross-Department Portal',
          text: 'Deployed collaborative interface for unified situational awareness'
        }
      ],
      stack: {
        'Tools & Languages': [
          'Three.js',
          'PostGIS',
          'Python',
          'GDAL',
          'Mapbox GL'
        ],
        Frameworks: [
          'Express.js',
          'WebGL',
          'OpenGL'
        ],
        'Backend Services': [
          'Node.js',
          'PostgreSQL',
          'Elasticsearch',
          'Redis'
        ],
        Infrastructure: [
          'AWS',
          'S3',
          'CloudFront',
          'GPU Acceleration'
        ]
      },
      achievements: [
        'Integrated satellite, photogrammetry, and sensor data in single platform',
        'Achieved 45% faster analysis time vs legacy systems',
        'Maintained 99.9% uptime processing 10TB+ daily data',
        'Enabled real-time coordination across 5+ departments'
      ]
    },
    {
      id: 'market-insights',
      tag: 'Business Intelligence · Retail · Marketing Technology',
      title: 'Business Intelligence & Market Insights Platform',
      description: 'A GIS-Based SaaS platform unifying fragmented business registration data and consumer behavior silos to drive smarter site selection and targeted marketing campaigns.',
      image: '/assets/project-market-insights.png',
      industry: 'Business Intelligence · Retail · Marketing Technology',
      duration: '28 months (Ongoing) · 6-10 engineers, data specialists, and product designers',
      metrics: [
        {
          value: '-60%',
          label: 'Reduced Analytics Reliance'
        },
        {
          value: '92%',
          label: 'Growth Prediction Accuracy'
        },
        {
          value: '4x',
          label: 'Optimized Marketing'
        }
      ],
      challenge: 'Enterprises and retail chains often struggle with vast amounts of siloed customer data that lacks spatial context. Without the ability to visualize where customers are actually located relative to store locations, businesses face an inability to plan targeted marketing or optimize expansion strategies. This disconnect results in wasted ad spend and missed opportunities in high-potential geographic clusters.',
      solution: 'We engineered a comprehensive GIS-driven visualization platform that ingests CRM data to generate real-time insights. By utilizing AI-based customer profiling, the system identifies high-value retail clusters. Furthermore, it features integrated Meta and Google ad management, allowing marketers to instantly push geo-fenced campaigns to specific high-performing zones directly from the map interface.',
      implementation: [
        {
          title: 'Data Integration & Normalization',
          text: 'Unified CRM, geo-location, and transaction data across 50+ retail chains'
        },
        {
          title: 'GIS Visualization Layer',
          text: 'Built interactive map interface with Mapbox for real-time cluster analysis'
        },
        {
          title: 'AI Customer Profiling',
          text: 'Implemented ML models for predictive customer segmentation'
        },
        {
          title: 'Ad Campaign Integration',
          text: 'Connected Meta and Google APIs for geo-fenced campaign deployment'
        }
      ],
      stack: {
        'Tools & Languages': [
          'React',
          'TypeScript',
          'PostGIS',
          'Python'
        ],
        Frameworks: [
          'Express.js',
          'GraphQL',
          'Mapbox'
        ],
        'Backend Services': [
          'Node.js',
          'PostgreSQL',
          'Redis'
        ],
        Infrastructure: [
          'AWS',
          'Docker',
          'S3'
        ]
      },
      achievements: [
        'Unified data from 50+ retail locations into single GIS interface',
        'Achieved 92% accuracy in growth prediction models',
        'Reduced marketing spend waste by 60%',
        'Enabled 10x faster site selection analysis'
      ]
    },
    {
      id: 'smart-home',
      tag: 'Smart Home · IoT · Consumer Application',
      title: 'Smart Living & Device Management Platform',
      description: 'A unified digital experience merging smart home controls with personal health metrics, eliminating app fragmentation and enabling context-aware automation.',
      image: '/assets/project-smart-home.png',
      industry: 'Smart Home · IoT · Consumer Application',
      duration: 'Ongoing product development · Mobile, backend, and IoT integration teams',
      metrics: [
        {
          value: '1 App',
          label: 'Simplified Management'
        },
        {
          value: '+45%',
          label: 'Higher Engagement'
        },
        {
          value: 'Sync',
          label: 'Seamless Health Integration'
        }
      ],
      challenge: 'Users needed a single, reliable mobile application to manage and monitor multiple smart home devices while also viewing selected personal health metrics. Existing solutions were fragmented, requiring separate apps for device control and data visibility.',
      solution: 'Delivered an iOS-based smart living platform that acts as a central hub for controlling connected devices such as lights, sensors, and appliances. Integrated device management with automation and status monitoring to simplify everyday smart home interactions. Enabled HealthKit integration to sync supported body metrics, allowing users to view selected health data alongside their smart living controls.',
      implementation: [
        {
          title: 'Device Ecosystem Mapping',
          text: 'Catalogued 50+ IoT device manufacturers and standardized communication protocols'
        },
        {
          title: 'HomeKit Integration',
          text: 'Implemented Apple HomeKit framework for secure device pairing and control'
        },
        {
          title: 'HealthKit Synchronization',
          text: 'Built bidirectional sync with HealthKit for 15+ health data types'
        },
        {
          title: 'Context-Aware Automation',
          text: 'Created intelligent automation rules based on device state and health metrics'
        }
      ],
      stack: {
        'Tools & Languages': [
          'Swift',
          'HomeKit',
          'HealthKit'
        ],
        Frameworks: [
          'iOS SDK',
          'Combine',
          'SwiftUI'
        ],
        Infrastructure: [
          'AWS IoT Core',
          'Firebase',
          'CloudKit'
        ]
      },
      achievements: [
        'Unified 50+ IoT device manufacturers into single interface',
        'Achieved 99.9% uptime for critical device control systems',
        'Integrated HealthKit with 15+ health data types seamlessly',
        'Reduced app context switching by 87% for users'
      ]
    },
    {
      id: 'digital-archive',
      tag: 'Knowledge Management · Public Sector · Research Institutions',
      title: 'National Digital Archive & Information Gateway',
      description: 'Unifying 50+ years of archived research, multimedia assets, and institutional records into a single, searchable, governed digital ecosystem.',
      image: '/assets/project-digital-archive.png',
      industry: 'Knowledge Management · Public Sector · Research Institutions',
      duration: '09 months · 4-6 engineers and product specialists',
      metrics: [
        {
          value: '40,000+',
          label: 'Documents Processed'
        },
        {
          value: '~92%',
          label: 'Reduction in Retrieval Time'
        }
      ],
      challenge: 'Government records were deteriorating in obsolete physical formats. Departments operated in isolation with distinct metadata standards, making cross-agency data sharing impossible. The lack of a unified digital strategy meant critical historical footage and legislative documents were inaccessible to the public and internal researchers alike, creating a "dark archive" of unsearchable assets.',
      solution: 'We engineered a cloud-native Centralized Portal powered by a robust search engine. The solution introduces a governed publishing workflow that enforces metadata standards upon ingestion. By utilizing automated tagging and optical character recognition (OCR), we transformed static files into searchable, interconnected knowledge assets. Dublin Core metadata standardization ensures consistency across all media types.',
      implementation: [
        {
          title: 'Legacy System Assessment',
          text: 'Analyzed 50+ years of physical and digital records across 15 agencies'
        },
        {
          title: 'Metadata Standardization',
          text: 'Implemented Dublin Core standards for unified metadata across all asset types'
        },
        {
          title: 'Automated OCR & Tagging',
          text: 'Processed 40,000+ documents with Apache Tesseract and AI-based tagging'
        },
        {
          title: 'Search & Discovery Layer',
          text: 'Deployed Elasticsearch with full-text indexing for sub-300ms query response'
        }
      ],
      stack: {
        'Tools & Languages': [
          'Elasticsearch',
          'Apache Tesseract',
          'Python',
          'React'
        ],
        'Backend Services': [
          'PostgreSQL',
          'Cloud Backend',
          'Node.js'
        ],
        Infrastructure: [
          'AWS',
          'Docker',
          'S3 Object Storage',
          'CloudFront',
          'Data Standards',
          'Dublin Core',
          'DICOM v3.0',
          'H.7 FHIR R4'
        ]
      },
      achievements: [
        'Successfully digitized 50+ years of government records',
        'Achieved 92% reduction in document retrieval time',
        'Enabled cross-agency data sharing for first time',
        'Made 40,000+ documents publicly accessible via unified portal'
      ]
    },
    {
      id: 'property-regtech',
      tag: 'Real Estate · Property Management · Public Sector Compliance',
      title: 'Property Management & Regulatory Intelligence Platform',
      description: 'We took a chaotic web of local bylaws and turned them into a single, intelligent engine. By using ElasticSearch, we have made it possible for enterprise portfolios to get NOCs automatically with instant data-backed clarity.',
      image: '/assets/project-property-regtech.png',
      industry: 'Real Estate · Property Management · Public Sector Compliance',
      duration: '10 months · 5-7 engineers and domain specialists',
      metrics: [
        {
          value: '10X',
          label: 'Regulatory Speed'
        },
        {
          value: '99.9%',
          label: 'Due Diligence Accuracy'
        },
        {
          value: '-85%',
          label: 'Compliance Overhead'
        }
      ],
      challenge: 'Property managers and stakeholders struggled to manage property records while complying with complex, location-specific government regulations, NOCs, and legislation. Regulatory data was fragmented across departments, making verification, reporting, and due diligence slow and error-prone.',
      solution: 'Delivered a property management platform that centralizes property records and integrates regulatory and legislative data into a unified system. Implemented ElasticSearch-powered indexing to enable fast retrieval of property details, government approvals, and compliance status. Built configurable reporting workflows that generate detailed, location-aware property reports aligned with local authority rules and NOC requirements.',
      implementation: [
        {
          title: 'Regulatory Data Consolidation',
          text: 'Aggregated bylaws, NOC requirements, and legislation from 50+ local jurisdictions'
        },
        {
          title: 'Elasticsearch Implementation',
          text: 'Built sub-second search index for 100,000+ regulatory documents'
        },
        {
          title: 'Property Record Management',
          text: 'Centralized property data with automated compliance status updates'
        },
        {
          title: 'Automated Report Generation',
          text: 'Created configurable workflows for location-aware compliance reports'
        }
      ],
      stack: {
        'Tools & Languages': [
          'React',
          'Tailwind CSS',
          'TypeScript',
          'Mapbox'
        ],
        Frameworks: [
          'Express.js',
          'Redux'
        ],
        'Backend Services': [
          'Elastic Search',
          'PostgreSQL',
          'Node.js'
        ],
        Infrastructure: [
          'AWS',
          'Docker',
          'RDS'
        ]
      },
      achievements: [
        'Consolidated 50+ jurisdiction regulatory databases',
        'Achieved 10x faster regulatory verification process',
        'Reduced compliance overhead by 85% through automation',
        'Maintained 99.9% accuracy in due diligence assessments'
      ]
    },
    {
      id: 'fashion-ree',
      tag: 'E-commerce · Fashion · Mobile Marketplaces',
      title: 'Ree: The Future of P2P Fashion',
      description: 'A mobile-first marketplace designed to revolutionize the circular fashion economy by building trust, simplifying the listing process, and creating a social shopping experience.',
      image: '/assets/project-fashion-ree.png',
      industry: 'E-commerce · Fashion · Mobile Marketplaces',
      duration: 'Ongoing releases · Mobile and backend development team',
      metrics: [
        {
          value: '64%',
          label: 'Sustainable, Repeat Usage'
        },
        {
          value: '3.2x',
          label: 'Inventory Turnover'
        },
        {
          value: '99.9%',
          label: 'Uptime Guaranteed'
        }
      ],
      challenge: 'Peer-to-peer fashion discovery is traditionally plagued by clutter and lack of trust. Users struggle to find quality items amidst thousands of poor-quality listings, while sellers face high drop-off rates due to complex listing processes. Existing platforms suffer from significant transaction friction and low user retention, making "the hunt" for vintage items more frustrating than rewarding.',
      solution: 'We implemented a refined item listing workflow that guides sellers through structured data entry, enabling powerful filtering algorithms on the backend. The solution introduces a "Smart Feed" that learns from user interactions to present relevant items, coupled with a secure messaging system that builds trust between buyer and seller before the transaction occurs.',
      implementation: [
        {
          title: 'Seller Onboarding Simplification',
          text: 'Built guided workflow reducing listing time from 15 minutes to 3 minutes'
        },
        {
          title: 'Smart Feed Development',
          text: 'Implemented ML-based recommendation engine using collaborative filtering'
        },
        {
          title: 'Trust & Messaging System',
          text: 'Created secure messaging and dispute resolution mechanisms'
        },
        {
          title: 'Payment & Escrow',
          text: 'Integrated Stripe for secure escrow-based transactions'
        }
      ],
      stack: {
        'Tools & Languages': [
          'React Native',
          'TypeScript',
          'Stripe API'
        ],
        Frameworks: [
          'Redux',
          'Express.js'
        ],
        'Backend Services': [
          'Node.js',
          'PostgreSQL',
          'Firebase'
        ],
        Infrastructure: [
          'AWS',
          'Docker',
          'CDN'
        ]
      },
      achievements: [
        'Reduced seller listing time by 80% through guided workflow',
        'Achieved 3.2x faster inventory turnover',
        'Maintained 64% sustainable repeat usage rate',
        'Processed $150M+ in transaction volume annually'
      ]
    },
    {
      id: 'work-os',
      tag: 'Productivity · Team Collaboration · SaaS',
      title: 'The Operating System for Modern Work',
      description: 'A comprehensive project to streamline organizational workflows by centralizing communication, task management, and file storage into a single, synchronized interface.',
      image: '/assets/project-work-os.png',
      industry: 'Productivity · Team Collaboration · SaaS',
      duration: '18 Months · Cross-functional product and engineering team',
      metrics: [
        {
          value: '2.5h/day',
          label: 'Saved per User on Team'
        },
        {
          value: '+40%',
          label: 'Sprint Velocity'
        },
        {
          value: '99.9%',
          label: 'Uptime Guaranteed'
        }
      ],
      challenge: 'Modern distributed teams face significant friction due to disconnected toolchains. Information is fragmented across email, instant messaging apps, and separate task management boards. This "tool fatigue" results in constant context switching, lost data, and a 25% decrease in overall operational efficiency as teams struggle to maintain a single source of truth for their projects.',
      solution: 'Flow introduces a unified workspace that bridges the gap between communication and execution. By embedding chat directly within task contexts and file repositories, we eliminated silos. The platform leverages a high-performance sync engine to ensure every stakeholder sees the same state, instantly. Intelligent assignment and automated status updates based on activity reduce manual overhead.',
      implementation: [
        {
          title: 'Workflow Analysis & Design',
          text: 'Studied 50+ teams to understand communication and task patterns'
        },
        {
          title: 'Core Platform Development',
          text: 'Built unified workspace with embedded chat and task context'
        },
        {
          title: 'Real-Time Sync Engine',
          text: 'Implemented WebSocket-based synchronization for instant updates'
        },
        {
          title: 'AI-Powered Automation',
          text: 'Added intelligent task assignment and status auto-updates'
        }
      ],
      stack: {
        'Tools & Languages': [
          'React',
          'TypeScript',
          'WebSocket'
        ],
        Frameworks: [
          'Express.js',
          'Socket.io',
          'GraphQL'
        ],
        'Backend Services': [
          'Node.js',
          'PostgreSQL',
          'Redis'
        ],
        Infrastructure: [
          'AWS',
          'Kubernetes',
          'CloudFront'
        ]
      },
      achievements: [
        'Reduced context switching by 87% for average user',
        'Saved 2.5 hours per day per team member',
        'Increased sprint velocity by 40% across teams',
        'Maintained 99.9% uptime with <100ms sync latency'
      ]
    },
    {
      id: 'healthcare-ai',
      tag: 'Healthcare · Clinical Diagnostics',
      title: 'AI-Enabled Early Cancer Detection Platform',
      description: 'A clinical deep-dive into pixel-level diagnostic accuracy & real-time implementation for early-stage pulmonary nodule detection using neural networks.',
      image: '/assets/project-healthcare-ai.png',
      industry: 'Healthcare · Clinical Diagnostics',
      duration: '12 months · 6-10 specialists',
      metrics: [
        {
          value: '98.4%',
          label: 'Total Detection Rate'
        },
        {
          value: '2.4x',
          label: 'Efficiency Multiplier'
        },
        {
          value: '-15%',
          label: 'Operational Cost Reduction'
        }
      ],
      challenge: 'Early-stage oncology diagnostics face a critical bottleneck: the manual review of thousands of high-resolution DICOM slices. Radiologists are under increasing pressure, leading to fatigue-induced oversights in identifying anomalies smaller than 3mm. Current manual screening methods exhibit a baseline accuracy of 82.1%, with a significant 12.5% false positive rate that leads to unnecessary invasive biopsies.',
      solution: 'We implemented a multi-stage Deep Convolutional Neural Network (DCNN) architecture specifically optimized for pixel-level anomaly detection in volumetric medical data. The system utilizes a custom feature pyramid network (FPN) to maintain spatial awareness across different zoom levels, ensuring that even sub-millimeter nodules are identified with high confidence. Direct DICOM integration with hospital PACS systems eliminates conversion loss.',
      implementation: [
        {
          title: 'Clinical Dataset Curation',
          text: 'Assembled 10,000+ annotated DICOM scans from 20+ medical institutions'
        },
        {
          title: 'DCNN Architecture Development',
          text: 'Designed and trained multi-stage network with custom FPN module'
        },
        {
          title: 'Validation & Clinical Trials',
          text: 'Conducted rigorous validation against radiologist benchmark'
        },
        {
          title: 'PACS Integration',
          text: 'Direct integration with hospital systems for seamless workflow'
        }
      ],
      stack: {
        'Tools & Languages': [
          'OpenCV',
          'NumPy',
          'Scikit-learn'
        ],
        Frameworks: [
          'PyTorch 2.0',
          'FastAPI',
          'CUDA 11.8',
          'TensorFlow'
        ],
        Infrastructure: [
          'Python',
          'AWS HealthLake',
          'Docker',
          'GPU Acceleration',
          'Data Standards',
          'DICOM v3.0',
          'HL7 FHIR R4'
        ]
      },
      achievements: [
        'Achieved 98.4% detection rate vs 82.1% baseline',
        'Reduced false positive rate from 12.5% to 3.2%',
        'Enabled sub-15ms inference on GPU',
        'FDA-cleared for clinical use in 12 institutions'
      ]
    },
    {
      id: 'cyber-punk',
      tag: 'Web3 · Cryptocurrency · Fintech · Gaming',
      title: 'Cyber Punk Wallet',
      description: 'A next-generation Web3 wallet redesigned for the gaming-native crypto community, combining decentralized asset management with gamified rewards and social trading features.',
      image: '/assets/story-cyber-punk.webp',
      industry: 'Web3 · Cryptocurrency · Fintech · Gaming',
      duration: 'Ongoing expansion · Mobile, blockchain, and backend teams',
      metrics: [
        {
          value: '87%',
          label: 'Active Daily Users'
        },
        {
          value: '42M',
          label: 'Daily Transaction Volume'
        },
        {
          value: '9.2%',
          label: 'Average Yield Generated'
        }
      ],
      challenge: 'Traditional crypto wallets suffer from steep learning curves and complex UX that alienates gaming and younger audiences. Users struggle with asset fragmentation across multiple wallets, lack transparent trading mechanisms, and miss opportunities for yield optimization. Current solutions fail to combine security with social engagement and rewards mechanisms.',
      solution: 'We engineered a Web3 wallet with a futuristic cyberpunk aesthetic that democratizes crypto management for gaming communities. The platform features instant multi-chain asset aggregation with real-time portfolio analytics, integrated DEX routing for optimal swap execution, and a social leaderboard system that gamifies yield farming and trading. Smart contract automation enables non-custodial staking rewards without manual claiming.',
      implementation: [
        {
          title: 'Gaming Community Research',
          text: 'Conducted UX research with 2,000+ gaming and crypto users'
        },
        {
          title: 'Multi-Chain Integration',
          text: 'Implemented support for Ethereum, Polygon, and Arbitrum chains'
        },
        {
          title: 'DEX Routing Optimization',
          text: 'Built smart routing engine for optimal token swaps'
        },
        {
          title: 'Gamification & Social Layer',
          text: 'Created leaderboards and social trading features'
        }
      ],
      stack: {
        'Tools & Languages': [
          'React Native',
          'Web3.js',
          'Ethers.js',
          'TypeScript'
        ],
        Frameworks: [
          'Redux',
          'GraphQL',
          'Express.js'
        ],
        'Backend Services': [
          'Node.js',
          'Solidity',
          'Hardhat'
        ],
        Infrastructure: [
          'AWS',
          'IPFS',
          'Infura API'
        ]
      },
      achievements: [
        'Achieved 87% daily active user rate (industry benchmark: 25%)',
        'Processed $42M+ daily transaction volume',
        'Generated 9.2% average yield for users',
        'Onboarded 500,000+ users from gaming communities'
      ]
    },
    {
      id: 'authentic-voices',
      tag: 'Web3 · Social Media · Creator Economy · Fintech',
      title: 'Authentic Voices: AI-Powered Creator Network',
      description: 'A Web3-native social media platform where every moment goes live with AI-assisted content discovery, blockchain-backed creator monetization, and decentralized content ownership.',
      image: '/assets/story-authentic-voices.webp',
      industry: 'Web3 · Social Media · Creator Economy · Fintech',
      duration: '16 Months · AI, mobile, blockchain, and community teams',
      metrics: [
        {
          value: '2.3M',
          label: 'Active Creators Onboarded'
        },
        {
          value: '$47M',
          label: 'Creator Earnings Generated'
        },
        {
          value: '78%',
          label: 'Content Ownership Retention'
        }
      ],
      challenge: 'Traditional social media platforms extract value from creators while offering limited monetization and no content ownership rights. Content discovery algorithms perpetuate echo chambers, authentic moments are buried in algorithmic feeds, and creators lack direct economic incentives. Users struggle to build authentic communities while platforms control data and engagement metrics.',
      solution: 'We built a Web3 social platform with AI-powered content recommendation that prioritizes authentic engagement over engagement maximization. Creators earn through tokenized rewards, direct fan support, and retained copyright ownership via NFT-backed content anchored on-chain. An AI assistant selection mechanism matches creators with niche audiences using sophisticated sentiment and content quality analysis, ensuring discovery surfaces meaningful moments rather than algorithmic noise.',
      implementation: [
        {
          title: 'Creator Research & Interviews',
          text: 'Conducted 200+ interviews with creators across platforms'
        },
        {
          title: 'AI Discovery Engine',
          text: 'Developed NLP-based sentiment and content quality analysis'
        },
        {
          title: 'Blockchain Integration',
          text: 'Implemented NFT-backed content ownership on Polygon'
        },
        {
          title: 'Monetization & Rewards',
          text: 'Built tokenized rewards and direct fan support mechanisms'
        }
      ],
      stack: {
        'Tools & Languages': [
          'React',
          'Next.js',
          'TypeScript',
          'TensorFlow.js'
        ],
        Frameworks: [
          'Express.js',
          'GraphQL',
          'Hardhat'
        ],
        'Backend Services': [
          'Node.js',
          'PostgreSQL',
          'Web3.py'
        ],
        Infrastructure: [
          'AWS',
          'IPFS',
          'Arweave',
          'Polygon'
        ]
      },
      achievements: [
        'Onboarded 2.3M creators with 78% content ownership retention',
        'Generated $47M+ in direct creator earnings',
        'Reduced algorithmic echo chamber effect by 65%',
        'Achieved 40% higher authentic engagement vs competitors'
      ]
    },
    {
      id: 'ai-music',
      tag: 'Music Technology · Audio AI · Creator Economy',
      title: 'AI Music Revolution Platform',
      description: 'A cutting-edge music creation platform powered by generative AI, enabling musicians to compose songs, create AI covers with diverse voice models, and collaborate in real-time with intelligent voice synthesis.',
      image: '/assets/story-ai-music.webp',
      industry: 'Music Technology · Audio AI · Creator Economy',
      duration: '14 Months · AI/ML, audio engineering, and product teams',
      metrics: [
        {
          value: '1.8M',
          label: 'Songs Generated'
        },
        {
          value: '52K',
          label: 'AI Cover Creations/Month'
        },
        {
          value: '94%',
          label: 'Quality Satisfaction Rating'
        }
      ],
      challenge: 'Music production traditionally requires expensive equipment, years of training, and access to professional studios. Emerging artists face prohibitive costs, lack of voice talent access, and complex workflows that slow creative iteration. Cover creation requires expensive session musicians, and cross-language music distribution remains fragmented and inaccessible to independent creators.',
      solution: 'We engineered a generative AI music platform that democratizes production by combining natural language song description generation with state-of-the-art voice synthesis models. The system features an intelligent voice library with multi-language support and artist-licensed voice clones, enabling creators to generate AI covers instantly. Real-time collaborative workspace allows multiple artists to iterate on compositions, with advanced prompt engineering guiding AI generation toward specific emotional and sonic profiles.',
      implementation: [
        {
          title: 'Music AI Model Training',
          text: 'Trained generative models on 1M+ songs from diverse genres'
        },
        {
          title: 'Voice Synthesis Engine',
          text: 'Implemented multi-language voice synthesis with artist licensing'
        },
        {
          title: 'Natural Language Interface',
          text: 'Built prompt engineering system for precise music generation'
        },
        {
          title: 'Collaborative Workspace',
          text: 'Developed real-time collaboration features for multiple artists'
        }
      ],
      stack: {
        'Tools & Languages': [
          'TensorFlow',
          'PyTorch',
          'Librosa',
          'React'
        ],
        Frameworks: [
          'FastAPI',
          'GraphQL',
          'WebSocket'
        ],
        'Backend Services': [
          'Node.js',
          'PostgreSQL',
          'Redis'
        ],
        Infrastructure: [
          'AWS',
          'GPU Acceleration',
          'Docker'
        ]
      },
      achievements: [
        'Generated 1.8M+ songs with 94% user satisfaction',
        'Created 52K+ AI covers monthly',
        'Supported 50+ languages and musical genres',
        'Reduced music production time from weeks to hours'
      ]
    }
  ],

  process: [
    { step: 1, name: 'Discovery', tip: 'We learn your goals, users, constraints, and technical landscape through focused workshops and stakeholder interviews. This builds a shared understanding of the problem before any solution is proposed.' },
    { step: 2, name: 'Planning', tip: 'We define scope, milestones, architecture, and deliverables in a clear roadmap everyone can align on. You know exactly what will be built, when, and what success looks like.' },
    { step: 3, name: 'Design', tip: 'We create wireframes, prototypes, and visual systems that prioritize usability for the people who will use the product daily. Designs are validated early so development moves forward with confidence.' },
    { step: 4, name: 'Development', tip: 'Our engineers build in structured sprints with regular demos and transparent progress tracking. Every feature is developed for production — secure, scalable, and ready for real-world operations.' },
    { step: 5, name: 'Testing', tip: 'We run automated tests, security checks, and performance validation before anything goes live. Issues are caught and resolved while they are still inexpensive to fix.' },
    { step: 6, name: 'Launch', tip: 'We handle deployment, migration, documentation, and team handover so go-live is smooth and controlled. Your team is ready to operate the system confidently from day one.' },
    { step: 7, name: 'Support', tip: 'Post-launch support covers bug fixes, optimizations, and iterative improvements as usage grows. We stay engaged to ensure the system continues delivering long-term operational value.' },
  ],

  faq: [
    {
      q: 'What exactly is included in the price?',
      a: 'Every deliverable is listed upfront — design, backend, hosting, domain, SSL, documentation, and support — so there are no hidden extras.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'Depends on scope: a website takes 2–4 weeks, larger systems like GIS or AI solutions take 4–16 weeks.',
    },
    {
      q: 'Do I own the source code?',
      a: 'Yes. Source code, documentation, and credentials are handed over as part of delivery.',
    },
    {
      q: 'What happens after launch?',
      a: 'Every package includes a support window, and ongoing support plans are available for continued updates.',
    },
  ],

  partners: [
    { src: '/assets/esri.png', alt: 'Esri' },
    { src: '/assets/AWS.png', alt: 'AWS' },
    { src: '/assets/Azure.png', alt: 'Microsoft Azure' },
    { src: '/assets/Google_Cloud.png', alt: 'Google Cloud' },
    { src: '/assets/VS.png', alt: "Victoria's Secret" },
    { src: '/assets/tuya.png', alt: 'Flow' },
    { src: '/assets/REE-Logo.svg', alt: 'Ree' },
    { src: '/assets/testbox.avif', alt: 'TESTBOX' },
    { src: '/assets/stigmi.png', alt: 'Stigmi Learning' },
    { src: '/assets/cohere.svg', alt: 'cohere health' },
    { src: '/assets/sarc.svg', alt: 'SARC MediQ' },
    { src: '/assets/epic.png', alt: 'Epic' },
    { src: '/assets/safespace.png', alt: 'SafePace.ca' },
    { src: '/assets/freenome.svg', alt: 'Freenome' },
    { src: '/assets/anomalo.svg', alt: 'Anomalo' },
    { src: '/assets/access.webp', alt: 'AccessHealthcare' },
  ],

  heroBar: [
    { num: '01', title: 'Build for real environments', text: 'Our mission is to support how organizations actually function within regulatory, technical, and operational constraints.' },
    { num: '02', title: 'Value that can be measured', text: 'We focus on outcomes that matter to the business, with intelligence tied directly to performance, efficiency, and decision-making.' },
    { num: '03', title: 'Create Impact that lasts', text: 'We seek to create systems that continue to deliver value over time through stability, knowledge continuity, and long-term support.' },
    { num: '04', title: 'From pilots to operations', text: 'We aim to move AI and geospatial capabilities out of pilot phases and into dependable, production-ready use.' },
  ],
};

export default site;
