import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Lumaru",
  description: "Read Lumaru's privacy policy to understand how we collect, use, and protect your personal information.",
  robots: "noindex, follow",
};

export default function PrivacyPage() {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl md:text-4xl font-display text-text mb-8">
        Privacy Policy
      </h1>
      
      <div className="text-text/70 space-y-8">
        <p className="text-sm text-text/50 border-l-4 border-primary pl-4">
          Last updated: {today}
        </p>

        {/* 1. Information We Collect */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">1. Information We Collect</h2>
          <p>When you make a purchase or sign up for our newsletter, we collect:</p>
          <ul>
            <li>Your name and email address</li>
            <li>Shipping and billing address</li>
            <li>Payment information (processed securely through Stripe; we never see your full credit card number)</li>
          </ul>
          <p>We use Google Analytics to understand how visitors use our site. This collects anonymous data like pages visited and time spent on site.</p>
        </section>

        {/* 2. How We Use Your Information */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">2. How We Use Your Information</h2>
          <ul>
            <li>To fulfill and ship your order</li>
            <li>To send you order confirmations and tracking updates</li>
            <li>To send our newsletter (only if you opt in)</li>
            <li>To improve our site and products</li>
          </ul>
        </section>

        {/* 3. We Never Sell Your Data */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">3. We Never Sell Your Data</h2>
          <p>We do not sell, rent, or share your personal information with third parties for their marketing purposes. Period.</p>
        </section>

        {/* 4. Cookies */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">4. Cookies</h2>
          <p>We use cookies to keep your cart active and understand site traffic. You can disable cookies in your browser settings.</p>
        </section>

        {/* 5. Your Rights */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">5. Your Rights</h2>
          <p>You can:</p>
          <ul>
            <li>Request a copy of the data we hold about you</li>
            <li>Ask us to delete your data</li>
            <li>Unsubscribe from our newsletter at any time (every email has an unsubscribe link)</li>
          </ul>
          <p>To exercise these rights, email us at <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a>.</p>
        </section>

        {/* 6. Third-Party Services */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">6. Third-Party Services</h2>
          <ul>
            <li><strong>Stripe:</strong> Processes your payment. Stripe's privacy policy applies to your payment data.</li>
            <li><strong>Selfnamed:</strong> Fulfills and ships your order. They receive your name and shipping address to deliver your product.</li>
            <li><strong>Google Analytics:</strong> Tracks anonymous site usage data.</li>
          </ul>
        </section>

        {/* 7. Children's Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">7. Children's Privacy</h2>
          <p>Our site is not intended for anyone under 13. We do not knowingly collect data from children.</p>
        </section>

        {/* 8. Contact */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">8. Contact</h2>
          <p>For privacy questions: <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a></p>
        </section>
      </div>
    </div>
  );
}