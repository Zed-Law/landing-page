import { Reveal } from "../Reveal";

const services = [
  {
    title: "Commercial",
    body: "Contracts, structuring and compliance for a growing business.",
  },
  {
    title: "Corporate and M&A",
    body: "Capital raises and deals on both sides, from term sheet to close.",
  },
  {
    title: "Health and regulatory",
    body: "Specialist counsel for regulated health and telehealth businesses.",
  },
  {
    title: "Dispute resolution",
    body: "Resolving disputes quickly, with litigation as the last resort.",
  },
  {
    title: "Employment",
    body: "Acting for employers and employees, contracts to disputes.",
  },
  {
    title: "Migration",
    body: "Bringing talent to Australia, from visas to relocation.",
  },
  {
    title: "Wills and estate planning",
    body: "Wills, beneficiaries and asset planning, sorted early.",
  },
  {
    title: "General counsel",
    body: "Senior counsel on retainer, without the full-time hire.",
  },
];

// A typographic index: two ruled columns on desktop, one on mobile.
// No icons, no cards — the practice-area names carry the section.
export function Services() {
  return (
    <section id="services" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
        <Reveal>
          <h2 className="max-w-3xl text-display-s font-extrabold uppercase text-ink">
            Counsel across everything commercial
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            One senior team for the legal work a growing business actually runs
            into. Same calibre as the big firms, handled like a partner who
            wants you to win.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-16 sm:grid-cols-2">
          {services.map(({ title, body }, i) => (
            <Reveal
              key={title}
              index={i % 2}
              className="border-t border-line py-7"
            >
              <h3 className="font-display text-xl font-medium uppercase text-ink sm:text-2xl">
                {title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-body">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
