import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Lumaru",
  description: "Read Lumaru's return and refund policy for damaged or defective products.",
  robots: "noindex, follow",
};

export default function RefundPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl md:text-4xl font-display text-text mb-8">
        Return &amp; Refund Policy
      </h1>
      
      <div className="text-text/70 space-y-8">
        <div className="bg-primary-light/10 border-l-4 border-primary p-4 rounded-r-lg">
          <p className="text-text font-medium">We believe in our formula. If something arrives wrong, we'll make it right — quickly, and with no hassle.</p>
        </div>

        {/* 1. When Returns Are Accepted */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. When Returns Are Accepted</h2>
          <ul>
            <li><strong>Damaged or Defective Product:</strong> If your product arrived damaged, leaking, or with a manufacturing defect.</li>
            <li><strong>Wrong Product:</strong> If you received a product different from what you ordered.</li>
            <li><strong>Missing Items:</strong> If your order arrived incomplete.</li>
          </ul>
          <p>Claims must be submitted within <strong>7 days</strong> of delivery. This short window allows us to resolve issues quickly — and helps us keep our prices fair for everyone.</p>
        </section>

        {/* 2. When Returns Are NOT Accepted */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. When Returns Are NOT Accepted</h2>
          <ul>
            <li><strong>Change of mind:</strong> As a small brand producing each order on demand, we cannot accept returns simply because you changed your mind.</li>
            <li><strong>Personal preference:</strong> If you didn't like the scent, texture, or packaging — these are subjective preferences.</li>
            <li><strong>Results didn't meet expectations:</strong> Skincare results vary by skin type, genetics, and consistency of use. We encourage you to use the product consistently for at least 3-4 weeks before evaluating results.</li>
            <li><strong>Used or opened products:</strong> For hygiene reasons, we cannot accept returns of opened or used products unless they are defective.</li>
            <li><strong>After 7 days:</strong> Claims submitted more than 7 days after delivery cannot be accepted.</li>
          </ul>
        </section>

        {/* 3. How to Submit a Claim */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. How to Submit a Claim</h2>
          <p>Email us at <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a> with:</p>
          <ul>
            <li>Your order number</li>
            <li>A clear description of the issue</li>
            <li>Clear photos of the product AND the outer packaging (required to file a claim with our fulfillment partner)</li>
          </ul>
          <p>We'll respond within 48 hours. Please keep all packaging materials until your claim is resolved.</p>
        </section>

        {/* 4. Refunds */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. Refunds</h2>
          <p>If your claim is approved for a damaged, defective, or wrong product, you'll receive a <strong>full refund</strong> including original shipping. You keep the product — no need to return it.</p>
          <p>Refunds are processed within 5-10 business days after approval, back to your original payment method.</p>
        </section>

        {/* 5. Cancellations */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Order Cancellations</h2>
          <p>You may cancel your order within <strong>12 hours</strong> of purchase for a full refund. After 12 hours, production usually begins and cancellation is no longer guaranteed. Contact us immediately at <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a> if you need to cancel.</p>
        </section>

        {/* 6. Questions */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Questions</h2>
          <p>For return questions: <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a></p>
        </section>
      </div>
    </div>
  );
}