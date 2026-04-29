import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Lumaru",
  description: "Read Lumaru's return and refund policy for product returns and money-back guarantee.",
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
          <p className="text-text font-medium">We stand behind our formula. If you're not satisfied, we'll make it right.</p>
        </div>

        {/* 1. Return Window */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. Return Window</h2>
          <p>You have 21 days from the delivery date to request a return or refund. We chose 21 days because that's enough time to see real results — hydration in the first week, reduced puffiness by week two, and visible improvement by week three.</p>
        </section>

        {/* 2. When Returns Are Accepted */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. When Returns Are Accepted</h2>
          <ul>
            <li><strong>Damaged or Defective Product:</strong> If your product arrived damaged, leaking, or defective.</li>
            <li><strong>Wrong Product:</strong> If you received a product different from what you ordered.</li>
            <li><strong>Satisfaction Guarantee:</strong> If you used the product consistently and didn't see visible improvement within 21 days.</li>
          </ul>
        </section>

        {/* 3. When Returns Are NOT Accepted */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. When Returns Are NOT Accepted</h2>
          <ul>
            <li>The product has been more than 50% used.</li>
            <li>The request is made after 21 days from delivery.</li>
            <li>The product was damaged by misuse or improper handling.</li>
            <li>Change of mind without trying the product consistently.</li>
          </ul>
        </section>

        {/* 4. How to Request a Return */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. How to Request a Return</h2>
          <p>Email us at <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a> with:</p>
          <ul>
            <li>Your order number</li>
            <li>A brief explanation of the issue</li>
            <li>Photos of the product (if damaged or defective)</li>
          </ul>
          <p>We'll respond within 48 hours with next steps.</p>
        </section>

        {/* 5. Refunds */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Refunds</h2>
          <ul>
            <li><strong>Damaged/Defective/Wrong Product:</strong> Full refund including original shipping. You keep the product — no need to return it.</li>
            <li><strong>Satisfaction Guarantee:</strong> Refund of the product price. We'll provide a return shipping label.</li>
          </ul>
          <p>Refunds are processed within 5-10 business days after approval, back to your original payment method.</p>
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