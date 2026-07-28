'use client';

import { useEffect, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

const links = [
  { href: '#studios', label: 'Studios' },
  { href: '#packages', label: 'Packages' },
  { href: '#process', label: 'Process' },
  { href: '#projects', label: 'Projects' },
  { href: '#help', label: 'Who We Help' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topnav ${solid ? 'is-solid' : ''}`}>
      <a href="#top" className="brand">
        <BrandLogo />
      </a>
      <nav className={open ? 'open' : ''}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="go">
        Get Started
      </a>
      <button
        type="button"
        className="nav-burger"
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
