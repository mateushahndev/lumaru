"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToCTA = () => {
    const element = document.getElementById("final-cta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success_url: "https://lumaruskin.com/success",
          cancel_url: "https://lumaruskin.com",
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCTAClick = () => {
    // Se estiver na home, rola para o CTA final
    if (pathname === "/") {
      handleScrollToCTA();
    } else {
      // Se estiver em outra página, vai para a home
      router.push("/");
    }
  };

  return (
    <>
      {/* Navbar normal */}
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
            <Link href="/" className="font-display text-2xl md:text-3xl font-medium tracking-wide text-text">
              lumaru
            </Link>

            {/* Desktop CTA */}
            <button
              onClick={handleCTAClick}
              className="hidden md:block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            >
              Get Awake Eye Complex — $35.90
            </button>

            {/* Mobile CTA compacto */}
            <button
              onClick={handleCTAClick}
              className="md:hidden bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-xl text-sm transition-all duration-300"
            >
              Buy Now — $35.90
            </button>
          </div>
        </div>
      </nav>

      {/* Botão flutuante apenas no mobile - sempre visível para checkout direto */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Redirecting..." : "Buy Awake Eye Complex — $35.90 →"}
        </button>
      </div>
    </>
  );
}