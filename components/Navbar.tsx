"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Button } from "./Button";

const links = [
  { label: "Zed Plus", href: "#zed-plus" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "px-3 pt-3 sm:px-5 sm:pt-4" : "px-0 pt-0"
      }`}
    >
      <nav
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "rounded-[18px] border border-line bg-white/80 shadow-[0_10px_40px_-12px_rgba(3,20,40,0.18)] backdrop-blur-md sm:px-6"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label="Zed Law home">
          <Logo variant={scrolled ? "black" : "white"} className="h-5 w-auto sm:h-6" />
        </Link>

        {/* Links + CTA, aligned right */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-body hover:text-ink"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Button href="#book" size="md" variant={scrolled ? "primary" : "light"}>
            Book a call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/60 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-xl border border-line bg-white p-4 shadow-[0_10px_40px_-12px_rgba(3,20,40,0.18)] md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-body hover:bg-surface-alt hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button href="#book" size="md" className="w-full justify-between">
                Book a call
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
