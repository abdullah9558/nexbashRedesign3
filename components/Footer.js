'use client';

import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  return (
    <footer className="foot screen-foot">
      <BrandLogo />
      <p>© {new Date().getFullYear()} NexBash — built for real environments.</p>
      <a href="#top">Back up ↑</a>
    </footer>
  );
}
