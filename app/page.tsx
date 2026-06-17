import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Segments } from "@/components/sections/Segments";
import { Services } from "@/components/sections/Services";
import { Testimonial } from "@/components/sections/Testimonial";
import { Pricing } from "@/components/sections/Pricing";
import { Booking } from "@/components/sections/Booking";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
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
