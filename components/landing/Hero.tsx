"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { sendEvent } from "@/lib/useGA4";

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
    sendEvent("cta_clicked", {
      cta_location: "landing_page_hero",
      cta_text: "Yes, I Want Brighter Eyes →"
    });
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20" ref={heroRef}>
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6 opacity-0 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary-light/20 px-4 py-2 rounded-full">
            <span className="text-primary text-sm font-semibold">★★★★★</span>
            <span className="text-text/70 text-sm">Clean science for tired eyes</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight text-text">
            Wake up looking{" "}
            <span className="text-primary">rested.</span>
            <br />
            Even when you weren't.
          </h1>

          <p className="text-base md:text-lg text-text/70 leading-relaxed">
            "You look so tired." "Are you feeling okay?" 
            You've heard it a hundred times — even after a full night's sleep. 
            The <strong className="text-text">Awake Eye Complex</strong> doesn't just moisturize. It targets what actually causes dark circles and puffiness — 
            so you look like you slept 8 hours, even when you didn't.
          </p>

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
              Free shipping from the US · No subscriptions
            </p>
          </div>
        </div>

        {/* Right Column - Product Image */}
        <div className="relative opacity-0 animate-fade-in-up">
          <div className="bg-gradient-to-br from-primary-light/5 to-primary-light/35 rounded-2xl p-8 md:p-12">
            <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden">
              <Image
                src="/images/hero/product1.png"
                alt="Awake Eye Complex"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

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