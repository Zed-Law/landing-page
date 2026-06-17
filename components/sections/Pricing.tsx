import { Button } from "../Button";
import { GoldGradient } from "../GoldGradient";
import { CheckIcon } from "../icons";

const tiers = [
  {
    name: "Foundations",
    price: "$1,500",
    cadence: "/ month",
    tagline: "For early teams getting the basics right.",
    features: [
      "Single point of contact",
      "Contract review and light drafting",
      "Standard turnaround",
      "Business-hours email support",
      "Plain-English advice, always",
    ],
    cta: "Book a call",
    highlight: false,
  },
  {
    name: "Zed Plus",
    price: "$3,500",
    cadence: "/ month",
    tagline: "Senior counsel on call. Where most teams start.",
    features: [
      "Everything in Foundations",
      "Dedicated senior lawyer",
      "Priority turnaround in hours",
      "Unlimited contract reviews",
      "Quarterly legal health check",
      "Direct line for the urgent calls",
    ],
    cta: "Book a call",
    highlight: true,
  },
  {
    name: "Bespoke",
    price: "Custom",
    cadence: "",
    tagline: "For complex, high-volume or cross-border needs.",
    features: [
      "Everything in Zed Plus",
      "Multi-entity and cross-border",
      "Embedded counsel days",
      "Custom service levels",
      "Named partner oversight",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="zed-plus" className="bg-surface-alt">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">
            Counsel on retainer, priced to plan around
          </h2>
          <p className="mt-5 text-lg text-body">
            One monthly fee for ongoing legal support, no surprise bills and no
            six-minute increments. Pick the level that fits, change it whenever
            you need to. All prices in AUD, excluding GST.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {tiers.map((tier) =>
            tier.highlight ? (
              <HighlightCard key={tier.name} tier={tier} />
            ) : (
              <PlainCard key={tier.name} tier={tier} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

type Tier = (typeof tiers)[number];

function PlainCard({ tier }: { tier: Tier }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-8">
      <h3 className="text-lg font-bold text-ink">{tier.name}</h3>
      <p className="mt-2 text-sm text-body">{tier.tagline}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-ink">{tier.price}</span>
        {tier.cadence && (
          <span className="text-sm font-medium text-muted">{tier.cadence}</span>
        )}
      </div>
      <ul className="mt-7 flex-1 space-y-3.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-body">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button href="#book" variant="primary" className="w-full justify-between">
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}

function HighlightCard({ tier }: { tier: Tier }) {
  return (
    <div className="relative">
      {/* fuzzy gold bloom behind the card */}
      <div className="pointer-events-none absolute -inset-6 gold-glow opacity-70 blur-2xl" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl p-8 shadow-[0_30px_70px_-30px_rgba(226,162,60,0.7)] lg:-mt-4 lg:pb-12 lg:pt-12">
        {/* animated grainy gold gradient background */}
        <GoldGradient className="absolute inset-0" />
        {/* inner soft glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/40 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-ink">{tier.name}</h3>
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
              Most popular
            </span>
          </div>
          <p className="mt-2 text-sm text-ink/70">{tier.tagline}</p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-ink">{tier.price}</span>
            {tier.cadence && (
              <span className="text-sm font-medium text-ink/60">
                {tier.cadence}
              </span>
            )}
          </div>
          <ul className="mt-7 space-y-3.5">
            {tier.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-sm font-medium text-ink"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href="#book"
              variant="primary"
              className="w-full justify-between"
            >
              {tier.cta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
