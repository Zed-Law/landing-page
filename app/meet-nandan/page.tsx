import type { Metadata } from "next";
import { IndividualBooking } from "@/components/IndividualBooking";
import { getReferrer } from "@/sanity";

export const metadata: Metadata = {
  title: "Book with Nandan | Zed Law",
  description:
    "Book a free 30-minute intro call directly with Nandan at Zed Law.",
  // Outreach link — keep it out of search results.
  robots: { index: false, follow: false },
};

export default async function MeetNandanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { utm_medium } = await searchParams;
  const slug = Array.isArray(utm_medium) ? utm_medium[0] : utm_medium;
  const referrer = slug ? await getReferrer(slug) : null;

  return (
    <IndividualBooking
      name="Nandan"
      calLink="team/zed-law/free-30-minute-intro-call-with-nandan"
      namespace="free-30-minute-intro-call-with-nandan"
      lawyer="nandan"
      referrer={referrer}
    />
  );
}
