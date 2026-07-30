'use client';

import { useEffect, useRef } from 'react';
import HeroWorld from '@/components/HeroWorld';

export default function HeroExperience() {
  const experienceRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const play = () => {
      const attempt = video.play();
      attempt?.catch(() => {
        window.setTimeout(() => video.play().catch(() => {}), 350);
      });
    };

    const resume = () => {
      if (!document.hidden && video.paused) play();
    };

    play();
    video.addEventListener('canplay', play);
    video.addEventListener('pause', resume);
    document.addEventListener('visibilitychange', resume);

    return () => {
      video.removeEventListener('canplay', play);
      video.removeEventListener('pause', resume);
      document.removeEventListener('visibilitychange', resume);
    };
  }, []);

  const onPointerMove = (event) => {
    const node = experienceRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--experience-x', `${((event.clientX - rect.left) / rect.width - 0.5) * 18}px`);
    node.style.setProperty('--experience-y', `${((event.clientY - rect.top) / rect.height - 0.5) * 12}px`);
  };

  const resetPointer = () => {
    const node = experienceRef.current;
    if (!node) return;
    node.style.setProperty('--experience-x', '0px');
    node.style.setProperty('--experience-y', '0px');
  };

  return (
    <div
      className="hero-experience"
      ref={experienceRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      aria-label="Interactive Nexbash global technology experience"
    >
      <video
        className="hero-experience-video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/space-backdrop.jpg"
        aria-hidden="true"
      >
        <source src="/assets/hero-scenes.mp4" type="video/mp4" />
      </video>
      <div className="hero-experience-globe">
        <HeroWorld />
      </div>
    </div>
  );
}
