"use client";

import { useState } from "react";

interface ToolProps {
  title: string;
  description: string;
  iframeCode: string;
  suggestedSize: string;
  preview: string;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm"
    >
      {copied ? "Copied!" : "Copy code"}
    </button>
  );
}

function ToolCard({ title, description, iframeCode, suggestedSize, preview }: ToolProps) {
  return (
    <div className="border border-[#E8E2F0] rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-text mb-2">{title}</h2>
      <p className="text-text/60 mb-6">{description}</p>

      {/* Preview visual placeholder (não é iframe real) */}
      <div className="bg-primary-light/10 rounded-xl p-8 text-center mb-6 border border-primary-light/20">
        <div className="text-primary text-sm uppercase tracking-wider mb-2">Preview</div>
        <div className="text-text/70 text-sm italic">{preview}</div>
        <div className="text-text/40 text-xs mt-3">Interactive tool • No signup required</div>
      </div>

      {/* Iframe snippet + botão */}
      <div className="bg-text/5 rounded-xl p-4 mb-3">
        <code className="text-xs text-text/70 break-all whitespace-pre-wrap">
          {iframeCode}
        </code>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-text/50 text-sm">Suggested size: {suggestedSize}</span>
        <CopyButton code={iframeCode} />
      </div>
    </div>
  );
}

export default function EmbedTools() {
  const tools = [
    {
      title: "Dark Circle Type Finder",
      description:
        "Your readers answer a few questions and discover their dark circle type — plus how to treat it.",
      iframeCode: `<iframe src="https://lumaruskin.com/tools/dark-circle-type-finder?embed=true" width="600" height="500" frameborder="0" style="max-width: 100%; border-radius: 12px;" title="Dark Circle Type Finder"></iframe>`,
      suggestedSize: "600 × 500px",
      preview: "🔍 Answer 3 questions → Instant diagnosis: Vascular, Pigmentary, Structural, or Mixed",
    },
    {
      title: "Eye Cream Waste Calculator",
      description:
        "A viral calculator that shows how much you've spent on eye creams that didn't work — and what that money could have bought instead.",
      iframeCode: `<iframe src="https://lumaruskin.com/tools/eye-cream-waste-calculator?embed=true" width="600" height="700" frameborder="0" style="max-width: 100%; border-radius: 12px;" title="Eye Cream Waste Calculator"></iframe>`,
      suggestedSize: "600 × 700px",
      preview: "💰 Enter numbers → See total spent + equivalent lattes, Netflix years, or Awake Eye Complex tubes",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-text mb-4">
          Free Tools for Your Blog
        </h1>
        <p className="text-text/60 text-lg max-w-2xl mx-auto">
          Embed interactive skincare tools your readers will love. No signup. No account. Just copy and paste.
        </p>
      </div>

      {/* Why embed section */}
      <div className="bg-primary-light/5 rounded-2xl p-8 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="font-semibold text-text mb-1">Free forever</h3>
            <p className="text-text/60 text-sm">no hidden fees, no account required</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-text mb-1">Keep readers engaged</h3>
            <p className="text-text/60 text-sm">interactive content keeps them on your blog longer</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-text mb-1">Automatically updated</h3>
            <p className="text-text/60 text-sm">you embed once, we handle the rest</p>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="space-y-12 mb-16">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>

      {/* CTA suave */}
      <div className="text-center py-8 border-t border-primary-light/20">
        <p className="text-text/60">
          Questions? Email us at{" "}
          <a href="mailto:hello@lumaruskin.com" className="text-primary hover:underline">
            hello@lumaruskin.com
          </a>
        </p>
      </div>
    </div>
  );
}