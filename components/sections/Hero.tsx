import Aurora from "../Aurora";
import { Button } from "../Button";
import { IntakeChip } from "../IntakeChip";

const LOGO_BASE =
  "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/client-logos";

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
          className="h-7 w-auto shrink-0 object-contain opacity-50 brightness-0 invert transition-opacity hover:opacity-90 sm:h-8"
        />
      ))}
    </div>
  );
}

// Soft fade at the marquee edges so the logos dissolve into the dark hero
// instead of stopping at a hard line.
const edgeFade = {
  maskImage:
    "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
  WebkitMaskImage:
    "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-night">
      {/* Aurora WebGL backdrop, gold brand stops, fading out toward the page */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px]"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 50% 0%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%, black 30%, transparent 80%)",
        }}
      >
        <Aurora
          colorStops={["#f8dca0", "#f1bf65", "#e2a23c"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Contrast scrim: darkens the centre band (where the bright aurora and
          the headline overlap) so white text stays legible, while the gold
          keeps glowing toward the edges and top. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px]"
        style={{
          background:
            "radial-gradient(115% 75% at 50% 38%, rgba(5,10,20,0.62) 0%, rgba(5,10,20,0.28) 55%, rgba(5,10,20,0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 pb-28 pt-32 text-center sm:px-8 sm:pb-36 sm:pt-32">
        <h1 className="mx-auto max-w-4xl text-[3rem] font-extrabold leading-[1.05] text-white sm:text-7xl sm:leading-[1.04]">
          Top-tier legals,
          <br className="hidden sm:block" /> without the top-tier{" "}
          <span className="text-gradient-gold">theatre.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:mt-6 sm:text-xl">
          Big-firm pedigree, boutique focus. Straight advice, fast turnarounds,
          and fees you can actually plan around.
        </p>

        <div className="mt-6 flex justify-center sm:mt-7">
          <IntakeChip />
        </div>

        <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:mt-7 sm:flex-row sm:gap-3">
          <Button href="#book" size="md" variant="light" className="sm:pl-7 sm:pr-2.5 sm:py-2.5 sm:text-base">
            Book a discovery call
          </Button>
          <Button href="#zed-plus" size="md" variant="outline-light" className="sm:pl-7 sm:pr-2.5 sm:py-2.5 sm:text-base">
            Explore Zed Plus
          </Button>
        </div>

        {/* Trusted by 500+ logo carousel — borderless, sits on the dark hero */}
        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="mb-9 text-center">
            <p className="text-sm font-medium text-white/40">
              Trusted by
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-white">
              500+ <span className="font-medium text-white/85">companies</span>
            </p>
            <p className="mt-2.5 text-sm text-white/40">
              across Australia and beyond
            </p>
          </div>
          <div className="overflow-hidden" style={edgeFade}>
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
