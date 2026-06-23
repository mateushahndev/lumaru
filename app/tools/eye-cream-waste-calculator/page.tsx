import type { Metadata } from "next";
import EyeCreamWasteCalculatorClient from "@/components/tools/EyeCreamWasteCalculatorClient";

export const metadata: Metadata = {
  title: "How Much Have You Spent on Eye Creams? | Free Calculator",
  description:
    "Find out how much you've spent on eye creams that didn't work. Free calculator — enter your numbers and see the real cost.",
  openGraph: {
    title: "How Much Have You Spent on Eye Creams? | Free Calculator",
    description:
      "Find out how much you've spent on eye creams that didn't work.",
    url: "https://lumaruskin.com/tools/eye-cream-waste-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/tools/eye-cream-waste-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://lumaruskin.com/tools/eye-cream-waste-calculator",
  "name": "How Much Have You Spent on Eye Creams?",
  "description": "Calculate how much you've spent on eye creams that didn't work.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Lumaru",
    "url": "https://lumaruskin.com"
  }
};

interface PageProps {
  searchParams?: {
    embed?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const isEmbedded = searchParams?.embed === "true";

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
    />
    <main className={isEmbedded ? "bg-background" : "min-h-screen bg-background pt-32 pb-20"}>
      <EyeCreamWasteCalculatorClient isEmbedded={isEmbedded} />
    </main>
    </>
  );
}