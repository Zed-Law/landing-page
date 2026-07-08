"use client";

import * as React from "react";
import Link from "next/link";

type NavLink = { label: string; href: string };

// Compact hamburger menu for narrow viewports: the primary links collapse
// behind a toggle so the wordmark and Book a call CTA can sit on one row.
export function MobileMenu({
  links,
  onNavigate,
}: {
  links: NavLink[];
  onNavigate?: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-line text-ink transition-colors duration-200 hover:bg-paper-2"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="14" y2="14" />
              <line x1="14" y1="4" x2="4" y2="14" />
            </>
          ) : (
            <>
              <line x1="2.5" y1="5" x2="15.5" y2="5" />
              <line x1="2.5" y1="9" x2="15.5" y2="9" />
              <line x1="2.5" y1="13" x2="15.5" y2="13" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-[2px] border border-line bg-paper py-1 shadow-lg">
            <ul>
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className="block px-4 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-body transition-colors duration-200 hover:bg-paper-2 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
