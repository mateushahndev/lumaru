import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LastUpdated from "@/components/LastUpdated";

export const metadata: Metadata = {
  title: "Ingredients Data — Awake Eye Complex | Lumaru",
  description:
    "Complete ingredient list for the Awake Eye Complex. Every ingredient, its function, and its source. No proprietary blends.",
  openGraph: {
    title: "Ingredients Data — Awake Eye Complex | Lumaru",
    description:
      "Complete ingredient list for the Awake Eye Complex. Every ingredient, its function, and its source.",
    url: "https://lumaruskin.com/ingredients",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/ingredients",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://lumaruskin.com/ingredients",
  "name": "Ingredients Data — Awake Eye Complex",
  "description": "Complete ingredient list for the Awake Eye Complex. Every ingredient, its function, and its source. No proprietary blends.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Lumaru",
    "url": "https://lumaruskin.com"
  }
};

interface Ingredient {
  name: string;
  function: string;
  source: string;
  evidenceLevel: string;
  evidenceBadge: "well-established" | "moderate" | "limited" | "standard";
}

const ingredients: Ingredient[] = [
  { name: "Aqua (Water)", function: "Solvent, base", source: "Mineral/Purified", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Helianthus Annuus (Sunflower) Seed Oil", function: "Emollient, skin conditioning", source: "Plant (sunflower seeds)", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Glycerin", function: "Humectant", source: "Plant/Vegetable", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Pentylene Glycol", function: "Moisturizer, preservative booster", source: "Plant-derived (sugar cane/corn)", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Cetearyl Alcohol", function: "Emulsifier, stabilizer", source: "Plant-derived (coconut/palm)", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Isoamyl Laurate", function: "Emollient, texture enhancer", source: "Plant-derived", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Arachidyl Alcohol", function: "Emollient, thickener", source: "Plant-derived", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Behenyl Alcohol", function: "Emollient, consistency agent", source: "Plant-derived", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Betaine", function: "Humectant, anti-irritant", source: "Plant (sugar beet)", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Palmitic Acid", function: "Emulsifier, skin conditioner", source: "Plant-derived", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Stearic Acid", function: "Emulsifier, cleanser", source: "Plant-derived", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Arachidyl Glucoside", function: "Emulsifier, mild surfactant", source: "Plant-derived", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Parfum", function: "Fragrance", source: "Essential oils", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Cellulose", function: "Thickener, stabilizer", source: "Plant (wood/cotton)", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Butyrospermum Parkii (Shea) Butter", function: "Moisturizer, barrier repair, anti-inflammatory", source: "Plant (shea nut)", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Coco-Glucoside", function: "Mild surfactant", source: "Plant (coconut)", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Xanthan Gum", function: "Thickener, stabilizer", source: "Fermentation (plant)", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Oryza Sativa (Rice) Bran Oil", function: "Antioxidant, emollient", source: "Plant (rice bran)", evidenceLevel: "Moderate", evidenceBadge: "moderate" },
  { name: "Vegetable Oil", function: "Emollient, base", source: "Plant", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Helianthus Annuus (Sunflower) Seed Wax", function: "Emollient, texture", source: "Plant (sunflower)", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Oryza Sativa (Rice) Bran Wax", function: "Emollient, texture", source: "Plant (rice bran)", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Rhus Succedanea Fruit Wax", function: "Emollient, texture", source: "Plant (sumac fruit)", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Ascorbyl Palmitate", function: "Antioxidant (vitamin C derivative)", source: "Plant/synthetic", evidenceLevel: "Moderate", evidenceBadge: "moderate" },
  { name: "Tocopherol", function: "Antioxidant (vitamin E)", source: "Plant/synthetic", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Sodium Phytate", function: "Chelating agent, preservative", source: "Plant-derived", evidenceLevel: "Limited", evidenceBadge: "limited" },
  { name: "Vitis Vinifera (Grape) Leaf Extract", function: "Antioxidant, skin protector", source: "Plant (grape leaves)", evidenceLevel: "Moderate", evidenceBadge: "moderate" },
  { name: "Potassium Hydroxide", function: "pH adjuster", source: "Mineral", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Aesculus Hippocastanum (Horse Chestnut) Seed Extract", function: "Anti-edema, capillary strengthener", source: "Plant (horse chestnut)", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Hydrolyzed Hyaluronic Acid", function: "Deep hydration (low molecular weight)", source: "Fermentation/Plant", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Ginkgo Biloba Leaf Extract", function: "Microcirculation activator", source: "Plant (ginkgo leaves)", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Sodium Hyaluronate", function: "Surface hydration (high molecular weight)", source: "Fermentation/Plant", evidenceLevel: "Well-established", evidenceBadge: "well-established" },
  { name: "Limonene", function: "Fragrance component", source: "Essential oils (citrus)", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Geraniol", function: "Fragrance component", source: "Essential oils (rose, geranium)", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Coumarin", function: "Fragrance component", source: "Essential oils (tonka bean)", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
  { name: "Linalool", function: "Fragrance component", source: "Essential oils (lavender, mint)", evidenceLevel: "N/A (standard)", evidenceBadge: "standard" },
];

const getBadgeStyles = (badge: string) => {
  switch (badge) {
    case "well-established":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "limited":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-white text-gray-500 border border-gray-200";
  }
};

export default function IngredientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb com duas opções */}
          <div className="mb-6 space-x-4">
            <Link
              href="/science"
              className="text-primary/70 hover:text-primary text-sm transition-colors"
            >
              ← Back to Science
            </Link>
            <Link
              href="/evidence"
              className="text-primary/70 hover:text-primary text-sm transition-colors"
            >
              ← Back to Evidence
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
              Ingredients Data — Awake Eye Complex
            </h1>
            <p className="text-text/60 text-lg max-w-2xl mx-auto">
              Every ingredient, its function, and its source. No proprietary blends. No hidden anything.
            </p>
          </div>

          {/* Tabela - scroll horizontal no mobile */}
            <div className="overflow-x-auto mb-16">
            <table className="w-full border-collapse border border-[#E8E2F0] text-sm">
                <thead>
                <tr className="bg-primary-light/10 border-b border-[#E8E2F0]">
                    <th className="text-left p-3 font-semibold text-text">Ingredient</th>
                    <th className="text-left p-3 font-semibold text-text">Function</th>
                    <th className="text-left p-3 font-semibold text-text">Source</th>
                    <th className="text-left p-3 font-semibold text-text">Evidence Level</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.map((ingredient, idx) => (
                    <tr
                    key={ingredient.name}
                    className={`border-b border-[#E8E2F0] ${idx % 2 === 0 ? "bg-white" : "bg-primary-light/5"}`}
                    >
                    <td className="p-3 font-mono text-text/90 text-xs md:text-sm">
                        {ingredient.name}
                    </td>
                    <td className="p-3 text-text/70 text-xs md:text-sm">
                        {ingredient.function}
                    </td>
                    <td className="p-3 text-text/70 text-xs md:text-sm">
                        {ingredient.source}
                    </td>
                    <td className="p-3">
                        <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles(
                            ingredient.evidenceBadge
                        )}`}
                        >
                        {ingredient.evidenceLevel}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

          {/* Seção de Ativos Principais */}
          <div className="border-t border-primary-light/20 pt-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4 text-center">
              Active Ingredients — The Micro-Circulation Awakening Complex
            </h2>
            <p className="text-text/60 text-center max-w-2xl mx-auto mb-8">
              These four ingredients form the core of the Awake Eye Complex. They were selected for their documented effects on microcirculation, capillary strength, skin barrier repair, and multi-depth hydration.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/evidence#shea-butter"
                className="block p-4 border border-[#E8E2F0] rounded-xl hover:shadow-md transition-all duration-300 text-center"
              >
                <h3 className="font-semibold text-text mb-1">Shea Butter</h3>
                <p className="text-text/50 text-xs">Barrier repair</p>
              </Link>
              <Link
                href="/evidence#ginkgo-biloba"
                className="block p-4 border border-[#E8E2F0] rounded-xl hover:shadow-md transition-all duration-300 text-center"
              >
                <h3 className="font-semibold text-text mb-1">Ginkgo Biloba</h3>
                <p className="text-text/50 text-xs">Microcirculation</p>
              </Link>
              <Link
                href="/evidence#horse-chestnut"
                className="block p-4 border border-[#E8E2F0] rounded-xl hover:shadow-md transition-all duration-300 text-center"
              >
                <h3 className="font-semibold text-text mb-1">Horse Chestnut</h3>
                <p className="text-text/50 text-xs">Capillary strength</p>
              </Link>
              <Link
                href="/evidence#hyaluronic-acid"
                className="block p-4 border border-[#E8E2F0] rounded-xl hover:shadow-md transition-all duration-300 text-center"
              >
                <h3 className="font-semibold text-text mb-1">Multi-Molecular HA</h3>
                <p className="text-text/50 text-xs">Multi-depth hydration</p>
              </Link>
            </div>
          </div>

          {/* Last Updated */}
          <LastUpdated date="2026-05-25" />
        </div>
      </main>
      <Footer />
    </>
  );
}