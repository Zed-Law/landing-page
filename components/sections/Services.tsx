import { ServicesSchedule, type Service } from "./ServicesSchedule";
import { GeneralCounselRow } from "./GeneralCounselRow";

const services: Service[] = [
  {
    title: "Commercial",
    matters: "Contracts, structuring and compliance for a growing business.",
  },
  {
    title: "Corporate and M&A",
    matters: "Capital raises and deals on both sides, from term sheet to close.",
  },
  {
    title: "Health and regulatory",
    matters: "Specialist counsel for regulated health and telehealth businesses.",
  },
  {
    title: "Dispute resolution",
    matters: "Resolving disputes quickly, with litigation as the last resort.",
  },
  {
    title: "Employment",
    matters: "Acting for employers and employees, contracts to disputes.",
  },
  {
    title: "Migration",
    matters: "Bringing talent to Australia, from visas to relocation.",
  },
  {
    title: "Wills and estate planning",
    matters: "Wills, beneficiaries and asset planning, sorted early.",
  },
];

// Practice areas set like a fee schedule — numbered rows, dot leaders
// running from the practice name to a mono list of typical matters.
// General counsel breaks out of the table into a reversed night strip
// (echoing the hero banner) and points at Zed Plus.
export function Services() {
  return (
    <section id="services" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 sm:px-8 sm:pb-28 sm:pt-8">
        <div className="view-reveal max-w-3xl">
          <h2 className="text-4xl leading-tight sm:text-5xl">
            Counsel across everything commercial
          </h2>
          <p className="mt-6 max-w-[58ch] text-lg text-body">
            One senior team for the legal work a growing business actually runs
            into.{" "}
            <span className="hidden md:inline">
              Same calibre as the big firms, handled like a partner who wants
              you to win.
            </span>
          </p>
        </div>

        <ServicesSchedule services={services} />

        <GeneralCounselRow />
      </div>
    </section>
  );
}
