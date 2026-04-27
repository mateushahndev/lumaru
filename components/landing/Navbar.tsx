"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para efeito de vidro
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTAClick = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          {/* Logo Lumaru */}
          <div className="font-display text-2xl md:text-3xl font-medium tracking-wide text-text">
            lumaru
          </div>

          {/* Desktop CTA Button */}
          <button
            onClick={handleCTAClick}
            className="hidden md:block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          >
            Get Awake Eye Complex — $35.90
          </button>

          {/* Mobile CTA - versão compacta */}
          <button
            onClick={handleCTAClick}
            className="md:hidden bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-xl text-sm transition-all duration-300"
          >
            Buy Now — $35.90
          </button>
        </div>
      </div>
    </nav>
  );
}