import { CalEmbed } from "../CalEmbed";

export function Booking() {
  return (
    <section id="book" className="bg-night">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-3xl">
          <h2 className="text-4xl leading-tight text-night-ink sm:text-5xl">
            Book a discovery call
          </h2>
          <p className="mt-5 max-w-[55ch] text-lg text-night-body">
            Tell us what you&apos;re working on. We&apos;ll tell you whether we
            can help before you&apos;ve spent a cent. No pitch, no pressure.
          </p>
        </div>

        <div className="mx-auto mt-8 h-[850px] max-w-4xl overflow-y-auto sm:h-[680px]">
          <CalEmbed />
        </div>
      </div>
    </section>
  );
}
