"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sendEvent } from "@/lib/useGA4";
import { useScreenshot } from "@/components/providers/ScreenshotProvider";

const benefits = [
  "Micro-Circulation Awakening Complex + Hyaluronic Acid — targets the root cause and hydrates instantly",
  "Visible improvement week by week — the longer you use it, the better it gets",
  "Certified organic, vegan, cruelty-free — gentle on sensitive skin",
  "A little goes a long way — premium formula, fair price",
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<boolean | null>(null);
  const { isScreenshotMode } = useScreenshot();

  useEffect(() => {
    if (isScreenshotMode) {
      if (sectionRef.current) {
        sectionRef.current.classList.add("animate-fade-in-up");
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isScreenshotMode]);

  const handleCheckout = async (bundle: boolean) => {
    setSelectedBundle(bundle);
    setIsLoading(true);
    
    sendEvent("cta_clicked", {
      cta_location: "final_cta",
      cta_text: bundle ? "Buy 2 Units — $57.90" : "Buy 1 Unit — $35.90"
    });
    sendEvent("checkout_started", { 
      cta_text: bundle ? "Buy 2 Units — $57.90" : "Buy 1 Unit — $35.90"
    });
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success_url: "https://lumaruskin.com/success",
          cancel_url: "https://lumaruskin.com",
          bundle,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setSelectedBundle(null);
    }
  };

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="my-16 md:my-20 rounded-2xl bg-gradient-to-br from-text to-text/95 text-white overflow-hidden opacity-0"
    >
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.3]">
            Your eyes deserve to look as{" "}
            <span className="text-primary">rested as you feel.</span>
          </h2>

          <p className="text-white/70 leading-relaxed">
            $35.90 each, or 2 for $57.90 — Free shipping. No subscriptions. No hidden fees.
          </p>

          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-5 h-5 bg-primary rounded-full flex-shrink-0"></div>
                {benefit}
              </li>
            ))}
          </ul>

          {/* Mobile: cards horizontais compactos */}
          <div className="flex flex-col gap-3 md:hidden pt-2">
            <div className="flex items-center justify-between border border-[#E8E2F0] rounded-xl p-3 bg-white/10 backdrop-blur-sm">
              <div>
                <div className="text-xl font-bold text-white">$35.90</div>
                <div className="text-white/50 text-xs">1 unit</div>
              </div>
              <button
                onClick={() => handleCheckout(false)}
                disabled={isLoading && selectedBundle === false}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50"
              >
                {isLoading && selectedBundle === false ? "..." : "Buy 1 Unit →"}
              </button>
            </div>

            <div className="relative flex items-center justify-between border-2 border-primary rounded-xl p-3 bg-primary/10">
              <div className="absolute -top-2 left-3 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Best Value
              </div>
              <div>
                <div className="text-xl font-bold text-primary">$57.90</div>
                <div className="text-white/50 text-xs">2 units · $28.95 each</div>
              </div>
              <button
                onClick={() => handleCheckout(true)}
                disabled={isLoading && selectedBundle === true}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50"
              >
                {isLoading && selectedBundle === true ? "..." : "Buy 2 Units →"}
              </button>
            </div>
          </div>

          {/* Desktop: cards lado a lado */}
          <div className="hidden md:grid md:grid-cols-2 gap-4 pt-2">
            <div className="border border-[#E8E2F0] rounded-2xl p-5 text-center bg-white/10 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">$35.90</div>
              <div className="text-white/50 text-sm">1 unit</div>
              <button
                onClick={() => handleCheckout(false)}
                disabled={isLoading && selectedBundle === false}
                className="w-full mt-3 bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading && selectedBundle === false ? "Processing..." : "Buy 1 Unit →"}
              </button>
            </div>

            <div className="relative border-2 border-primary rounded-2xl p-5 text-center bg-primary/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                Best Value
              </div>
              <div className="text-2xl font-bold text-primary">$57.90</div>
              <div className="text-white/50 text-sm">2 units · $28.95 each</div>
              <button
                onClick={() => handleCheckout(true)}
                disabled={isLoading && selectedBundle === true}
                className="w-full mt-3 bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading && selectedBundle === true ? "Processing..." : "Buy 2 Units →"}
              </button>
            </div>
          </div>

          <p className="text-xs text-white/50 text-center">
            Free shipping from the US · No hidden fees
          </p>
        </div>

        <div className="bg-primary/10 rounded-xl p-8 text-center flex flex-col items-center justify-center">
          <div className="w-full max-w-[380px] mx-auto">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/final-cta/product-box-cta01.png"
                alt="Awake Eye Complex - Lumaru"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}