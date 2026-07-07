import { Button } from "../Button";
import { IntakeChip } from "../IntakeChip";
import { Reveal } from "../Reveal";

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
          className="h-6 w-auto shrink-0 object-contain opacity-45 brightness-0 invert transition-opacity duration-200 ease-out hover:opacity-90 sm:h-7"
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

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] snap-start flex-col overflow-hidden bg-paper pt-24 sm:pt-28">
      {/* Left-biased typographic hero — the headline is the image. flex-1 +
          justify-center splits the viewport slack evenly around the copy
          instead of piling it all up against the marquee. */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 py-8 sm:px-8 lg:px-10">
        <Reveal>
          <IntakeChip />
        </Reveal>

        <Reveal index={1}>
          <h1 className="mt-6 max-w-6xl text-display font-extrabold uppercase text-ink">
            <span className="whitespace-nowrap">Top-tier</span> legals,
            without the <span className="whitespace-nowrap">top-tier</span>{" "}
            <span className="text-accent">theatre.</span>
          </h1>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-body sm:text-xl">
            Big-firm pedigree, boutique focus. Straight advice, fast
            turnarounds, and fees you can actually plan around.
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#book" size="lg">
              Book a discovery call
            </Button>
            <Button href="#zed-plus" size="lg" variant="outline">
              Explore Zed Plus
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Proof strip pinned to the bottom of the viewport */}
      <Reveal index={4} className="w-full pb-10">
        <p className="mx-auto max-w-7xl px-5 font-mono text-xs uppercase tracking-[0.14em] text-muted sm:px-8 lg:px-10">
          Trusted by 500+ companies across Australia and beyond
        </p>
        <div className="mt-6 overflow-hidden" style={edgeFade}>
          <div className="flex w-max animate-marquee items-center">
            <LogoGroup logos={ROW_1} />
            <LogoGroup logos={ROW_1} />
          </div>
        </div>
        <div className="mt-6 overflow-hidden" style={edgeFade}>
          <div className="flex w-max animate-marquee-reverse items-center">
            <LogoGroup logos={ROW_2} />
            <LogoGroup logos={ROW_2} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
