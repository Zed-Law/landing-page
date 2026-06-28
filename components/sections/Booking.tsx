import { CalEmbed } from "../CalEmbed";

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

        <div className="mx-auto mt-1 h-[850px] max-w-4xl overflow-y-auto sm:h-[680px]">
          <CalEmbed />
        </div>
      </div>
    </section>
  );
}
