"use client";

import * as React from "react";
import { Fragment } from "react";
import { Button } from "../Button";
import { GoldGradient } from "../GoldGradient";
import { ShinyText } from "../ShinyText";
import { SpotlightCard } from "../SpotlightCard";
import { CheckIcon } from "../icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const PARACHUTE_LOGO =
  "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/client-logos/parachute.svg";

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
      "Parachute legal AI access (up to 4 seats)",
      "Light touch support",
      "3 × 30 min advice calls per month",
      "9am – 5pm Mon-Fri availability",
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
      "Everything in Basic",
      "2-business day advice turnaround",
      "9am – 5pm Mon-Fri availability",
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
      "Everything in Startup",
      "1-business day advice turnaround",
      "9am – 7pm Mon-Fri availability",
      "Access to all Zed Law contract templates",
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
      "Everything in Growth",
      "Fractional full-suite legal support as external counsel",
      "Operate from a legal@yourcompany account",
      "9am – 9pm availability",
      "Priority offers across all Zed Partners",
      "Dedicated Zed Lawyer as your primary contact",
      "Optional integration into your business systems",
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
      "Everything in Enterprise",
      "Dedicated full-time legal resource on demand",
      "2 × full days on site",
      "Project work capped at $400/hour",
      "9am – 11pm availability",
      "Dedicated integrations (Slack, Notion, G Suite)",
      "Priority access to a Zed Principal as General Counsel",
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

        {/* Pricing carousel */}
        <Carousel
          setApi={setApi}
          opts={{ loop: false, align: "start" }}
          className="mt-14"
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

          <div className="mt-6 flex items-center justify-center gap-4">
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
    <div className="relative h-full">
      {/* fuzzy gold bloom behind the card */}
      <div className="pointer-events-none absolute -inset-6 gold-glow opacity-70 blur-2xl" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl p-8 shadow-[0_30px_70px_-30px_rgba(226,162,60,0.7)]">
        {/* animated grainy gold gradient background */}
        <GoldGradient className="absolute inset-0" />
        {/* inner soft glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/40 blur-3xl" />
        <div className="relative flex h-full flex-col">
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
          <ul className="mt-7 flex-1 space-y-3.5">
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
              variant="primary-lift"
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
