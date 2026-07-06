"use client";

import * as React from "react";
import { Fragment } from "react";
import { Button } from "../Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const PARACHUTE_LOGO =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/client-logos/parachute.svg";

const parachuteCapabilities = [
  "Answers in seconds",
  "Contract review",
  "Document drafting",
];

const tiers = [
  {
    name: "Basic",
    price: "$2,000",
    cadence: "/ month",
    tagline: "For early-stage teams getting the basics right.",
    features: [
      { text: "Parachute legal AI access (up to 4 seats)" },
      { text: "Light touch support" },
      { text: "3 × 30 min advice calls per month" },
      { text: "9am – 5pm Mon-Fri availability" },
    ],
    cta: "Book a call",
    highlight: false,
  },
  {
    name: "Startup",
    price: "$3,500",
    cadence: "/ month",
    tagline: "For growing teams that need faster answers.",
    features: [
      { text: "Everything in Basic", lead: true },
      { text: "2-business day advice turnaround" },
      { text: "9am – 5pm Mon-Fri availability" },
    ],
    cta: "Book a call",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$5,500",
    cadence: "/ month",
    tagline: "Faster turnaround and full access to templates.",
    features: [
      { text: "Everything in Startup", lead: true },
      { text: "1-business day advice turnaround" },
      { text: "9am – 7pm Mon-Fri availability" },
      { text: "Access to all Zed Law contract templates" },
    ],
    cta: "Book a call",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "$8,000",
    cadence: "/ month",
    tagline: "Dedicated senior counsel. Where most teams land.",
    features: [
      { text: "Everything in Growth", lead: true },
      { text: "Fractional full-suite legal support as external counsel" },
      { text: "Operate from a legal@yourcompany account" },
      { text: "9am – 9pm availability" },
      { text: "Priority offers across all Zed Partners" },
      { text: "Dedicated Zed Lawyer as your primary contact" },
      { text: "Optional integration into your business systems" },
    ],
    cta: "Book a call",
    highlight: true,
  },
  {
    name: "Dominate",
    price: "$15,500",
    cadence: "/ month",
    tagline: "Full-time embedded counsel, on your terms.",
    features: [
      { text: "Everything in Enterprise", lead: true },
      { text: "Dedicated full-time legal resource on demand" },
      { text: "2 × full days on site" },
      { text: "Project work capped at $400/hour" },
      { text: "9am – 11pm availability" },
      { text: "Dedicated integrations (Slack, Notion, G Suite)" },
      { text: "Priority access to a Zed Principal as General Counsel" },
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

export function Pricing() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section id="zed-plus" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          {/* Orienting line above the brand: names the lighter option first so
              price-sensitive visitors don't bounce, while steering to Zed Plus. */}
          <p className="text-base text-body sm:text-lg">
            You can{" "}
            <a
              href="#per-engagement"
              className="font-semibold text-ink underline decoration-accent-deep/40 underline-offset-4 transition-colors hover:decoration-accent-deep"
            >
              engage us per matter
            </a>
            . Most teams go further and partner with us through
          </p>
          <p className="mt-2 font-display text-6xl font-semibold leading-tight text-ink sm:text-7xl">
            Zed Plus
          </p>
          <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">
            Counsel on retainer, priced to plan around
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg text-body">
            One monthly fee for ongoing legal support. No surprise bills, no
            six-minute increments. It&apos;s how most of our clients choose to
            work with us. Pick the level that fits and change it whenever you
            need to.
          </p>
        </div>

        {/* Parachute: an included benefit, set as a ruled strip */}
        <div className="mt-12 border-y border-line py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div>
              <a
                href="https://www.goparachute.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
              >
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
                  Supercharged with
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PARACHUTE_LOGO}
                  alt="Parachute"
                  width={365}
                  height={51}
                  className="block h-4 w-auto"
                />
              </a>
              <p className="mt-2 text-base font-medium text-ink">
                Legal AI, included with every retainer.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-body">
              {parachuteCapabilities.map((cap, i) => (
                <Fragment key={cap}>
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-accent-deep"
                    />
                  )}
                  <span>{cap}</span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing carousel */}
        <Carousel
          setApi={setApi}
          opts={{ loop: false, align: "start" }}
          className="mt-12"
        >
          <CarouselContent className="items-stretch">
            {tiers.map((tier) => (
              <CarouselItem
                key={tier.name}
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4"
              >
                {tier.highlight ? (
                  <HighlightCard tier={tier} />
                ) : (
                  <PlainCard tier={tier} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselPrevious />
            <div className="flex gap-2">
              {tiers.map((tier, i) => (
                <button
                  key={tier.name}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to ${tier.name} plan`}
                  aria-current={i === current}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-ink"
                      : "w-1.5 bg-line hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
            <CarouselNext />
          </div>
        </Carousel>

        <p className="mt-8 text-sm text-muted">
          All prices in AUD, excluding GST. Change or cancel your plan whenever
          you need to.
        </p>

        {/* Per-engagement: a deliberately understated alternative, kept
            outside the Zed Plus brand. Retainer stays the preferred path. */}
        <div id="per-engagement" className="mt-20 scroll-mt-24 border-t border-line pt-10">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Not ready for a retainer?
          </p>
          <div className="mt-4 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div className="max-w-2xl">
              <h3 className="text-2xl">Work with us per engagement</h3>
              <p className="mt-2 text-base text-body">
                Prefer to handle one matter at a time? We also take on
                individual engagements, scoped and quoted upfront, with no
                ongoing commitment.
              </p>
            </div>
            <Button href="#book" variant="ghost" className="shrink-0">
              Talk to us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

type Tier = (typeof tiers)[number];

function FeatureList({
  tier,
  onDark = false,
}: {
  tier: Tier;
  onDark?: boolean;
}) {
  return (
    <ul
      className={`mt-7 flex-1 space-y-3 text-sm leading-relaxed ${
        onDark ? "text-night-body" : "text-body"
      }`}
    >
      {tier.features.map((f) =>
        "lead" in f && f.lead ? (
          <li
            key={f.text}
            className={`font-semibold ${onDark ? "text-night-ink" : "text-ink"}`}
          >
            {f.text}, plus:
          </li>
        ) : (
          <li
            key={f.text}
            className={`border-t pt-3 first:border-t-0 first:pt-0 ${
              onDark ? "border-night-line" : "border-line"
            }`}
          >
            {f.text}
          </li>
        )
      )}
    </ul>
  );
}

function PlainCard({ tier }: { tier: Tier }) {
  return (
    <div className="flex h-full flex-col rounded-[3px] border border-line bg-paper p-7">
      <h3 className="text-2xl">{tier.name}</h3>
      <p className="mt-2 text-sm text-body">{tier.tagline}</p>
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-semibold tabular-nums text-ink">
          {tier.price}
        </span>
        {tier.cadence && (
          <span className="text-sm text-muted">{tier.cadence}</span>
        )}
      </div>
      <FeatureList tier={tier} />
      <div className="mt-8">
        <Button href="#book" variant="primary" className="w-full">
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}

// The recommended tier inverts to night — elevation by contrast, not glow.
function HighlightCard({ tier }: { tier: Tier }) {
  return (
    <div className="flex h-full flex-col rounded-[3px] border border-night-line bg-night p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-2xl text-night-ink">{tier.name}</h3>
        <span className="whitespace-nowrap font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">
          Most popular
        </span>
      </div>
      <p className="mt-2 text-sm text-night-body">{tier.tagline}</p>
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-semibold tabular-nums text-night-ink">
          {tier.price}
        </span>
        {tier.cadence && (
          <span className="text-sm text-night-body">{tier.cadence}</span>
        )}
      </div>
      <FeatureList tier={tier} onDark />
      <div className="mt-8">
        <Button href="#book" variant="light" className="w-full">
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
