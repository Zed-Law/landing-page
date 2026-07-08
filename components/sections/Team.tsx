"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const HEADSHOT_BASE =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-landing-components/lawyer-profiles";

const team = [
  {
    name: "Nandan Subramaniam",
    role: "Principal",
    image: `${HEADSHOT_BASE}/nandan-profile.webp`,
    bio: "Top-tier firm training and in-house experience at one of Australia's leading VC-backed startups. Advises on capital raising, M&A, structuring and governance, from early-stage founders to ASX-listed companies.",
    linkedin: "https://www.linkedin.com/in/nandan-subramaniam-0b394ba4/",
  },
  {
    name: "Ryan Zahrai",
    role: "Founder",
    image: `${HEADSHOT_BASE}/ryan-profile.webp`,
    bio: "Built Zed to change how clients experience working with lawyers. Full-stack AI paired with human expertise, so you get deliverables faster, with the commerciality of a business owner.",
    linkedin: "https://www.linkedin.com/in/rzahrai/",
  },
  {
    name: "Phillip Kilazoglou",
    role: "Lawyer",
    image: `${HEADSHOT_BASE}/phillip-profile.webp`,
    bio: "Leads the corporate and commercial function at Zed Law. Advises on M&A, venture capital and private equity, with a reputation for pragmatic advice aligned with your broader business goals.",
    linkedin: "https://www.linkedin.com/in/phillipkilazoglou/",
  },
  {
    name: "Thilini Samarawickrama",
    role: "Lawyer",
    image: `${HEADSHOT_BASE}/thilini-profile.webp`,
    bio: "Drafts and negotiates commercial agreements and advises on regulatory compliance, licensing and governance across jurisdictions. Partners closely with product and operations teams to deliver practical solutions.",
    linkedin: "https://www.linkedin.com/in/thilini-samarawickrama-60245b24/",
  },
];

export function Team() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section id="team" className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="view-reveal max-w-3xl">
          <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
            Your legal team
          </p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
            Meet your counsel
          </h2>
          <p className="mt-5 max-w-[58ch] text-lg text-body">
            Straightforward advice from lawyers with big-firm pedigree.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ loop: false, align: "start" }}
          className="view-reveal mt-12"
        >
          <CarouselContent className="items-stretch">
            {team.map((member) => (
              <CarouselItem
                key={member.name}
                // `!` because CarouselItem's own `basis-full` wins the
                // stylesheet-order fight against an unimportant override,
                // leaving cards full-width with no peek of the next one.
                // Widths sit just under the even split at every breakpoint
                // so the next card always peeks in as a swipe cue.
                className="pl-4 basis-[70%]! sm:basis-[45%]! lg:basis-[30%]!"
              >
                <ProfileCard member={member} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselPrevious aria-label="Previous team member" />

            <div className="flex gap-2">
              {team.map((member, i) => (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to ${member.name}`}
                  aria-current={i === current}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>

            <CarouselNext aria-label="Next team member" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

type Member = (typeof team)[number];

const LinkedInIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

// Portrait card. From md up, hovering (or keyboard-focusing) the photo
// fades the bio in over it — unchanged. Below md, hover doesn't exist, so
// tapping the photo instead flips the whole card to a back face holding
// the bio and LinkedIn link; a small badge hints that the photo is
// tappable.
function ProfileCard({ member }: { member: Member }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-line bg-paper">
      <div className="relative aspect-square [perspective:1200px] md:[perspective:none]">
        <div
          className={`relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none md:!transform-none ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-night [backface-visibility:hidden]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            {/* Tap target + hint badge — mobile only, hover handles it above md */}
            <button
              type="button"
              onClick={() => setFlipped(true)}
              aria-label={`Show bio for ${member.name}`}
              className="absolute inset-0 md:hidden"
            />
            <span
              className="pointer-events-none absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm md:hidden"
              aria-hidden
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="7" y1="1.5" x2="7" y2="12.5" />
                <line x1="1.5" y1="7" x2="12.5" y2="7" />
              </svg>
            </span>

            {/* Bio overlay — fades in over the portrait on hover/focus, md+ only */}
            <div className="absolute inset-0 hidden flex-col justify-end gap-5 bg-night/95 p-6 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100 md:flex">
              <p className="text-sm leading-relaxed text-night-body">
                {member.bio}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent transition-colors hover:text-night-ink"
              >
                {LinkedInIcon}
                LinkedIn
                <span className="sr-only"> profile of {member.name}</span>
              </a>
            </div>
          </div>

          {/* Back — mobile only */}
          <div className="absolute inset-0 flex flex-col justify-center gap-4 bg-night p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] md:hidden">
            <p className="text-sm leading-relaxed text-night-body">
              {member.bio}
            </p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent transition-colors hover:text-night-ink"
            >
              {LinkedInIcon}
              LinkedIn
              <span className="sr-only"> profile of {member.name}</span>
            </a>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              aria-label={`Hide bio for ${member.name}`}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-paper/10 text-night-ink"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="1.5" y1="1.5" x2="12.5" y2="12.5" />
                <line x1="12.5" y1="1.5" x2="1.5" y2="12.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5 py-4">
        <h3 className="text-xl">{member.name}</h3>
        <p className="mt-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
          {member.role}
        </p>
      </div>
    </div>
  );
}
