import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed | Lumaru",
  description: "Your Awake Eye Complex order has been confirmed. Thank you for shopping with Lumaru.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-primary-light/20 p-8">
          {/* Ícone de sucesso */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-display text-text mb-2">
            Order Confirmed! 🎉
          </h1>
          
          <p className="text-text/60 mb-6">
            Thank you for your purchase. Your Awake Eye Complex is being prepared.
          </p>

          <div className="bg-primary-light/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-text/70">
              You will receive a confirmation email shortly with your order details and tracking information once shipped.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}