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

const FERN_BASE =
  "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/misc-ui";
const HEADSHOT_BASE =
  "https://md9kcpfkxv7xttab.public.blob.vercel-storage.com/zed-landing-components/testimonial/headshots";

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

export function Testimonial() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
        {/* Heading */}
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <img src={`${FERN_BASE}/left%20fern.svg`} alt="" aria-hidden="true" className="h-10 w-auto shrink-0 sm:h-14" />
          <h2 className="text-center text-3xl font-extrabold text-ink sm:text-[2.6rem]">
            What clients tell us
          </h2>
          <img src={`${FERN_BASE}/right%20fern.svg`} alt="" aria-hidden="true" className="h-10 w-auto shrink-0 sm:h-14" />
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="mt-12 mx-auto max-w-3xl"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name}>
                <div className="rounded-2xl bg-white px-8 py-10 sm:px-14 sm:py-14">
                  <blockquote className="text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                    {t.quote}
                  </blockquote>

                  <div className="mt-10 border-t border-line pt-6 flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-line"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-sm text-ink/50">{t.title}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Dots + arrows — inside Carousel so context is available */}
          <div className="mt-1 flex items-center justify-center gap-4">
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
