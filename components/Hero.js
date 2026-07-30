'use client';

import BrandLogo from '@/components/BrandLogo';
import HeroExperience from '@/components/HeroExperience';

export default function Hero({ heroBar = [] }) {
  return (
    <section className="hero screen" id="top">
      <HeroExperience />

      <div className="hero-main">
        <div className="hero-copy">
          <BrandLogo className="hero-mark anim-fade logo-pulse" />
          <p className="signal anim-fade">
            Signal · Geospatial · Intelligence
            <span className="signal-live" aria-hidden="true" />
          </p>
          <div className="hero-text-panel">
            <h1 className="anim-fade hero-title">
              Turning complex data into{' '}
              <span className="word-dance">operational advantage</span>
            </h1>
            <p className="hero-sub anim-fade">
              Enterprise AI, geospatial, and software engineering for organizations managing critical
              infrastructure and large-scale operations.
            </p>
          </div>
          <div className="hero-row anim-fade">
            <a href="#contact" className="go go-pulse">
              Start a Project
            </a>
            <a href="#projects" className="ghost">
              See Our Work
            </a>
          </div>
        </div>
      </div>

      <div className="hero-bar">
        {heroBar.map((item, i) => (
          <article className="hero-bar-item" key={item.num} style={{ '--i': i }}>
            <span className="hero-bar-num">{item.num}</span>
            <div>
              <h5>{item.title}</h5>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
