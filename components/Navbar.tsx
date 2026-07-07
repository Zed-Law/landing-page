"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { ReferralChip } from "./ReferralChip";
import type { Referrer } from "@/sanity";

const links = [
  { label: "Zed Plus", href: "#zed-plus" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
];

// Fixed slim bar with a one-time drop-down entrance; the mobile menu is a
// full-screen sheet in display type (nakatomi's sidebar, flattened).
// forceSolid is kept for the blog, where the bar is solid from the start.
export function Navbar({
  forceSolid = false,
  referrer = null,
}: {
  forceSolid?: boolean;
  referrer?: Referrer | null;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const solid = forceSolid || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    document.documentElement.style.overflowY = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, [open]);

  return (
    <header className="nav-drop fixed inset-x-0 top-0 z-50">
      {/* Referral bar, pinned above the nav. Collapses on scroll and
          reappears as a compact badge inside the bar. */}
      {referrer && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            scrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
          }`}
        >
          <ReferralChip
            displayName={referrer.displayName}
            discount={referrer.discount}
          />
        </div>
      )}

      <nav
        className={`relative flex h-16 items-center justify-between px-5 transition-colors duration-300 ease-out sm:px-8 lg:px-10 ${
          solid
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label="Zed Law home">
          <Logo variant="white" className="h-5 w-auto sm:h-6" />
        </Link>

        {/* Compact referral badge, centred once the top bar is gone */}
        {referrer && (
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-out lg:block ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-btn border border-line bg-paper-2 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-body">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Referred by {referrer.displayName} ·
              <span className="text-accent">{referrer.discount}% off</span>
            </span>
          </div>
        )}

        {/* Links + CTA, aligned right */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-body transition-colors duration-200 ease-out hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Button href="#book" size="md" variant="outline">
            Book a call
          </Button>
        </div>

        {/* Mobile: CTA + menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button href="#book" size="md" withArrow={false}>
            Book a call
          </Button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-btn border border-line"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ease-out ${
                  open ? "translate-y-1 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ease-out ${
                  open ? "-translate-y-1 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Full-screen sheet, display type */}
      <div
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-paper px-5 pb-10 pt-8 transition-opacity duration-300 ease-out md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col divide-y divide-line">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-5 font-display text-3xl font-extrabold uppercase leading-none text-ink transition-colors duration-200 ease-out hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Button
            href="#book"
            size="lg"
            className="w-full"
            variant="primary"
          >
            Book a call
          </Button>
        </div>
      </div>
    </header>
  );
}
