'use client';

import Bloom from '@/components/Bloom';
import GeoField from '@/components/GeoField';
import MotionRoot from '@/components/MotionRoot';
import ThemeProvider from '@/components/ThemeProvider';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Spectrum from '@/components/Spectrum';
import Shatter from '@/components/Shatter';
import Packages from '@/components/Packages';
import Industries from '@/components/Industries';
import Lens from '@/components/Lens';
import Stories from '@/components/Stories';
import Path from '@/components/Path';
import FAQ from '@/components/FAQ';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage({ site }) {
  return (
    <ThemeProvider>
      <GeoField />
      <Bloom />
      <MotionRoot />
      <Nav />
      <main>
        <Hero heroBar={site.heroBar} />
        <Spectrum studios={site.studios} />
        <Shatter projects={site.projects} />
        <Packages packages={site.packages} />
        <Industries industries={site.industries} />
        <Lens capabilities={site.capabilities} />
        <Stories stories={site.stories} />
        <Path process={site.process} />
        <FAQ faq={site.faq} />
        <Partners partners={site.partners} />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
