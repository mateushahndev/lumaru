"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCTAClick = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20" ref={heroRef}>
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6 opacity-0 animate-fade-in-up [animation-delay:200ms]">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-light/20 px-4 py-2 rounded-full">
            <span className="text-primary text-sm font-semibold">★★★★★</span>
            <span className="text-text/70 text-sm">Loved by 2,000+ women</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight text-text">
            Wake up looking{" "}
            <span className="text-primary">rested.</span>
            <br />
            Even when you weren't.
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-text/70 leading-relaxed">
            Tired of looking exhausted even after 8 hours of sleep? 
            No more "are you okay?" comments. No more concealer stacked on concealer. 
            The <strong className="text-text">Awake Eye Complex</strong> activates the skin under your eyes — 
            so you look like you slept, even when you didn't.
          </p>

          {/* Price and CTA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-text/50 line-through">$41.90</span>
              <span className="text-4xl font-bold text-text">$35.90</span>
              <span className="bg-primary-light/30 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Limited offer
              </span>
            </div>

            <button
              onClick={handleCTAClick}
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Yes, I Want Brighter Eyes →
            </button>

            <p className="text-sm text-text/50 text-center sm:text-left">
              Free shipping · 30-day money-back guarantee · No subscriptions
            </p>
          </div>
        </div>

        {/* Right Column - Product Mockup */}
        <div className="relative opacity-0 animate-fade-in-up [animation-delay:400ms]">
          <div className="bg-gradient-to-br from-primary-light/20 to-primary-light/5 rounded-2xl p-8 md:p-12">
            {/* Product Card */}
            <div className="max-w-[240px] mx-auto bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-primary tracking-wider">
                  LUMARU
                </div>
                <div className="text-sm font-medium text-text">AWAKE EYE</div>
                <div className="text-sm font-medium text-text">COMPLEX</div>
                <div className="text-xs text-text/50">15 ml</div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="mt-8 text-center space-y-3">
              <div className="text-primary text-xl">★★★★★</div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-sm">
                <span className="text-sm text-primary font-medium">
                  "Looks like I slept 8 hours every day"
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}