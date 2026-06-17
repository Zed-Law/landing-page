import Aurora from "../Aurora";
import { Button } from "../Button";

const ROW_1 = ["Atlassian", "Canva", "Afterpay", "Xero", "Culture Amp", "SafetyCulture", "Deputy", "Zip Co"];
const ROW_2 = ["Airwallex", "Employment Hero", "Airtree", "Immutable", "Linktree", "Prospa", "Envato", "Vend"];

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

      <div className="relative mx-auto max-w-4xl px-5 pb-40 pt-32 text-center sm:px-8 sm:pb-52 sm:pt-32">
        <h1 className="mx-auto max-w-4xl text-[2.5rem] font-extrabold leading-[1.08] text-white sm:text-7xl sm:leading-[1.04]">
          Top-tier legal talent,
          <br className="hidden sm:block" /> without the top-tier{" "}
          <span className="text-gradient-gold">theatre.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-xl">
          Big-firm pedigree, boutique focus. Straight advice, fast turnarounds,
          and fees you can actually plan around.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:mt-9 sm:flex-row sm:gap-3">
          <Button href="#book" size="md" variant="light">
            Book a discovery call
          </Button>
          <Button href="#zed-plus" size="md" variant="outline-light">
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
            <div className="flex w-max animate-marquee items-center gap-10">
              {[...ROW_1, ...ROW_1].map((name, i) => (
                <span key={i} className="whitespace-nowrap text-base font-semibold tracking-tight text-white/25">
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 overflow-hidden" style={edgeFade}>
            <div className="flex w-max animate-marquee-reverse items-center gap-10">
              {[...ROW_2, ...ROW_2].map((name, i) => (
                <span key={i} className="whitespace-nowrap text-base font-semibold tracking-tight text-white/25">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
