"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  bg: string;
  text: string;
  textLight: string;
  cardBg: string;
  progressBg: string;
}

interface QuizContainerProps {
  questions: Question[];
  colors: QuizColors;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
}

const sendEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }
};

export default function QuizContainer({
  questions,
  colors,
  title,
  subtitle,
  ctaText,
  ctaLink,
}: QuizContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const router = useRouter();

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  useEffect(() => {
    if (!hasStarted && currentIndex === 0) {
      setHasStarted(true);
      sendEvent("quiz_started", { quiz_name: "tired_of_looking_tired" });
    }
  }, [hasStarted, currentIndex]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (isLast) {
      sendEvent("quiz_completed", { quiz_name: "tired_of_looking_tired" });
      setShowResult(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setShowResult(false);
    setHasStarted(false);
  };

  if (showResult) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 pt-12 pb-12"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="max-w-2xl w-full text-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: colors.text, fontFamily: "'DM Sans', sans-serif" }}
          >
            You're not imagining it. And you're not alone.
          </h1>

          <div
            className="rounded-2xl p-8 mb-8 text-left"
            style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.progressBg}` }}
          >
            <p className="text-base leading-relaxed mb-4" style={{ color: colors.textLight }}>
              We found a product that matches what you're feeling.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: colors.textLight }}>
              It was formulated to treat the real cause of dark circles and puffiness, not just
              moisturize the surface. It contains Ginkgo Biloba, Horse Chestnut, and Shea Butter.
              The ingredients are backed by published studies, and it's certified COSMOS Natural,
              ECOCERT, vegan, and cruelty-free.
            </p>
            <p className="text-base leading-relaxed" style={{ color: colors.textLight }}>
              Recommended for anyone tired of hearing 'you look so tired.'
            </p>
          </div>

          <button
            onClick={() => router.push(ctaLink)}
            className="w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: colors.primary,
              color: "white",
            }}
          >
            {ctaText}
          </button>

          <button
            onClick={handleRestart}
            className="w-full text-center text-sm transition-colors mt-4"
            style={{ color: colors.textLight }}
          >
            ← Take the quiz again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-12 pb-12"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: colors.text, fontFamily: "'DM Sans', sans-serif" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm" style={{ color: colors.textLight }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Question Counter */}
        <div className="mb-6 text-sm" style={{ color: colors.textLight }}>
          Question {currentIndex + 1} of {questions.length}
        </div>

        {/* Question Card */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.progressBg}` }}
        >
          <h2
            className="text-xl md:text-2xl font-medium mb-8"
            style={{ color: colors.text, fontFamily: "'DM Sans', sans-serif" }}
          >
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-xl border transition-all duration-300 hover:bg-opacity-5"
                style={{
                  borderColor: colors.progressBg,
                  backgroundColor: colors.cardBg,
                  color: colors.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.backgroundColor = `${colors.primary}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.progressBg;
                  e.currentTarget.style.backgroundColor = colors.cardBg;
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}