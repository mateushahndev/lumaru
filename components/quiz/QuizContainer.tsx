"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  text: string;
  options: string[];
  isFinal?: boolean;
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
  icon: string;
}

export default function QuizContainer({ questions, colors, title, icon }: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion.isFinal) {
      router.push("/");
      return;
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div 
      className="min-h-screen pt-32 pb-20"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo/Header diferenciado */}
        <div className="text-center mb-10">
          <div 
            className="inline-block w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-2xl"
            style={{ backgroundColor: colors.primary }}
          >
            {icon}
          </div>
          <h1 
            className="text-2xl font-light tracking-wide"
            style={{ color: colors.textLight }}
          >
            {title}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div 
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: colors.progressBg }}
          >
            <div
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{ 
                width: `${progress}%`,
                backgroundColor: colors.primary
              }}
            />
          </div>
          <div 
            className="text-right text-sm mt-2 font-medium"
            style={{ color: colors.textLight }}
          >
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div 
          className="rounded-3xl shadow-xl overflow-hidden animate-fade-in-up"
          style={{ backgroundColor: colors.cardBg }}
        >
          <div 
            className="h-2 w-full"
            style={{ backgroundColor: colors.primary }}
          />
          
          <div className="p-8 md:p-10">
            <div className="mb-6">
              <span className="text-4xl">💭</span>
            </div>

            <h2 
              className="text-2xl md:text-3xl font-medium leading-relaxed mb-8"
              style={{ color: colors.text }}
            >
              {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                    currentQuestion.isFinal
                      ? "text-white font-semibold text-center shadow-lg"
                      : "border-2 hover:shadow-md"
                  }`}
                  style={
                    currentQuestion.isFinal
                      ? {
                          backgroundColor: colors.primary,
                          color: "white",
                          border: "none",
                        }
                      : {
                          backgroundColor: "white",
                          borderColor: colors.progressBg,
                          color: colors.text,
                        }
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p 
          className="text-center text-xs mt-8"
          style={{ color: colors.textLight, opacity: 0.6 }}
        >
          Your answers are anonymous. No data is stored.
        </p>
      </div>
    </div>
  );
}