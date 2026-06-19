"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { CheckIcon, CopyIcon } from "./icons";

const EMAIL = "hello@zed.law";

const firmLinks = [
  { label: "Zed Plus", href: "#zed-plus" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
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

export function Footer() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <footer id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">

        {/* Mega menu columns */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="h-6 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-body">
              Top-tier legal talent, without the top-tier theatre. Lawyers from
              the big firms, delivering sharp commercial advice at a fairer
              price.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              <strong className="font-medium text-body">Zed Law</strong> is the registered business name of Zed Consulting PTY LTD ABN 89 633 273 177, an incorporated legal practice.
              <br /><br />
              Level 24, 3 International Towers, 300 Barangaroo Avenue, Sydney NSW 2000.
              <br /><br />
              Liability limited by a scheme approved under Professional Standards Legislation.
            </p>
            {/* Email copy pill */}
            <div className="mt-6 inline-flex rounded-[18px] bg-night p-1.5">
              <div className="flex items-center gap-3 pl-5">
                <span className="text-sm text-white/60">{EMAIL}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label={copied ? "Copied" : "Copy email address"}
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white text-ink transition-colors hover:bg-white/90"
                >
                  {copied ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Firm
            </h4>
            <ul className="mt-4 space-y-3">
              {firmLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-body transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Practice areas
            </h4>
            <ul className="mt-4 space-y-3">
              {practiceAreas.map((area) => (
                <li key={area} className="text-sm text-body">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8 sm:flex sm:items-center sm:justify-end">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Zed Law. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
