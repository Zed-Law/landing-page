"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { CheckIcon, CopyIcon } from "./icons";

const EMAIL = "hello@zed.law";

const firmLinks = [
  { label: "Zed Plus", href: "#zed-plus" },
  { label: "Blog", href: "/blog" },
];

const practiceAreas = [
  "Commercial",
  "Corporate and M&A",
  "Health and regulatory",
  "Dispute resolution",
  "Employment",
  "Migration",
  "Wills and estate planning",
  "General counsel",
];

// Dense colophon on the paper: identity + legal left, index right,
// domain sign-off bottom-right (a nod to the poster reference).
export function Footer() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <footer id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo variant="white" className="h-6 w-auto" />
            <p className="mt-6 text-sm leading-relaxed text-body">
              Top-tier legal talent, without the top-tier theatre. Lawyers from
              the big firms, delivering sharp commercial advice at a fairer
              price.
            </p>

            {/* Email copy — silent success, the icon swap is the feedback */}
            <div className="mt-7 inline-flex items-center gap-4 border border-line px-4 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-body">
                {EMAIL}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy email address"}
                className="text-muted transition-colors duration-200 ease-out hover:text-accent"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4 text-accent" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="mt-7 font-mono text-[11px] leading-relaxed text-muted">
              Zed Law is the registered business name of Zed Consulting PTY LTD
              ABN 89 633 273 177, an incorporated legal practice.
              <br />
              <br />
              Level 24, 3 International Towers, 300 Barangaroo Avenue, Sydney
              NSW 2000.
              <br />
              <br />
              Liability limited by a scheme approved under Professional
              Standards Legislation.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Firm
            </h4>
            <ul className="mt-5 space-y-3">
              {firmLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-body transition-colors duration-200 ease-out hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Practice areas
            </h4>
            <ul className="mt-5 space-y-3">
              {practiceAreas.map((area) => (
                <li key={area} className="text-sm text-body">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-line pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
            © {new Date().getFullYear()} Zed Law. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
            zed.law
          </p>
        </div>
      </div>
    </footer>
  );
}
