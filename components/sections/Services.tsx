import {
  DocIcon,
  HandshakeIcon,
  ShieldIcon,
  GavelIcon,
  UsersIcon,
  GlobeIcon,
  ScrollIcon,
  BriefcaseIcon,
} from "../icons";

const firms = ["Ashurst", "Herbert Smith Freehills", "King & Wood Mallesons", "Baker McKenzie", "Clifford Chance", "Allens", "MinterEllison"];

const services = [
  {
    icon: DocIcon,
    title: "Commercial",
    body: "Contracts, structuring and compliance for a growing business.",
  },
  {
    icon: HandshakeIcon,
    title: "Corporate and M&A",
    body: "Capital raises and deals on both sides, from term sheet to close.",
  },
  {
    icon: ShieldIcon,
    title: "Health and regulatory",
    body: "Specialist counsel for regulated health and telehealth businesses.",
  },
  {
    icon: GavelIcon,
    title: "Dispute resolution",
    body: "Resolving disputes quickly, with litigation as the last resort.",
  },
  {
    icon: UsersIcon,
    title: "Employment",
    body: "Acting for employers and employees, contracts to disputes.",
  },
  {
    icon: GlobeIcon,
    title: "Migration",
    body: "Bringing talent to Australia, from visas to relocation.",
  },
  {
    icon: ScrollIcon,
    title: "Wills and estate planning",
    body: "Wills, beneficiaries and asset planning, sorted early.",
  },
  {
    icon: BriefcaseIcon,
    title: "General counsel",
    body: "Senior counsel on retainer, without the full-time hire.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">
            Counsel across everything commercial
          </h2>
          <p className="mt-5 text-lg text-body">
            One senior team for the legal work a growing business actually runs
            into. Same calibre as the big firms, handled like a partner who
            wants you to win.
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="h-9 w-9 text-ink" />
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
            </div>
          ))}
        </div>

        {/* Firm pedigree strip */}
        <div className="mt-16 border-t border-line pt-10">
          <p className="mb-6 text-sm font-medium text-muted">
            Counsel with pedigree from the world&apos;s leading firms
          </p>
          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-14">
              {[...firms, ...firms].map((firm, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-base font-semibold tracking-tight text-ink/25"
                >
                  {firm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
