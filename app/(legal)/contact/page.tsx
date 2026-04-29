import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Lumaru",
  description: "Get in touch with Lumaru customer support for questions about orders, products, or partnerships.",
};

export default function ContactPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl md:text-4xl font-display text-text mb-8">
        Contact Us
      </h1>
      
      <div className="text-text/70 space-y-8">
        <p className="text-lg text-text">We'd love to hear from you.</p>

        {/* Email */}
        <section className="bg-primary-light/5 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text mb-2">Email</h2>
          <p className="text-lg">
            <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">
              hello@lumaruskin.com
            </a>
          </p>
        </section>

        {/* Response Time */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Response Time</h2>
          <p>We reply to all emails within 24 hours, Monday through Friday.</p>
        </section>

        {/* Common Questions */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Common Questions</h2>
          <p>Check our <a href="/#faq" className="text-primary hover:underline">FAQ page</a> for instant answers about the Awake Eye Complex.</p>
        </section>

        {/* Press & Partnerships */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Press &amp; Partnerships</h2>
          <p>For collaboration inquiries, reach us at <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a>.</p>
        </section>

        {/* Returns */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-3">Returns</h2>
          <p>To request a return, please see our <a href="/refund" className="text-primary hover:underline">Return Policy page</a> for instructions.</p>
        </section>
      </div>
    </div>
  );
}