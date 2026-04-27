"use client";

import { useEffect, useRef } from "react";

const certifications = [
  "ECOCERT Certified",
  "COSMOS Organic",
  "100% Vegan",
  "Cruelty-Free",
  "GMP Manufacturing",
];

export default function AboutLumaru() {
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
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="my-16 md:my-20 opacity-0">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-medium leading-[1.3] text-text">
            Built for women who are tired of being told they look tired.
          </h2>

          <div className="space-y-4 text-text/70 leading-relaxed">
            <p>
              Lumaru was created with one purpose: a formula that actually addresses what 
              causes dark circles and puffiness — not just hides them temporarily. 
              We partnered with ECOCERT-certified labs to develop the 
              Micro-Circulation Awakening Complex — a blend of three organic actives 
              that work together the way your skin actually needs.
            </p>
            <p>
              No fillers. No parabens. No animal testing. No compromises.
              Just clean, effective skincare that respects your skin and your money.
            </p>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <span
                key={cert}
                className="bg-primary-light/20 text-primary px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:bg-primary-light/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {cert}
              </span>
            ))}
          </div>

          <button
            onClick={handleCTAClick}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Meet the Formula →
          </button>
        </div>

        {/* Right Column - Brand Visual */}
        <div className="bg-gradient-to-br from-primary-light/20 to-primary-light/5 rounded-2xl p-12 text-center">
          <div className="w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl font-display text-white">L</span>
          </div>
          <p className="text-sm text-primary/70 font-medium max-w-xs mx-auto">
            Lumaru — Clean science for real results
          </p>
        </div>
      </div>
    </section>
  );
}