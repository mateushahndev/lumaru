"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { sendEvent } from "@/lib/useGA4";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<boolean | null>(null);
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Mostrar botões flutuantes após rolar 400px
      setShowFloatingButtons(window.scrollY > 400);
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

  const handleCheckout = async (bundle: boolean) => {
    setSelectedBundle(bundle);
    setIsLoading(true);
    
    sendEvent("cta_clicked", {
      cta_location: "floating_mobile_buttons",
      cta_text: bundle ? "2 units — $57.90" : "1 unit — $35.90"
    });
    sendEvent("checkout_started", { 
      cta_text: bundle ? "2 units — $57.90" : "1 unit — $35.90"
    });
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          success_url: "https://lumaruskin.com/success",
          cancel_url: "https://lumaruskin.com",
          bundle,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setSelectedBundle(null);
    }
  };

  const handleCTAClick = () => {
    sendEvent("cta_clicked", {
      cta_location: pathname === "/" ? "navbar_desktop" : "navbar_desktop_other_page",
      cta_text: "Get Awake Eye Complex — $35.90 →"
    });
    
    if (pathname === "/") {
      handleScrollToCTA();
    } else {
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
            <Link href="/" className="font-display text-2xl md:text-3xl font-medium tracking-wide text-text">
              lumaru
            </Link>

            <button
              onClick={handleCTAClick}
              className="hidden md:block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            >
              Get Awake Eye Complex — $35.90
            </button>

            <button
              onClick={handleCTAClick}
              className="md:hidden bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-xl text-sm transition-all duration-300"
            >
              Buy Now — $35.90
            </button>
          </div>
        </div>
      </nav>

      {/* Botões flutuantes mobile - dois botões lado a lado */}
      {showFloatingButtons && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8E2F0] shadow-lg p-3 block md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {/* Botão 1 unit */}
            <button
              onClick={() => handleCheckout(false)}
              disabled={isLoading && selectedBundle === false}
              className="bg-white border border-primary text-primary hover:bg-primary-light/10 font-semibold py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              <div className="text-sm font-semibold">1 unit</div>
              <div className="text-xs opacity-80">$35.90</div>
            </button>

            {/* Botão 2 units com badge "Best Value" */}
            <div className="relative">
              <div className="absolute -top-2 right-2 bg-yellow-400 text-text text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
                Best Value
              </div>
              <button
                onClick={() => handleCheckout(true)}
                disabled={isLoading && selectedBundle === true}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                <div className="text-sm font-semibold">2 units</div>
                <div className="text-xs opacity-80">$57.90</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}