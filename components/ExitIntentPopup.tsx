"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const pathname = usePathname();

  // Verificar se já está em checkout
  const isCheckoutPage = () => {
    return pathname?.includes("/checkout") || pathname?.includes("/success");
  };

  // Verificar se é dispositivo móvel
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      typeof navigator !== "undefined" ? navigator.userAgent : ""
    );
  };

  // Fechar popup
  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

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
        localStorage.setItem("lumaru_popup_shown", "true");
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

  // Detectar tentativa de saída da página - método universal
  useEffect(() => {
    // Verificar se já mostrou antes
    const alreadyShown = localStorage.getItem("lumaru_popup_shown");
    
    // Não mostrar se já mostrou ou se está em checkout
    if (alreadyShown || isCheckoutPage() || isMobile()) {
      return;
    }

    let timeout: NodeJS.Timeout;
    let isPopupReady = false;

    // Delay de 3 segundos antes de ativar o detector de saída
    timeout = setTimeout(() => {
      isPopupReady = true;
    }, 3000);

    // LISTENER PRINCIPAL: Antes de sair da página
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isPopupReady) return;
      
      // Verificar se o modal não está aberto e se não é mobile
      if (!isOpen && !localStorage.getItem("lumaru_popup_shown")) {
        // Precisamos mostrar o popup - mas antes, cancelar a saída
        e.preventDefault();
        e.returnValue = "";
        
        // Mostrar popup após um pequeno delay (Firefox precisa de interação)
        setTimeout(() => {
          setIsOpen(true);
          localStorage.setItem("lumaru_popup_shown", "true");
        }, 100);
        
        return false;
      }
    };

    // Listener para quando o usuário tenta recarregar a página
    const handlePageHide = () => {
      if (isPopupReady && !isOpen && !localStorage.getItem("lumaru_popup_shown")) {
        // Salvar que o popup foi mostrado para não aparecer de novo
        localStorage.setItem("lumaru_popup_shown", "true");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [isCheckoutPage, pathname, isOpen]);

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