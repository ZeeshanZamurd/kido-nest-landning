import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ComingSoonSection from "@/components/sections/ComingSoonSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <HeroSection />
        <FeaturesSection />
        <ComingSoonSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
