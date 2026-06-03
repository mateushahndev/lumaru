import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LastUpdated from "@/components/LastUpdated";
import WhichEyeCreamTool from "@/components/tools/WhichEyeCreamTool";

export const metadata: Metadata = {
  title: "Which Eye Cream Actually Works for Me? | Free Tool | Lumaru",
  description:
    "8 questions. 2 minutes. Stop guessing and find out what your under-eyes actually need. Honest, science-based recommendation.",
  openGraph: {
    title: "Which Eye Cream Actually Works for Me? | Free Tool | Lumaru",
    description:
      "8 questions. 2 minutes. Stop guessing and find out what your under-eyes actually need.",
    url: "https://lumaruskin.com/tools/which-eye-cream-works-for-me",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/tools/which-eye-cream-works-for-me",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Which Eye Cream Actually Works for Me?",
  description: "8-question interactive tool to find your personalized eye cream recommendation.",
  url: "https://lumaruskin.com/tools/which-eye-cream-works-for-me",
  applicationCategory: "Health",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function WhichEyeCreamToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <WhichEyeCreamTool />
        </div>
      </main>
      <LastUpdated date="2026-06-03" />
      <Footer />
    </>
  );
}