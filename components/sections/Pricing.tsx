"use client";

import * as React from "react";
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
      "Everything in Basic, plus:",
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
      "Everything in Startup, plus:",
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
      "Everything in Growth, plus:",
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
      "Everything in Enterprise, plus:",
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
    <section id="zed-plus" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="max-w-3xl">
          {/* Orienting line above the brand: names the lighter option first so
              price-sensitive visitors don't bounce, while steering to Zed Plus. */}
          <p className="text-base text-body sm:text-lg">
            You can{" "}
            <a
              href="#per-engagement"
              className="text-ink underline decoration-accent/50 underline-offset-4 transition-colors duration-200 ease-out hover:decoration-accent"
            >
              engage us per matter
            </a>
            . Most teams go further and partner with us through
          </p>
          <h2 className="mt-4 text-display font-extrabold uppercase leading-none text-ink">
            Zed <span className="text-accent">Plus</span>
          </h2>
          <p className="mt-6 max-w-2xl text-xl font-medium text-ink sm:text-2xl">
            Counsel on retainer, priced to plan around.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            One monthly fee for ongoing legal support. No surprise bills, no
            six-minute increments. It&apos;s how most of our clients choose to
            work with us. Pick the level that fits and change it whenever you
            need to.
          </p>

          {/* Parachute: an included benefit, one hairline panel */}
          <div className="mt-10 border border-line bg-paper-2 p-6 sm:p-8">
            <a
              href="https://www.goparachute.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-muted transition-colors duration-200 ease-out hover:text-ink"
            >
              <span className="font-mono text-xs font-medium uppercase tracking-[0.14em]">
                Supercharged with
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PARACHUTE_LOGO}
                alt="Parachute"
                width={365}
                height={51}
                className="block h-4 w-auto brightness-0 invert sm:h-5"
              />
            </a>
            <p className="mt-3 text-lg font-medium text-ink">
              Legal AI, included with every retainer.
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-body">
              {parachuteCapabilities.join(" · ")}
            </p>
          </div>
        </div>

        {/* Pricing carousel */}
        <Carousel
          setApi={setApi}
          opts={{ loop: false, align: "start" }}
          className="mt-16"
        >
          <CarouselContent className="items-stretch">
            {tiers.map((tier) => (
              <CarouselItem
                key={tier.name}
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4"
              >
                <TierCard tier={tier} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center gap-4">
            <CarouselPrevious />
            <div className="flex gap-2">
              {tiers.map((tier, i) => (
                <button
                  key={tier.name}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to ${tier.name} plan`}
                  aria-current={i === current}
                  className={`h-1 transition-all duration-300 ease-out ${
                    i === current
                      ? "w-8 bg-accent"
                      : "w-3 bg-line hover:bg-muted"
                  }`}
                />
              ))}
            </div>
            <CarouselNext />
          </div>
        </Carousel>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.1em] text-muted">
          All prices in AUD, excluding GST. Change or cancel whenever you need
          to.
        </p>

        {/* Per-engagement: a deliberately understated alternative, kept
            outside the Zed Plus brand. Retainer stays the preferred path. */}
        <div id="per-engagement" className="mt-20 max-w-3xl scroll-mt-24">
          <div className="flex flex-col items-start gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex-1">
              <h3 className="font-display text-xl font-medium uppercase text-ink">
                Work with us per engagement
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
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

// One card voice for every tier; the recommended tier earns an amber frame
// and a mono tag, nothing louder.
function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`flex h-full flex-col border bg-paper-2 p-7 ${
        tier.highlight ? "border-accent" : "border-line"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-medium uppercase text-ink">
          {tier.name}
        </h3>
        {tier.highlight && (
          <span className="whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
            Most popular
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-body">{tier.tagline}</p>
      <div className="mt-7 flex items-baseline gap-2">
        <span className="font-display text-4xl font-extrabold tracking-tight text-ink">
          {tier.price}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
          {tier.cadence}
        </span>
      </div>
      <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6">
        {tier.features.map((text) =>
          text.endsWith(":") ? (
            <li
              key={text}
              className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink"
            >
              {text}
            </li>
          ) : (
            <li key={text} className="text-sm leading-relaxed text-body">
              {text}
            </li>
          )
        )}
      </ul>
      <div className="mt-8">
        <Button
          href="#book"
          variant={tier.highlight ? "primary" : "outline"}
          className="w-full"
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
