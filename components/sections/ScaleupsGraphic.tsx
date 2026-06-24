"use client";

import { useRef } from "react";
import { cardChrome, ev, useInViewOnce } from "./motion";

const DURATION = 2.4; // seconds — timeline ends as the axis labels settle (~2.1s)
const SPEED = 1.4;

const BARS = [38, 50, 42, 64, 76, 100];

export function ScaleupsGraphic() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const seedRef = useRef<HTMLSpanElement>(null);
  const seriesRef = useRef<HTMLSpanElement>(null);

  const containerRef = useInViewOnce(
    (t) => {
      if (titleRef.current) {
        const op = ev(t, 0.1, 0.5);
        titleRef.current.style.opacity = String(op);
        titleRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
      }
      if (badgeRef.current) {
        const op = ev(t, 0.3, 0.7);
        badgeRef.current.style.opacity = String(op);
        badgeRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
      }

      barRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.7 + i * 0.13;
        const h = ev(t, start, start + 0.55) * BARS[i];
        el.style.height = `${h}%`;
      });

      const labelOp = ev(t, 1.7, 2.1);
      if (seedRef.current) seedRef.current.style.opacity = String(labelOp);
      if (seriesRef.current) seriesRef.current.style.opacity = String(labelOp);
    },
    DURATION,
    SPEED
  );

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center p-7 sm:p-5"
    >
      <div className={cardChrome}>
        <div className="flex items-center justify-between">
          <span ref={titleRef} className="text-sm font-bold text-ink">
            Growth
          </span>
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-semibold text-ink ring-1 ring-line"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Counsel on call
          </span>
        </div>

        <div className="mt-5 flex h-24 items-end gap-2">
          {BARS.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              className={`flex-1 rounded-t-md ${
                i === BARS.length - 1 ? "bg-ink" : "bg-slate-200"
              }`}
              style={{ height: 0 }}
            />
          ))}
        </div>

        <div className="mt-2.5 flex justify-between text-[11px] font-medium text-muted">
          <span ref={seedRef}>Seed</span>
          <span ref={seriesRef}>Series B</span>
        </div>
      </div>
    </div>
  );
}
