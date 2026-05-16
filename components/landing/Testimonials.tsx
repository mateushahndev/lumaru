"use client";

import { useEffect, useRef } from "react";
import { sendEvent } from "@/lib/useGA4";

interface Testimonial {
  id: number;
  rating: number;
  text: string;
  author: string;
}

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
  showCTA?: boolean;
}

export default function Testimonials({ title, testimonials, showCTA = true }: TestimonialsProps) {
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

  const handleCTAClick = () => {
    sendEvent("cta_clicked", {
      cta_location: "testimonials_section",
      cta_text: "I Want This →"
    });
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="my-16 md:my-20 py-10 px-6 md:px-8 rounded-2xl bg-primary-light/5 opacity-0"
    >
      <h3 className="text-sm font-semibold tracking-wider text-primary text-center uppercase mb-8">
        {title}
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-primary-light/20 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary-light/40"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-primary text-sm mb-3">
              {"★".repeat(testimonial.rating)}
              {"☆".repeat(5 - testimonial.rating)}
            </div>
            <p className="text-text/80 text-sm leading-relaxed italic mb-4">
              "{testimonial.text}"
            </p>
            <div className="text-text/50 text-xs font-medium">
              — {testimonial.author}
            </div>
          </div>
        ))}
      </div>

      {showCTA && (
        <div className="text-center mt-8">
          <button
            onClick={handleCTAClick}
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
          >
            I Want This →
          </button>
        </div>
      )}
    </section>
  );
}