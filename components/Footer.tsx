"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const EMAIL = "hello@zed.law";

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

// Ft4 dense colophon — the firm's regulatory particulars, practice areas and
// contacts set as one quiet block of type, ragged right.
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
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <Logo className="h-5 w-auto" />

        <div className="mt-8 max-w-2xl space-y-5 text-sm leading-relaxed text-body">
          <p>
            Top-tier legal talent, without the top-tier theatre. Lawyers from
            the big firms, delivering sharp commercial advice at a fairer
            price.
          </p>

          <p className="text-muted">
            <strong className="font-semibold text-body">Zed Law</strong> is the
            registered business name of Zed Consulting PTY LTD ABN 89 633 273
            177, an incorporated legal practice. Level 24, 3 International
            Towers, 300 Barangaroo Avenue, Sydney NSW 2000. Liability limited
            by a scheme approved under Professional Standards Legislation.
          </p>

          <p className="text-muted">
            Practice areas — {practiceAreas.join(" · ")}.
          </p>

          <p>
            <Link
              href="#zed-plus"
              className="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-accent-deep"
            >
              Zed Plus
            </Link>
            {" · "}
            <Link
              href="/blog"
              className="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-accent-deep"
            >
              Blog
            </Link>
            {" · "}
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy email address"}
              className="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-accent-deep"
            >
              {EMAIL}
            </button>
            {copied && (
              <span className="ml-2 text-xs text-accent-deep">copied</span>
            )}
          </p>

          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Zed Law. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
