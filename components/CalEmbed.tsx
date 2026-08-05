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
  // The team booking slug (e.g. "team/zed-law/free-15-minute-intro-call").
  calLink?: string;
  // Cal namespace — must be unique per embed and stay in sync between
  // getCalApi() and <Cal>. Defaults to the slug's last segment.
  namespace?: string;
  // Optional lawyer tag (e.g. "phil") added to the GA conversion event so
  // individual outreach bookings can be segmented without changing the event.
  lawyer?: string;
};

function CalEmbedInner({
  calLink = "team/zed-law/free-15-minute-intro-call",
  namespace = "free-15-minute-intro-call",
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
