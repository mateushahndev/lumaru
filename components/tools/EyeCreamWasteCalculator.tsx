"use client";

import { useState, useEffect } from "react";

// Preço do Awake Eye Complex
const PRODUCT_PRICE = 35.9;

// Custos anuais para equivalentes
const NETFLIX_YEARLY_COST = 155;
const LATTE_PRICE = 5.5;

// Helper para enviar eventos GA4
const sendEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }
};

export default function EyeCreamWasteCalculator() {
  const [creams, setCreams] = useState<number | "">("");
  const [avgPrice, setAvgPrice] = useState<number | "">("");
  const [years, setYears] = useState<number | "">("");
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Detectar primeira interação (tool_started)
  useEffect(() => {
    if (!hasStarted && (creams !== "" || avgPrice !== "" || years !== "")) {
      setHasStarted(true);
      sendEvent("tool_started", { tool_name: "eye_cream_waste_calculator" });
    }
  }, [creams, avgPrice, years, hasStarted]);

  // Detectar conclusão (tool_completed)
  useEffect(() => {
    if (showResult && total !== null) {
      sendEvent("tool_completed", { tool_name: "eye_cream_waste_calculator" });
    }
  }, [showResult, total]);

  const validateAndCalculate = () => {
    setError(null);

    const creamsNum = Number(creams);
    const priceNum = Number(avgPrice);
    const yearsNum = Number(years);

    if (
      isNaN(creamsNum) ||
      isNaN(priceNum) ||
      isNaN(yearsNum) ||
      creamsNum <= 0 ||
      priceNum <= 0 ||
      yearsNum <= 0
    ) {
      setError("Please fill in all fields with valid numbers.");
      setShowResult(false);
      setTotal(null);
      return;
    }

    const calculatedTotal = creamsNum * priceNum * yearsNum;
    setTotal(Math.round(calculatedTotal));
    setShowResult(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndCalculate();
  };

  const getProductCount = () => {
    if (!total) return 0;
    return Math.round(total / PRODUCT_PRICE);
  };

  const getNetflixYears = () => {
    if (!total) return 0;
    return Math.round(total / NETFLIX_YEARLY_COST);
  };

  const getLattes = () => {
    if (!total) return 0;
    return Math.round(total / LATTE_PRICE);
  };

  const shareText = () => {
    if (!total) return "";
    return `I've spent $${total.toLocaleString()} on eye creams that didn't work. This calculator just called me out. 👀 ${window.location.href}`;
  };

  const copyToClipboard = () => {
    const text = shareText();
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const shareOnTwitter = () => {
    const text = shareText();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareOnPinterest = () => {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      window.location.href
    )}&description=${encodeURIComponent(shareText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
          How Much Have You Spent on Eye Creams?
        </h1>
        <p className="text-text/60 text-lg max-w-2xl mx-auto">
          A quick look at the real cost of searching for something that works.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-[#E8E2F0] rounded-2xl p-6 md:p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="creams" className="block text-text font-medium mb-2">
              How many eye creams have you tried?
            </label>
            <input
              type="number"
              id="creams"
              value={creams}
              onChange={(e) =>
                setCreams(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Ex: 12"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
              min="0"
              step="1"
            />
          </div>

          <div>
            <label htmlFor="avgPrice" className="block text-text font-medium mb-2">
              Average price per cream (USD)
            </label>
            <input
              type="number"
              id="avgPrice"
              value={avgPrice}
              onChange={(e) =>
                setAvgPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Ex: 35"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label htmlFor="years" className="block text-text font-medium mb-2">
              How many years have you been searching?
            </label>
            <input
              type="number"
              id="years"
              value={years}
              onChange={(e) =>
                setYears(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Ex: 5"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
              min="0"
              step="1"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Calculate →
          </button>
        </form>
      </div>

      {/* Result */}
      {showResult && total !== null && (
        <div className="animate-fade-in-up space-y-8">
          {/* Total */}
          <div className="bg-primary-light/10 rounded-2xl p-8 text-center">
            <p className="text-text/60 text-sm uppercase tracking-wider mb-2">
              Your estimated total
            </p>
            <p className="text-4xl md:text-5xl font-bold text-text">
              ${total.toLocaleString()}
            </p>
            <p className="text-text/70 mt-2">
              spent on eye creams that didn't work
            </p>
          </div>

          {/* Equivalents */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E8E2F0] rounded-xl p-5 text-center">
              <p className="text-text/50 text-sm mb-1">That's</p>
              <p className="text-2xl font-bold text-text">
                {getProductCount()} tubes
              </p>
              <p className="text-text/60 text-sm">of Awake Eye Complex</p>
            </div>
            <div className="bg-white border border-[#E8E2F0] rounded-xl p-5 text-center">
              <p className="text-text/50 text-sm mb-1">Or</p>
              <p className="text-2xl font-bold text-text">
                {getNetflixYears()} years
              </p>
              <p className="text-text/60 text-sm">of Netflix</p>
            </div>
            <div className="bg-white border border-[#E8E2F0] rounded-xl p-5 text-center">
              <p className="text-text/50 text-sm mb-1">Or</p>
              <p className="text-2xl font-bold text-text">
                {getLattes()} lattes
              </p>
              <p className="text-text/60 text-sm">from your favorite cafe</p>
            </div>
          </div>

          {/* Transition - sem CTA */}
          <div className="text-center py-4">
            <p className="text-text/80 text-lg italic">
              It's not your fault. Most eye creams don't target the real cause — poor
              microcirculation and fluid retention.
            </p>
          </div>

          {/* Share Section */}
          <div className="border-t border-primary-light/20 pt-8 mt-4">
            <p className="text-text/50 text-sm text-center mb-4">
              Share your number
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 text-sm border border-primary/30 rounded-lg text-text/70 hover:text-primary hover:border-primary transition-colors"
              >
                Copy text
              </button>
              <button
                onClick={shareOnTwitter}
                className="px-4 py-2 text-sm border border-primary/30 rounded-lg text-text/70 hover:text-primary hover:border-primary transition-colors"
              >
                Share on X
              </button>
              <button
                onClick={shareOnPinterest}
                className="px-4 py-2 text-sm border border-primary/30 rounded-lg text-text/70 hover:text-primary hover:border-primary transition-colors"
              >
                Save on Pinterest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}