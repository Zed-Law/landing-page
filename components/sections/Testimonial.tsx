"use client";

import { useState, useEffect, useRef } from "react";

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
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const pendingRef = useRef<number | null>(null);

  const navigate = (nextIndex: number, dir: "left" | "right") => {
    setDirection(dir);
    setVisible(false);
    pendingRef.current = nextIndex;
  };

  useEffect(() => {
    if (!visible && pendingRef.current !== null) {
      const t = setTimeout(() => {
        setActive(pendingRef.current!);
        pendingRef.current = null;
        setVisible(true);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const prev = () =>
    navigate((active - 1 + testimonials.length) % testimonials.length, "left");
  const next = () =>
    navigate((active + 1) % testimonials.length, "right");

  const current = testimonials[active];

  const slideClass = visible
    ? "opacity-100 translate-x-0 transition-all duration-300 ease-out"
    : direction === "right"
    ? "opacity-0 -translate-x-4 transition-all duration-200 ease-in"
    : "opacity-0 translate-x-4 transition-all duration-200 ease-in";

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

        <div className="mt-12 mx-auto max-w-3xl rounded-2xl bg-white px-8 py-10 sm:px-14 sm:py-14">
          <div className={slideClass}>
            {/* Quote */}
            <blockquote className="text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              {current.quote}
            </blockquote>

            {/* Divider + footer row */}
            <div className="mt-10 border-t border-line pt-6 flex items-center justify-between gap-4">
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-line"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{current.name}</p>
                  <p className="text-sm text-ink/50">{current.title}</p>
                </div>
              </div>

              {/* Prev / next arrows */}
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:bg-stone"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:bg-stone"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => navigate(i, i > active ? "right" : "left")}
              aria-label={`Go to testimonial from ${t.name}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
