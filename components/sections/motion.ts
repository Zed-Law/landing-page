"use client";

import { useEffect, useRef } from "react";

export const cardChrome =
  "w-full rounded-lg bg-white p-4 sm:p-5 border border-line";

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const easeOutCubic = (t: number) => --t * t * t + 1;
export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// progress of [a, b] mapped through an ease, clamped to [0, 1]
export const ev = (
  t: number,
  a: number,
  b: number,
  ease: (t: number) => number = easeOutCubic
) => ease(clamp((t - a) / (b - a), 0, 1));

// Runs `render(t)` on a requestAnimationFrame loop once the returned container
// scrolls into view, playing the `duration`-second timeline a single time
// (scaled by `speed`) and then holding the final frame. Does not replay.
export function useInViewOnce(
  render: (t: number) => void,
  duration: number,
  speed = 1
) {
  const ref = useRef<HTMLDivElement>(null);
  const renderRef = useRef(render);

  useEffect(() => {
    renderRef.current = render;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let startTime: number | null = null;
    let done = false;

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const t = ((now - startTime) / 1000) * speed;
      if (t >= duration) {
        renderRef.current(duration); // settle on the completed state
        done = true;
        return;
      }
      renderRef.current(t);
      rafId = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          startTime = null;
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [duration, speed]);

  return ref;
}
