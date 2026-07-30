'use client';

import BrandLogo from '@/components/BrandLogo';

export default function Footer() {
  return (
    <footer className="foot screen-foot">
      <div className="footer-main">
        <div className="footer-brand">
          <BrandLogo src="/assets/nexbash-logo-white.png" />
          <p>AI, geospatial intelligence, and production software built for real operational environments.</p>
          <a className="footer-cta" href="#contact">Start a project <span>↗</span></a>
        </div>

        <div className="footer-column">
          <h3>What we do</h3>
          <a href="#studios">AI &amp; Data</a>
          <a href="#studios">Geospatial Systems</a>
          <a href="#studios">Custom Software</a>
          <a href="#studios">Digital Platforms</a>
        </div>

        <div className="footer-column">
          <h3>Who we help</h3>
          <a href="#industries">Government</a>
          <a href="#industries">Healthcare</a>
          <a href="#industries">Enterprise</a>
          <a href="#industries">Startups</a>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <a href="#projects">Previous Projects</a>
          <a href="#process">How We Deliver</a>
          <a href="#certifications">Certifications</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-column footer-contact">
          <h3>Connect</h3>
          <a href="mailto:info@nexbash.com">info@nexbash.com</a>
          <a href="https://www.linkedin.com/company/nexbash/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} NexBash. All rights reserved.</p>
        <p>Built for real environments.</p>
      </div>
    </footer>
  );
}
