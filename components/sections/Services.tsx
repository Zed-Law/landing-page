"use client";

import { useState } from "react";
import {
  DocIcon,
  HandshakeIcon,
  ShieldIcon,
  GavelIcon,
  UsersIcon,
  GlobeIcon,
  ScrollIcon,
  BriefcaseIcon,
} from "../icons";

const services = [
  {
    icon: DocIcon,
    title: "Commercial",
    body: "Contracts, structuring and compliance for a growing business.",
  },
  {
    icon: HandshakeIcon,
    title: "Corporate and M&A",
    body: "Capital raises and deals on both sides, from term sheet to close.",
  },
  {
    icon: ShieldIcon,
    title: "Health and regulatory",
    body: "Specialist counsel for regulated health and telehealth businesses.",
  },
  {
    icon: GavelIcon,
    title: "Dispute resolution",
    body: "Resolving disputes quickly, with litigation as the last resort.",
  },
  {
    icon: UsersIcon,
    title: "Employment",
    body: "Acting for employers and employees, contracts to disputes.",
  },
  {
    icon: GlobeIcon,
    title: "Migration",
    body: "Bringing talent to Australia, from visas to relocation.",
  },
  {
    icon: ScrollIcon,
    title: "Wills and estate planning",
    body: "Wills, beneficiaries and asset planning, sorted early.",
  },
  {
    icon: BriefcaseIcon,
    title: "General counsel",
    body: "Senior counsel on retainer, without the full-time hire.",
  },
];

export function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-[2.6rem]">
            Counsel across everything commercial
          </h2>
          <p className="mt-5 text-lg text-body">
            One senior team for the legal work a growing business actually runs
            into. Same calibre as the big firms, handled like a partner who
            wants you to win.
          </p>
        </div>

        {/* Desktop: unchanged grid */}
        <div className="mt-14 hidden gap-x-8 gap-y-12 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon className="h-9 w-9 text-ink" />
              <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{body}</p>
            </div>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="mt-10 divide-y divide-line sm:hidden">
          {services.map(({ icon: Icon, title, body }) => {
            const isOpen = open === title;
            return (
              <div key={title}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : title)}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <Icon className="h-6 w-6 shrink-0 text-ink" />
                  <span className="flex-1 text-base font-semibold text-ink">{title}</span>
                  <span className={`text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 6l5 5 5-5" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-4 pl-10 text-sm leading-relaxed text-body">
                    {body}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
