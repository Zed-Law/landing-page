"use client";

import * as React from "react";

export type Service = { title: string; keywords: string; matters: string };

// The practice-area schedule. From md up it renders as the fee-schedule
// table — numbered rows, dot leaders, mono keyword list — visually
// unchanged, with the whole row click-to-expand and no visible affordance.
// Below md the keyword list stays hidden (mono caps read as a second
// heading at that width): rows show just the numbered practice names with
// a plus at the right edge carrying the affordance.
export function ServicesSchedule({ services }: { services: Service[] }) {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <div className="mt-8 border-b border-line sm:mt-12">
      {services.map(({ title, keywords, matters }, i) => {
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

              <span
                className="hidden min-w-10 flex-1 border-b border-dotted border-muted/60 md:block"
                aria-hidden
              />
              <p className="hidden font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-body md:block">
                {keywords}
              </p>

              {/* Whole row toggles */}
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`service-matters-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="absolute inset-0 cursor-pointer"
              >
                <span className="sr-only">
                  {isOpen ? "Hide" : "Show"} {title} matters
                </span>
              </button>
            </div>

            {/* Collapsible matters */}
            <div
              id={`service-matters-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-body md:max-w-[85ch] md:text-base">
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
