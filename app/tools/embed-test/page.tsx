import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Embed Test Page — Internal Use Only | Lumaru",
  description: "Internal test page for embedding Lumaru tools on external sites.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmbedTestPage() {
  return (
    <div className="min-h-screen bg-[#FEFEFE] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-yellow-100 text-yellow-800 text-sm font-medium inline-block px-3 py-1 rounded-full mb-4">
            Internal Use Only
          </div>
          <h1 className="text-3xl md:text-4xl font-display text-[#1A1A1A] mb-2">
            Embed Test Page
          </h1>
          <p className="text-[#1A1A1A]/60">
            Simulating how Lumaru tools would appear when embedded on external blogs.
          </p>
        </div>

        {/* Section 1: Dark Circle Type Finder */}
        <div className="mb-16">
          <h2 className="text-2xl font-display text-[#1A1A1A] mb-3">
            Dark Circle Type Finder
          </h2>
          <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed">
            If you've been struggling with dark circles and nothing seems to work, the first step is understanding what type you actually have. Use the free tool below to find out in 60 seconds.
          </p>

          {/* Simulated blog post styling */}
          <div className="bg-white border border-[#E8E2F0] rounded-2xl p-6 shadow-sm">
            <p className="text-[#1A1A1A]/50 text-sm mb-4 font-mono">
              &lt;!-- Embed code would go here --&gt;
            </p>
            <div id="lumaru-type-finder">
              <div className="text-center py-8 text-[#1A1A1A]/40">
                Loading tool...
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Eye Cream Waste Calculator */}
        <div className="mb-16">
          <h2 className="text-2xl font-display text-[#1A1A1A] mb-3">
            Eye Cream Waste Calculator
          </h2>
          <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed">
            Most women have tried countless eye creams without results. Calculate how much you've actually spent on products that didn't work.
          </p>

          <div className="bg-white border border-[#E8E2F0] rounded-2xl p-6 shadow-sm">
            <p className="text-[#1A1A1A]/50 text-sm mb-4 font-mono">
              &lt;!-- Embed code would go here --&gt;
            </p>
            <div id="lumaru-waste-calculator">
              <div className="text-center py-8 text-[#1A1A1A]/40">
                Loading tool...
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Which Eye Cream Works for Me */}
        <div className="mb-16">
          <h2 className="text-2xl font-display text-[#1A1A1A] mb-3">
            Which Eye Cream Actually Works for Me?
          </h2>
          <p className="text-[#1A1A1A]/70 mb-6 leading-relaxed">
            8 questions. 2 minutes. Stop guessing and find out what your under-eyes actually need.
          </p>

          <div className="bg-white border border-[#E8E2F0] rounded-2xl p-6 shadow-sm">
            <p className="text-[#1A1A1A]/50 text-sm mb-4 font-mono">
              &lt;!-- Embed code would go here --&gt;
            </p>
            <div id="lumaru-which-eye-cream">
              <div className="text-center py-8 text-[#1A1A1A]/40">
                Loading tool...
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-[#1A1A1A]/40 text-sm border-t border-[#E8E2F0] pt-8">
          <p>This page is for internal testing only. Not indexed by search engines.</p>
        </div>
      </div>


      {/* Scripts de embed */}
      <Script src="/embed/dark-circle-type-finder.js" strategy="afterInteractive" />
      <Script src="/embed/eye-cream-waste-calculator.js" strategy="afterInteractive" />
      <Script src="/embed/which-eye-cream-works-for-me.js" strategy="afterInteractive" />
    </div>
  );
}