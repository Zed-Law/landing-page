"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CloseIcon } from "./icons";
import { getIntakeStatus } from "@/lib/intake";

// Floating intake counter. Desktop-only, and only once the user has
// scrolled past the hero — surfacing it immediately on load would just be
// another thing competing with the hero CTA.
export function IntakeWidget() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { spotsLeft, totalSpots, monthLabel } = getIntakeStatus();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[230px] rounded-card border border-line bg-paper-2 p-3.5 sm:bottom-6 sm:right-6 sm:w-[300px] sm:p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent sm:h-2 sm:w-2" />
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-muted sm:text-xs">
            {monthLabel} intake
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="text-muted transition-colors hover:text-ink"
        >
          <CloseIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>

      <p className="mt-2 font-display text-base font-medium uppercase text-ink sm:mt-3 sm:text-xl">
        {spotsLeft} of {totalSpots} spots left
      </p>

      <div className="mt-2 flex gap-1 sm:mt-3 sm:gap-1.5">
        {Array.from({ length: totalSpots }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 sm:h-1.5 ${
              i < spotsLeft ? "bg-accent" : "bg-line"
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-xs leading-relaxed text-body sm:mt-3 sm:text-sm">
        We take on a limited number of clients each month to protect output.
      </p>

      <Button
        href="#book"
        variant="primary"
        withArrow={false}
        className="mt-3 w-full justify-center !py-2 !text-xs sm:mt-4 sm:!py-2.5 sm:!text-sm"
      >
        Claim your spot
      </Button>
    </div>
  );
}
