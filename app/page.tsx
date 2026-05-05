"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Badges from "@/components/landing/Badges";
import PainSection from "@/components/landing/PainSection";
import Testimonials from "@/components/landing/Testimonials";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import AboutLumaru from "@/components/landing/AboutLumaru";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

// Schema.org estruturado para SEO
const productSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "Awake Eye Complex",
  description:
    "Creme para olheiras com Shea Butter, Ginkgo Biloba e Horse Chestnut. Redução comprovada em 89% em 28 dias.",
  brand: {
    "@type": "Brand",
    name: "Lumaru",
  },
  offers: {
    "@type": "Offer",
    price: "35.90",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2150",
  },
};

const testimonialsSet1 = [
  {
    id: 1,
    rating: 5,
    text: "Shea butter cleared the dark circles around my eyes in less than a week. Just saying.",
    author: "Verified Formula Tester",
  },
  {
    id: 2,
    rating: 5,
    text: "I love shea. I mix it with a little jojoba and argan and I wake up with the softest, happiest skin.",
    author: "Verified Formula Tester",
  },
  {
    id: 3,
    rating: 5,
    text: "I sleep with shea all over my face every night and I looove it. Hasn't broken me out either and my skin looks so healthy in the morning.",
    author: "Verified Formula Tester",
  },
];

const testimonialsSet2 = [
  {
    id: 4,
    rating: 5,
    text: "I have absolutely seen a big difference. And it happens really quickly, like honestly the first morning after using it. It's just moisturizing the skin super well and plumps it up a bit.",
    author: "Verified Formula Tester",
  },
  {
    id: 5,
    rating: 5,
    text: "My girlfriend commented on it around a week in, completely not knowing I was using anything. Diminished dark circles and overall healthier skin.",
    author: "Verified Formula Tester",
  },
  {
    id: 6,
    rating: 5,
    text: "My under eye concealer usually gets dry and separates by the end of the night but it actually held up. If my concealer can stay without drying it's a win.",
    author: "Verified Formula Tester",
  },
];

export default function Home() {
  return (
    <>
      {/* Schema.org para SEO avançado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Badges />
          <PainSection />
          <Testimonials 
            title="What real women are saying"
            testimonials={testimonialsSet1}
            showCTA={true}
          />
          <Benefits />
          <HowItWorks />
          <AboutLumaru />
          <FAQ />
          <Testimonials 
            title="More women who finally look rested"
            testimonials={testimonialsSet2}
            showCTA={false}
          />
          <FinalCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}