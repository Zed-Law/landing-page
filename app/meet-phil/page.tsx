import type { Metadata } from "next";
import { IndividualBooking } from "@/components/IndividualBooking";
import { getReferrer } from "@/sanity";

export const metadata: Metadata = {
  title: "Book with Phil | Zed Law",
  description: "Book a free 30-minute intro call directly with Phil at Zed Law.",
  // Outreach link — keep it out of search results.
  robots: { index: false, follow: false },
};

export default async function MeetPhilPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { utm_campaign } = await searchParams;
  const slug = Array.isArray(utm_campaign) ? utm_campaign[0] : utm_campaign;
  const referrer = slug ? await getReferrer(slug) : null;

  return (
    <IndividualBooking
      name="Phillip"
      calLink="team/zed-law/free-30-minute-intro-call-with-philip"
      namespace="free-30-minute-intro-call-with-philip"
      lawyer="phil"
      referrer={referrer}
    />
  );
}
