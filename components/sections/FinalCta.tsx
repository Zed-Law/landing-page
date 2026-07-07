import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { StarIcon } from "../icons";

const awards = [
  {
    src: "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/awards/future-legal-leader.png",
    alt: "Future Legal Leader award",
  },
  {
    src: "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/awards/finalist.png",
    alt: "Finalist award",
  },
  {
    src: "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/awards/cub-awards.png",
    alt: "CUB Awards",
  },
];

// Closing statement: snaps into view, headline at full display size,
// proof (stars + awards) beneath, one CTA.
export function FinalCta() {
  return (
    <section className="flex min-h-[100dvh] snap-start flex-col justify-center border-t border-line bg-paper">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-2.5">
            {/* Google G */}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Google" role="img">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57C21.36 18.34 22.56 15.52 22.56 12.25z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-accent" />
              ))}
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Based on Google Reviews
            </span>
          </div>
        </Reveal>

        <Reveal index={1}>
          <h2 className="mt-8 max-w-5xl text-display font-extrabold uppercase text-ink">
            <span className="whitespace-nowrap">Top-tier</span> counsel, on{" "}
            <span className="text-accent">your side</span> of the table
          </h2>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-7 max-w-md text-base leading-relaxed text-body sm:text-lg">
            Tell us what you&apos;re trying to get done. We&apos;ll tell you if
            we can help, and follow up with a clear quote.
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
            <Button href="#book" size="lg">
              Book a discovery call
            </Button>

            <div className="flex flex-wrap items-center gap-6">
              {awards.map((award) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={award.alt}
                  src={award.src}
                  alt={award.alt}
                  className="h-14 w-auto object-contain opacity-80 sm:h-16"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
