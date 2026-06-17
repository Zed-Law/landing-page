import {
  DocIcon,
  HandshakeIcon,
  BuildingIcon,
  UsersIcon,
  GavelIcon,
  ChartIcon,
  ShieldIcon,
  ClockIcon,
} from "../icons";

const firms = ["Ashurst", "Herbert Smith Freehills", "King & Wood Mallesons", "Baker McKenzie", "Clifford Chance", "Allens", "MinterEllison"];

const services = [
  {
    icon: DocIcon,
    title: "Commercial contracts",
    body: "Drafting, review and negotiation on the terms that decide the deal.",
  },
  {
    icon: HandshakeIcon,
    title: "M&A and investment",
    body: "Buy-side, sell-side and capital raises, run all the way to close.",
  },
  {
    icon: BuildingIcon,
    title: "Corporate governance",
    body: "Structures, shareholder agreements and the board matters that follow.",
  },
  {
    icon: UsersIcon,
    title: "Employment",
    body: "Hiring, contracts and exits, plus the awkward conversations between.",
  },
  {
    icon: ChartIcon,
    title: "Fundraising",
    body: "Term sheets, SAFEs and rounds, founder-side and turned around fast.",
  },
  {
    icon: ShieldIcon,
    title: "IP and technology",
    body: "Protecting what you've built, and licensing it on the right terms.",
  },
  {
    icon: GavelIcon,
    title: "Disputes",
    body: "Pragmatic resolution, aimed at the outcome rather than the fight.",
  },
  {
    icon: ClockIcon,
    title: "Ongoing counsel",
    body: "Senior advice on tap through Zed Plus, priced so you can plan around it.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
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
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-alt text-ink">
                <Icon className="h-5 w-5" />
              </span>
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
