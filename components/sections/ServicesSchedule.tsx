"use client";

import * as React from "react";

export type Service = { title: string; matters: string };

// The practice-area schedule. From md up it renders as the fee-schedule
// table — numbered rows, dot leaders, mono matters — untouched. Below md
// the matters collapse behind an accordion: rows show just the numbered
// practice names, and tapping one expands its matters as a quiet
// sentence-case caption (the full-width mono caps read as a second
// heading on narrow screens).
export function ServicesSchedule({ services }: { services: Service[] }) {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <div className="mt-8 border-b border-line sm:mt-12">
      {services.map(({ title, matters }, i) => {
        const isOpen = open === i;
        return (
          <div
            key={title}
            className="view-reveal group relative border-t border-line transition-colors duration-200 hover:border-ink/40"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 py-4 sm:py-5">
              <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-muted">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl transition-colors duration-200 group-hover:text-accent-deep sm:text-2xl">
                {title}
              </h3>
              <span
                className="hidden min-w-10 flex-1 border-b border-dotted border-muted/60 md:block"
                aria-hidden
              />
              <p className="hidden font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-body md:block">
                {matters}
              </p>

              {/* Expand indicator — mobile only */}
              <span
                className={`ml-auto self-center text-muted transition-transform duration-300 motion-reduce:transition-none md:hidden ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <line x1="7" y1="1.5" x2="7" y2="12.5" />
                  <line x1="1.5" y1="7" x2="12.5" y2="7" />
                </svg>
              </span>

              {/* Whole row toggles on mobile */}
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`service-matters-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="absolute inset-0 md:hidden"
              >
                <span className="sr-only">
                  {isOpen ? "Hide" : "Show"} {title} matters
                </span>
              </button>
            </div>

            {/* Collapsible matters — mobile only */}
            <div
              id={`service-matters-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:hidden ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-body">
                  {matters}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
