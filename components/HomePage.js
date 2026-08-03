'use client';

import Bloom from '@/components/Bloom';
import GeoField from '@/components/GeoField';
import MotionRoot from '@/components/MotionRoot';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Spectrum from '@/components/Spectrum';
import Shatter from '@/components/Shatter';
import Packages from '@/components/Packages';
import Industries from '@/components/Industries';
import Lens from '@/components/Lens';
import Path from '@/components/Path';
import FAQ from '@/components/FAQ';
import Partners from '@/components/Partners';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage({ site }) {
  return (
    <>
      <GeoField />
      <Bloom />
      <MotionRoot />
      <Nav />
      <main>
        <Hero heroBar={site.heroBar} />
        <Certifications />
        <Spectrum studios={site.studios} />
        <Industries industries={site.industries} />
        <Shatter projects={site.projects} />
        <Packages packages={site.packages} />
        <Lens capabilities={site.capabilities} />
        <Path process={site.process} />
        <FAQ faq={site.faq} />
        <Partners partners={site.partners} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
