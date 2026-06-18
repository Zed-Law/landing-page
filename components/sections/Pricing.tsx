import { Fragment } from "react";
import { Button } from "../Button";
import { GoldGradient } from "../GoldGradient";
import { ShinyText } from "../ShinyText";
import { SpotlightCard } from "../SpotlightCard";
import { CheckIcon } from "../icons";

const PARACHUTE_LOGO =
  "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/client-logos/parachute.svg";

const parachuteCapabilities = [
  "Answers in seconds",
  "Contract review",
  "Document drafting",
];

const tiers = [
  {
    name: "Foundations",
    price: "$1,500",
    cadence: "/ month",
    tagline: "For early teams getting the basics right.",
    features: [
      "Single point of contact",
      "Parachute legal AI access",
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
          <ShinyText
            text="Zed Plus"
            color="#c8862a"
            shineColor="#f4cd86"
            speed={3}
            spread={120}
            className="font-display text-4xl font-extrabold leading-tight sm:text-[3rem]"
          />
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">
            Counsel on retainer, priced to plan around
          </h2>
          <p className="mt-5 text-lg text-body">
            One monthly fee for ongoing legal support. No surprise bills, no
            six-minute increments. Pick the level that fits and change it
            whenever you need to.
          </p>

          {/* Parachute: an included benefit, softly tinted to set it apart */}
          <SpotlightCard
            spotlightColor="rgba(241, 191, 101, 0.5)"
            className="mt-10 rounded-2xl bg-gold-soft/20 px-6 py-7 ring-1 ring-gold-deep/10 sm:px-10"
          >
            <a
              href="https://www.goparachute.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                Supercharged with
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PARACHUTE_LOGO}
                alt="Parachute"
                width={365}
                height={51}
                className="block h-5 w-auto"
              />
            </a>
            <p className="mt-3 text-lg font-medium text-ink">
              Legal AI, included with every retainer.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm font-semibold text-ink">
              {parachuteCapabilities.map((cap, i) => (
                <Fragment key={cap}>
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-gold-deep"
                    />
                  )}
                  <span>{cap}</span>
                </Fragment>
              ))}
            </div>
          </SpotlightCard>
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

        <p className="mt-8 text-center text-sm text-muted">
          All prices in AUD, excluding GST. Change or cancel your plan whenever
          you need to.
        </p>
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
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-deep">
              <CheckIcon className="h-3 w-3 text-white" />
            </span>
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
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
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
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink">
                  <CheckIcon className="h-3 w-3 text-white" />
                </span>
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
