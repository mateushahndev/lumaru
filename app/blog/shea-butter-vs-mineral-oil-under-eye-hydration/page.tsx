import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LastUpdated from "@/components/LastUpdated";

export const metadata: Metadata = {
  title: "Shea Butter vs Mineral Oil for Under-Eye Hydration: What's the Difference? | Lumaru",
  description:
    "Shea butter and mineral oil both hydrate — but they work completely differently. Learn which one your under-eyes actually need.",
  openGraph: {
    title: "Shea Butter vs Mineral Oil for Under-Eye Hydration: What's the Difference?",
    description:
      "Shea butter and mineral oil both hydrate — but they work completely differently. Learn which one your under-eyes actually need.",
    url: "https://lumaruskin.com/blog/shea-butter-vs-mineral-oil-under-eye-hydration",
    type: "article",
  },
  alternates: {
    canonical: "https://lumaruskin.com/blog/shea-butter-vs-mineral-oil-under-eye-hydration",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SheaButterVsMineralOilPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {/* Back to Blog */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-primary hover:underline mb-8 text-sm"
            >
              ← Back to Blog
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-6">
              Shea Butter vs Mineral Oil for Under-Eye Hydration: What's the Difference?
            </h1>

            {/* Intro */}
            <p className="text-text/70 text-lg leading-relaxed mb-8">
              Both lock in moisture. Both show up in eye creams. But one nourishes while the other just seals — and the difference matters for the thinnest skin on your face.
            </p>

            {/* TL;DR Box */}
            <div className="bg-primary-light/10 border-l-4 border-primary rounded-r-xl p-6 mb-10">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                TL;DR — The Short Version
              </h2>
              <ul className="space-y-2 text-text/80">
                <li>✓ Mineral oil works by occlusion: it sits on top of skin and prevents water from escaping. It doesn't add anything, but it does that one job well.</li>
                <li>✓ Shea butter also creates a barrier — but it also delivers fatty acids, vitamins, and anti-inflammatory compounds that actually feed the skin.</li>
                <li>✓ Neither is a villain. They just have different jobs.</li>
                <li>✓ The right choice depends on what your under-eye skin actually needs — not what sounds more "natural" or more "scientific."</li>
              </ul>
            </div>

            {/* How Mineral Oil Works */}
            <h2 className="text-2xl md:text-3xl font-display text-text mt-10 mb-4">
              How Mineral Oil Works
            </h2>
            <p className="text-text/70 leading-relaxed mb-4">
              Mineral oil is a purified petroleum derivative — a lightweight, inert hydrocarbon with no biological activity.
            </p>
            <p className="text-text/70 leading-relaxed mb-4">
              Its mechanism is purely occlusive: it forms a thin, breathable film on the surface of your skin that slows transepidermal water loss (TEWL). It doesn't penetrate the dermis. It doesn't interact with skin cells. It simply seals in whatever moisture is already there.
            </p>
            <p className="text-text/70 leading-relaxed mb-4">
              That sounds boring — and honestly, it is. But boring isn't the same as bad.
            </p>

            <h3 className="text-lg font-semibold text-text mt-4 mb-2">What it does well:</h3>
            <ul className="list-disc pl-6 text-text/70 space-y-1">
              <li>Extremely stable — doesn't oxidize or go rancid</li>
              <li>Non-irritating and non-sensitizing (one of the most tested ingredients in cosmetics)</li>
              <li>Very effective as a moisture sealant</li>
              <li>Inexpensive and widely available</li>
            </ul>

            <h3 className="text-lg font-semibold text-text mt-4 mb-2">Its real limitations:</h3>
            <ul className="list-disc pl-6 text-text/70 space-y-1">
              <li>Delivers zero nutrients to the skin</li>
              <li>Does not penetrate — nothing below the surface benefits</li>
              <li>Contributes nothing to barrier repair or cellular function</li>
              <li>Has a reputation for being "bad" that, while often exaggerated, isn't entirely without basis for certain skin types</li>
            </ul>

            <p className="text-text/70 leading-relaxed mt-4">
              <strong className="text-text">Best for:</strong> skin that just needs to lock in hydration — especially after applying a water-based humectant like hyaluronic acid.
            </p>
            <p className="text-text/70 text-sm italic mt-2">
              On mineral oil comedogenicity: pure, cosmetic-grade mineral oil has a very low comedogenic rating (0–1 on the standard scale). The idea that it "clogs pores" is largely based on industrial-grade formulations, not cosmetic ones. That said, individual reactions vary.
            </p>

            {/* How Shea Butter Works */}
            <h2 className="text-2xl md:text-3xl font-display text-text mt-10 mb-4">
              How Shea Butter Works
            </h2>
            <p className="text-text/70 leading-relaxed mb-4">
              Shea butter is a fat extracted from the seeds of the Vitellaria paradoxa tree, composed primarily of triglycerides — meaning it's a complex mixture of fatty acids, vitamins, and bioactive compounds.
            </p>
            <p className="text-text/70 leading-relaxed mb-4">
              Unlike mineral oil, shea butter works on multiple levels. Its high concentration of oleic acid (45–50%) and stearic acid (35–45%) allows it to partially penetrate the upper layers of the epidermis, reinforcing the skin's natural lipid matrix. Vitamins A and E provide antioxidant protection, while triterpene alcohols (like lupeol and butyrospermum parkii sterols) have documented anti-inflammatory effects.
            </p>
            <p className="text-text/70 leading-relaxed mb-4">
              In practice, this means shea butter both seals moisture <em>and</em> delivers something to the skin in the process — which matters especially in an area as thin and delicate as the under-eye.
            </p>

            <h3 className="text-lg font-semibold text-text mt-4 mb-2">What it does well:</h3>
            <ul className="list-disc pl-6 text-text/70 space-y-1">
              <li>Nourishes with fatty acids, vitamins A and E, and plant sterols</li>
              <li>Helps repair and reinforce the skin's moisture barrier over time</li>
              <li>Anti-inflammatory compounds can reduce puffiness and sensitivity</li>
              <li>Antioxidants help protect against environmental stress</li>
              <li>Biodegradable and plant-derived</li>
            </ul>

            <h3 className="text-lg font-semibold text-text mt-4 mb-2">Its real limitations:</h3>
            <ul className="list-disc pl-6 text-text/70 space-y-1">
              <li>More expensive and less shelf-stable than mineral oil</li>
              <li>Heavier texture — may feel too rich for oily or combination skin types</li>
              <li>Moderate comedogenic potential (rated 0–2 depending on refinement) — not ideal for acne-prone skin</li>
              <li>Results from barrier repair take consistent use over weeks, not days</li>
            </ul>

            <p className="text-text/70 leading-relaxed mt-4">
              <strong className="text-text">Best for:</strong> under-eye skin that needs both sealing and nourishment — particularly dry, mature, or compromised skin barriers.
            </p>

            {/* Side-by-Side Comparison Table */}
            <h2 className="text-2xl md:text-3xl font-display text-text mt-10 mb-6">
              Side-by-Side Comparison
            </h2>

            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary-light/20 border-b border-primary-light/40">
                    <th className="text-left p-3 font-semibold text-text"> </th>
                    <th className="text-left p-3 font-semibold text-text">Mineral Oil</th>
                    <th className="text-left p-3 font-semibold text-text">Shea Butter</th>
                   </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary-light/20">
                    <td className="p-3 font-medium text-text">Mechanism</td>
                    <td className="p-3 text-text/70">Occlusion only (seals surface)</td>
                    <td className="p-3 text-text/70">Occlusion + partial penetration + nutrition</td>
                   </tr>
                  <tr className="border-b border-primary-light/20">
                    <td className="p-3 font-medium text-text">Nutrients delivered</td>
                    <td className="p-3 text-text/70">None</td>
                    <td className="p-3 text-text/70">Fatty acids, vitamins A &amp; E, triterpenes</td>
                   </tr>
                  <tr className="border-b border-primary-light/20">
                    <td className="p-3 font-medium text-text">Texture</td>
                    <td className="p-3 text-text/70">Light, slightly slippery</td>
                    <td className="p-3 text-text/70">Rich, buttery</td>
                   </tr>
                  <tr className="border-b border-primary-light/20">
                    <td className="p-3 font-medium text-text">Comedogenic rating</td>
                    <td className="p-3 text-text/70">Very low (0–1)</td>
                    <td className="p-3 text-text/70">Low to moderate (0–2)</td>
                   </tr>
                  <tr className="border-b border-primary-light/20">
                    <td className="p-3 font-medium text-text">Effect duration</td>
                    <td className="p-3 text-text/70">Hours (surface only)</td>
                    <td className="p-3 text-text/70">Hours + residual barrier benefit</td>
                   </tr>
                  <tr className="border-b border-primary-light/20">
                    <td className="p-3 font-medium text-text">Best use case</td>
                    <td className="p-3 text-text/70">Sealing hydration fast</td>
                    <td className="p-3 text-text/70">Nourishing + repairing over time</td>
                   </tr>
                </tbody>
               </table>
            </div>

            {/* Which One Should You Choose? */}
            <h2 className="text-2xl md:text-3xl font-display text-text mt-10 mb-4">
              Which One Should You Choose?
            </h2>
            <p className="text-text/70 leading-relaxed mb-4">
              This depends less on which ingredient sounds better and more on what your skin actually needs.
            </p>

            <p className="text-text/70 leading-relaxed mb-4">
              <strong className="text-text">Choose mineral oil if:</strong> Your skin barrier is intact and you mainly need to seal in hydration — for example, right after applying hyaluronic acid or another humectant. It's also a good option if you have sensitive skin prone to reactions, since mineral oil is one of the most hypoallergenic ingredients in cosmetics.
            </p>

            <p className="text-text/70 leading-relaxed mb-4">
              <strong className="text-text">Choose shea butter if:</strong> Your under-eye area feels tight, flaky, or prone to fine lines from dryness. If your skin barrier feels compromised — or if you're looking for something that does more than just sit on the surface — shea butter's fatty acid profile and anti-inflammatory properties offer real structural benefits over time. It's a strong choice for dry, mature, or stressed skin.
            </p>

            <p className="text-text/70 leading-relaxed mb-4">
              <strong className="text-text">Consider both:</strong> Many well-formulated eye creams use both ingredients in the same formula — mineral oil for immediate occlusion, shea butter for nourishment and longer-term barrier support. The two mechanisms complement each other.
            </p>

            <p className="text-text/70 leading-relaxed mb-4">
              <strong className="text-text">Still not sure?</strong> Not sure what your under-eyes need? Take our free 3-question test at lumaruskin.com/tools/dark-circle-type-finder.
            </p>

            {/* CTA Box */}
            <div className="bg-primary-light/5 rounded-2xl p-6 text-center my-8 border border-primary-light/20">
              <p className="text-text/80 mb-3">
                Not sure what your under-eyes need? Take our free 3-question test —
              </p>
              <Link
                href="/tools/dark-circle-type-finder"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
              >
                Find Your Dark Circle Type →
              </Link>
            </div>

            {/* The Bottom Line */}
            <h2 className="text-2xl md:text-3xl font-display text-text mt-10 mb-4">
              The Bottom Line
            </h2>
            <p className="text-text/70 leading-relaxed mb-4">
              When it comes to shea butter vs mineral oil, neither wins universally. Mineral oil is reliable, stable, and effective at its one job. Shea butter does more — but "more" isn't always what your skin needs, and it comes with a slightly higher risk of heaviness or breakouts for some skin types.
            </p>
            <p className="text-text/70 leading-relaxed mb-4">
              The best under-eye moisturizer isn't the one with the most impressive ingredient list. It's the one that matches what your skin barrier actually needs.
            </p>

            {/* Final CTA */}
            <div className="text-center mt-10 pt-6 border-t border-primary-light/20">
              <p className="text-text/70 mb-4">
                Still not sure which ingredient is right for your under-eyes? Our free Dark Circle Type Finder helps you understand what your skin actually needs — in 60 seconds, no email required.
              </p>
              <Link
                href="/tools/dark-circle-type-finder"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
              >
                Find Your Dark Circle Type →
              </Link>
            </div>

            {/* References */}
            <div className="text-text/40 text-xs mt-12 pt-6 border-t border-primary-light/20">
              <h3 className="text-sm font-semibold text-text/60 mb-2">References</h3>
              <ul className="space-y-1">
                <li>Lodén M. (2003). Role of topical emollients and moisturizers in the treatment of dry skin barrier disorders. American Journal of Clinical Dermatology.</li>
                <li>Akihisa T. et al. (2010). Anti-inflammatory and potential cancer chemopreventive constituents of the fruits of Vitellaria paradoxa. Journal of Oleo Science.</li>
                <li>Rawlings A.V., Harding C.R. (2004). Moisturization and skin barrier function. Dermatologic Therapy.</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
      <LastUpdated date="2026-05-22" />
      <Footer />
    </>
  );
}