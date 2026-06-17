import Aurora from "../Aurora";
import { Button } from "../Button";
import { CheckIcon } from "../icons";

const ROW_1 = ["Atlassian", "Canva", "Afterpay", "Xero", "Culture Amp", "SafetyCulture", "Deputy", "Zip Co"];
const ROW_2 = ["Airwallex", "Employment Hero", "Airtree", "Immutable", "Linktree", "Prospa", "Envato", "Vend"];

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

      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-32">
        <h1 className="mx-auto max-w-4xl text-[3.2rem] font-extrabold leading-[1.04] text-white sm:text-7xl">
          Top-tier legal talent,
          <br className="hidden sm:block" /> without the top-tier{" "}
          <span className="text-gradient-gold">theatre.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-xl leading-relaxed text-white/70">
          Big-firm pedigree, boutique focus. Straight advice, fast turnarounds,
          and fees you can actually plan around.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#book" size="lg" variant="light">
            Book a discovery call
          </Button>
          <Button href="#zed-plus" size="lg" variant="outline-light">
            Explore Zed Plus
          </Button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
          <CheckIcon className="h-4 w-4 text-gold" />
          No pitch, no pressure. We&apos;ll tell you if we can help before you
          spend a cent.
        </p>

        {/* Trusted by 500+ logo carousel */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-white/50">Trusted by</p>
              <p className="mt-1 text-4xl font-extrabold text-white">500+ companies</p>
              <p className="mt-1 text-sm text-white/40">across Australia and beyond</p>
            </div>
            <div className="overflow-hidden">
              <div className="flex w-max animate-marquee items-center gap-10">
                {[...ROW_1, ...ROW_1].map((name, i) => (
                  <span key={i} className="whitespace-nowrap text-base font-semibold tracking-tight text-white/25">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 overflow-hidden">
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
      </div>
    </section>
  );
}
