import type { Metadata } from "next";
import Link from "next/link";
import LastUpdated from "@/components/LastUpdated";

export const metadata: Metadata = {
  title: "Our Standards — Certified Clean Skincare | Lumaru",
  description: "Six third-party certifications, independently audited. COSMOS Natural, ECOCERT, Vegan, Cruelty-Free, GMP, and B Corp. No spin, just proof.",
  openGraph: {
    title: "Our Standards — Certified Clean Skincare | Lumaru",
    description: "Six third-party certifications, independently audited. No spin, just proof.",
    url: "https://lumaruskin.com/our-standards",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/our-standards",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://lumaruskin.com/our-standards",
  "name": "Our Standards — Certified Clean Skincare",
  "description": "Six third-party certifications, independently audited. No spin, just proof.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Lumaru",
    "url": "https://lumaruskin.com"
  }
};

const certifications = [
  {
    name: "COSMOS Natural",
    description:
      "COSMOS is an international standard — set by five of the world's most respected organic certifying bodies — that defines exactly what 'natural' has to mean on a label. An independent auditor checks every ingredient, every supplier, and every step of manufacturing before certifying anything. It's not a logo you buy; it's one you earn, and re-earn every year. For you, it means the botanicals in Awake Eye Complex are genuinely derived from natural sources, processed cleanly, and not smuggled through a loophole.",
    audited: "Third-party audited.",
  },
  {
    name: "ECOCERT",
    description:
      "ECOCERT is a French-founded, globally operating certification body that has audited organic and natural products since 1991 — long before 'clean beauty' became a trend. Their inspectors visit production sites, trace ingredients back to their origin, and verify that environmental impact is minimized at every stage. No self-declaration. It's one of the oldest, strictest third-party auditors in the industry. Passing their review means the supply chain holds up under scrutiny, not just on a website.",
    audited: "Third-party audited.",
  },
  {
    name: "Certified Vegan",
    description:
      "Vegan Society certification confirms that no animal-derived ingredients — not beeswax, not lanolin, not collagen — made it into the formula. A third-party verifier reviews the full ingredient list and supplier documentation, so it's not just the brand claiming it. If you've ever flipped a jar to check for hidden animal byproducts, you can stop with this one.",
    audited: "Third-party audited.",
  },
  {
    name: "Cruelty-Free",
    description:
      "Leaping Bunny certification — issued by Cruelty Free International — means no animal testing at any point: ingredients, formulation, or finished product. Unlike a self-applied 'not tested on animals' sticker, Leaping Bunny requires supplier audits and annual recommitment to stay current. The standard closes the loopholes other 'cruelty-free' claims leave open.",
    audited: "Third-party audited.",
  },
  {
    name: "GMP — ISO 22716",
    description:
      "Good Manufacturing Practices (ISO 22716) is the international quality standard for cosmetics production — the same framework used by pharmaceutical manufacturers. It covers facility hygiene, equipment calibration, batch traceability, and staff training. An accredited third-party auditor certifies compliance, not the factory itself. In practice, it means what's inside each jar matches what's on the label — every single batch.",
    audited: "Third-party audited.",
  },
  {
    name: "Certified B Corporation",
    description:
      "B Corp certification, issued by B Lab, evaluates a company's verified impact on workers, customers, communities, and the environment — not just its products. The assessment is rigorous: detailed questionnaires, document submissions, and periodic on-site verification. Companies must re-certify every three years to maintain the status. It means the business behind the formula is held to a standard beyond profit — and that standard is checked by someone other than the business itself.",
    audited: "Third-party audited.",
  },
];

export default function OurStandardsPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
    />
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
            Our Standards
          </h1>
          <p className="text-text/60 text-lg max-w-2xl mx-auto">
            Six certifications, all audited by parties outside of Lumaru. Here's what each one actually means — no spin.
          </p>
        </div>

        {/* Certifications List */}
        <div className="space-y-12">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className="border-b border-primary-light/20 pb-10 last:border-0"
            >
              <h2 className="text-2xl font-semibold text-text mb-3">
                {cert.name}
              </h2>
              <p className="text-text/70 leading-relaxed mb-3">
                {cert.description}
              </p>
              <p className="text-primary text-sm font-medium">
                {cert.audited}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-12 pt-8 text-center">
          <p className="text-text/70 mb-4">
            See what clean science can do for tired eyes.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
          >
            Awake Eye Complex →
          </Link>
        </div>
      </div>
      <p className="text-text/50 text-sm text-center mt-4 mb-4">Written by Mateus Hahn</p>
      <LastUpdated date="2026-05-17" />
    </div>
    </>
  );
}