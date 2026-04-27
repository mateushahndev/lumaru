"use client";

import { useEffect, useRef } from "react";

const badges = [
  "Vegan",
  "Cruelty-Free",
  "COSMOS Certified",
  "No Parabens",
  "GMP Certified",
  "Dermatologist Tested",
];

export default function Badges() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={sectionRef} className="py-8 opacity-0">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {badges.map((badge, index) => (
          <span
            key={badge}
            className="bg-primary-light/20 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-primary-light/30 hover:scale-105"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}