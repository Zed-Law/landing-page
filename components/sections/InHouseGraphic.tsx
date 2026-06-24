"use client";

import { useRef } from "react";
import { CheckIcon, ArrowIcon } from "../icons";
import {
  cardChrome,
  clamp,
  ev,
  easeOutCubic,
  easeOutBack,
  useInViewOnce,
} from "./motion";

const DURATION = 3.1; // seconds — timeline ends as the last "handled" check stamps in (~3s)
const SPEED = 1.4;

const OVERFLOW = [
  { w: "100%", start: 0.2 },
  { w: "100%", start: 0.35 },
  { w: "83.333%", start: 0.5 },
];

const HANDLED = [0, 1, 2].map((i) => ({ start: 1.5 + i * 0.3 }));

export function InHouseGraphic() {
  const overflowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const checkRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const containerRef = useInViewOnce(
    (t) => {
      overflowRefs.current.forEach((el, i) => {
        if (!el) return;
        const { start } = OVERFLOW[i];
        const op = ev(t, start, start + 0.4);
        el.style.opacity = String(op);
        el.style.transform = `translateY(${(1 - op) * 6}px)`;
      });

      if (arrowRef.current) {
        const op = ev(t, 1.1, 1.45);
        const nudge = ev(t, 1.1, 1.6) * 3;
        arrowRef.current.style.opacity = String(op);
        arrowRef.current.style.transform = `translateX(${nudge - 3}px)`;
      }

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const { start } = HANDLED[i];
        const p = clamp((t - start) / 0.45, 0, 1);
        const scale = 0.6 + 0.4 * easeOutBack(p);
        el.style.opacity = String(clamp(p * 1.6, 0, 1));
        el.style.transform = `translateX(${(1 - easeOutCubic(p)) * -10}px) scale(${scale})`;
      });

      checkRefs.current.forEach((el, i) => {
        if (!el) return;
        const { start } = HANDLED[i];
        const cp = clamp((t - start - 0.15) / 0.3, 0, 1);
        el.style.opacity = String(cp);
        el.style.transform = `translateX(${(1 - easeOutCubic(cp)) * 12}px)`;
      });
    },
    DURATION,
    SPEED
  );

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center p-7 sm:p-5"
    >
      <div className={`flex items-center gap-2.5 sm:gap-3 ${cardChrome}`}>
        <div className="min-w-0 flex-1 rounded-lg border border-dashed border-line p-2.5 sm:p-3">
          <span className="text-[10px] font-semibold tracking-[0.12em] text-muted">
            OVERFLOW
          </span>
          <div className="mt-3 space-y-2">
            {OVERFLOW.map((o, i) => (
              <div
                key={i}
                ref={(el) => {
                  overflowRefs.current[i] = el;
                }}
                className="h-3 rounded-md bg-surface-alt ring-1 ring-line"
                style={{ width: o.w, opacity: 0 }}
              />
            ))}
          </div>
        </div>

        <span ref={arrowRef} className="inline-flex shrink-0" style={{ opacity: 0 }}>
          <ArrowIcon className="h-4 w-4 text-muted" />
        </span>

        <div className="min-w-0 flex-1 rounded-lg bg-white p-2.5 ring-1 ring-line shadow-[0_10px_28px_-22px_rgba(3,20,40,0.6)] sm:p-3">
          <span className="text-[10px] font-semibold tracking-[0.12em] text-muted">
            HANDLED
          </span>
          <div className="mt-3 space-y-2">
            {HANDLED.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="flex items-center gap-2 rounded-md bg-ink px-1.5 py-1.5"
                style={{ opacity: 0 }}
              >
                <span
                  ref={(el) => {
                    checkRefs.current[i] = el;
                  }}
                  className="inline-flex shrink-0"
                >
                  <CheckIcon className="h-3 w-3 text-white" />
                </span>
                <div className="h-1.5 flex-1 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
