import type { Metadata } from "next";
import QuizContainer from "@/components/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "Dark Circle Habits Quiz — Find Out What's Making Your Under-Eyes Worse | Lumaru",
  description: "Your daily habits might be making your dark circles worse. Take this 2-minute quiz to discover what's really causing your under-eye concerns.",
  openGraph: {
    title: "Dark Circle Habits Quiz — Find Out What's Making Your Under-Eyes Worse",
    description: "Your daily habits might be making your dark circles worse. Take this 2-minute quiz.",
    url: "https://lumaruskin.com/quiz/dark-circle-habits",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/quiz/dark-circle-habits",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Perguntas do quiz
const questions = [
  {
    id: 1,
    text: "How many eye creams have you tried so far?",
    options: ["Just one", "Two or three", "Four or five", "I've lost count"],
  },
  {
    id: 2,
    text: "How do you dry your face after washing it?",
    options: [
      "I rub it hard with a towel",
      "I pat it gently",
      "I let it air dry",
      "I never thought about it",
    ],
  },
  {
    id: 3,
    text: "How often do you rub or touch your under-eye area during the day?",
    options: [
      "All the time — it's a habit",
      "When I'm tired or stressed",
      "Only when applying makeup",
      "Never, I'm careful about it",
    ],
  },
  {
    id: 4,
    text: "What's your typical dinner like?",
    options: [
      "Salty, processed, or takeout",
      "Whatever is quickest",
      "Balanced, but I don't think about sodium",
      "I eat clean and watch my salt intake",
    ],
  },
  {
    id: 5,
    text: "Imagine waking up and looking in the mirror. What's the first thought you'd want to have?",
    options: [
      "\"I look rested\"",
      "\"No concealer needed today\"",
      "\"I actually look as good as I slept\"",
      "All of the above",
    ],
  },
  {
    id: 6,
    text: "What would you do if dark circles weren't something you thought about anymore?",
    options: [
      "Take photos without overthinking",
      "Stop buying product after product",
      "Feel confident in the morning",
      "All of it",
    ],
  },
  {
    id: 7,
    text: "Your daily habits might be sabotaging your skin without you realizing it. We found a formula with 3 organic actives that target the root cause of dark circles — not just cover them up. Want to see how it works?",
    options: ["I Want More Rested Eyes →"],
    isFinal: true,
  },
];

// Cores específicas deste quiz (tons verdes/azulados - hábitos saudáveis)
const quizColors = {
  primary: "#2D6A4F",      // Verde escuro saudável
  primaryHover: "#1B4D3E", // Verde mais escuro
  primaryLight: "#D8F3DC", // Verde bem claro
  bg: "#F4FAF5",           // Fundo verde bem claro
  text: "#1B4332",         // Texto verde escuro
  textLight: "#52B788",    // Texto secundário verde médio
  cardBg: "#FFFFFF",       // Branco
  progressBg: "#B7E4C7",   // Barra de progresso verde claro
};

// Schema.org do Quiz
const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Dark Circle Habits Quiz",
  description: "Discover how your daily habits affect dark circles and under-eye concerns.",
  url: "https://lumaruskin.com/quiz/dark-circle-habits",
  timeRequired: "PT2M",
  interactivityType: "mixed",
  educationalLevel: "Beginner",
  teaches: "Understanding how lifestyle habits impact dark circles",
  assessment: "Self-assessment",
  learningResourceType: "Quiz",
};

export default function DarkCircleHabitsQuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <QuizContainer
        questions={questions}
        colors={quizColors}
        title="The Habits Check"
        icon="🔬"
      />
    </>
  );
}