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
      "Hands down the best legal professionals I’ve had the pleasure of working with. Approachable, humble, and insightful, their advice is always clear, practical, and impactful.",
    name: "Carolina Dreifuss",
    title: "Founder, SyncTechnologies",
    image: `${HEADSHOT_BASE}/carolina-dreifuss.jpeg`,
  },
  {
    quote:
      "I worried working with a lawyer would be slow, complicated and stressful. Zed Law was the complete opposite. Had my company registered and trademark submitted, all done by professionals. Couldn’t recommend them enough.",
    name: "Elliot Toms",
    title: "Founder, Oddity",
    image: `${HEADSHOT_BASE}/elliot-toms.jpeg`,
  },
  {
    quote:
      "Pragmatic, fairly priced, and a nice team to deal with. We’d 100% recommend Zed Law to support your business.",
    name: "Helena Turpin",
    title: "Co-Founder, GoFIGR",
    image: `${HEADSHOT_BASE}/helena-turpin.jpeg`,
  },
];

// One quote at a time, set big enough to earn the room. The carousel pauses
// on hover and on interaction.
export function Testimonial() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const autoplay = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="view-reveal text-center font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
          What clients say
        </h2>

        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="view-reveal mx-auto mt-12 max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name}>
                <figure className="px-2 text-center sm:px-10">
                  <blockquote className="text-2xl font-medium leading-snug text-ink [font-family:var(--font-jubilee-heading)] sm:text-[2.4rem] sm:leading-[1.25]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-10 flex items-center justify-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      {t.name} · {t.title}
                    </p>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Dots + arrows — inside Carousel so context is available */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <CarouselPrevious />
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to testimonial from ${t.name}`}
                  aria-current={i === current}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-ink/40"
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
