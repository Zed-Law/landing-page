import Link from "next/link";
import { Logo } from "./Logo";
import { ReferralChip } from "./ReferralChip";
import type { Referrer } from "@/sanity";

const links = [
  { label: "Zed Plus", href: "#zed-plus", accent: false },
  { label: "Services", href: "#services", accent: false },
  { label: "Blog", href: "/blog", accent: false },
  { label: "Book a call", href: "#book", accent: true },
];

// Integrated inline nav — sits on the same paper as the hero: wordmark left,
// links right. In document flow, not sticky; every section below carries its
// own CTA.
export function Navbar({
  referrer = null,
}: {
  forceSolid?: boolean;
  referrer?: Referrer | null;
}) {
  return (
    <header className="bg-paper">
      {referrer && (
        <ReferralChip
          displayName={referrer.displayName}
          discount={referrer.discount}
        />
      )}

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-6 sm:px-8 sm:py-7">
        <Link href="/" aria-label="Zed Law home" className="flex items-center">
          <Logo variant="black" className="h-5 w-auto sm:h-6" />
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`whitespace-nowrap font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                    l.accent
                      ? "text-accent-deep hover:text-ink"
                      : "text-body hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
