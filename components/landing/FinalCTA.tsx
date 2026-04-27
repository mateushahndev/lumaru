"use client";

import { useEffect, useRef } from "react";

const benefits = [
  "Micro-Circulation Awakening Complex — targets the root cause",
  "Visible results in 7 days — or your money back in 30",
  "Certified organic, vegan, cruelty-free — gentle on sensitive skin",
  "2 to 3 months per bottle — premium formula, honest price",
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleCTAClick = () => {
    // Implementar lógica de compra (ex: redirecionar para checkout)
    alert("Redirect to checkout - Implement payment flow here");
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
            Today only, the Awake Eye Complex is $35.90 — down from $41.90. 
            Free shipping. 30-day money-back guarantee. 
            No subscriptions. No tricks.
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
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Get My Awake Eye Complex — $35.90 →
            </button>

            <p className="text-xs text-white/50 text-center">
              Free shipping on all U.S. orders · 30-day money-back guarantee
            </p>
          </div>
        </div>

        {/* Right Column - Product Mockup */}
        <div className="bg-primary/10 rounded-xl p-8 text-center">
          <div className="max-w-[200px] mx-auto bg-text/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-primary tracking-wider">
                LUMARU
              </div>
              <div className="text-sm font-medium text-white">AWAKE EYE</div>
              <div className="text-sm font-medium text-white">COMPLEX</div>
              <div className="text-xs text-white/50">15 ml</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-white/50 text-sm line-through">$41.90</div>
            <div className="text-3xl font-bold text-primary mt-1">$35.90</div>
            <div className="text-xs text-white/50 mt-2">Free shipping included</div>
          </div>
        </div>
      </div>
    </section>
  );
}