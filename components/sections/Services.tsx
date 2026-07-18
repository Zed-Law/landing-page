import { ServicesSchedule, type Service } from "./ServicesSchedule";
import { GeneralCounselRow } from "./GeneralCounselRow";

const services: Service[] = [
  {
    title: "Commercial",
    keywords: "Contracts · structuring · privacy & compliance",
    matters:
      "Your contracts are where revenue lives and risk hides. We draft and negotiate customer, supplier and SaaS agreements built for your deal flow rather than recycled from a precedent bank. Structuring, privacy and consumer law sit with the same team, so nothing falls between advisers.",
  },
  {
    title: "Corporate and M&A",
    keywords: "Capital raises · SAFE notes · buy & sell side",
    matters:
      "We run rounds and deals end to end, from first term sheet to completion. SAFEs, priced rounds, ESOPs, shareholders agreements and M&A on either side. We sit across from the major funds every week, so you get current market positions, not theory.",
  },
  {
    title: "Health and regulatory",
    keywords: "Telehealth · AHPRA · TGA advertising",
    matters:
      "Digital health is one of the most heavily regulated corners of the economy, and we work in it daily. We advise telehealth platforms, clinics, pharmacies and health tech companies on AHPRA, TGA, NDIS and state health rules, the ones that decide whether a model is viable at all.",
  },
  {
    title: "Dispute resolution",
    keywords: "Negotiation · mediation · litigation",
    matters:
      "Most disputes are commercial problems before they are legal ones, and the best outcome is usually a signed deed rather than a judgment. We push hard for early, favourable settlement and prepare properly for the fights worth having, from founder fallouts to payment recovery.",
  },
  {
    title: "Employment",
    keywords: "Employment agreements · Fair Work · restraints",
    matters:
      "We act for employers and employees, so we know exactly how the other side thinks. Contracts and executive agreements, contractor risk, restraints, performance management and terminations, with advice that holds up under Fair Work scrutiny and still lands the business outcome.",
  },
  {
    title: "Migration",
    keywords: "Skilled visas · global talent · sponsorship",
    matters:
      "Hiring the best person often means hiring across borders. We bring key talent to Australia on skilled and global talent pathways, keep sponsorship compliant, and handle the employment contracts and equity that come with the hire, so the whole package lands together.",
  },
  {
    title: "Wills and estate planning",
    keywords: "Wills · testamentary trusts · powers of attorney",
    matters:
      "Founders hold assets most wills were never drafted for. Shares, options, vesting equity and operating businesses need a plan, not a template. Wills, testamentary trusts and powers of attorney, aligned with your shareholders agreement, so no one is left guessing.",
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
