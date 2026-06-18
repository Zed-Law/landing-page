"use client";

import { useState } from "react";

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
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <img
            src={`${FERN_BASE}/left%20fern.svg`}
            alt=""
            aria-hidden="true"
            className="h-10 w-auto shrink-0 sm:h-14"
          />
          <h2 className="text-center text-3xl font-extrabold text-ink sm:text-[2.6rem]">
            What clients tell us
          </h2>
          <img
            src={`${FERN_BASE}/right%20fern.svg`}
            alt=""
            aria-hidden="true"
            className="h-10 w-auto shrink-0 sm:h-14"
          />
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-night">
          <div className="grid lg:grid-cols-2">
            {/* Copy */}
            <div className="flex flex-col justify-between p-8 sm:p-12">
              <blockquote className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <div className="mt-10">
                <p className="text-sm font-semibold text-white">
                  {current.name}
                </p>
                <p className="text-sm text-white/50">{current.title}</p>
              </div>
            </div>

            {/* Client photo */}
            <div className="relative min-h-[260px] bg-night-soft lg:min-h-full">
              <img
                src={current.image}
                alt={current.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
