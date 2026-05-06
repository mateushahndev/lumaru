import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Lumaru",
  description: "Read Lumaru's terms of service for using our website and purchasing products.",
  robots: "noindex, follow",
};

export default function TermsPage() {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl md:text-4xl font-display text-text mb-8">
        Terms of Service
      </h1>
      
      <div className="text-text/70 space-y-8">
        <p className="text-sm text-text/50 border-l-4 border-primary pl-4">
          Last updated: {today}
        </p>

        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. Acceptance of Terms</h2>
          <p>By using lumaruskin.com and purchasing our products, you agree to these terms. If you disagree, please don't use our site.</p>
        </section>

        {/* 2. Products */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. Products</h2>
          <p>We describe our products as accurately as possible. The Awake Eye Complex is a cosmetic product for external use only. It is not intended to diagnose, treat, cure, or prevent any medical condition. Individual results will vary based on skin type, genetics, consistency of use, and lifestyle factors.</p>
        </section>

        {/* 3. Purchases and Payment */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. Purchases and Payment</h2>
          <p>All prices are in USD. We reserve the right to change prices without notice. Payment is processed securely through Stripe. By placing an order, you represent that all payment information is valid and that you are authorized to use the payment method. Lumaru is the seller of record; our products are manufactured and fulfilled by our trusted partner.</p>
        </section>

        {/* 4. Shipping */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. Shipping</h2>
          <p>Orders are manufactured on demand and shipped from our US-based fulfillment center. Delivery typically takes 3-7 business days after processing. We are not responsible for delays caused by carriers, weather, or events outside our control. Shipping costs are calculated at checkout. Risk of loss passes to you upon delivery to the carrier.</p>
        </section>

        {/* 5. Returns and Refunds */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Returns and Refunds</h2>
          <p>Please see our <a href="/refund" className="text-primary hover:underline">Return Policy page</a> for full details.</p>
        </section>

        {/* 6. Intellectual Property */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Intellectual Property</h2>
          <p>The name "Lumaru", the "Awake Eye Complex" name, our logo, site design, the "Micro-Circulation Awakening Complex" formulation name, and all content on this site are our intellectual property. You may not copy, reproduce, or use them without written permission.</p>
        </section>

        {/* 7. Limitation of Liability */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">7. Limitation of Liability</h2>
          <p>Lumaru is not liable for:</p>
          <ul>
            <li>Allergic reactions or skin irritation (we recommend a patch test before first use)</li>
            <li>Results that differ from expectations (individual results vary)</li>
            <li>Indirect or consequential damages from using our products or site</li>
          </ul>
          <p>Our total liability for any claim related to our products is limited to the purchase price you paid.</p>
        </section>

        {/* 8. Governing Law */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">8. Governing Law</h2>
          <p>These terms are governed by the laws of the State of North Carolina, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Mecklenburg County, North Carolina.</p>
        </section>

        {/* 9. Contact */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">9. Contact</h2>
          <p>For questions about these terms: <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a></p>
        </section>
      </div>
    </div>
  );
}