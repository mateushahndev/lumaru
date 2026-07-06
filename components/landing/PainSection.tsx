"use client";

import { useEffect, useRef } from "react";
import { sendEvent } from "@/lib/useGA4";
import { useScreenshot } from "@/components/providers/ScreenshotProvider";

export default function PainSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isScreenshotMode]);

  const handleCTAClick = () => {
    sendEvent("cta_clicked", {
      cta_location: "pain_section",
      cta_text: "Show Me How It Works →"
    });
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="my-16 md:my-20 py-12 md:py-16 px-6 md:px-12 rounded-2xl bg-gradient-to-br from-text to-text/95 text-white opacity-0"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2]">
          You've tried the creams.
          <br />
          They <span className="text-primary">didn't work.</span>
          <br />
          Here's why.
        </h2>

        <p className="text-base md:text-lg text-white/70 leading-relaxed">
          Most eye creams just sit on the surface. They don't touch the real problem — poor microcirculation and stagnant fluid that cause dark circles and puffiness in the first place. That's why you've tried product after product and still hear "you look tired." It's not your fault. It's the wrong formula.
        </p>

        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          The <strong className="text-primary">Awake Eye Complex</strong> is different. It targets the root cause — with 3 organic actives plus multi-molecular Hyaluronic Acid that wake up the skin under your eyes, not just sit on top of it.
        </p>

        <button
          onClick={handleCTAClick}
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Show Me How It Works →
        </button>
      </div>
    </section>
  );
}