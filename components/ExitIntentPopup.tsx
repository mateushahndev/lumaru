"use client";

import { useState, useEffect, useCallback } from "react";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Verificar se é dispositivo móvel
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  };

  // Verificar se já está em checkout (opcional)
  const isCheckoutPage = () => {
    if (typeof window === "undefined") return false;
    return window.location.pathname.includes("/checkout");
  };

  // Fechar popup
  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Manipular ESC key
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closePopup();
      }
    },
    [isOpen, closePopup]
  );

  // Submeter email para MailerLite
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
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
        // Fechar após 3 segundos no sucesso
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

  // Configurar exit-intent listener
  useEffect(() => {
    // Verificar se já mostrou antes
    const alreadyShown = localStorage.getItem("lumaru_popup_shown");
    
    // Não mostrar se já mostrou, se é mobile, ou se é checkout
    if (alreadyShown || isMobile() || isCheckoutPage()) {
      return;
    }

    let timeout: NodeJS.Timeout;
    let mouseLeaveTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Só dispara se o mouse saiu pelo topo da página
      if (e.clientY <= 0 && !mouseLeaveTriggered) {
        mouseLeaveTriggered = true;
        setIsOpen(true);
        localStorage.setItem("lumaru_popup_shown", "true");
      }
    };

    // Delay de 3 segundos antes de ativar o listener
    timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Listener para tecla ESC
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
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
                <p className="text-sm mt-1">Use it at checkout. Code copied to clipboard!</p>
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