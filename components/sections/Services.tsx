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

// Practice areas set like a fee schedule — ruled rows, name beside
// description, no icons.
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

        <div className="mt-12 grid lg:grid-cols-2 lg:gap-x-16">
          {services.map(({ title, body }) => (
            <div
              key={title}
              className="grid border-t border-line py-5 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6"
            >
              <h3 className="text-xl">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-body sm:mt-0 sm:pt-1 sm:text-base">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
