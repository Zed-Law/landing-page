import type { Metadata } from "next";
import { IndividualBooking } from "@/components/IndividualBooking";
import { getReferrer } from "@/sanity";

export const metadata: Metadata = {
  title: "Book with Alo | Zed Law",
  description:
    "Book a free 30-minute intro call directly with Alo at Zed Law.",
  // Outreach link — keep it out of search results.
  robots: { index: false, follow: false },
};

export default async function MeetAloPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { utm_campaign } = await searchParams;
  const slug = Array.isArray(utm_campaign) ? utm_campaign[0] : utm_campaign;
  const referrer = slug ? await getReferrer(slug) : null;

  return (
    <IndividualBooking
      name="Alo"
      calLink="team/zed-law/free-30-minute-intro-call-with-alo"
      namespace="free-30-minute-intro-call-with-alo"
      lawyer="alo"
      referrer={referrer}
    />
  );
}
