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

// Schema.org enriquecido para MedicalWebPage
const toolSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Dark Circle Type Finder",
  description: "Self-assessment tool to identify dark circle types based on dermatological classification.",
  url: "https://lumaruskin.com/tools/dark-circle-type-finder",
  audience: {
    "@type": "Audience",
    name: "Women concerned about under-eye dark circles",
  },
  about: {
    "@type": "MedicalCondition",
    name: "Dark circles under eyes",
    associatedAnatomy: {
      "@type": "AnatomicalStructure",
      name: "Periorbital region",
    },
  },
  mainEntity: {
    "@type": "Quiz",
    name: "Dark Circle Type Quiz",
    description: "3-question assessment to identify dark circle type",
  },
  relatedLink: "https://lumaruskin.com/blog/dark-circle-types-guide",
  significantLink: "https://lumaruskin.com/blog/dark-circle-types-guide",
  medicalAudience: {
    "@type": "MedicalAudience",
    audienceType: "General public",
  },
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