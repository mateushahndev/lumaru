"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sendEvent } from "@/lib/useGA4";

interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
}

interface Answers {
  concern: string;
  budget: string;
  natural: string;
  sensitivity: string;
  age: string;
  skinType: string;
  texture: string;
  secondary: string;
}

type Step = "question" | "loading" | "result";

interface WhichEyeCreamToolProps {
  isEmbedded?: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What's your main under-eye concern?",
    options: [
      { value: "vascular", label: "Dark circles (blue/purple)" },
      { value: "pigmentary", label: "Dark circles (brown/tan)" },
      { value: "structural", label: "Shadows or hollows" },
      { value: "puffiness", label: "Puffiness or bags" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },
  {
    id: 2,
    text: "What's your budget for an eye cream?",
    options: [
      { value: "under15", label: "Under $15" },
      { value: "15-30", label: "$15-30" },
      { value: "30-50", label: "$30-50" },
      { value: "50plus", label: "$50+" },
    ],
  },
  {
    id: 3,
    text: "How important are natural/organic certifications to you?",
    options: [
      { value: "essential", label: "Essential (COSMOS, ECOCERT, vegan)" },
      { value: "prefer", label: "I prefer natural but it's not a dealbreaker" },
      { value: "not-important", label: "Not important to me" },
    ],
  },
  {
    id: 4,
    text: "How sensitive is your under-eye skin?",
    options: [
      { value: "very", label: "Very sensitive (reacts easily, redness, stinging)" },
      { value: "moderate", label: "Moderately sensitive" },
      { value: "not", label: "Not sensitive at all" },
    ],
  },
  {
    id: 5,
    text: "How old are you?",
    options: [
      { value: "under25", label: "Under 25" },
      { value: "26-35", label: "26-35" },
      { value: "36-45", label: "36-45" },
      { value: "46plus", label: "46+" },
    ],
  },
  {
    id: 6,
    text: "What's your skin type around the eyes?",
    options: [
      { value: "dry", label: "Dry (tight, flaky)" },
      { value: "oily", label: "Oily (shiny, visible pores)" },
      { value: "combination", label: "Combination" },
      { value: "normal", label: "Normal (balanced)" },
    ],
  },
  {
    id: 7,
    text: "What texture do you prefer?",
    options: [
      { value: "lightweight", label: "Lightweight/gel (absorbs fast, wears well under makeup)" },
      { value: "rich", label: "Rich/creamy (intensive moisture, feels luxurious)" },
      { value: "no-preference", label: "No preference" },
    ],
  },
  {
    id: 8,
    text: "Do you have a secondary concern besides dark circles or puffiness?",
    options: [
      { value: "fine-lines", label: "Fine lines / anti-aging" },
      { value: "puffiness", label: "Puffiness / morning swelling" },
      { value: "both", label: "Both" },
      { value: "neither", label: "Neither (just dark circles)" },
    ],
  },
];

interface Recommendation {
  title: string;
  summary: string;
  recommendation: string;
  why: string;
  tips: string[];
  whatWontWork: string;
  cta: { text: string; href: string };
}

export default function WhichEyeCreamTool({ isEmbedded = false }: WhichEyeCreamToolProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [step, setStep] = useState<Step>("question");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasStarted, setHasStarted] = useState(false);

  const progress = (currentStep / questions.length) * 100;
  const currentQuestion = questions[currentStep - 1];

  useEffect(() => {
    if (!hasStarted && currentStep > 0) {
      setHasStarted(true);
      sendEvent("tool_started", { tool_name: "which_eye_cream_works" });
    }
  }, [currentStep, hasStarted]);

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
  }, [isEmbedded, step, result, currentStep]);

  const handleConcernUnsure = () => {
    setResult({
      title: "Start with a diagnosis first",
      summary:
        "You're not sure what type of dark circles you have — which is completely normal. The right product depends entirely on the cause.",
      recommendation:
        "We recommend taking our Dark Circle Type Finder before buying anything.",
      why: "Blue/purple, brown/tan, shadows, and puffiness all have different root causes. Guessing wrong means wasting money.",
      tips: [
        "The Dark Circle Type Finder takes 60 seconds",
        "No email required — just answers",
        "You'll get a specific recommendation based on your type",
      ],
      whatWontWork:
        "Buying a random eye cream without knowing your type is the #1 reason people spend years on products that don't work.",
      cta: { text: "Take the Dark Circle Type Finder →", href: "/tools/dark-circle-type-finder" },
    });
    setStep("result");
    sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "unsure_diagnosis" });
  };

  const generateRecommendation = () => {
    const concern = answers.concern;
    const budget = answers.budget;
    const natural = answers.natural;
    const sensitivity = answers.sensitivity;
    const age = answers.age;
    const skinType = answers.skinType;
    const texture = answers.texture;
    const secondary = answers.secondary;

    const isVascular = concern === "vascular";
    const isPigmentary = concern === "pigmentary";
    const isStructural = concern === "structural";
    const isPuffiness = concern === "puffiness";

    const budgetOk = budget === "30-50" || budget === "50plus";
    const prefersNatural = natural === "essential" || natural === "prefer";
    const prefersRich = texture === "rich";
    const hasFineLines = secondary === "fine-lines" || secondary === "both";

    // Vascular dark circles
    if (isVascular) {
      if (budgetOk && prefersNatural) {
        setResult({
          title: "You have vascular dark circles. Here's your game plan.",
          summary: "Your answers indicate vascular dark circles — the blue/purple kind caused by blood pooling under thin skin. You value natural ingredients and have a reasonable budget.",
          recommendation: "Try Awake Eye Complex",
          why: "It targets microcirculation with Ginkgo Biloba and Horse Chestnut, exactly what vascular dark circles need. It's COSMOS Natural certified, vegan, and cruelty-free.",
          tips: [
            "Use consistently for 4-8 weeks — results build over time",
            "Apply a rice-grain amount both morning and night",
            "Sleep with your head slightly elevated to reduce pooling",
          ],
          whatWontWork: "Moisturizer-only creams without circulation-activating ingredients won't touch vascular dark circles.",
          cta: { text: "Try Awake Eye Complex → $35.90", href: "/" },
        });
        sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "vascular_awake" });
        return;
      }
      
      if (budget === "15-30" && prefersNatural) {
        setResult({
          title: "You have vascular dark circles. Here's what to look for.",
          summary: "Your budget is limited, but you still prefer natural ingredients.",
          recommendation: "Look for Ginkgo Biloba and Horse Chestnut in the formula",
          why: "These are the two clinically-studied botanicals that actually address microcirculation — the root cause of vascular dark circles.",
          tips: [
            "Check ingredient lists for 'Ginkgo Biloba Extract' and 'Aesculus Hippocastanum' (Horse Chestnut)",
            "Avoid formulas that only list caffeine — it's temporary",
            "Save up for Awake Eye Complex when you can — it has both actives at effective concentrations",
          ],
          whatWontWork: "Caffeine-only eye creams and basic moisturizers won't fix the underlying circulation issue.",
          cta: { text: "Learn More About Vascular Dark Circles →", href: "/blog/dark-circle-types-guide" },
        });
        sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "vascular_budget_natural" });
        return;
      }

      if (budget === "under15") {
        setResult({
          title: "You have vascular dark circles. Here's the honest truth.",
          summary: "Under $15, there aren't eye creams that actually fix vascular dark circles.",
          recommendation: "Caffeine-based eye creams can help temporarily, but won't fix the root cause",
          why: "Caffeine is a vasoconstrictor — it temporarily narrows blood vessels, reducing the appearance for a few hours. But it doesn't improve microcirculation long-term.",
          tips: [
            "Save up for a formula with Ginkgo Biloba and Horse Chestnut",
            "In the meantime, try cold compresses in the morning to reduce pooling",
            "Sleep with your head slightly elevated to improve overnight drainage",
          ],
          whatWontWork: "Moisturizer-only creams and cheap caffeine serums won't change the underlying circulation problem.",
          cta: { text: "Learn More About Vascular Dark Circles →", href: "/blog/dark-circle-types-guide" },
        });
        sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "vascular_budget_low" });
        return;
      }

      if (budget === "50plus") {
        setResult({
          title: "You have vascular dark circles. You have premium options.",
          summary: "With your budget, you have access to premium formulas that actually work.",
          recommendation: "Look for clinically-studied botanicals like Ginkgo Biloba",
          why: "Premium eye creams often include circulation-boosting ingredients. Check labels for Ginkgo Biloba, Horse Chestnut, or aescin.",
          tips: [
            "Awake Eye Complex is $35.90 and focuses specifically on microcirculation",
            "Some luxury brands also include these ingredients — check the ingredient list, not just the marketing",
            "Results take 4-8 weeks with consistent use",
          ],
          whatWontWork: "Retinol and peptides are for fine lines — they won't fix vascular dark circles.",
          cta: { text: "Try Awake Eye Complex → $35.90", href: "/" },
        });
        sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "vascular_premium" });
        return;
      }
      
      // Fallback para vascular
      setResult({
        title: "You have vascular dark circles.",
        summary: "Your answers indicate vascular dark circles — the blue/purple kind caused by blood pooling under thin skin.",
        recommendation: "Look for formulas with Ginkgo Biloba and Horse Chestnut",
        why: "These ingredients address microcirculation, the root cause of vascular dark circles.",
        tips: [
          "Use consistently for 4-8 weeks",
          "Apply morning and night",
          "Sleep with your head slightly elevated",
        ],
        whatWontWork: "Moisturizer-only creams won't fix vascular dark circles.",
        cta: { text: "Learn More About Vascular Dark Circles →", href: "/blog/dark-circle-types-guide" },
      });
      sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "vascular_fallback" });
      return;
    }

    // Pigmentary dark circles
    if (isPigmentary) {
      setResult({
        title: "You have pigmentary dark circles. Your dark circles need a different approach.",
        summary: "Pigmentary dark circles are caused by excess melanin — not circulation. The fix is completely different from vascular circles.",
        recommendation: "Focus on: daily sunscreen (non-negotiable), vitamin C (5-10%), and stop rubbing your eyes",
        why: "UV exposure stimulates melanin production. Rubbing triggers inflammation, which also triggers more pigment. Vitamin C helps reduce melanin over time.",
        tips: [
          "Sunscreen every single day — this is the most important step",
          "Gentle vitamin C in low concentration (5-10%) can help",
          "Retinol can also help with cell turnover",
          budget === "50plus" ? "Look for formulas with kojic acid or azelaic acid at your price point" : "",
        ].filter(Boolean),
        whatWontWork: "Awake Eye Complex is not the best fit for pigmentary circles — we'd rather be honest about that. Circulation boosters won't help.",
        cta: { text: "Learn More About Pigmentary Dark Circles →", href: "/blog/dark-circle-types-guide" },
      });
      sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "pigmentary" });
      return;
    }

    // Structural dark circles
    if (isStructural) {
      setResult({
        title: "You have structural dark circles. Here's the honest truth.",
        summary: "Structural dark circles are about facial structure — hollows or tear troughs that create shadows. No eye cream will fully resolve them.",
        recommendation: "Focus on deep hydration, quality sleep, and managing expectations",
        why: "Hydration (Shea Butter, Hyaluronic Acid) can plump the skin and soften shadows. But the underlying hollow is structural.",
        tips: [
          "Deep hydration with Shea Butter and hyaluronic acid can help",
          "Consistent quality sleep — tissue repair happens at night",
          prefersRich ? "Rich/creamy textures work well for this type" : "",
          "If it really bothers you, consult a dermatologist about tear trough filler",
        ].filter(Boolean),
        whatWontWork: "Brightening creams, circulation boosters, and caffeine won't fix structural hollows.",
        cta: { text: "Learn More About Structural Dark Circles →", href: "/blog/dark-circle-types-guide" },
      });
      sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "structural" });
      return;
    }

    // Puffiness primary
    if (isPuffiness) {
      if (budgetOk && prefersNatural) {
        setResult({
          title: "You have puffiness concerns. Here's what works.",
          summary: "Puffiness is often caused by fluid retention, sodium, and lying flat overnight.",
          recommendation: "Try Awake Eye Complex",
          why: "It contains Horse Chestnut (aescin), which has been studied for its ability to strengthen capillaries and reduce fluid accumulation.",
          tips: [
            "Cold compress in the morning — it's free and effective",
            "Reduce sodium in the evenings — it has a direct effect on morning puffiness",
            "Sleep with your head slightly elevated",
          ],
          whatWontWork: "Caffeine creams help temporarily but won't address the underlying fluid retention issue.",
          cta: { text: "Try Awake Eye Complex → $35.90", href: "/" },
        });
        sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "puffiness_awake" });
        return;
      }

      setResult({
        title: "You have puffiness concerns. Here's what helps.",
        summary: "Puffiness is manageable with lifestyle changes and the right ingredients.",
        recommendation: "Look for Horse Chestnut (aescin) or caffeine in formulas",
        why: "Horse Chestnut strengthens capillaries to reduce fluid leakage. Caffeine temporarily constricts vessels to reduce swelling.",
        tips: [
          "Cold compress in the morning",
          "Reduce sodium, especially at dinner",
          "Sleep elevated — an extra pillow makes a difference",
          budget === "under15" ? "For under $15, caffeine-based drugstore eye creams can help temporarily" : "",
        ].filter(Boolean),
        whatWontWork: "Moisturizer-only creams won't reduce puffiness.",
        cta: { text: "Learn More About Puffiness →", href: "/blog/why-you-look-tired-after-sleep" },
      });
      sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "puffiness_general" });
      return;
    }
    
    // Fallback final
    setResult({
      title: "Let's figure out what your under-eyes need",
      summary: "Based on your answers, we have a personalized recommendation for you.",
      recommendation: "Take our Dark Circle Type Finder for a precise diagnosis",
      why: "Dark circles have different causes. Knowing your specific type saves money and frustration.",
      tips: [
        "The Dark Circle Type Finder takes 60 seconds",
        "No email required",
        "You'll get a specific product recommendation",
      ],
      whatWontWork: "Guessing which product to buy without knowing your type is the #1 reason nothing works.",
      cta: { text: "Take the Dark Circle Type Finder →", href: "/tools/dark-circle-type-finder" },
    });
    sendEvent("tool_completed", { tool_name: "which_eye_cream_works", result: "fallback" });
  };

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    const newAnswers = { ...answers };

    if (currentStep === 1) {
      newAnswers.concern = value;
      if (value === "unsure") {
        handleConcernUnsure();
        return;
      }
    }
    if (currentStep === 2) newAnswers.budget = value;
    if (currentStep === 3) newAnswers.natural = value;
    if (currentStep === 4) newAnswers.sensitivity = value;
    if (currentStep === 5) newAnswers.age = value;
    if (currentStep === 6) newAnswers.skinType = value;
    if (currentStep === 7) newAnswers.texture = value;
    if (currentStep === 8) newAnswers.secondary = value;

    setAnswers(newAnswers);

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      setSelectedOption("");
    } else {
      setStep("loading");
      setTimeout(() => {
        generateRecommendation();
        setStep("result");
      }, 1000);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setAnswers({});
    setStep("question");
    setSelectedOption("");
    setResult(null);
    setHasStarted(false);
  };

  if (step === "loading") {
    return (
      <div className="text-center py-20">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-text/60 mt-4">Analyzing your answers...</p>
      </div>
    );
  }

  if (step === "result" && result) {
    return (
      <div className="animate-fade-in-up">
        <div className="bg-white border border-[#E8E2F0] rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-display text-text mb-4">
            {result.title}
          </h1>
          <p className="text-text/70 leading-relaxed mb-4">
            {result.summary}
          </p>
          <div className="bg-primary-light/10 rounded-xl p-5 my-6">
            <h2 className="text-lg font-semibold text-text mb-2">Recommendation</h2>
            <p className="text-primary font-medium text-xl mb-2">{result.recommendation}</p>
            <p className="text-text/70 text-sm">{result.why}</p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-text mb-2">What else helps</h3>
            <ul className="space-y-2">
              {result.tips.map((tip, idx) => (
                <li key={idx} className="text-text/70 text-sm flex items-start gap-2">
                  <span className="text-primary">✓</span> {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-text/70 text-sm">
              <strong className="text-text">What probably won't work:</strong> {result.whatWontWork}
            </p>
          </div>
          <Link
            href={result.cta.href}
            className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all duration-300 mb-4"
          >
            {result.cta.text}
          </Link>
          <button
            onClick={handleRestart}
            className="w-full text-center text-text/50 hover:text-text text-sm transition-colors"
          >
            ← Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={isEmbedded ? "" : "animate-fade-in-up"}>
      {/* Header - esconder em embed? */}
      {!isEmbedded && (
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-text mb-3">
            Which Eye Cream Actually Works for Me?
          </h1>
          <p className="text-text/60">
            8 questions. 2 minutes. Stop guessing and find out what your under-eyes actually need.
          </p>
          <p className="text-text/40 text-sm mt-2">
            We don't collect your email. This is just an honest recommendation based on what you tell us.
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-text/50 mb-1">
          <span>Question {currentStep} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-primary-light/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white border border-[#E8E2F0] rounded-2xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-medium text-text mb-6">
          {currentQuestion.text}
        </h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedOption === option.value
                  ? "border-primary ring-2 ring-primary/20 bg-primary-light/5"
                  : "border-[#E8E2F0] hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <span className="text-text">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}