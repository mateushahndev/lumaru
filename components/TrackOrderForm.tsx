"use client";

import { useState } from "react";

// Função para detectar a transportadora
const detectCarrier = (trackingNumber: string): "UPS" | "USPS" | "FedEx" | null => {
  const trimmed = trackingNumber.trim().toUpperCase();
  
  if (trimmed.startsWith("1Z") && trimmed.length >= 18) return "UPS";
  if (/^\d{20,22}$/.test(trimmed) && trimmed.startsWith("9")) return "USPS";
  if (/^\d{12,15}$/.test(trimmed)) return "FedEx";
  
  return null;
};

const getTrackingUrl = (trackingNumber: string, carrier: "UPS" | "USPS" | "FedEx"): string => {
  const encoded = encodeURIComponent(trackingNumber.trim());
  switch (carrier) {
    case "UPS": return `https://www.ups.com/track?tracknum=${encoded}`;
    case "USPS": return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encoded}`;
    case "FedEx": return `https://www.fedex.com/fedextrack/?trknbr=${encoded}`;
    default: return "";
  }
};

export default function TrackOrderForm() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const trimmed = trackingNumber.trim();
    if (!trimmed) {
      setError("Please enter a tracking number.");
      return;
    }
    
    const carrier = detectCarrier(trimmed);
    if (!carrier) {
      setError("Tracking number format not recognized. Supported: UPS (1Z...), USPS (20-22 digits starting with 9), FedEx (12-15 digits).");
      return;
    }
    
    setIsSubmitting(true);
    const url = getTrackingUrl(trimmed, carrier);
    window.open(url, "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <div className="font-display text-3xl font-medium tracking-wide text-text mb-2">lumaru</div>
        <p className="text-text/60 text-sm">Track your order</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-primary-light/20 p-6 md:p-8">
        <h1 className="text-xl font-semibold text-text mb-2">Where's my order?</h1>
        <p className="text-text/60 text-sm mb-6">Enter your tracking number below to check delivery status with the carrier.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tracking" className="block text-sm font-medium text-text mb-1">Tracking Number</label>
            <input
              id="tracking"
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Ex: 1Z999AA10123456784"
              className="w-full px-4 py-3 border border-primary-light/30 rounded-xl focus:outline-none focus:border-primary transition-colors"
              disabled={isSubmitting}
            />
            <p className="text-text/40 text-xs mt-1">Supports UPS (1Z...), USPS (20-22 digits starting with 9), FedEx (12-15 digits)</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? "Redirecting..." : "Track My Order →"}
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-primary-light/20 text-center">
          <p className="text-text/40 text-xs">You will be redirected to the carrier's website to track your package.</p>
          <a href="/contact" className="text-primary/60 hover:text-primary text-xs transition-colors inline-block mt-2">Need help? Contact us</a>
        </div>
      </div>
    </div>
  );
}