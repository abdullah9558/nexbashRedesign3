'use client';

import { useCallback, useRef } from 'react';

/**
 * Wraps a step(delta) call with a short exit animation on the current track,
 * then commits the step so the enter animation can play on the new panel.
 */
export default function useAnimatedStep(step, trackRef, duration = 340) {
  const busy = useRef(false);
  const stepRef = useRef(step);
  stepRef.current = step;

  return useCallback(
    (delta) => {
      if (busy.current) return;
      const el = trackRef.current;
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!el || reduce) {
        stepRef.current(delta);
        return;
      }

      busy.current = true;
      el.classList.remove('slide-next', 'slide-prev', 'slide-out-next', 'slide-out-prev');
      // Restart CSS animation cleanly
      void el.offsetWidth;
      el.classList.add(delta > 0 ? 'slide-out-next' : 'slide-out-prev');

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        el.removeEventListener('animationend', onEnd);
        stepRef.current(delta);
        window.setTimeout(() => {
          busy.current = false;
        }, 40);
      };

      const onEnd = (e) => {
        if (e.target !== el) return;
        done();
      };

      el.addEventListener('animationend', onEnd);
      window.setTimeout(done, duration + 40);
    },
    [trackRef, duration]
  );
}
