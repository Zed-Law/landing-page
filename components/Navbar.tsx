import Link from "next/link";
import { Logo } from "./Logo";
import { StickyNav } from "./StickyNav";
import { ReferralChip } from "./ReferralChip";
import { MobileMenu } from "./MobileMenu";
import type { Referrer } from "@/sanity";

const links = [
  { label: "Zed Plus", href: "#zed-plus", accent: false },
  { label: "Services", href: "#services", accent: false },
  { label: "Blog", href: "/blog", accent: false },
  { label: "Book a call", href: "#book", accent: true },
];

const menuLinks = links.filter((l) => !l.accent);

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
    <header id="site-header" className="bg-paper">
      <StickyNav referrer={referrer} />
      {referrer && (
        <ReferralChip
          displayName={referrer.displayName}
          discount={referrer.discount}
        />
      )}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-5 py-6 sm:px-8 sm:py-7">
        <Link href="/" aria-label="Zed Law home" className="flex items-center">
          <Logo variant="black" className="h-5 w-auto sm:h-6" />
        </Link>

        {/* Desktop: full inline nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-x-7">
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

        {/* Mobile: Book a call CTA + hamburger */}
        <div className="flex items-center gap-2.5 md:hidden">
          <Link
            href="#book"
            className="inline-flex whitespace-nowrap rounded-[2px] bg-accent-deep px-4 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:bg-ink"
          >
            Book a call
          </Link>
          <MobileMenu links={menuLinks} />
        </div>
      </div>
    </header>
  );
}
