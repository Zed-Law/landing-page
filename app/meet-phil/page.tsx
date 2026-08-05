import type { Metadata } from "next";
import { IndividualBooking } from "@/components/IndividualBooking";

export const metadata: Metadata = {
  title: "Book with Phil | Zed Law",
  description: "Book a free 15-minute intro call directly with Phil at Zed Law.",
  // Outreach link — keep it out of search results.
  robots: { index: false, follow: false },
};

export default function MeetPhilPage() {
  return (
    <IndividualBooking
      name="Phillip"
      calLink="team/zed-law/free-15-minute-intro-call-with-philip"
      namespace="free-15-minute-intro-call-with-philip"
      lawyer="phil"
    />
  );
}
