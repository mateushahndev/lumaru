import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LastUpdated from "@/components/LastUpdated";

export const metadata: Metadata = {
  title: "The Evidence Behind Awake Eye Complex | Lumaru Science",
  description:
    "The studies, mechanisms, and reasoning behind every active ingredient in Awake Eye Complex — Shea Butter, Ginkgo Biloba, Horse Chestnut, and Multi-Molecular HA. No hype, just evidence.",
  openGraph: {
    title: "The Evidence Behind Awake Eye Complex | Lumaru Science",
    description:
      "The studies, mechanisms, and reasoning behind every active ingredient in Awake Eye Complex. No hype, just evidence.",
    url: "https://lumaruskin.com/evidence",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/evidence",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const evidenceFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What evidence supports Shea Butter for skin barrier repair?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lodén (2003) demonstrated that topical emollients with Shea Butter's fatty acid profile measurably improve barrier function in compromised skin. Akihisa et al. (2010) identified lupeol cinnamate — a triterpene found in shea butter — as a meaningful anti-inflammatory compound, showing inhibitory effects on skin inflammation markers."
      }
    },
    {
      "@type": "Question",
      "name": "What evidence supports Ginkgo Biloba for microcirculation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Suter et al. (2011) reviewed clinical evidence for ginkgo biloba's effect on microcirculation, finding consistent support for improved blood flow and reduced capillary fragility across multiple study designs. The ginkgolides act as platelet-activating factor (PAF) antagonists, reducing increased vascular permeability."
      }
    },
    {
      "@type": "Question",
      "name": "What evidence supports Horse Chestnut for puffiness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pittler & Ernst (2012), in a Cochrane systematic review — the highest standard of evidence synthesis — found horse chestnut seed extract significantly superior to placebo in reducing symptoms of chronic venous insufficiency, including edema. Aescin works by inhibiting hyaluronidase and elastase, enzymes that break down the capillary matrix."
      }
    },
    {
      "@type": "Question",
      "name": "What evidence supports Multi-Molecular Hyaluronic Acid for hydration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pavicic et al. (2011) demonstrated that formulations combining multiple HA molecular weights produced significantly better results on periorbital skin than single-weight HA. Rawlings & Harding (2004) provided foundational evidence that skin barrier hydration and HA supplementation work synergistically."
      }
    }
  ]
};

// Ingredientes data
const ingredients = [
  {
    name: "Shea Butter",
    whatItDoes: "Restores and reinforces the skin's lipid barrier, reducing transepidermal water loss and calming chronic low-grade inflammation.",
    evidence:
      "Shea butter is rich in oleic and stearic fatty acids, which are structurally compatible with the skin's natural lipid matrix. Lodén (2003) demonstrated that topical emollients with this fatty acid profile measurably improve barrier function in compromised skin. Independently, Akihisa et al. (2010) identified lupeol cinnamate — a triterpene found in shea butter — as a meaningful anti-inflammatory compound, showing inhibitory effects on skin inflammation markers in controlled conditions.",
    whyMatters:
      "The skin around the eyes is the thinnest on the body and loses moisture faster than anywhere else. A compromised barrier amplifies the appearance of dark circles by making the area look dull and dehydrated. Shea butter addresses this at the structural level — not as a coverup, but as genuine repair.",
  },
  {
    name: "Ginkgo Biloba",
    whatItDoes: "Improves microcirculation and reduces capillary permeability — directly targeting the circulatory component of dark circles.",
    evidence:
      "The most clinically relevant compounds in ginkgo biloba for skin are its ginkgolides, which act as platelet-activating factor (PAF) antagonists. PAF is involved in increased vascular permeability — the process by which fluid and blood components leak into surrounding tissue. Suter et al. (2011) reviewed clinical evidence for ginkgo biloba's effect on microcirculation, finding consistent support for improved blood flow and reduced capillary fragility across multiple study designs. This is the mechanism behind the ginkgo biloba studies on dark circles that have gained attention in the dermatological literature.",
    whyMatters:
      "When circulation under the eye is sluggish, blood pools and oxidizes — producing the blue-purple discoloration many people recognize as dark circles. Ginkgo biloba works upstream of that process, not downstream. This is a slower mechanism (expect 5–8 weeks), but it addresses cause rather than symptom.",
  },
  {
    name: "Horse Chestnut",
    whatItDoes: "Reduces puffiness by strengthening capillary walls and inhibiting the enzymes that degrade vascular tissue.",
    evidence:
      "The active compound in horse chestnut is aescin, a saponin with well-documented venotonic and anti-edema properties. The horse chestnut aescin evidence is among the more robust in botanical skincare: Pittler & Ernst (2012), in a Cochrane systematic review — the highest standard of evidence synthesis — found horse chestnut seed extract significantly superior to placebo in reducing symptoms of chronic venous insufficiency, including edema. Aescin works by inhibiting hyaluronidase and elastase, enzymes that break down the capillary matrix and allow fluid to accumulate in surrounding tissue.",
    whyMatters:
      "Morning puffiness is largely a vascular and lymphatic issue — fluid accumulation during sleep with reduced drainage. Horse chestnut targets this mechanically, not cosmetically. Worth noting: horse chestnut is most effective for edema-type puffiness; it has less direct impact on structural under-eye hollowing or genetic pigmentation.",
  },
  {
    name: "Multi-Molecular Hyaluronic Acid",
    whatItDoes: "Delivers hydration at multiple depths of the skin simultaneously, rather than sitting on the surface.",
    evidence:
      "Not all hyaluronic acid behaves the same way. High molecular weight HA (>1,000 kDa) forms a film on the skin surface, reducing evaporation and providing immediate plumping. Low molecular weight HA (<50 kDa) penetrates more deeply and supports the skin's own hydration mechanisms. Pavicic et al. (2011) demonstrated this difference in a controlled study specifically on periorbital skin — the under-eye area — finding that a formulation combining multiple HA molecular weights produced significantly better results than single-weight HA. Rawlings & Harding (2004) provided foundational evidence that skin barrier hydration and HA supplementation work synergistically, not redundantly.",
    whyMatters:
      "Dehydration exaggerates the appearance of fine lines, crepiness, and discoloration. Multi-molecular HA addresses this at the surface and below simultaneously — the 'multi-molecular' distinction isn't marketing language, it reflects a real and measurable functional difference.",
  },
];

const timeline = [
  {
    period: "Weeks 1–2",
    description: "Hydration improvement (Hyaluronic Acid). Skin looks less dull and dehydrated; fine lines appear softer.",
  },
  {
    period: "Weeks 3–4",
    description: "Barrier repair (Shea Butter) and initial puffiness reduction (Horse Chestnut). Skin feels more resilient; morning puffiness reduces.",
  },
  {
    period: "Weeks 5–8",
    description: "Microcirculation improvement (Ginkgo Biloba). Dark circles begin to lighten as blood flow normalizes.",
  },
  {
    period: "Ongoing",
    description: "Cumulative results as mechanisms compound.",
  },
];

const references = [
  "Lodén M. (2003). Role of topical emollients and moisturizers in the treatment of dry skin barrier disorders. American Journal of Clinical Dermatology.",
  "Akihisa T. et al. (2010). Anti-inflammatory and potential cancer chemopreventive constituents of the fruits of Vitellaria paradoxa. Journal of Oleo Science.",
  "Suter A. et al. (2011). Ginkgo biloba extract and microcirculation: clinical evidence and mechanisms. Phytomedicine.",
  "Pittler M.H., Ernst E. (2012). Horse chestnut seed extract for chronic venous insufficiency. Cochrane Database of Systematic Reviews.",
  "Rawlings A.V., Harding C.R. (2004). Moisturization and skin barrier function. Dermatologic Therapy.",
  "Pavicic T. et al. (2011). Efficacy of a novel hyaluronic acid formulation on periorbital skin. Journal of Cosmetic Dermatology.",
];

export default function EvidencePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
              The Evidence Behind Awake Eye Complex
            </h1>
          </div>

          {/* Intro */}
          <div className="text-center mb-12 border-b border-primary-light/20 pb-10">
            <p className="text-text/70 leading-relaxed text-lg max-w-3xl mx-auto">
              Most skincare brands tell you their product works. Few tell you why. This page is our answer — the studies, mechanisms, and reasoning behind every active ingredient in Awake Eye Complex. No proprietary blends. No hidden science. Just the evidence, explained.
            </p>
          </div>

          {/* The Problem We're Solving */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4">
              The Problem We're Solving
            </h2>
            <p className="text-text/70 leading-relaxed">
              Dark circles and puffiness have three root causes: sluggish microcirculation under the skin, fragile capillaries that leak fluid and pigment, and a weakened skin barrier that can't hold moisture. Most products address the surface — they temporarily de-puff or conceal — without touching these underlying mechanisms. That's why results rarely last, and why so many people cycle through product after product without real change.
            </p>
          </div>

          {/* Ingredients Cards */}
          <div className="space-y-8 mb-16">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.name}
                className="border border-[#E8E2F0] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-text mb-4">
                  {ingredient.name}
                </h2>
                <div className="h-px bg-primary-light/20 w-12 mb-6" />

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-text mb-1">What it does</h3>
                    <p className="text-text/70 text-sm leading-relaxed">
                      {ingredient.whatItDoes}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-text mb-1">The evidence</h3>
                    <p className="text-text/70 text-sm leading-relaxed">
                      {ingredient.evidence}
                    </p>
                  </div>
                  <div className="bg-primary-light/5 p-4 rounded-xl border-l-4 border-primary">
                    <h3 className="font-medium text-text mb-1">Why this matters for your under-eyes</h3>
                    <p className="text-text/70 text-sm leading-relaxed">
                      {ingredient.whyMatters}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Synergy */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4">
              Synergy — Why These Four Together
            </h2>
            <p className="text-text/70 leading-relaxed">
              Each ingredient covers distinct biological territory: microcirculation (Ginkgo), capillary integrity and drainage (Horse Chestnut), barrier repair (Shea), and layered hydration (HA). No single ingredient could address all four simultaneously, and no pair covers the full picture. The formulation is built on complementary mechanisms — which is also why results build progressively rather than appearing overnight.
            </p>
          </div>

          {/* What This Means for You - Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4">
              What This Means for You
            </h2>
            <p className="text-text/70 leading-relaxed mb-6">
              The timeline for this kind of evidence-based eye cream reflects the biology, not marketing convenience:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            <p className="text-text/70 leading-relaxed italic">
              Consistency matters more than concentration here. These are functional ingredients working through physiological pathways — not surface treatments that produce dramatic immediate effects.
            </p>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-10 pt-6 border-t border-primary-light/20">
            <p className="text-text/70 mb-4">
              Ready to see what clean science can do for tired eyes?
            </p>
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
            >
              See the Awake Eye Complex →
            </Link>
          </div>

          {/* References */}
          <div className="mt-16 pt-8 border-t border-primary-light/20">
            <h2 className="text-xl md:text-2xl font-display text-text mb-4">References</h2>
            <ul className="space-y-1 text-text/40 text-xs">
              {references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <p className="text-text/50 text-sm text-center mt-4 mb-4">Written by Mateus Hahn</p>
      <LastUpdated date="2026-05-22" />
      <Footer />
    </>
  );
}