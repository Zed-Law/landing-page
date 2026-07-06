"use client";

type ReferralChipProps = {
  displayName?: string | null;
  discount?: number | null;
};

// Slim full-width announcement bar shown above the nav when a visitor
// arrives through a referral link. Renders nothing without a matched referrer.
export function ReferralChip({ displayName, discount }: ReferralChipProps) {
  if (!displayName || discount == null) return null;

  return (
    <div className="w-full border-b border-line bg-paper-2">
      <p className="mx-auto max-w-4xl px-5 py-2.5 text-center text-sm text-body sm:px-8">
        {displayName} referred you. Your first engagement is{" "}
        <span className="font-semibold text-accent-deep">{discount}% off.</span>
      </p>
    </div>
  );
}
