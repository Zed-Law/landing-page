import { Button } from "../Button";
import { GoldGradient } from "../GoldGradient";
import { StarIcon } from "../icons";

const chips = ["Fixed fees", "Hours, not days", "Senior counsel"];

export function FinalCta() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* animated grainy gold gradient background */}
          <GoldGradient className="absolute inset-0" />
          {/* fuzzy inner glows */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-gold-deep/40 blur-3xl" />

          <div className="relative">
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-ink" />
              ))}
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
              Top-tier counsel, on your side of the table
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-ink/70">
              Tell us what you&apos;re trying to get done. We&apos;ll tell you if
              we can help, and what it costs, on the first call.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2.5">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-ink/20 bg-white/30 px-4 py-1.5 text-sm font-medium text-ink"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-9 flex justify-center">
              <Button href="#book" size="lg" variant="primary">
                Book a discovery call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
