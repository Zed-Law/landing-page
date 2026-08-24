import { Button } from "./Button";

// Closes every blog post — sends readers to the booking widget on the homepage.
export function BlogCta() {
  return (
    <aside className="mt-16 rounded-[3px] border border-night-line bg-night px-6 py-12 text-center sm:px-10 sm:py-14">
      <h2 className="mx-auto max-w-[18ch] text-3xl leading-tight text-night-ink sm:text-4xl">
        Top-tier counsel, on your side of the table
      </h2>
      <p className="mx-auto mt-5 max-w-md text-base text-night-body sm:text-lg">
        Tell us what you&apos;re trying to get done. We&apos;ll tell you if we
        can help, and follow up with a clear quote.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/#book" size="lg" variant="light">
          Book a discovery call
        </Button>
      </div>
    </aside>
  );
}
