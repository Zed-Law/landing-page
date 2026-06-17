export function Testimonial() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <h2 className="text-center text-3xl font-extrabold text-ink sm:text-[2.6rem]">
          What clients tell us
        </h2>

        <div className="mt-12 overflow-hidden rounded-2xl bg-night">
          <div className="grid lg:grid-cols-2">
            {/* Copy */}
            <div className="flex flex-col justify-between p-8 sm:p-12">
              <div>
                <p className="text-5xl font-extrabold text-gradient-gold sm:text-6xl">
                  3 weeks
                </p>
                <p className="mt-2 text-sm font-medium text-white/50">
                  from founder buyout to signed
                </p>
                <blockquote className="mt-8 text-xl font-medium leading-relaxed text-white sm:text-2xl">
                  &ldquo;Zed closed our buyout and TopCo restructure in three
                  weeks. They told us the two things that actually mattered, gave
                  us a recommendation, and got out of the way. It felt like
                  having a partner, not a panel.&rdquo;
                </blockquote>
              </div>
              <div className="mt-10 flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-white/10" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    [ Client name ]
                  </p>
                  <p className="text-sm text-white/50">
                    Founder &amp; CEO, [ Company ]
                  </p>
                </div>
              </div>
            </div>

            {/* Placeholder image */}
            <div className="relative min-h-[260px] bg-night-soft lg:min-h-full">
              <div className="absolute inset-0 flex items-center justify-center dark-grid">
                <span className="text-sm font-medium text-white/30">
                  [ Client photo placeholder ]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel dots (static placeholder) */}
        <div className="mt-6 flex justify-center gap-2">
          <span className="h-1.5 w-6 rounded-full bg-ink" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
        </div>
      </div>
    </section>
  );
}
