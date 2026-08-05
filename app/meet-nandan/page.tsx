import type { Metadata } from "next";
import { IndividualBooking } from "@/components/IndividualBooking";

export const metadata: Metadata = {
  title: "Book with Nandan | Zed Law",
  description:
    "Book a free 15-minute intro call directly with Nandan at Zed Law.",
  // Outreach link — keep it out of search results.
  robots: { index: false, follow: false },
};

export default function MeetNandanPage() {
  return (
    <IndividualBooking
      name="Nandan"
      calLink="team/zed-law/free-15-minute-intro-call-with-nandan"
      namespace="free-15-minute-intro-call-with-nandan"
      lawyer="nandan"
    />
  );
}
