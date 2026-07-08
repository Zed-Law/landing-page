import { Fragment } from "react";
import Link from "next/link";
import { Button } from "../Button";
import { IntakeChip } from "../IntakeChip";

// Headline words for the typed-on intro. Each word renders as an
// inline-block of per-character spans, so lines still wrap at word
// boundaries while characters appear one by one.
const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: "Top-tier" },
  { text: "legals," },
  { text: "without" },
  { text: "the" },
  { text: "top-tier" },
  { text: "theatre.", accent: true },
];
const HEADLINE_PLAIN = HEADLINE.map((w) => w.text).join(" ");

const LOGO_BASE =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/client-logos";

type Logo = { name: string; file: string };

// Priority clients surface first, in the top row.
const ROW_1: Logo[] = [
  { name: "Lorikeet", file: "Lorikeet.svg" },
  { name: "EatClub", file: "EatClub.svg" },
  { name: "Athletic Ventures", file: "athletic-ventures.png" },
  { name: "Matilda Migration", file: "matilda-migration.svg" },
  { name: "Arc", file: "arc.png" },
  { name: "Beonic", file: "beonic.png" },
  { name: "CloudPay", file: "cloudpay.webp" },
  { name: "Kindling", file: "kindling.png" },
];

const ROW_2: Logo[] = [
  { name: "Plntd", file: "plntd.svg" },
  { name: "EasyKind", file: "easykind.webp" },
  { name: "DialAVet", file: "dialavet.webp" },
  { name: "Breathless", file: "breathless.webp" },
  { name: "Aurasens", file: "aurasens.png" },
  { name: "Co Ventures", file: "co-ventures.png" },
  { name: "Rays", file: "rays.png" },
  { name: "Nakatomi", file: "nakatomi.png" },
];

// One copy of a logo row. Rendered twice per track so the -50% translate
// loops seamlessly. The trailing `pr-12` matches the internal `gap-12`, so
// the spacing across the seam is identical to the spacing everywhere else —
// without it the loop point lands half a gap off and the marquee hitches.
function LogoGroup({ logos }: { logos: Logo[] }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {logos.map((logo) => (
        <img
          key={logo.name}
          src={`${LOGO_BASE}/${logo.file}`}
          alt={logo.name}
          className="h-7 w-auto shrink-0 object-contain opacity-45 brightness-0 transition-opacity hover:opacity-75 sm:h-8"
        />
      ))}
    </div>
  );
}

// Soft fade at the marquee edges so the logos dissolve into the paper
// instead of stopping at a hard line.
const edgeFade = {
  maskImage:
    "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
};

// Print-style hero: giant statement on paper, register line between rules,
// a stack of press lines, then the pitch reversed out in a night strip.
export function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8 sm:pt-8">
        <h1
          aria-label={HEADLINE_PLAIN}
          className="text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.015em] text-ink"
        >
          <span aria-hidden>
            {HEADLINE.map(({ text, accent }, wi) => (
              <Fragment key={wi}>
                {wi > 0 && " "}
                <span
                  className={`inline-block ${accent ? "text-accent-deep" : ""}`}
                >
                  {text}
                </span>
              </Fragment>
            ))}
          </span>
        </h1>

        {/* Press lines */}
        <div className="mt-3 space-y-[5px]" aria-hidden>
          <div className="h-px bg-ink/70" />
          <div className="h-px bg-ink/70" />
          <div className="h-[2px] bg-ink/70" />
          <div className="h-[3px] bg-ink/70" />
          <div className="h-[5px] bg-ink/70" />
        </div>

        {/* The pitch, reversed out */}
        <div className="mt-4 flex items-center justify-between gap-6 bg-night px-5 py-4 sm:px-7 sm:py-5">
          <p className="text-sm font-semibold leading-snug text-night-ink sm:whitespace-nowrap sm:text-xl">
            Big-firm pedigree. Straight advice, fast turnarounds, fair fees.
          </p>
          <span
            className="shrink-0 text-3xl leading-none text-accent"
            aria-hidden
          >
            ↓
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-20">
        <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Button href="#book" size="lg" variant="gold-solid">
            Book a discovery call
          </Button>
          <Link
            href="#zed-plus"
            className="text-sm font-medium text-body underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-accent-deep"
          >
            Explore Zed Plus →
          </Link>
          <IntakeChip />
        </div>

        {/* Trust: hairline rule, small-caps line, logo marquee */}
        <div className="mt-12 border-t border-line pt-8 sm:mt-20">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Trusted by 500+ companies across Australia and beyond
          </p>

          <div className="mt-8 overflow-hidden" style={edgeFade}>
            <div className="flex w-max animate-marquee items-center">
              <LogoGroup logos={ROW_1} />
              <LogoGroup logos={ROW_1} />
            </div>
          </div>
          <div className="mt-7 overflow-hidden" style={edgeFade}>
            <div className="flex w-max animate-marquee-reverse items-center">
              <LogoGroup logos={ROW_2} />
              <LogoGroup logos={ROW_2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
