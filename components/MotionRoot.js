'use client';

import { useEffect, useRef } from 'react';

/**
 * Site-wide motion engine:
 * - scroll reveals
 * - pointer CSS vars for parallax
 * - magnetic buttons
 * - soft 3D tilt on [.tilt]
 */
export default function MotionRoot() {
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const root = document.documentElement;
    const nodes = [...document.querySelectorAll('[data-reveal]')];

    const mark = (el) => el.classList.add('is-in');

    if (reduce) {
      nodes.forEach(mark);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mark(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );

    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) mark(el);
      else io.observe(el);
    });

    const safety = window.setTimeout(() => nodes.forEach(mark), 900);

    let px = 0.5;
    let py = 0.5;
    let tx = 0.5;
    let ty = 0.5;
    let scrollY = 0;
    let frame = 0;

    const tick = () => {
      frame += 1;
      px += (tx - px) * 0.12;
      py += (ty - py) * 0.12;
      if (frame % 2 === 0) {
        root.style.setProperty('--mx', ((px - 0.5) * 2).toFixed(3));
        root.style.setProperty('--my', ((py - 0.5) * 2).toFixed(3));
        root.style.setProperty('--scroll', scrollY.toFixed(3));
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };

    const onScroll = () => {
      scrollY = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const magnets = [];
    const tilts = [];

    const onMagnetMove = (e) => {
      if (!fine) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };
    const onMagnetLeave = (e) => {
      e.currentTarget.style.transform = '';
    };

    const onTiltMove = (e) => {
      if (!fine) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
    };
    const onTiltLeave = (e) => {
      e.currentTarget.style.transform = '';
    };

    const bindMagnets = () => {
      document.querySelectorAll('.go, .ghost, .ind-nav, .theme-toggle').forEach((el) => {
        if (el.dataset.mag) return;
        el.dataset.mag = '1';
        el.addEventListener('mousemove', onMagnetMove);
        el.addEventListener('mouseleave', onMagnetLeave);
        magnets.push(el);
      });
    };

    const bindTilts = () => {
      document.querySelectorAll('.tilt').forEach((el) => {
        if (el.dataset.tilt) return;
        el.dataset.tilt = '1';
        el.addEventListener('mousemove', onTiltMove);
        el.addEventListener('mouseleave', onTiltLeave);
        tilts.push(el);
      });
    };

    bindMagnets();
    bindTilts();
    const rebind = window.setTimeout(() => {
      bindMagnets();
      bindTilts();
    }, 800);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
      window.clearTimeout(rebind);
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      magnets.forEach((el) => {
        el.removeEventListener('mousemove', onMagnetMove);
        el.removeEventListener('mouseleave', onMagnetLeave);
      });
      tilts.forEach((el) => {
        el.removeEventListener('mousemove', onTiltMove);
        el.removeEventListener('mouseleave', onTiltLeave);
      });
    };
  }, []);

  return null;
}
