"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function CalEmbedInner() {
  const searchParams = useSearchParams();
  const utm = {
    utm_source: searchParams.get("utm_source") ?? "",
    utm_medium: searchParams.get("utm_medium") ?? "",
    utm_campaign: searchParams.get("utm_campaign") ?? "",
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "free-15-minute-intro-call" });
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
  }, []);

  return (
    <Cal
      namespace="free-15-minute-intro-call"
      calLink="team/zed-law/free-15-minute-intro-call"
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      config={{
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
        metadata: utm,
      }}
    />
  );
}

export function CalEmbed() {
  return (
    <Suspense fallback={null}>
      <CalEmbedInner />
    </Suspense>
  );
}
