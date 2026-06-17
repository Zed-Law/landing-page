import { Button } from "../Button";
import { CheckIcon } from "../icons";

const ROW_1 = ["Atlassian", "Canva", "Afterpay", "Xero", "Culture Amp", "SafetyCulture", "Deputy", "Zip Co"];
const ROW_2 = ["Airwallex", "Employment Hero", "Airtree", "Immutable", "Linktree", "Prospa", "Envato", "Vend"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* faint top glow + grid */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] gold-glow opacity-[0.18]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(#eef0f3 1px, transparent 1px), linear-gradient(90deg, #eef0f3 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(120% 80% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-24 text-center sm:px-8 sm:pt-32">
        <h1 className="mx-auto max-w-4xl text-[3.2rem] font-extrabold leading-[1.04] text-ink sm:text-7xl">
          Top-tier legal talent,
          <br className="hidden sm:block" /> without the top-tier{" "}
          <span className="text-gradient-gold">theatre.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-xl leading-relaxed text-body">
          Big-firm pedigree, boutique focus. Straight advice, fast turnarounds,
          and fees you can actually plan around.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="#book" size="lg" variant="primary">
            Book a discovery call
          </Button>
          <Button href="#zed-plus" size="lg" variant="ghost">
            Explore Zed Plus
          </Button>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
          <CheckIcon className="h-4 w-4 text-gold-deep" />
          No pitch, no pressure. We&apos;ll tell you if we can help before you
          spend a cent.
        </p>

        {/* Trusted by 500+ logo carousel */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl border border-line bg-white px-8 py-10 shadow-[0_30px_80px_-40px_rgba(3,20,40,0.15)]">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-muted">Trusted by</p>
              <p className="mt-1 text-4xl font-extrabold text-ink">500+ companies</p>
              <p className="mt-1 text-sm text-muted">across Australia and beyond</p>
            </div>
            <div className="overflow-hidden">
              <div className="flex w-max animate-marquee items-center gap-10">
                {[...ROW_1, ...ROW_1].map((name, i) => (
                  <span key={i} className="whitespace-nowrap text-base font-semibold tracking-tight text-ink/20">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 overflow-hidden">
              <div className="flex w-max animate-marquee-reverse items-center gap-10">
                {[...ROW_2, ...ROW_2].map((name, i) => (
                  <span key={i} className="whitespace-nowrap text-base font-semibold tracking-tight text-ink/20">
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
