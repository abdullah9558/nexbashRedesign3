'use client';

import { useEffect, useRef } from 'react';

/**
 * Live drag-to-slide. Uses window listeners (no pointer capture) so nested
 * card buttons still receive normal clicks.
 */
export default function useDragSlide(onStep, { threshold = 64 } = {}) {
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
    const DRAG_START = 14;

    const track = () => trackRef.current;

    const apply = (x) => {
      const t = track();
      if (!t) return;
      t.style.transform = x ? `translate3d(${x}px, 0, 0)` : '';
      t.style.transition = x ? 'none' : '';
    };

    const setDraggingClass = (on) => {
      viewport.classList.toggle('is-dragging', on);
      track()?.classList.toggle('is-dragging', on);
    };

    const cleanupWindow = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };

    const move = (e) => {
      if (!active) return;
      if (pid != null && e.pointerId !== pid) return;
      const dx = e.clientX - startX;
      lastDx = dx;
      if (!dragging && Math.abs(dx) < DRAG_START) return;
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

      const wasDragging = dragging;
      const dx = lastDx;
      active = false;
      pid = null;
      dragging = false;
      lastDx = 0;
      cleanupWindow();

      if (!wasDragging) {
        didDrag.current = false;
        return;
      }

      setDraggingClass(false);
      apply(0);

      if (Math.abs(dx) >= threshold) {
        onStepRef.current(dx < 0 ? 1 : -1);
        const block = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        // Only swallow the click that follows a real swipe
        viewport.addEventListener('click', block, { capture: true, once: true });
        window.setTimeout(() => {
          didDrag.current = false;
        }, 80);
      } else {
        // Small nudge — treat as click, do not block
        didDrag.current = false;
      }
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
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    };

    viewport.addEventListener('pointerdown', down);

    return () => {
      viewport.removeEventListener('pointerdown', down);
      cleanupWindow();
      apply(0);
      setDraggingClass(false);
    };
  }, [threshold]);

  return { viewportRef, trackRef, didDrag };
}
