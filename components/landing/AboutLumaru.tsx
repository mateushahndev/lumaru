"use client";

import { useEffect, useRef } from "react";
import { sendEvent } from "@/lib/useGA4";

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
    sendEvent("cta_clicked", {
      cta_location: "about_lumaru_section",
      cta_text: "Try It Yourself →"
    });
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
              Lumaru was created with one purpose: a formula that actually addresses what causes dark circles and puffiness — not just hides them temporarily. Every tube is made in an ECOCERT-certified facility in the UK using the Micro-Circulation Awakening Complex — a blend of organic actives and Hyaluronic Acid that work the way your skin actually needs.
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
            Try It Yourself →
          </button>
        </div>

        {/* Right Column - Brand Visual */}
        <div className="bg-gradient-to-br from-primary-light/20 to-primary-light/5 rounded-2xl p-12 text-center">
          {/* Logo circular - maior e redondo */}
          <div className="w-56 h-56 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl md:text-5xl font-display font-medium tracking-wide text-white">
              lumaru
            </span>
          </div>
          <p className="text-sm text-primary/70 font-medium max-w-xs mx-auto">
            Clean science for real results
          </p>
        </div>
      </div>
    </section>
  );
}