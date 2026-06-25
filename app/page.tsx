import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Segments } from "@/components/sections/Segments";
import { Services } from "@/components/sections/Services";
import { Testimonial } from "@/components/sections/Testimonial";
import { Pricing } from "@/components/sections/Pricing";
import { Booking } from "@/components/sections/Booking";
import { FinalCta } from "@/components/sections/FinalCta";
import { getReferrer } from "@/sanity";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { utm_medium } = await searchParams;
  const slug = Array.isArray(utm_medium) ? utm_medium[0] : utm_medium;
  const referrer = slug ? await getReferrer(slug) : null;

  return (
    <>
      <Navbar referrer={referrer} />
      <main className="flex-1">
        <Hero />
        <Segments />
        <Services />
        <Testimonial />
        <Pricing />
        <Booking />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
