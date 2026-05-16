import type { Metadata } from "next";
import DarkCircleTypeFinder from "@/components/tools/DarkCircleTypeFinder";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Dark Circle Type Finder — Identify Your Under-Eye Concern | Lumaru",
  description: "Not all dark circles are the same. Take this 3-question quiz to find out if yours are vascular, pigmentary, structural, or mixed — and what actually works for your type.",
  openGraph: {
    title: "Dark Circle Type Finder — Identify Your Under-Eye Concern",
    description: "Not all dark circles are the same. Take this 3-question quiz to find out your type.",
    url: "https://lumaruskin.com/tools/dark-circle-type-finder",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/tools/dark-circle-type-finder",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PageProps {
  searchParams?: {
    embed?: string;
  };
}

export default function DarkCircleTypeFinderPage({ searchParams }: PageProps) {
  const isEmbedded = searchParams?.embed === "true";

  return (
    <>
      {!isEmbedded && <Navbar />}
      <main className="min-h-screen bg-background pt-20 md:pt-32 pb-20">
        <DarkCircleTypeFinder />
      </main>
      {!isEmbedded && <Footer />}
    </>
  );
}