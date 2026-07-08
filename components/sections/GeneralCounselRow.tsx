"use client";

import * as React from "react";
import Link from "next/link";

// Row No. 08, promoted out of the schedule into a reversed night strip
// (echoing the hero banner). On mobile it now follows the same
// collapsed-by-default, tap-to-expand pattern as the rows above it —
// previously it rendered fully open while every other row sat collapsed,
// which broke the rhythm of the accordion list right above it. From md up
// it renders exactly as before: title, paragraph, and CTA always visible.
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
          className="absolute inset-0"
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
          <p className="pt-1.5 text-sm text-night-body">
            Senior counsel on retainer, without the full-time hire.
          </p>
          <Link
            href="#zed-plus"
            className="mt-4 inline-block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-night-ink"
          >
            Explore Zed Plus →
          </Link>
        </div>
      </div>

      {/* Desktop: unchanged, always expanded */}
      <div className="hidden md:flex md:items-center md:justify-between md:gap-5">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4">
            <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-night-body">
              No. 08
            </span>
            <h3 className="text-2xl text-night-ink">General counsel</h3>
          </div>
          <p className="mt-1.5 text-base text-night-body">
            Senior counsel on retainer, without the full-time hire.
          </p>
        </div>
        <Link
          href="#zed-plus"
          className="shrink-0 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-night-ink"
        >
          Explore Zed Plus →
        </Link>
      </div>
    </div>
  );
}
