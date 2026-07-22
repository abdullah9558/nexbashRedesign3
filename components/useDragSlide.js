'use client';

import { useEffect, useRef } from 'react';

/**
 * Live drag-to-slide — the track follows the pointer, then snaps a step on release.
 * @param {(delta: 1 | -1) => void} onStep
 */
export default function useDragSlide(onStep, { threshold = 56 } = {}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const didDrag = useRef(false);
  const onStepRef = useRef(onStep);
  onStepRef.current = onStep;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    let active = false;
    let dragging = false;
    let startX = 0;
    let lastDx = 0;
    let pid = null;

    const track = () => trackRef.current;

    const apply = (x) => {
      const t = track();
      if (!t) return;
      t.style.transform = x ? `translate3d(${x}px, 0, 0)` : '';
    };

    const setDraggingClass = (on) => {
      viewport.classList.toggle('is-dragging', on);
      track()?.classList.toggle('is-dragging', on);
    };

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('a, .ind-nav, .ind-dot')) return;
      active = true;
      dragging = false;
      didDrag.current = false;
      startX = e.clientX;
      lastDx = 0;
      pid = e.pointerId;
      try {
        viewport.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const move = (e) => {
      if (!active) return;
      if (pid != null && e.pointerId !== pid) return;
      const dx = e.clientX - startX;
      lastDx = dx;
      if (!dragging && Math.abs(dx) < 5) return;
      if (!dragging) {
        dragging = true;
        didDrag.current = true;
        setDraggingClass(true);
      }
      const max = Math.max(120, viewport.clientWidth * 0.42);
      const resisted =
        Math.abs(dx) > max ? Math.sign(dx) * (max + (Math.abs(dx) - max) * 0.28) : dx;
      apply(resisted);
      e.preventDefault();
    };

    const up = (e) => {
      if (!active) return;
      if (e && pid != null && e.pointerId !== pid) return;
      active = false;
      pid = null;
      if (dragging) {
        setDraggingClass(false);
        const dx = lastDx;
        apply(0);
        if (Math.abs(dx) >= threshold) {
          onStepRef.current(dx < 0 ? 1 : -1);
        }
        const block = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        viewport.addEventListener('click', block, { capture: true, once: true });
      }
      dragging = false;
      lastDx = 0;
    };

    viewport.addEventListener('pointerdown', down);
    viewport.addEventListener('pointermove', move, { passive: false });
    viewport.addEventListener('pointerup', up);
    viewport.addEventListener('pointercancel', up);
    viewport.addEventListener('lostpointercapture', up);

    return () => {
      viewport.removeEventListener('pointerdown', down);
      viewport.removeEventListener('pointermove', move);
      viewport.removeEventListener('pointerup', up);
      viewport.removeEventListener('pointercancel', up);
      viewport.removeEventListener('lostpointercapture', up);
      apply(0);
      setDraggingClass(false);
    };
  }, [threshold]);

  return { viewportRef, trackRef, didDrag };
}
