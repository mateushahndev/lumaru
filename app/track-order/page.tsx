import type { Metadata } from "next";
import TrackOrderForm from "@/components/TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track your Lumaru order with your shipping tracking number. Support for UPS, USPS, and FedEx.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <TrackOrderForm />
    </div>
  );
}