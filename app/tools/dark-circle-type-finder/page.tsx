import type { Metadata } from "next";
import DarkCircleTypeFinder from "@/components/tools/DarkCircleTypeFinder";

export const metadata: Metadata = {
  title: "Dark Circle Type Finder — Identify Your Under-Eye Concern | Lumaru",
  description: "Not all dark circles are the same. Take this 3-question quiz to find out if yours are vascular, pigmentary, structural, or mixed — and what actually works for your type.",
  keywords: "dark circle type, under-eye diagnosis, vascular dark circles, pigmentary dark circles, structural dark circles",
  openGraph: {
    title: "Dark Circle Type Finder — Identify Your Under-Eye Concern",
    description: "Not all dark circles are the same. Take this 3-question quiz to find out your type.",
    url: "https://lumaruskin.com/tools/dark-circle-type-finder",
    type: "website",
  },
  robots: "index, follow",
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Dark Circle Type Finder",
  description: "Self-assessment tool to identify dark circle types based on dermatological classification.",
  audience: {
    "@type": "Audience",
    name: "Women concerned about under-eye dark circles",
  },
  relatedLink: "https://lumaruskin.com/blog/dark-circle-types-guide",
};

export default function DarkCircleTypeFinderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <DarkCircleTypeFinder />
    </>
  );
}