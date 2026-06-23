import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "The Science Behind Awake Eye Complex | Lumaru",
  description:
    "Discover the science behind Lumaru's 3 organic actives — Shea Butter, Ginkgo Biloba, and Horse Chestnut — that target the real causes of dark circles and puffiness. Clean, vegan, certified.",
  openGraph: {
    title: "The Science Behind Awake Eye Complex | Lumaru",
    description:
      "Discover the science behind Lumaru's 3 organic actives that target dark circles and puffiness.",
    url: "https://lumaruskin.com/science",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/science",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Adicione este schema junto com os outros schemas existentes
const scienceFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Shea Butter work for the under-eye area?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shea butter is a fat extracted from the nut of the African shea tree, rich in oleic acid, stearic acid, and triterpene alcohols. The triterpene alcohols — particularly lupeol cinnamate — suppress inflammatory enzymes that cause barrier breakdown around the eye. The high oleic acid content integrates into the stratum corneum, reinforcing the barrier that keeps moisture in and irritants out."
      }
    },
    {
      "@type": "Question",
      "name": "How does Ginkgo Biloba help with dark circles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ginkgo biloba works through its effect on microcirculation. The terpene lactones (ginkgolides A, B, C) are platelet-activating factor antagonists, reducing the tendency of blood to pool and leak into surrounding tissue — one of the main reasons dark circles appear as a bluish or purplish tinge beneath the skin. The flavonoid fraction also scavenges free radicals that degrade capillary walls over time."
      }
    },
    {
      "@type": "Question",
      "name": "How does Horse Chestnut reduce puffiness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Horse chestnut contains aescin, a saponin glycoside that inhibits enzymes that degrade the proteoglycan matrix surrounding capillaries. When this matrix stays intact, capillary walls are less leaky — meaning fluid is less likely to seep into surrounding tissue and create puffiness. Aescin also has a mild toning effect on small blood vessels."
      }
    },
    {
      "@type": "Question",
      "name": "How does Multi-Molecular Hyaluronic Acid hydrate the skin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multi-molecular HA combines high-molecular-weight and low-molecular-weight forms in a single formulation. High-molecular-weight HA forms a film on the skin surface that reduces water evaporation. Low-molecular-weight HA penetrates into the dermis and binds water molecules within the extracellular matrix, which physically plumps the tissue."
      }
    },
    {
      "@type": "Question",
      "name": "How long until I see results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hydration is immediate. Puffiness typically goes down within the first week. For dark circles, consistent twice-daily use brings visible brightening week by week over 4-8 weeks. Results are cumulative and compound with continued use."
      }
    }
  ]
};

const ingredients = [
  {
    number: "01",
    name: "Shea Butter",
    tag: "Under Eye Skin Barrier Repair",
    whatItIs:
      "Shea butter is a fat extracted from the nut of the African shea tree (Vitellaria paradoxa), rich in oleic acid, stearic acid, and triterpene alcohols.",
    howItWorks:
      "The triterpene alcohols in shea — particularly lupeol cinnamate — suppress the inflammatory enzymes that cause chronic low-grade irritation and barrier breakdown around the eye. The high oleic acid content closely mirrors the skin's own lipid profile, which means it integrates into the stratum corneum rather than sitting on top of it, reinforcing the barrier that keeps moisture in and irritants out.",
    whyWeChose:
      "Most eye creams rely on mineral oil or petrolatum for occlusion. These seal moisture in but don't contribute biologically active compounds the way shea does.",
    whatYouNotice:
      "Within 2-3 weeks of consistent use, the skin around the eye feels noticeably softer and less tight.",
  },
  {
    number: "02",
    name: "Ginkgo Biloba",
    tag: "Circulation + Dark Circles",
    whatItIs:
      "Ginkgo biloba extract is derived from the leaves of the maidenhair tree and standardized to contain flavone glycosides and terpene lactones.",
    howItWorks:
      "The terpene lactones (ginkgolides A, B, C) are platelet-activating factor antagonists, reducing the tendency of blood to pool and leak into surrounding tissue — one of the main reasons dark circles appear as a bluish or purplish tinge.",
    whyWeChose:
      "Vitamin K is the more common choice for dark circles, but evidence for topical vitamin K absorption is limited. Ginkgo's microcirculation benefits are better documented.",
    whatYouNotice:
      "Most people notice a reduction in the bluish-purple quality of dark circles after 4-6 weeks.",
  },
  {
    number: "03",
    name: "Horse Chestnut",
    tag: "Puffy Eyes + Fluid Drainage",
    whatItIs:
      "Horse chestnut seed extract (Aesculus hippocastanum) contains a saponin glycoside called aescin.",
    howItWorks:
      "Aescin inhibits the enzymes that degrade the proteoglycan matrix surrounding capillaries. When this matrix stays intact, capillary walls are less leaky — meaning fluid is less likely to seep into surrounding tissue.",
    whyWeChose:
      "Caffeine works short-term via vasoconstriction. Horse chestnut targets the structural cause of leakage, making it more appropriate for long-term use.",
    whatYouNotice:
      "Puffiness — especially morning eye bags — typically becomes less pronounced within 3-4 weeks.",
  },
  {
    number: "04",
    name: "Multi-Molecular Hyaluronic Acid",
    tag: "Hydration at Every Depth",
    whatItIs:
      "Hyaluronic acid (HA) is a glycosaminoglycan produced naturally in skin tissue; the multi-molecular version combines high and low molecular weight forms.",
    howItWorks:
      "High-molecular-weight HA forms a film on the skin surface. Low-molecular-weight HA penetrates deeper and binds water within the extracellular matrix, physically plumping the tissue.",
    whyWeChose:
      "Single-weight HA delivers hydration only at one depth. The multi-molecular approach addresses both surface dryness and deeper structural dehydration.",
    whatYouNotice:
      "Fine lines look softer and the under-eye area looks more plump within 1-2 weeks.",
  },
];

const timeline = [
  {
    period: "Week 1-2",
    description:
      "Hydration improves. Fine lines look softer, skin feels more supple.",
  },
  {
    period: "Week 3-4",
    description:
      "Barrier repair becomes noticeable. Puffiness starts to reduce, especially in the morning.",
  },
  {
    period: "Week 5-8",
    description:
      "Microcirculation improves. Dark circles begin to fade as capillary health improves.",
  },
  {
    period: "Ongoing",
    description:
      "Results are cumulative. Effects compound with continued daily use.",
  },
];

const references = [
  "Lodén M. (2003). Role of topical emollients and moisturizers in the treatment of dry skin barrier disorders. American Journal of Clinical Dermatology.",
  "Akihisa T. et al. (2010). Anti-inflammatory constituents of the fruits of Vitellaria paradoxa. Journal of Oleo Science.",
  "Suter A. et al. (2011). Ginkgo biloba extract and microcirculation. Phytomedicine.",
  "Pittler M.H., Ernst E. (2012). Horse chestnut seed extract for chronic venous insufficiency. Cochrane Database.",
  "Rawlings A.V., Harding C.R. (2004). Moisturization and skin barrier function. Dermatologic Therapy.",
  "Pavicic T. et al. (2011). Hyaluronic acid formulation on periorbital skin. Journal of Cosmetic Dermatology.",
];

export default function SciencePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
              The Science Behind Awake Eye Complex
            </h1>
            <p className="text-text/60 text-lg max-w-2xl mx-auto">
              Micro-Circulation Awakening Complex
            </p>
            <p className="text-text/40 text-sm mt-4">By Mateus Hahn</p>
          </div>

          {/* Intro */}
          <div className="text-center mb-12 border-b border-primary-light/20 pb-10">
            <p className="text-text/70 leading-relaxed text-lg mb-4">
              Four ingredients. Real explanations.
            </p>
            <p className="text-text/60 leading-relaxed">
              Most eye creams list ingredients without telling you what they actually do. Here's an
              honest breakdown of what's inside the Awake Eye Complex.
            </p>
          </div>

          <p className="text-text/70 leading-relaxed mb-16">
            Dark circles and puffiness come down to two things: sluggish microcirculation and
            the skin under your eyes losing its ability to hold moisture. Fixing that requires organic
            actives that work at the cellular level — not just surface-level emollients.
          </p>

          {/* Ingredients Cards */}
          <div className="space-y-8 mb-20">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.name}
                className="border border-[#E8E2F0] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-primary font-medium text-sm mb-2">
                  {ingredient.number}
                </div>
                <div className="text-primary/60 text-xs uppercase tracking-wider mb-2">
                  {ingredient.tag}
                </div>
                <h2 className="text-2xl font-semibold text-text mb-4">
                  {ingredient.name}
                </h2>
                <div className="h-px bg-primary-light/20 w-12 mb-6" />

                <div className="space-y-5">
                  <div>
                    <h3 className="font-medium text-text mb-1">What it is</h3>
                    <p className="text-text/70 text-sm leading-relaxed">
                      {ingredient.whatItIs}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-text mb-1">How it works</h3>
                    <p className="text-text/70 text-sm leading-relaxed">
                      {ingredient.howItWorks}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-text mb-1">Why we chose it</h3>
                    <p className="text-text/70 text-sm leading-relaxed">
                      {ingredient.whyWeChose}
                    </p>
                  </div>
                  <div className="bg-primary-light/5 p-4 rounded-xl border-l-4 border-primary">
                    <h3 className="font-medium text-text mb-1">What you'll notice</h3>
                    <p className="text-text/70 text-sm leading-relaxed">
                      {ingredient.whatYouNotice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why These Four Together */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4 text-center">
              Why These Four Together
            </h2>
            <p className="text-text/60 text-center mb-8 italic">
              Each ingredient has a distinct job. Together, they cover the full picture.
            </p>
            <p className="text-text/70 leading-relaxed">
              Dark circles and puffiness rarely have a single cause. Ginkgo Biloba improves
              circulation. Horse Chestnut reduces capillary leakage. Shea Butter rebuilds the barrier.
              And hyaluronic acid hydrates at every depth.
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-8 text-center">
              What to Expect, and When
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {timeline.map((item) => (
                <div
                  key={item.period}
                  className="bg-white border border-[#E8E2F0] rounded-xl p-5 transition-all duration-300 hover:shadow-md"
                >
                  <div className="text-primary font-bold text-lg mb-2">{item.period}</div>
                  <p className="text-text/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* References */}
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-display text-text mb-4">References</h2>
            <ul className="space-y-1 text-text/40 text-xs">
              {references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-br from-text to-text/95 rounded-2xl p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-display text-white mb-2">
              Awake Eye Complex
            </h2>
            <p className="text-white/70 text-lg mb-2">15ml · $35.90</p>
            <p className="text-white/60 italic mb-6 max-w-md mx-auto">
              "Proof you slept well. Even when you didn't."
            </p>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 text-sm">
              Four ingredients. No filler. No hype. A clean eye cream built around the organic actives
              described on this page — formulated to do what it says, in the time it actually takes.
            </p>
            <div className="flex justify-center">
              <Link
                href="/"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
              >
                See the Awake Eye Complex →
              </Link>
            </div>
            <p className="text-white/40 text-xs mt-6">
              Last updated: May 24, 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}