"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Apply a rice-grain amount",
    description:
      "A tiny amount goes a long way — 15ml lasts 2 to 3 months of daily use. One bottle. No repurchasing every 3 weeks.",
  },
  {
    number: "02",
    title: "Gently tap around the eye area",
    description:
      "No rubbing needed. Just light tapping inward to outward. The Micro-Circulation Awakening Complex does the rest.",
  },
  {
    number: "03",
    title: "See results within days",
    description:
      "Hydration is instant. Puffiness visibly reduces in the first week. Dark circles visibly fade over 3 to 4 weeks of consistent use.",
  },
];

export default function HowItWorks() {
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
    <section
      id="how-it-works"
      ref={sectionRef}
      className="my-16 md:my-20 py-12 md:py-16 px-6 md:px-12 rounded-2xl bg-primary-light/5 text-center opacity-0"
    >
      <h2 className="text-3xl md:text-4xl font-medium mb-3 text-text">
        Simple enough for any routine
      </h2>
      <p className="text-base text-text/60 mb-10">
        Two minutes. Morning and night. That's all it takes.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="bg-white rounded-xl p-6 text-left shadow-sm border border-primary-light/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-3xl font-bold text-primary mb-3">
              {step.number}
            </div>
            <h4 className="text-lg font-semibold text-text mb-2">
              {step.title}
            </h4>
            <p className="text-sm text-text/60 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleCTAClick}
        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
      >
        Start Looking Awake →
      </button>
    </section>
  );
}