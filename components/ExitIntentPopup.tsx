"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const pathname = usePathname();
  
  // Refs para controlar listeners
  const desktopListenerActive = useRef(false);
  const mobileListenerActive = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detectar dispositivo
  const isMobile = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  }, []);

  // Verificar se está em checkout
  const isCheckoutPage = useCallback(() => {
    return pathname?.includes("/checkout") || pathname?.includes("/success");
  }, [pathname]);

  // Verificar se já mostrou o popup nos últimos 7 dias
  const hasBeenShownRecently = useCallback(() => {
    const lastShown = localStorage.getItem("lumaru_popup_shown");
    if (!lastShown) return false;
    
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const lastShownTime = parseInt(lastShown, 10);
    const now = Date.now();
    
    return now - lastShownTime < sevenDaysInMs;
  }, []);

  // Marcar que o popup foi mostrado agora
  const markAsShown = useCallback(() => {
    localStorage.setItem("lumaru_popup_shown", Date.now().toString());
  }, []);

  // Fechar popup
  const closePopup = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  // Abrir popup (só se não estiver em checkout e não foi mostrado recentemente)
  const openPopup = useCallback(() => {
    if (isCheckoutPage()) return;
    if (hasBeenShownRecently()) return;
    if (isOpen) return;
    
    markAsShown();
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, [isCheckoutPage, hasBeenShownRecently, isOpen, markAsShown]);

  // Submeter email para MailerLite
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          closePopup();
        }, 3000);
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  // Manipular tecla ESC
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closePopup();
      }
    },
    [isOpen, closePopup]
  );

  // GATILHO DESKTOP: exit-intent (mouse saindo pelo topo)
  const setupDesktopTrigger = useCallback(() => {
    if (desktopListenerActive.current) return;
    if (isMobile()) return;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        openPopup();
        document.removeEventListener("mouseleave", handleMouseLeave);
        desktopListenerActive.current = false;
      }
    };
    
    document.addEventListener("mouseleave", handleMouseLeave);
    desktopListenerActive.current = true;
    
    // Cleanup function
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      desktopListenerActive.current = false;
    };
  }, [isMobile, openPopup]);

  // GATILHO MOBILE: scroll 60%
  const setupMobileTrigger = useCallback(() => {
    if (mobileListenerActive.current) return;
    if (!isMobile()) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      if (scrollPercentage >= 0.6) {
        openPopup();
        window.removeEventListener("scroll", handleScroll);
        mobileListenerActive.current = false;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    mobileListenerActive.current = true;
    
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mobileListenerActive.current = false;
    };
  }, [isMobile, openPopup]);

  // Configurar delay e ativar gatilho correto
  useEffect(() => {
    // Não configurar se está em checkout ou já foi mostrado recentemente
    if (isCheckoutPage()) return;
    if (hasBeenShownRecently()) return;
    
    const delayTime = isMobile() ? 10000 : 8000; // 10s mobile, 8s desktop
    
    timeoutRef.current = setTimeout(() => {
      if (isMobile()) {
        setupMobileTrigger();
      } else {
        setupDesktopTrigger();
      }
    }, delayTime);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isCheckoutPage, hasBeenShownRecently, isMobile, setupDesktopTrigger, setupMobileTrigger]);

  // Listener para tecla ESC
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
        onClick={closePopup}
      >
        {/* Card */}
        <div
          className="relative bg-[#FEFEFE] rounded-xl p-8 max-w-md w-full shadow-xl animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 text-text/40 hover:text-text/70 transition-colors text-2xl"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Conteúdo do Popup */}
          <div className="text-center">
            <h2 className="font-display text-[#1A1A1A] text-xl md:text-2xl mb-2">
              Proof you slept well.
            </h2>
            <h2 className="font-display text-[#1A1A1A] text-xl md:text-2xl mb-4">
              Even when you didn't.
            </h2>
            <p className="font-sans text-[#1A1A1A] text-base mb-6">
              Get 10% off your first order of Awake Eye Complex
            </p>

            {status === "success" ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-4">
                <p className="font-semibold">Your 10% off code WELCOME10 is ready!</p>
                <p className="text-sm mt-1">Use it at checkout.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-sans text-base"
                  disabled={status === "loading"}
                />
                
                {status === "error" && errorMessage && (
                  <p className="text-red-500 text-sm text-left">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#B5A5D1] hover:bg-[#9B89B8] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Get My 10% Off →"}
                </button>

                <p className="text-gray-400 text-xs">
                  No spam. Just clean skincare.
                </p>
                <p className="text-gray-400 text-xs">
                  <a href="/privacy" target="_blank" className="underline hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}