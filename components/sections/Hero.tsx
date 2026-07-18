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

const HERO_IMG_BASE =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/hero-images";

const PHOTOS = {
  storyteller: {
    src: `${HERO_IMG_BASE}/storyteller-shot.jpeg`,
    alt: "The Zed Law team recording a podcast episode in the studio",
  },
  conference: {
    src: `${HERO_IMG_BASE}/conference%20shot.jpeg`,
    alt: "Zed Law team members at an industry conference",
  },
} as const;

type Logo = {
  name: string;
  file: string;
  sizeClassName?: string;
  /** Actual rendered height of the <img>, when it needs to be scaled up and
   * cropped to the row height — e.g. a wordmark sitting in a mostly-empty
   * square canvas, where scaling to the row height alone leaves it tiny. */
  imgClassName?: string;
};

// Priority clients surface first, in the top row.
const ROW_1: Logo[] = [
  { name: "Lorikeet", file: "Lorikeet.svg" },
  { name: "EatClub", file: "EatClub.svg" },
  { name: "Athletic Ventures", file: "athletic-ventures.png" },
  { name: "Matilda Migration", file: "matilda-migration.svg" },
  { name: "Arc", file: "arc.png" },
  { name: "Beonic", file: "beonic.png" },
  { name: "CloudPay", file: "cloudpay.webp" },
  { name: "Kindling", file: "kindling-v2.png", imgClassName: "h-32 sm:h-36" },
];

const ROW_2: Logo[] = [
  { name: "Plntd", file: "plntd.svg", sizeClassName: "h-4 sm:h-5" },
  { name: "EasyKind", file: "easykind.webp" },
  { name: "DialAVet", file: "dialavet.webp" },
  { name: "Breathless", file: "breathless.webp" },
  { name: "Aurasens", file: "aurasens.png" },
  { name: "Co Ventures", file: "co-ventures-v3.svg" },
  { name: "Rays", file: "rays.png" },
  { name: "Nakatomi", file: "nakatomi.svg", sizeClassName: "h-5 sm:h-6" },
];

// One copy of a logo row. Rendered twice per track so the -50% translate
// loops seamlessly. The trailing `pr-12` matches the internal `gap-12`, so
// the spacing across the seam is identical to the spacing everywhere else —
// without it the loop point lands half a gap off and the marquee hitches.
function LogoGroup({ logos }: { logos: Logo[] }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {logos.map((logo) =>
        logo.imgClassName ? (
          <div
            key={logo.name}
            className={`flex shrink-0 items-center overflow-hidden ${logo.sizeClassName ?? "h-7 sm:h-8"}`}
          >
            <img
              src={`${LOGO_BASE}/${logo.file}`}
              alt={logo.name}
              className={`w-auto object-contain opacity-45 brightness-0 transition-opacity hover:opacity-75 ${logo.imgClassName}`}
            />
          </div>
        ) : (
          <img
            key={logo.name}
            src={`${LOGO_BASE}/${logo.file}`}
            alt={logo.name}
            className={`w-auto shrink-0 object-contain opacity-45 brightness-0 transition-opacity hover:opacity-75 ${logo.sizeClassName ?? "h-7 sm:h-8"}`}
          />
        ),
      )}
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

// A photographic print: white matte border, soft warm shadow, slight tilt.
function PhotoPrint({
  photo,
  className,
}: {
  photo: { src: string; alt: string };
  className?: string;
}) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      decoding="async"
      className={`border-[6px] border-white object-cover shadow-[0_10px_26px_rgba(30,24,12,0.22)] ${className ?? ""}`}
    />
  );
}

// Print-style hero: giant statement on paper, register line between rules,
// the pitch reversed out in a night strip, then the CTA row with two team
// prints fanned beside it like snapshots left on the desk.
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

      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
        <div className="mt-9 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
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

          {/* Two team prints fanned side by side, snapshots on the desk */}
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <PhotoPrint
              photo={PHOTOS.conference}
              className="w-[52%] rotate-[-5deg]"
            />
            <PhotoPrint
              photo={PHOTOS.storyteller}
              className="-ml-6 w-[56%] rotate-[4deg]"
            />
          </div>
        </div>

        {/* Trust: hairline rule, small-caps line, logo marquee */}
        <div className="mt-12 border-t border-line pt-8 sm:mt-16">
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
