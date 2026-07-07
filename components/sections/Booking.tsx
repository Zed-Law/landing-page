import { CalEmbed } from "../CalEmbed";
import { Reveal } from "../Reveal";

export function Booking() {
  return (
    <section id="book" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <Reveal>
          <h2 className="max-w-3xl text-display-s font-extrabold uppercase text-ink">
            Book a discovery <span className="text-accent">call</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            Tell us what you&apos;re working on. We&apos;ll tell you whether we
            can help before you&apos;ve spent a cent. No pitch, no pressure.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 h-[850px] max-w-4xl overflow-y-auto sm:h-[680px]">
          <CalEmbed />
        </div>
      </div>
    </section>
  );
}
