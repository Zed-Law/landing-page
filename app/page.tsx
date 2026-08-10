import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Segments } from "@/components/sections/Segments";
import { Services } from "@/components/sections/Services";
import { Testimonial } from "@/components/sections/Testimonial";
import { Team } from "@/components/sections/Team";
import { Pricing } from "@/components/sections/Pricing";
import { Booking } from "@/components/sections/Booking";
import { FinalCta } from "@/components/sections/FinalCta";
import { getReferrer } from "@/sanity";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { utm_campaign } = await searchParams;
  const slug = Array.isArray(utm_campaign) ? utm_campaign[0] : utm_campaign;
  const referrer = slug ? await getReferrer(slug) : null;

  return (
    <>
      <Navbar referrer={referrer} />
      <main className="flex-1">
        <Hero />
        <Segments />
        <Services />
        <Testimonial />
        <Team />
        <Pricing />
        <Booking />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
