import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LastUpdated from "@/components/LastUpdated";

export const metadata: Metadata = {
  title: "About Lumaru — Clean Science for Tired Eyes | Lumaru",
  description:
    "Meet Mateus Hahn, the 21-year-old founder behind Lumaru. Built for tired eyes, honest skincare, and real science. No hype, no filler.",
  openGraph: {
    title: "About Lumaru — Clean Science for Tired Eyes",
    description:
      "Meet Mateus Hahn, the 21-year-old founder behind Lumaru. Built for tired eyes, honest skincare, and real science.",
    url: "https://lumaruskin.com/about",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://lumaruskin.com/about",
  "name": "About Lumaru — Clean Science for Tired Eyes",
  "description": "Meet Mateus Hahn, the 21-year-old founder behind Lumaru. Built for tired eyes, honest skincare, and real science. No hype, no filler.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Lumaru",
    "url": "https://lumaruskin.com"
  }
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
              About Lumaru
            </h1>
            <p className="text-text/60 text-lg max-w-2xl mx-auto">
              Clean science for tired eyes. The story behind the formula.
            </p>
          </div>

          {/* Seção 1 — Foto + apresentação (layout reformulado) */}
          <div className="mb-16">
            <div className="flex flex-col items-center gap-8 mb-6">
              {/* Foto maior */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/about/mateus-hahn.webp"
                  alt="Mateus Hahn, founder of Lumaru"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-display text-text mb-4">Hi, I'm Mateus Hahn.</h2>
                <p className="text-text/70 leading-relaxed mb-4">
                  I'm 21, Brazilian, and I build things on the internet. Lumaru is the fourth business I've started — and the one that finally connects everything I believe about how products should be made and sold.
                </p>
                <p className="text-text/70 leading-relaxed">
                  My whole family has dark circles. My mom, my dad, my siblings — all of us. I know what it's like to wake up, look in the mirror, and see someone who looks exhausted even when you're not. I've tried the creams. They moisturize. They don't fix anything.
                </p>
              </div>
            </div>
          </div>

          {/* Seção 2 — Why Lumaru exists */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4">
              Why Lumaru exists
            </h2>
            <div className="space-y-4 text-text/70 leading-relaxed">
              <p>
                Most eye creams are built to sell, not to solve. They promise results but never address what actually causes dark circles and puffiness — poor microcirculation, fragile capillaries, and a skin barrier that can't hold moisture. They add caffeine to de-puff for a few hours and call it a solution.
              </p>
              <p>
                That's not a solution. That's a cover-up.
              </p>
              <p>
                I started Lumaru because I found a formula that actually targets the root causes — Ginkgo Biloba for microcirculation, Horse Chestnut for capillary strength, Shea Butter for barrier repair. Three organic actives. No filler. No hype. Just ingredients that work through real biological pathways, backed by published research.
              </p>
              <p>
                The product already existed. What didn't exist was a brand honest enough to sell it properly — with real education, real evidence, and real talk about what it can and can't do.
              </p>
            </div>
          </div>

          {/* Seção 3 — How I work */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4">
              How I work
            </h2>
            <div className="space-y-4 text-text/70 leading-relaxed">
              <p>
                I'm a developer by trade, currently studying systems analysis in Brazil. I built this entire site myself — the code, the content, the strategy. Every article on this <Link href="/blog" className="text-primary hover:underline">blog</Link> was researched and written to help you understand what's happening under your eyes, not to sell you something you don't need.
              </p>
              <p>
                I use AI tools in my workflow — for research, for writing drafts, for automating what can be automated. But every word gets reviewed by me. Every claim gets checked. If something sounds like marketing fluff, I cut it.
              </p>
            </div>
          </div>

          {/* Seção 4 — What Lumaru stands for */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4">
              What Lumaru stands for
            </h2>
            <div className="space-y-4 text-text/70 leading-relaxed">
              <p>
                <strong className="text-text">Honesty over hype.</strong> If your dark circles are pigmentary, our formula won't fix them — and I'll tell you that directly. If you need sunscreen more than you need an eye cream, our blog says so.
              </p>
              <p>
                <strong className="text-text">Science you can verify.</strong> Every ingredient in the Awake Eye Complex has published studies behind it. No proprietary blends. No hidden mechanisms. Check the <Link href="/evidence" className="text-primary hover:underline">Evidence page</Link> — it's all there.
              </p>
              <p>
                <strong className="text-text">Fair pricing.</strong> $35.90 for a formula that lasts months. No luxury markup. No subscriptions. No 'mystery ingredients' that cost extra for no reason.
              </p>
            </div>
          </div>

          {/* Seção 5 — Fechamento */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display text-text mb-4">
              This is just the beginning
            </h2>
            <p className="text-text/70 leading-relaxed mb-6">
              Lumaru launched in May 2026 with one product and a simple mission: make skincare that actually does what it says, and be honest about what it doesn't. If that sounds like the kind of brand you've been looking for, I'm glad you're here.
            </p>
            <p className="text-text text-lg font-medium">
              — Mateus Hahn
            </p>
          </div>

          {/* Last Updated */}
          <LastUpdated date="2026-05-24" />
        </div>
      </main>
      <Footer />
    </>
  );
}