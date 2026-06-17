const firms = ["Ashurst", "Herbert Smith Freehills", "KWM", "Baker McKenzie", "Clifford Chance"];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
      <div className="overflow-hidden rounded-2xl bg-night">
        <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center border-b border-white/10 px-6 py-4 sm:border-b-0 sm:border-r">
            <p className="text-sm font-medium leading-snug text-white/70">
              Our lawyers came
              <br className="hidden sm:block" /> from the best
            </p>
          </div>
          <div className="relative flex-1 overflow-hidden py-4">
            <div className="flex w-max animate-marquee items-center gap-12 px-6">
              {[...firms, ...firms].map((firm, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-base font-semibold tracking-tight text-white/40"
                >
                  {firm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
