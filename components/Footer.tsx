import Link from "next/link";
import { Logo } from "./Logo";
import { ArrowIcon } from "./icons";

const columns = [
  {
    title: "Firm",
    links: ["About", "Our lawyers", "Zed Plus", "Careers", "Contact"],
  },
  {
    title: "Practice areas",
    links: [
      "Commercial contracts",
      "M&A and investment",
      "Corporate governance",
      "Employment",
      "Disputes",
    ],
  },
  {
    title: "Resources",
    links: ["Blog", "Case studies", "Pricing", "FAQs"],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="h-6 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-body">
              Top-tier legal talent, without the top-tier theatre. Lawyers from
              the big firms, delivering sharp commercial advice at a fairer
              price.
            </p>
            <p className="mt-5 text-xs text-muted">
              Zed Law Pty Ltd · Sydney, Australia
              <br />
              Liability limited by a scheme approved under Professional Standards
              Legislation.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-body transition-colors hover:text-ink"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 sm:items-center">
          <div className="rounded-2xl bg-night p-1.5 sm:max-w-md">
            <div className="flex items-center justify-between gap-3 pl-4">
              <span className="text-sm text-white/70">hello@zedlaw.com.au</span>
              <Link
                href="#book"
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white/90"
              >
                Get in touch
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <p className="text-xs text-muted sm:text-right">
            © {new Date().getFullYear()} Zed Law. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
