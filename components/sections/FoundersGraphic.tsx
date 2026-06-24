"use client";

import { useRef } from "react";
import { CheckIcon } from "../icons";
import {
  cardChrome,
  clamp,
  ev,
  easeOutCubic,
  easeInOutSine,
  easeOutBack,
  useInViewOnce,
} from "./motion";

const DURATION = 4.5; // seconds — timeline ends as the last avatar settles (~4.25s)
const SPEED = 1.4; // playback rate multiplier
const PATH_LEN = 300;

// widths as a % of the line's max-width container, derived from the source design (568/520/360 out of 568)
const LINES = [
  { widthPct: 100, start: 0.95 },
  { widthPct: 91.5, start: 1.1 },
  { widthPct: 63.4, start: 1.25 },
];

const AVATARS = [
  { l: "A", c: "bg-ink text-white", start: 3.5 },
  { l: "M", c: "bg-slate-500 text-white", start: 3.65 },
  { l: "K", c: "bg-slate-300 text-ink", start: 3.8 },
];

export function FoundersGraphic() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const checkRef = useRef<HTMLSpanElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const sigLabelRef = useRef<HTMLSpanElement>(null);
  const sigSvgRef = useRef<SVGSVGElement>(null);
  const sigPathRef = useRef<SVGPathElement>(null);
  const avatarRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const containerRef = useInViewOnce(
    (t) => {
      if (titleRef.current) {
        const op = ev(t, 0.45, 0.9);
        const y = (1 - ev(t, 0.45, 0.9)) * 14;
        titleRef.current.style.opacity = String(op);
        titleRef.current.style.transform = `translateY(${y}px)`;
      }

      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        const { widthPct, start } = LINES[i];
        const w = ev(t, start, start + 0.5) * widthPct;
        const op = clamp((t - start) / 0.3, 0, 1);
        el.style.width = `${w}%`;
        el.style.opacity = String(op);
      });

      if (dividerRef.current) {
        const w = ev(t, 1.6, 2.0) * 100;
        dividerRef.current.style.width = `${w}%`;
      }

      if (sigLabelRef.current) {
        sigLabelRef.current.style.opacity = String(clamp((t - 1.9) / 0.3, 0, 1));
      }

      if (sigSvgRef.current && sigPathRef.current) {
        const sigP = easeInOutSine(clamp((t - 2.1) / 1.3, 0, 1));
        sigPathRef.current.style.strokeDashoffset = String(PATH_LEN * (1 - sigP));
        sigSvgRef.current.style.opacity = t < 2.1 ? "0" : "1";
      }

      if (badgeRef.current) {
        const badgeP = clamp((t - 3.3) / 0.5, 0, 1);
        const scale = badgeP === 0 ? 0 : 0.5 + 0.5 * easeOutBack(badgeP);
        const op = clamp(badgeP * 2, 0, 1);
        badgeRef.current.style.opacity = String(op);
        badgeRef.current.style.transform = `scale(${scale})`;
      }
      if (checkRef.current) {
        const checkP = clamp((t - 3.55) / 0.35, 0, 1);
        const offset = 26 * (1 - easeOutCubic(checkP));
        checkRef.current.style.transform = `translateX(${offset}px)`;
        checkRef.current.style.opacity = String(checkP);
      }

      avatarRefs.current.forEach((el, i) => {
        if (!el) return;
        const { start } = AVATARS[i];
        const p = clamp((t - start) / 0.45, 0, 1);
        const s = easeOutBack(p);
        const scale = 0.3 + 0.7 * s;
        el.style.opacity = String(clamp(p * 1.5, 0, 1));
        el.style.transform = `scale(${scale})`;
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
      <div className={`relative ${cardChrome}`}>
        <div className="flex items-center justify-between">
          <span ref={titleRef} className="text-sm font-bold text-ink">
            Term Sheet
          </span>
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white"
          >
            <span ref={checkRef} className="inline-flex">
              <CheckIcon className="h-3 w-3" />
            </span>{" "}
            Signed
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {LINES.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="h-2 rounded-full bg-slate-200"
            />
          ))}
        </div>

        <div className="my-4">
          <div
            ref={dividerRef}
            className="h-0 border-t border-dashed border-line"
            style={{ width: 0 }}
          />
        </div>

        <span
          ref={sigLabelRef}
          className="text-[10px] font-semibold tracking-[0.12em] text-muted"
        >
          SIGNATURE
        </span>
        <svg
          ref={sigSvgRef}
          className="mt-1 h-7 w-24 text-ink sm:w-28"
          viewBox="0 0 120 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={sigPathRef}
            d="M2 18 C 8 6, 16 6, 22 16 S 36 26, 44 14 S 60 4, 70 16 S 90 24, 98 12 S 112 6, 118 14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={PATH_LEN}
            strokeDasharray={PATH_LEN}
          />
        </svg>

        <div className="absolute bottom-4 right-4 flex -space-x-2 sm:bottom-5 sm:right-5">
          {AVATARS.map(({ l, c }, i) => (
            <span
              key={l}
              ref={(el) => {
                avatarRefs.current[i] = el;
              }}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ring-2 ring-white sm:h-7 sm:w-7 ${c}`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
