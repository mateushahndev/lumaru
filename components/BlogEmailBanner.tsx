"use client";

import { useState } from "react";

// Helper para enviar eventos GA4
const sendEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }
};

export default function BlogEmailBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
        setEmail("");
        
        // ✅ Disparar evento GA4 para email_captured
        sendEvent("email_captured", { source: "blog_banner" });
        
        setTimeout(() => {
          setStatus("idle");
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

  return (
    <div className="bg-gradient-to-br from-primary-light/10 to-primary-light/5 rounded-2xl p-6 md:p-8 mt-12">
      {status === "success" ? (
        <div className="text-center py-6">
          <div className="text-green-600 text-4xl mb-3">🎉</div>
          <h3 className="text-xl md:text-2xl font-display text-text mb-2">
            Your 10% off code is ready!
          </h3>
          <p className="text-text/70 mb-4">
            Use <span className="font-bold text-primary">WELCOME10</span> at checkout
          </p>
          <p className="text-text/50 text-sm">
            We also sent you an email with your Dark Circle Type Finder guide.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-display text-text mb-2">
            Want brighter eyes?
          </h3>
          <p className="text-text/70 mb-5">
            Get our free <span className="font-medium">Dark Circle Type Finder</span> +{" "}
            <span className="font-medium">10% off your first order</span>
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors font-sans"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "Sending..." : "Send Me 10% Off →"}
              </button>
            </div>

            {status === "error" && errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <p className="text-text/40 text-xs">
              No spam. Just clean skincare. Unsubscribe anytime.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}