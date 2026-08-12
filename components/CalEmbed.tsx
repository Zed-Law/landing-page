"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type CalEmbedProps = {
  // The team booking slug (e.g. "team/zed-law/free-30-minute-intro-call").
  calLink?: string;
  // Cal namespace — must be unique per embed and stay in sync between
  // getCalApi() and <Cal>. Defaults to the slug's last segment.
  namespace?: string;
  // Optional lawyer tag (e.g. "phil") added to the GA conversion event so
  // individual outreach bookings can be segmented without changing the event.
  lawyer?: string;
};

function CalEmbedInner({
  calLink = "team/zed-law/free-30-minute-intro-call",
  namespace = "free-30-minute-intro-call",
  lawyer,
}: CalEmbedProps) {
  const searchParams = useSearchParams();
  const utm: Record<string, string> = {};
  const utmMetadata: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const value = searchParams.get(key);
    if (value) {
      utm[key] = value;
      utmMetadata[`metadata[${key}]`] = value;
    }
  }
  // Prefills the "referrer" custom booking question in Cal.com (the Identifier
  // must match). The value is the full display string appended to the calendar
  // event title, so it carries its own leading space — the "Event Name in
  // Calendar" template concatenates it with no separator.
  //
  // Only genuine referrals qualify: utm_campaign carries the referrer slug just
  // for the source/medium pair the /ref/:name redirect emits (see next.config).
  // Other campaigns reuse utm_campaign as a campaign name, so gating on the
  // pair keeps e.g. utm_campaign=linkedinjuly out of the calendar title.
  const isReferral = ["utm_source", "utm_medium"].every(
    (key) => searchParams.get(key)?.toLowerCase() === "referral",
  );
  const campaign = isReferral ? searchParams.get("utm_campaign") : null;
  const referrer = campaign
    ? ` (Ref by ${campaign.charAt(0).toUpperCase()}${campaign.slice(1)})`
    : null;

  if (lawyer) {
    utm.lawyer = lawyer;
    utmMetadata["metadata[lawyer]"] = lawyer;
  }

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#031428" },
          dark: { "cal-brand": "#ffffff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          window.gtag?.("event", "intro_call_booked", utm);
        },
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namespace]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      style={{ width: "100%", height: "100%" }}
      config={{
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
        ...utmMetadata,
        ...(referrer ? { referrer } : {}),
      }}
    />
  );
}

export function CalEmbed(props: CalEmbedProps) {
  return (
    <Suspense fallback={null}>
      <CalEmbedInner {...props} />
    </Suspense>
  );
}
