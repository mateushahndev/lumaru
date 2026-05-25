"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sendEvent } from "@/lib/useGA4";

const benefits = [
  "Micro-Circulation Awakening Complex + Hyaluronic Acid — targets the root cause and hydrates instantly",
  "Visible improvement week by week — the longer you use it, the better it gets",
  "Certified organic, vegan, cruelty-free — gentle on sensitive skin",
  "A little goes a long way — premium formula, fair price",
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCTAClick = async () => {
    // ✅ ADICIONAR ESTAS DUAS LINHAS
    sendEvent("cta_clicked", {
      cta_location: "landing_page_final_cta",
      cta_text: "Get My Awake Eye Complex — $35.90 →"
    });
    sendEvent("checkout_started", { 
      cta_text: "Get My Awake Eye Complex — $35.90 →" 
    });
    
    // RESTANTE DO CÓDIGO ORIGINAL (NÃO MEXER)
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success_url: "https://lumaruskin.com/success",
          cancel_url: "https://lumaruskin.com",
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      className="my-16 md:my-20 rounded-2xl bg-gradient-to-br from-text to-text/95 text-white overflow-hidden opacity-0"
    >
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.3]">
            Your eyes deserve to look as{" "}
            <span className="text-primary">rested as you feel.</span>
          </h2>

          <p className="text-white/70 leading-relaxed">
            The Awake Eye Complex is 35.90 — down from 41.90. No subscriptions. No hidden fees. Just the formula your eyes have been waiting for.
          </p>

          {/* Benefits List */}
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm text-white/80"
              >
                <div className="w-5 h-5 bg-primary rounded-full flex-shrink-0"></div>
                {benefit}
              </li>
            ))}
          </ul>

          {/* Price and CTA */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-white/50 line-through">$41.90</span>
              <span className="text-4xl font-bold text-primary">$35.90</span>
            </div>

            <button
              onClick={handleCTAClick}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Redirecting to checkout..." : "Get My Awake Eye Complex — $35.90 →"}
            </button>

            <p className="text-xs text-white/50 text-center">
              Ships from the US · No hidden fees
            </p>
          </div>
        </div>

        {/* Right Column - Product Mockup */}
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

          <div className="mt-6 text-center">
            <div className="text-white/50 text-sm line-through">$41.90</div>
            <div className="text-3xl font-bold text-primary mt-1">$35.90</div>
          </div>
        </div>
      </div>
    </section>
  );
}