import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import EmbedTools from "@/components/tools/EmbedTools";

export const metadata: Metadata = {
  title: "Free Skincare Tools for Bloggers | Embed Interactive Widgets",
  description:
    "Embed our free Dark Circle Type Finder and Eye Cream Waste Calculator on your beauty blog. No signup. Just copy and paste.",
  openGraph: {
    title: "Free Skincare Tools for Bloggers | Embed Interactive Widgets",
    description:
      "Embed our free Dark Circle Type Finder and Eye Cream Waste Calculator on your beauty blog.",
    url: "https://lumaruskin.com/tools/embed",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/tools/embed",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://lumaruskin.com/tools/embed",
  "name": "Free Skincare Tools for Bloggers",
  "description": "Embed interactive skincare tools on your blog. No signup. Just copy and paste.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Lumaru",
    "url": "https://lumaruskin.com"
  }
};

export default function EmbedToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <EmbedTools />
      </main>
      <Footer />
    </>
  );
}