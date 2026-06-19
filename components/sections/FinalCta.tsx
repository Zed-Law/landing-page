import { Button } from "../Button";
import { GoldGradient } from "../GoldGradient";
import { StarIcon } from "../icons";

const awards = [
  {
    src: "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/awards/future-legal-leader.png",
    alt: "Future Legal Leader award",
  },
  {
    src: "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/awards/finalist.png",
    alt: "Finalist award",
  },
  {
    src: "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/awards/cub-awards.png",
    alt: "CUB Awards",
  },
];

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
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2.5">
                {/* Google G */}
                <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google" role="img">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C21.36 18.34 22.56 15.52 22.56 12.25z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="h-4 w-px bg-ink/20" aria-hidden />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-ink" />
                  ))}
                </div>
              </div>
              <p className="text-xs font-medium text-ink/50">Based on Google Reviews</p>
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
              Top-tier counsel, on your side of the table
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-ink/70">
              Tell us what you&apos;re trying to get done. We&apos;ll tell you if
              we can help, and follow up with a clear quote.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              {awards.map((award) => (
                <div
                  key={award.alt}
                  className="rounded-xl ring-1 ring-ink/10 bg-white/20 p-1.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={award.src}
                    alt={award.alt}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="mt-9 flex justify-center">
              <Button href="#book" size="lg" variant="primary-lift">
                Book a discovery call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
