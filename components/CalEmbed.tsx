"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalEmbed() {
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
    })();
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
      }}
    />
  );
}
