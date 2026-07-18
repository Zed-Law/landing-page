"use client";

import * as React from "react";
import Link from "next/link";

// Row No. 08, promoted out of the schedule into a reversed night strip
// (echoing the hero banner). Like the schedule rows above it, the strip is
// click-to-expand: on mobile the whole header toggles the retainer copy,
// with a plus at the right edge; from md up the standing title, one-liner
// and CTA stay put and clicking the text block reveals the rest, with no
// visible affordance.
export function GeneralCounselRow() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="view-reveal mt-10 bg-night px-5 py-6 sm:px-7">
      <div className="relative flex items-start justify-between gap-4 md:hidden">
        <div className="flex flex-wrap items-baseline gap-x-4">
          <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-night-body">
            No. 08
          </span>
          <h3 className="text-2xl text-night-ink">General counsel</h3>
        </div>
        <span
          className={`mt-1.5 shrink-0 text-night-body transition-transform duration-300 motion-reduce:transition-none ${
            open ? "rotate-45" : ""
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
        <button
          type="button"
          aria-expanded={open}
          aria-controls="general-counsel-detail"
          onClick={() => setOpen((v) => !v)}
          className="absolute inset-0 cursor-pointer"
        >
          <span className="sr-only">
            {open ? "Hide" : "Show"} General counsel details
          </span>
        </button>
      </div>

      <div
        id="general-counsel-detail"
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-1.5 text-sm leading-relaxed text-night-body">
            Senior counsel on retainer through Zed Plus. One monthly fee, a
            dedicated lawyer who knows your business, and Parachute legal AI for
            the questions that cannot wait. Plans flex up or down as you grow,
            and you can leave whenever you like.
          </p>
          <Link
            href="#zed-plus"
            className="mt-4 inline-block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-night-ink"
          >
            Explore Zed Plus →
          </Link>
        </div>
      </div>

      {/* Desktop: same strip; clicking the text block expands the rest of
          the retainer copy beneath the standing one-liner */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between gap-5">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="general-counsel-detail-desktop"
            onClick={() => setOpen((v) => !v)}
            className="cursor-pointer text-left"
          >
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-night-body">
                No. 08
              </span>
              <h3 className="text-2xl text-night-ink">General counsel</h3>
            </div>
            <p className="mt-1.5 text-base text-night-body">
              Senior counsel on retainer, without the full-time hire.
            </p>
            <span className="sr-only">
              {open ? "Hide" : "Show"} General counsel details
            </span>
          </button>
          <Link
            href="#zed-plus"
            className="shrink-0 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-night-ink"
          >
            Explore Zed Plus →
          </Link>
        </div>

        <div
          id="general-counsel-detail-desktop"
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p className="max-w-[85ch] pt-3 text-base leading-relaxed text-night-body">
              One monthly fee, a dedicated lawyer who knows your business, and
              Parachute legal AI for the questions that cannot wait. Plans flex
              up or down as you grow, and you can leave whenever you like.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
