"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3 | "loading" | "result";
type ResultType = "vascular" | "pigmentary" | "structural" | "mixed" | null;

interface Scores {
  vascular: number;
  pigmentary: number;
  structural: number;
  mixed: number;
}

interface DarkCircleTypeFinderProps {
  isEmbedded?: boolean;
}

// Cores exclusivas da ferramenta (NENHUMA relação com o site)
const TOOL_THEME = {
  primary: "#0F172A",      // Azul escuro profundo
  primaryLight: "#1E293B",  // Azul médio
  accent: "#38BDF8",       // Ciano vibrante
  accentHover: "#0284C7",   // Ciano escuro
  bg: "#F8FAFC",           // Cinza azulado claro
  cardBg: "#FFFFFF",       // Branco
  text: "#0F172A",         // Azul escuro
  textLight: "#64748B",    // Cinza azulado
  border: "#E2E8F0",       // Cinza claro
  success: "#10B981",      // Verde menta
};

const resultData = {
  vascular: {
    title: "Vascular",
    fullTitle: "You Have Vascular Dark Circles",
    explanation:
      "Your dark circles are caused by slow blood microcirculation under the thin skin around your eyes. That blue-purple tint is pooled blood showing through — which is why they get worse when you're tired or stressed. You're not imagining it. And yes, it's treatable.",
    tips: [
      "Activate microcirculation with Ginkgo Biloba and light tapping massage",
      "Sleep with your head slightly elevated to prevent fluid pooling",
      "Reduce salt and alcohol intake — they dilate blood vessels and make the tint worse",
    ],
    accentColor: "#3B82F6",
    bgGradient: "from-blue-100 to-cyan-100",
  },
  pigmentary: {
    title: "Pigmentary",
    fullTitle: "You Have Pigmentary Dark Circles",
    explanation:
      "Your dark circles come from excess melanin — the same pigment that causes sun spots. This type is often genetic and won't fade just by sleeping more. The brownish tone stays consistent whether you're rested or exhausted.",
    tips: [
      "Use gentle brightening antioxidants like Vitamin C in low concentrations",
      "Apply SPF around your eyes every single day — UV rays worsen pigmentation",
      "Stop rubbing your eyes — friction stimulates melanin production over time",
    ],
    accentColor: "#F59E0B",
    bgGradient: "from-amber-100 to-orange-100",
  },
  structural: {
    title: "Structural",
    fullTitle: "You Have Structural Dark Circles",
    explanation:
      "Your dark circles are actually shadows created by volume loss or hollowing under your eyes. The skin itself may be fine — but the contour creates a darkness that changes depending on lighting. This is very common with age or weight loss.",
    tips: [
      "Deep hydration with Shea Butter to plump the skin from within",
      "Look for hyaluronic acid in products — it temporarily fills and smooths hollows",
      "Prioritize quality sleep — tissue repair and collagen production happen at night",
    ],
    accentColor: "#64748B",
    bgGradient: "from-slate-100 to-gray-100",
  },
  mixed: {
    title: "Mixed",
    fullTitle: "You Have Mixed Dark Circles",
    explanation:
      "Your dark circles are a combination of factors — likely circulation issues plus pigmentation or volume loss. This is actually the most common type. The good news: a combined approach works, and you can improve steadily with the right routine.",
    tips: [
      "Combine circulation-boosting ingredients (Ginkgo Biloba) with deep hydration (Shea Butter)",
      "Be consistent — mixed types respond slower but improve noticeably over 4-6 weeks",
      "Start by addressing circulation first, then layer in brightening or plumping actives",
    ],
    accentColor: "#8B5CF6",
    bgGradient: "from-purple-100 to-pink-100",
  },
};

// Helper para enviar eventos GA4
const sendEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }
};

export default function DarkCircleTypeFinder({ isEmbedded = false }: DarkCircleTypeFinderProps) {
  const [step, setStep] = useState<Step>(1);
  const [scores, setScores] = useState<Scores>({
    vascular: 0,
    pigmentary: 0,
    structural: 0,
    mixed: 0,
  });
  const [result, setResult] = useState<ResultType>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const router = useRouter();

  const progress = step === 1 ? 33 : step === 2 ? 66 : step === 3 ? 100 : 0;

  const calculateResult = (finalScores: Scores): ResultType => {
    const { vascular, pigmentary, structural, mixed } = finalScores;
    
    if (vascular >= 2) return "vascular";
    if (pigmentary >= 2) return "pigmentary";
    if (structural >= 2) return "structural";
    return "mixed";
  };

  // Detectar primeira interação (tool_started)
  useEffect(() => {
    const hasAnyScore = scores.vascular > 0 || scores.pigmentary > 0 || scores.structural > 0 || scores.mixed > 0;
    if (!hasStarted && hasAnyScore) {
      setHasStarted(true);
      sendEvent("tool_started", { tool_name: "dark_circle_type_finder" });
    }
  }, [scores, hasStarted]);

  // Detectar conclusão (tool_completed)
  useEffect(() => {
    if (step === "result" && result) {
      sendEvent("tool_completed", { tool_name: "dark_circle_type_finder" });
    }
  }, [step, result]);

  // Enviar altura para o parent quando embedado
  useEffect(() => {
    if (isEmbedded && typeof window !== "undefined" && window.parent !== window) {
      const sendHeight = () => {
        const height = document.body.scrollHeight;
        window.parent.postMessage(
          { type: "lumaru-resize", height: height },
          "*"
        );
      };
      sendHeight();
      const observer = new ResizeObserver(() => sendHeight());
      observer.observe(document.body);
      return () => observer.disconnect();
    }
  }, [isEmbedded, step, result, scores]);

  const handleAnswer = (type: keyof Scores) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (step === 3) {
      setStep("loading");
      setTimeout(() => {
        const finalResult = calculateResult(newScores);
        setResult(finalResult);
        setStep("result");
      }, 1500);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setScores({ vascular: 0, pigmentary: 0, structural: 0, mixed: 0 });
    setResult(null);
    setHasStarted(false);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleCtaClick = () => {
    sendEvent("cta_clicked", {
      cta_location: "tool_result",
      cta_text: "Read the Complete Guide →"
    });
    router.push("/blog/dark-circle-types-guide");
  };

  // Loading State
  if (step === "loading") {
    return (
      <div className={isEmbedded ? "" : "min-h-screen pt-20 md:pt-32 pb-20"} style={{ backgroundColor: TOOL_THEME.bg }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div 
            className="rounded-2xl shadow-lg p-12 animate-fade-in-up"
            style={{ backgroundColor: TOOL_THEME.cardBg, borderLeftColor: TOOL_THEME.accent, borderLeftWidth: 4 }}
          >
            <div className="inline-block">
              <div 
                className="w-16 h-16 border-4 rounded-full animate-spin"
                style={{ borderColor: `${TOOL_THEME.accent}20`, borderTopColor: TOOL_THEME.accent }}
              ></div>
            </div>
            <h2 className="text-2xl font-bold mt-6 mb-2" style={{ color: TOOL_THEME.text }}>
              Analyzing your answers...
            </h2>
            <p style={{ color: TOOL_THEME.textLight }}>Just a moment</p>
          </div>
        </div>
      </div>
    );
  }

  // Result State
  if (step === "result" && result) {
    const data = resultData[result];
    return (
      <div className={isEmbedded ? "" : "min-h-screen pt-20 md:pt-32 pb-20"} style={{ backgroundColor: TOOL_THEME.bg }}>
        <div className={`max-w-3xl mx-auto px-4 animate-fade-in-up`}>
          <div className={`bg-gradient-to-br ${data.bgGradient} rounded-2xl shadow-xl overflow-hidden`}>
            <div className="p-8 md:p-10">
              <div 
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}
              >
                {data.title} Type
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: TOOL_THEME.text }}>
                {data.fullTitle}
              </h1>
              
              <p className="text-lg leading-relaxed mb-8" style={{ color: TOOL_THEME.textLight }}>
                {data.explanation}
              </p>
              
              <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: `${data.accentColor}10` }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: TOOL_THEME.text }}>
                  What Actually Works for Your Type
                </h2>
                <ul className="space-y-3">
                  {data.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span style={{ color: TOOL_THEME.accent }} className="text-sm mt-0.5">✓</span>
                      <span style={{ color: TOOL_THEME.textLight }}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={handleCtaClick}
                className="w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mb-4"
                style={{ backgroundColor: data.accentColor, color: "white" }}
              >
                Read the Complete Guide →
              </button>
              
              <p className="text-center text-sm mb-4" style={{ color: TOOL_THEME.textLight }}>
                This guide explains each type in depth, with science-backed solutions.
              </p>
              
              <button
                onClick={handleRestart}
                className="block mx-auto text-sm transition-colors"
                style={{ color: TOOL_THEME.textLight }}
                onMouseEnter={(e) => e.currentTarget.style.color = TOOL_THEME.text}
                onMouseLeave={(e) => e.currentTarget.style.color = TOOL_THEME.textLight}
              >
                ← Take the test again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question States
  return (
    <div className={isEmbedded ? "" : "min-h-screen pt-20 md:pt-32 pb-20"} style={{ backgroundColor: TOOL_THEME.bg }}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{ color: TOOL_THEME.text }}>
            Dark Circle Type Finder
          </h1>
          <p className="text-sm md:text-base" style={{ color: TOOL_THEME.textLight }}>
            Identify your under-eye concern in 3 simple questions
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: TOOL_THEME.textLight }}>Question {step} of 3</span>
            <span style={{ color: TOOL_THEME.textLight }}>{progress}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${TOOL_THEME.primary}20` }}>
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{ width: `${progress}%`, backgroundColor: TOOL_THEME.accent }}
            />
          </div>
        </div>

        {(step === 2 || step === 3) && (
          <button
            onClick={handleBack}
            className="mb-6 text-sm transition-colors flex items-center gap-1"
            style={{ color: TOOL_THEME.textLight }}
          >
            ← Back
          </button>
        )}

        {step === 1 && (
          <div 
            className="rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-up"
            style={{ backgroundColor: TOOL_THEME.cardBg, borderTop: `3px solid ${TOOL_THEME.accent}` }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: TOOL_THEME.text }}>
              What best describes the color under your eyes?
            </h2>
            <p className="text-sm mb-6" style={{ color: TOOL_THEME.textLight }}>
              Look in a mirror with natural light. Be honest — there's no wrong answer.
            </p>
            
            <div className="space-y-3">
              {[
                { label: "Bluish or purple, like visible veins", type: "vascular", color: "#3B82F6" },
                { label: "Brownish or tan, like a skin stain", type: "pigmentary", color: "#F59E0B" },
                { label: "More of a shadow or hollow than a color", type: "structural", color: "#64748B" },
                { label: "A mix — some color, some shadow", type: "mixed", color: "#8B5CF6" },
              ].map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleAnswer(option.type as keyof Scores)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left group"
                  style={{ borderColor: `${TOOL_THEME.primary}15`, backgroundColor: "white" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = TOOL_THEME.accent}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = `${TOOL_THEME.primary}15`}
                >
                  <div
                    className="w-10 h-10 rounded-full shadow-md flex-shrink-0"
                    style={{ backgroundColor: option.color }}
                  />
                  <span style={{ color: TOOL_THEME.text }}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div 
            className="rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-up"
            style={{ backgroundColor: TOOL_THEME.cardBg, borderTop: `3px solid ${TOOL_THEME.accent}` }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: TOOL_THEME.text }}>
              Gently stretch the skin under your eyes with your fingers. What happens?
            </h2>
            <p className="text-sm mb-6" style={{ color: TOOL_THEME.textLight }}>
              Use your index fingers to pull the skin slightly. Watch in the mirror.
            </p>
            
            <div className="space-y-3">
              {[
                { label: "The dark color fades or gets lighter", type: "vascular" },
                { label: "The color stays the same, no change", type: "pigmentary" },
                { label: "I don't see much color, but the shadow moves", type: "structural" },
                { label: "Part of the color fades, part stays", type: "mixed" },
              ].map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleAnswer(option.type as keyof Scores)}
                  className="w-full text-left p-4 rounded-xl border-2 transition-all duration-300"
                  style={{ borderColor: `${TOOL_THEME.primary}15`, backgroundColor: "white", color: TOOL_THEME.text }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = TOOL_THEME.accent}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = `${TOOL_THEME.primary}15`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div 
            className="rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-up"
            style={{ backgroundColor: TOOL_THEME.cardBg, borderTop: `3px solid ${TOOL_THEME.accent}` }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: TOOL_THEME.text }}>
              When are your dark circles most visible?
            </h2>
            <p className="text-sm mb-6" style={{ color: TOOL_THEME.textLight }}>
              Think about patterns — not just today.
            </p>
            
            <div className="space-y-3">
              {[
                { label: "When I sleep poorly or I'm stressed", type: "vascular" },
                { label: "They always look the same, no matter what", type: "pigmentary" },
                { label: "It depends a lot on the lighting in the room", type: "structural" },
                { label: "They get worse with fatigue but are always there", type: "mixed" },
              ].map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleAnswer(option.type as keyof Scores)}
                  className="w-full text-left p-4 rounded-xl border-2 transition-all duration-300"
                  style={{ borderColor: `${TOOL_THEME.primary}15`, backgroundColor: "white", color: TOOL_THEME.text }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = TOOL_THEME.accent}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = `${TOOL_THEME.primary}15`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}