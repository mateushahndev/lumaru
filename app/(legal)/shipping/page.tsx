import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Lumaru",
  description: "Learn about Lumaru's shipping policy, delivery times, and shipping costs.",
  robots: "noindex, follow",
};

export default function ShippingPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl md:text-4xl font-display text-text mb-8">
        Shipping Policy
      </h1>
      
      <div className="text-text/70 space-y-8">
        {/* 1. Where We Ship */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. Where We Ship</h2>
          <p>We ship to all 50 United States.</p>
        </section>

        {/* 2. Processing Time */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. Processing Time</h2>
          <p>Orders are processed within 2-5 business days after payment confirmation. Each product is made to order with care, which requires this processing window before shipment.</p>
        </section>

        {/* 3. Shipping Time */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. Shipping Time</h2>
          <p>All orders ship from our US-based fulfillment center. Delivery typically takes 3-7 business days after processing. You will receive a tracking number once your order ships.</p>
        </section>

        {/* 4. Shipping Rates */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. Shipping Rates</h2>
          <p>Shipping costs are calculated at checkout based on your location and the weight of your order. The exact cost is displayed before you complete your purchase.</p>
        </section>

        {/* 5. Order Tracking */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Order Tracking</h2>
          <p>Once your order ships, you'll receive a confirmation email with a tracking number. You can track your package on the carrier's website.</p>
        </section>

        {/* 6. Lost or Damaged Packages */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Lost or Damaged Packages</h2>
          <p>If your package arrives damaged or is lost in transit, please contact us at <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a> within 7 days of the delivery date (or expected delivery date for lost packages). We'll work with the carrier to resolve it promptly. Please keep all packaging materials and take photos of any damage — this helps us file a claim on your behalf.</p>
        </section>

        {/* 7. Delayed Packages */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">7. Delayed Packages</h2>
          <p>If your package has not arrived within 14 days of the estimated delivery date, please contact us. We'll investigate with the carrier. Claims for lost packages must be submitted within 30 days of the estimated delivery date.</p>
        </section>

        {/* 8. Incorrect Address */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">8. Incorrect Address</h2>
          <p>Please double-check your shipping address at checkout. We are not responsible for packages delivered to an incorrectly entered address. If you notice an error after ordering, contact us immediately — we'll do our best to correct it before the order ships, but we cannot guarantee changes after processing begins.</p>
        </section>

        {/* 9. Questions */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">9. Questions</h2>
          <p>For shipping questions: <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a></p>
        </section>
      </div>
    </div>
  );
}