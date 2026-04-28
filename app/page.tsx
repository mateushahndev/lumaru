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
    text: "I've tried everything for my dark circles — drugstore, high-end, serums. This is the first thing that actually made me look like I slept 8 hours.",
    author: "Verified Customer, California",
  },
  {
    id: 2,
    rating: 5,
    text: "People stopped asking me if I'm sick. That alone is worth every penny. The puffiness under my eyes went down noticeably in the first week.",
    author: "Verified Customer, New York",
  },
  {
    id: 3,
    rating: 5,
    text: "I'm postpartum and my under eyes were a disaster. After three weeks, I actually smiled at my reflection for the first time in months.",
    author: "Verified Customer, Texas",
  },
];

const testimonialsSet2 = [
  {
    id: 4,
    rating: 5,
    text: "Genetic dark circles run in my family. I stopped believing any product could help. This one changed my mind — and my mirror.",
    author: "Verified Customer, Florida",
  },
  {
    id: 5,
    rating: 5,
    text: "No more 'you look tired' at work. No more concealer. Just my face — looking awake for the first time in years.",
    author: "Verified Customer, Illinois",
  },
  {
    id: 6,
    rating: 5,
    text: "I have sensitive skin and was nervous. Zero irritation. Within two weeks my puffiness was noticeably reduced. I'm on my second bottle.",
    author: "Verified Customer, Washington",
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