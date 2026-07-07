"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const HEADSHOT_BASE =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/testimonial/headshots";

const testimonials = [
  {
    quote:
      "Hands down the best legal professionals I've had the pleasure of working with. Approachable, humble, and insightful, their advice is always clear, practical, and impactful.",
    name: "Carolina Dreifuss",
    title: "Founder, SyncTechnologies",
    image: `${HEADSHOT_BASE}/carolina-dreifuss.jpeg`,
  },
  {
    quote:
      "I worried working with a lawyer would be slow, complicated and stressful. Zed Law was the complete opposite. Had my company registered and trademark submitted, all done by professionals. Couldn't recommend them enough.",
    name: "Elliot Toms",
    title: "Founder, Oddity",
    image: `${HEADSHOT_BASE}/elliot-toms.jpeg`,
  },
  {
    quote:
      "Pragmatic, fairly priced, and a nice team to deal with. We'd 100% recommend Zed Law to support your business.",
    name: "Helena Turpin",
    title: "Co-Founder, GoFIGR",
    image: `${HEADSHOT_BASE}/helena-turpin.jpeg`,
  },
];

// Statement moment: the quote is the section. Snaps into view; the quote is
// set in display type at reading weight, attribution in mono.
export function Testimonial() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="flex min-h-[100dvh] snap-start flex-col justify-center bg-paper">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          What clients say about us
        </p>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="mt-10"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name}>
                <blockquote className="max-w-5xl font-display text-2xl font-medium leading-snug text-ink sm:text-4xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-10 flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div className="font-mono text-xs uppercase tracking-[0.1em]">
                    <p className="text-ink">{t.name}</p>
                    <p className="mt-1 text-muted">{t.title}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Dots + arrows — inside Carousel so context is available */}
          <div className="mt-12 flex items-center gap-4">
            <CarouselPrevious />
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to testimonial from ${t.name}`}
                  aria-current={i === current}
                  className={`h-1 transition-all duration-300 ease-out ${
                    i === current
                      ? "w-8 bg-accent"
                      : "w-3 bg-line hover:bg-muted"
                  }`}
                />
              ))}
            </div>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
