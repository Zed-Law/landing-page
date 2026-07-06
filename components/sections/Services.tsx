import Link from "next/link";

const services = [
  {
    title: "Commercial",
    matters: "Contracts · structuring · privacy & compliance",
  },
  {
    title: "Corporate and M&A",
    matters: "Capital raises · SAFE notes · buy & sell side",
  },
  {
    title: "Health and regulatory",
    matters: "Telehealth · AHPRA · TGA advertising",
  },
  {
    title: "Dispute resolution",
    matters: "Negotiation · mediation · litigation",
  },
  {
    title: "Employment",
    matters: "Employment agreements · Fair Work · restraints",
  },
  {
    title: "Migration",
    matters: "Skilled visas · global talent · sponsorship",
  },
  {
    title: "Wills and estate planning",
    matters: "Wills · testamentary trusts · powers of attorney",
  },
];

// Practice areas set like a fee schedule — numbered rows, dot leaders
// running from the practice name to a mono list of typical matters.
// General counsel breaks out of the table into a reversed night strip
// (echoing the hero banner) and points at Zed Plus.
export function Services() {
  return (
    <section id="services" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 sm:pb-28 sm:pt-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl leading-tight sm:text-5xl">
            Counsel across everything commercial
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg text-body">
            One senior team for the legal work a growing business actually runs
            into. Same calibre as the big firms, handled like a partner who
            wants you to win.
          </p>
        </div>

        <div className="mt-12 border-b border-line">
          {services.map(({ title, matters }, i) => (
            <div
              key={title}
              className="group flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-t border-line py-4 transition-colors duration-200 hover:border-ink/40 sm:py-5"
            >
              <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-muted">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl transition-colors duration-200 group-hover:text-accent-deep sm:text-2xl">
                {title}
              </h3>
              <span
                className="hidden min-w-10 flex-1 border-b border-dotted border-muted/60 sm:block"
                aria-hidden
              />
              <p className="w-full font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-body sm:w-auto">
                {matters}
              </p>
            </div>
          ))}
        </div>

        {/* Row No. 08, promoted out of the schedule */}
        <div className="mt-10 flex flex-col items-start gap-5 bg-night px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="font-mono text-[0.65rem] font-semibold tracking-[0.18em] text-night-body">
                No. 08
              </span>
              <h3 className="text-2xl text-night-ink">General counsel</h3>
            </div>
            <p className="mt-1.5 text-sm text-night-body sm:text-base">
              Senior counsel on retainer, without the full-time hire.
            </p>
          </div>
          <Link
            href="#zed-plus"
            className="shrink-0 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-200 hover:text-night-ink"
          >
            Explore Zed Plus →
          </Link>
        </div>
      </div>
    </section>
  );
}
