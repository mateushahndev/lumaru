import type { Metadata } from "next";
import DarkCircleTypeFinder from "@/components/tools/DarkCircleTypeFinder";

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

// Ferramenta tem layout próprio, NUNCA tem Nav/Footer
export default function DarkCircleTypeFinderPage() {
  return <DarkCircleTypeFinder />;
}