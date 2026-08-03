'use client';

import { useEffect, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

const menus = [
  {
    label: 'What We Do',
    items: [
      ['GIS Services', ['Web Mapping', 'GIS Automation', 'Geospatial Analysis', 'GIS Software Development']],
      ['Custom Software', ['Frontend', 'Backend', 'Databases', 'API Development']],
      ['Mobile Development', ['iOS Development', 'Android Development', 'Hybrid App Development']],
      ['Offshore Teams', ['Dedicated Teams', 'Team Augmentation', 'Consultation', 'Software Development']],
      ['Web Services', ['Websites', 'Web Applications', 'Frontend & Backend', 'Web GIS Development']],
      ['UI & UX Design', ['Web Design', 'Branding', 'User Experience', 'Interface Design']],
    ],
  },
  {
    label: 'Who We Help',
    items: [
      ['Metaverse', ['Point Clouds', '3D Meshes', 'Virtual Reality', 'LiDAR']],
      ['Agriculture', ['Precision Agriculture', 'Crop Simulation', 'Remote Sensing', 'Yield Forecasting']],
      ['Telecommunication', ['FTTH', 'FTTX', 'Capacity Management', 'Demand Forecasting']],
      ['Real Estate', ['3D Modeling', 'Land Records', 'Market Analysis', 'Property Platforms']],
      ['Healthcare', ['EMR / EHR', 'Patient Portals', 'Data Analytics', 'Remote Diagnostics']],
    ],
  },
  {
    label: 'How We Deliver',
    items: [
      ['Discover', ['Requirements', 'Research', 'Product Strategy']],
      ['Design', ['Architecture', 'UX Systems', 'Prototyping']],
      ['Develop', ['Agile Delivery', 'Engineering', 'Quality Assurance']],
      ['Deliver', ['Deployment', 'Integration', 'Maintenance & Support']],
    ],
  },
];

export default function Nav({ forceSolid = false }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeNav = () => setOpen(false);

  const effectiveSolid = forceSolid || solid;

  return (
    <header className={`topnav ${effectiveSolid ? 'is-solid' : ''}`}>
      <a href="/#top" className="brand">
        <BrandLogo src={effectiveSolid ? '/assets/nexbash-logo.png' : '/assets/nexbash-logo-white.png'} />
      </a>
      <nav className={open ? 'open' : ''}>
        {menus.map((menu) => (
          <div className="nav-menu" key={menu.label}>
            <span className="nav-menu-label">{menu.label}</span>
            <div className="nav-dropdown">
              {menu.items.map(([label, children]) => (
                <div className="nav-submenu" key={label}>
                  <a href={menu.label === 'What We Do' ? '/#studios' : menu.label === 'Who We Help' ? '/#help' : '/#process'} onClick={closeNav}>
                  <span>{label}</span>
                  <span aria-hidden="true">-&gt;</span>
                  </a>
                  <div className="nav-submenu-panel">
                    <strong>{label}</strong>
                    {children.map((child) => <span key={child}>{child}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <a href="/#packages" onClick={closeNav}>Packages</a>
        <a href="/#contact" onClick={closeNav}>Contact</a>
      </nav>
      <a href="/#contact" className="go">
        Get Started
      </a>
      <button
        type="button"
        className="nav-burger"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
