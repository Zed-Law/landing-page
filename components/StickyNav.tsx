"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const links = [
  { label: "Zed Plus", href: "#zed-plus" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog" },
];

// Compact companion to the in-flow navbar: slides down against a hairline
// rule once the real nav scrolls away, so the Book a call CTA persists.
export function StickyNav() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const header = document.getElementById("site-header");
    const onScroll = () => {
      const threshold = header
        ? header.offsetTop + header.offsetHeight
        : 160;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "pointer-events-none -translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-8 px-5 py-3 sm:px-8">
        <Link href="/" aria-label="Zed Law home" className="flex items-center">
          <Logo variant="black" className="h-4 w-auto sm:h-5" />
        </Link>

        <nav aria-label="Secondary">
          <ul className="flex items-center gap-x-6 sm:gap-x-7">
            {links.map((l) => (
              <li key={l.label} className="hidden sm:block">
                <Link
                  href={l.href}
                  tabIndex={visible ? 0 : -1}
                  className="whitespace-nowrap font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-body transition-colors duration-200 hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#book"
                tabIndex={visible ? 0 : -1}
                className="inline-flex whitespace-nowrap rounded-[2px] bg-accent-deep px-4 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:bg-ink"
              >
                Book a call
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
