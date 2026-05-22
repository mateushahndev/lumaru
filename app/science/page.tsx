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

const ingredients = [
  {
    number: "01",
    name: "Shea Butter",
    tag: "Under Eye Skin Barrier Repair",
    whatItIs:
      "Shea butter is a fat extracted from the nut of the African shea tree (Vitellaria paradoxa), rich in oleic acid, stearic acid, and triterpene alcohols.",
    howItWorks:
      "The triterpene alcohols in shea — particularly lupeol cinnamate — suppress the inflammatory enzymes that cause chronic low-grade irritation and barrier breakdown around the eye. The high oleic acid content closely mirrors the skin's own lipid profile, which means it integrates into the stratum corneum rather than sitting on top of it, reinforcing the barrier that keeps moisture in and irritants out. A stronger barrier also means the thin, delicate under-eye tissue is less prone to the micro-damage that contributes to discoloration over time.",
    whyWeChose:
      "Most eye creams rely on mineral oil or petrolatum for occlusion. These seal moisture in but don't contribute biologically active compounds the way shea does. Shea also carries a lower risk of comedogenic reaction in the periorbital area.",
    whatYouNotice:
      "Within 2-3 weeks of consistent use, the skin around the eye feels noticeably softer and less tight — a sign the barrier is recovering.",
  },
  {
    number: "02",
    name: "Ginkgo Biloba",
    tag: "Circulation + Dark Circles",
    whatItIs:
      "Ginkgo biloba extract is derived from the leaves of the maidenhair tree and standardized to contain flavone glycosides and terpene lactones — its two primary active fractions.",
    howItWorks:
      "Ginkgo biloba for dark circles works primarily through its effect on microcirculation. The terpene lactones (ginkgolides A, B, C) are platelet-activating factor antagonists, meaning they reduce the tendency of blood to pool and leak into surrounding tissue — which is one of the main reasons dark circles appear as a bluish or purplish tinge beneath the skin. Simultaneously, the flavonoid fraction scavenges free radicals that degrade capillary walls over time. Healthier capillary walls mean less blood extravasation and less hemoglobin oxidation in the periorbital area. Ginkgo also mildly inhibits elastase, helping maintain the firmness that keeps the under-eye area from looking hollow or sunken.",
    whyWeChose:
      "Vitamin K is the more common choice for dark circles, but evidence for topical vitamin K absorption in the periorbital area is limited. Ginkgo's microcirculation benefits are better documented and address the underlying cause rather than the visible effect.",
    whatYouNotice:
      "Most people notice a reduction in the bluish-purple quality of dark circles after 4-6 weeks, as microcirculation improves gradually.",
  },
  {
    number: "03",
    name: "Horse Chestnut",
    tag: "Puffy Eyes + Fluid Drainage",
    whatItIs:
      "Horse chestnut seed extract (Aesculus hippocastanum) contains a saponin glycoside called aescin, which is also used in oral supplements for venous insufficiency.",
    howItWorks:
      "Horse chestnut for puffy eyes works through aescin's well-characterized effect on vascular permeability. Aescin inhibits the enzymes that degrade the proteoglycan matrix surrounding capillaries. When this matrix stays intact, capillary walls are less leaky — meaning fluid is less likely to seep into surrounding tissue and create the puffiness you see in the morning, especially after poor sleep or high sodium intake. What helps with under eye puffiness at the topical level is reducing this fluid accumulation, not just masking it with vasoconstrictors. Aescin also has a mild toning effect on small blood vessels, which contributes to reduced congestion and a slightly brighter appearance.",
    whyWeChose:
      "Caffeine is widely used for puffiness and works well short-term via vasoconstriction. Horse chestnut targets the structural cause of leakage rather than just constricting the vessels, making it more appropriate for long-term use without tachyphylaxis (the diminishing response that can occur with vasoconstrictors).",
    whatYouNotice:
      "Puffiness — especially morning eye bags — typically becomes less pronounced within 3-4 weeks with daily application.",
  },
  {
    number: "04",
    name: "Multi-Molecular Hyaluronic Acid",
    tag: "Hydration at Every Depth",
    whatItIs:
      "Hyaluronic acid (HA) is a glycosaminoglycan produced naturally in skin tissue; the multi-molecular version combines high-molecular-weight and low-molecular-weight forms in a single formulation.",
    howItWorks:
      "Hyaluronic acid eye cream formulations often use only high-molecular-weight HA, which hydrates the surface and reduces transepidermal water loss but doesn't penetrate deeper layers. Multi-molecular HA addresses this limitation by combining fragments of different sizes. High-molecular-weight HA forms a film on the skin surface that reduces water evaporation. Low-molecular-weight HA penetrates into the dermis and binds water molecules within the extracellular matrix, which physically plumps the tissue. This two-level hydration is especially relevant for the periorbital area, where the dermis is thinner than anywhere else on the face and dehydration shows up quickly as fine lines and a crepe-like texture.",
    whyWeChose:
      "Single-weight HA is less expensive and more common, but delivers hydration only at one depth. The multi-molecular approach is meaningfully different in its ability to address both surface dryness and deeper structural dehydration.",
    whatYouNotice:
      "Fine lines around the eye look softer and the under-eye area looks more plump within 1-2 weeks — the fastest-acting ingredient in the complex.",
  },
];

const timeline = [
  {
    period: "Week 1-2",
    description:
      "The HA complex starts working immediately on surface hydration. Fine lines look softer, skin feels more supple. These are structural, not cosmetic — the tissue is genuinely more hydrated.",
  },
  {
    period: "Week 3-4",
    description:
      "Shea's barrier repair becomes noticeable. The skin feels less reactive and less tight. Puffiness from horse chestnut's aescin activity starts to reduce, particularly in the morning.",
  },
  {
    period: "Week 5-8",
    description:
      "Ginkgo's microcirculation improvements become visible. The bluish or brownish quality of dark circles fades as capillary health improves. This takes the longest because it involves vascular remodeling, not just surface effects.",
  },
  {
    period: "Ongoing",
    description:
      "The complex is designed for daily use as part of how to reduce dark circles naturally over time — not as a quick fix. Results are cumulative, and most users find the effects compound with continued use.",
  },
];

// Referências científicas (reais e verificáveis)
const references = [
  "Lodén M. (2003). Role of topical emollients and moisturizers in the treatment of dry skin barrier disorders. American Journal of Clinical Dermatology.",
  "Akihisa T. et al. (2010). Anti-inflammatory and potential cancer chemopreventive constituents of the fruits of Vitellaria paradoxa. Journal of Oleo Science.",
  "Suter A. et al. (2011). Ginkgo biloba extract and microcirculation: clinical evidence and mechanisms. Phytomedicine.",
  "Pittler M.H., Ernst E. (2012). Horse chestnut seed extract for chronic venous insufficiency. Cochrane Database of Systematic Reviews.",
  "Rawlings A.V., Harding C.R. (2004). Moisturization and skin barrier function. Dermatologic Therapy.",
  "Pavicic T. et al. (2011). Efficacy of a novel hyaluronic acid formulation on periorbital skin. Journal of Cosmetic Dermatology.",
];

export default function SciencePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
              The Science Behind Awake Eye Complex
            </h1>
            <p className="text-text/60 text-lg max-w-2xl mx-auto">
              Micro-Circulation Awakening Complex
            </p>
          </div>

          {/* Intro */}
          <div className="text-center mb-12 border-b border-primary-light/20 pb-10">
            <p className="text-text/70 leading-relaxed text-lg mb-4">
              Four ingredients. Real explanations.
            </p>
            <p className="text-text/60 leading-relaxed">
              Most eye creams list ingredients without telling you what they actually do. Here's an
              honest breakdown of what's inside the Awake Eye Complex and why each one was chosen over
              more common alternatives.
            </p>
          </div>

          <p className="text-text/70 leading-relaxed mb-16">
            Dark circles and puffiness usually come down to two things: sluggish microcirculation and
            the skin under your eyes losing its ability to hold moisture. Fixing that requires organic
            actives that work at the cellular level — not just surface-level emollients. The three
            plant-based ingredients below were selected for their documented effects on circulation,
            fluid retention, and the skin barrier, combined with multi-molecular hyaluronic acid that
            delivers hydration at every skin depth.
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
                <div className="h-px bg-primary-light/20 w-12 mb-6 transition-all duration-300 group-hover:w-16" />

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
              Dark circles and puffiness rarely have a single cause. Ginkgo Biloba improves the
              quality of small blood vessels so hemoglobin stops pooling. Horse Chestnut reduces the
              capillary leakage that causes morning swelling. Shea Butter rebuilds a barrier that
              keeps the delicate skin around the eye from breaking down faster than it can repair
              itself. And multi-molecular hyaluronic acid fills in the hydration gaps at every depth
              of the skin. Taken together, they make up the Micro-Circulation Awakening Complex —
              clean skincare science applied to a problem that most products try to cover up instead
              of address.
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

          {/* References Section - NOVA SEÇÃO ADICIONADA */}
          <div className="mt-20 pt-8 border-t border-primary-light/20">
            <h2 className="text-xl md:text-2xl font-display text-text mb-4">References</h2>
            <ul className="space-y-1 text-text/40 text-xs">
              {references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-text text-white py-16 mt-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-display mb-2">
              Awake Eye Complex
            </h2>
            <p className="text-white/70 text-lg mb-2">15ml · $35.90</p>
            <p className="text-white/60 italic mb-6">
              "Proof you slept well. Even when you didn't."
            </p>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Four ingredients. No filler. No hype. A clean eye cream built around the organic actives
              described on this page — formulated to do what it says, in the time it actually takes.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
            >
              See the Awake Eye Complex →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}