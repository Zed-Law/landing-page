import { Navbar } from "@/components/Navbar";
import { CalEmbed } from "@/components/CalEmbed";
import type { Referrer } from "@/sanity";

// A focused, single-purpose booking page for a specific lawyer's outreach link
// (e.g. /meet-phil). Minimal chrome — the site navbar, a one-line heading, and
// that lawyer's Cal.com calendar — so it works as a direct link dropped into an
// email or DM.
export function IndividualBooking({
  name,
  calLink,
  namespace,
  lawyer,
  referrer = null,
}: {
  name: string;
  calLink: string;
  namespace: string;
  lawyer: string;
  referrer?: Referrer | null;
}) {
  return (
    <>
      <Navbar referrer={referrer} />
      <main className="flex flex-1 flex-col bg-night px-5 py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
          <header className="max-w-2xl">
            <h1 className="text-3xl leading-tight text-night-ink sm:text-4xl">
              Book a 15-minute intro call with {name}
            </h1>
            <p className="mt-4 text-lg text-night-body">
              Pick a time that suits you and we&apos;ll have a quick chat about
              what you&apos;re working on.
            </p>
          </header>

          <div className="mt-8 flex-1">
            <CalEmbed calLink={calLink} namespace={namespace} lawyer={lawyer} />
          </div>
        </div>
      </main>
    </>
  );
}
