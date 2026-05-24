import type { Metadata } from "next";
import Link from "next/link";
import LastUpdated from "@/components/LastUpdated";

export const metadata: Metadata = {
  title: "Contact Us | Lumaru",
  description: "Get in touch with Lumaru customer support for questions about orders, products, or partnerships. We reply within 24 hours.",
  openGraph: {
    title: "Contact Us | Lumaru",
    description: "Get in touch with Lumaru customer support for questions about orders, products, or partnerships.",
    url: "https://lumaruskin.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Schema.org ContactPage
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://lumaruskin.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Lumaru",
    email: "hello@lumaruskin.com",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@lumaruskin.com",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ContactPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl md:text-4xl font-display text-text mb-8">
          Contact Us
        </h1>
        
        <div className="text-text/70 space-y-8">
          {/* Email em destaque */}
          <div className="bg-primary-light/5 rounded-xl p-6 text-center border border-primary-light/20">
            <p className="text-lg text-text mb-2">Prefer to write?</p>
            <a 
              href="mailto:hello@lumaruskin.com" 
              className="text-2xl md:text-3xl font-display text-primary hover:underline break-all"
            >
              hello@lumaruskin.com
            </a>
            <p className="text-text/50 text-sm mt-3">
              We reply within 24 hours, Monday through Friday.
            </p>
          </div>

          {/* Response Time */}
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">What to expect</h2>
            <p>Send us a note and we'll get back to you as soon as possible — usually within one business day. No auto-reply loops. No chatbots pretending to be human. Just a real person on the other end.</p>
          </section>

          {/* Common Questions */}
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Before you email</h2>
            <p>If you're wondering about dark circle types, shipping times, or how the formula works, check our <Link href="/blog" className="text-primary hover:underline">blog</Link> or the <Link href="/science" className="text-primary hover:underline">Science page</Link>. We've probably already answered it there.</p>
          </section>

          {/* Press & Partnerships */}
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Press &amp; Partnerships</h2>
            <p>For collaboration inquiries, reach us at <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">hello@lumaruskin.com</a> with "Partnership" in the subject line.</p>
          </section>

          {/* Returns */}
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Returns</h2>
            <p>To request a return, please see our <Link href="/refund" className="text-primary hover:underline">Return Policy page</Link> for instructions.</p>
          </section>

          {/* Social Media */}
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Find us elsewhere</h2>
            <p>
              We're on{" "}
              <a href="https://bsky.app/profile/mateushahn.bsky.social" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Bluesky
              </a>
              {" "}and{" "}
              <a href="https://www.pinterest.com/awakemyeyes/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Pinterest
              </a>
              . We're most responsive on email, but you can find us there too.
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <LastUpdated date="2026-05-24" />
      </div>
    </>
  );
}