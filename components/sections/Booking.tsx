import { ClockIcon, UsersIcon, CheckIcon } from "../icons";

export function Booking() {
  return (
    <section id="book" className="relative overflow-hidden bg-night">
      <div className="absolute inset-0 dark-grid opacity-60" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 gold-glow opacity-25 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-[2.6rem]">
            Book a discovery call
          </h2>
          <p className="mt-5 text-lg text-white/60">
            Tell us what you&apos;re working on. We&apos;ll tell you whether we
            can help before you&apos;ve spent a cent. No pitch, no pressure.
          </p>
        </div>

        {/* Placeholder for the cal.com embed */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-night-soft p-2">
          <div className="grid gap-px overflow-hidden rounded-xl bg-white/5 md:grid-cols-[1fr_1.3fr]">
            {/* Detail panel */}
            <div className="bg-night-soft p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10" />
                <span className="text-sm text-white/50">Zed Law</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">
                Discovery call
              </h3>
              <p className="mt-2 text-sm text-white/50">
                A short call to understand your matter and whether we&apos;re the
                right fit.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2.5">
                  <ClockIcon className="h-4 w-4 text-gold" />
                  30 minutes
                </li>
                <li className="flex items-center gap-2.5">
                  <UsersIcon className="h-4 w-4 text-gold" />
                  Google Meet or phone
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 text-gold" />
                  Senior lawyer, not a sales rep
                </li>
              </ul>
            </div>

            {/* Calendar placeholder */}
            <div className="flex flex-col bg-night-soft p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-white">June 2026</span>
                <div className="flex gap-1.5">
                  <span className="h-6 w-6 rounded-md bg-white/5" />
                  <span className="h-6 w-6 rounded-md bg-white/5" />
                </div>
              </div>
              <div className="grid flex-1 grid-cols-7 gap-1.5">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex aspect-square items-center justify-center rounded-md text-xs ${
                      i % 9 === 4
                        ? "bg-gold/15 text-gold"
                        : "bg-white/[0.03] text-white/30"
                    }`}
                  >
                    {i > 3 && i < 34 ? i - 3 : ""}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-xs text-white/40">
                [ cal.com booking embed goes here ]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
