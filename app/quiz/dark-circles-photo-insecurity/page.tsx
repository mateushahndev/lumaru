import type { Metadata } from "next";
import QuizContainer from "@/components/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "My Dark Circles Make Me Feel Insecure in Photos — Take the Quiz | Lumaru",
  description: "Do your dark circles make you feel insecure in photos? Take this 2-minute quiz to understand your under-eye concerns and find what actually works.",
  openGraph: {
    title: "My Dark Circles Make Me Feel Insecure in Photos — Take the Quiz",
    description: "Do your dark circles make you feel insecure in photos? Take this 2-minute quiz to understand your under-eye concerns.",
    url: "https://lumaruskin.com/quiz/dark-circles-photo-insecurity",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/quiz/dark-circles-photo-insecurity",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Definindo as perguntas AQUI mesmo
const questions = [
  {
    id: 1,
    text: "How often do you take photos of yourself?",
    options: ["Every day", "A few times a week", "Only on special occasions", "I avoid them"],
  },
  {
    id: 2,
    text: "When you see a photo of yourself, what do you notice first?",
    options: [
      "The dark circles under my eyes",
      "How tired I look",
      "I immediately zoom in on my eyes",
      "I just delete it",
    ],
  },
  {
    id: 3,
    text: "Have you ever avoided being in a photo because of your under-eyes?",
    options: ["All the time", "More than I'd like to admit", "Once or twice", "No, but I hate how I look in them"],
  },
  {
    id: 4,
    text: "What goes through your mind when someone pulls out a camera?",
    options: [
      "'Please no flash'",
      "'Let me stand in the back'",
      "'I'll fix it with an app later'",
      "'I wish I felt confident right now'",
    ],
  },
  {
    id: 5,
    text: "Imagine your next photo. How do you want to feel?",
    options: [
      "Confident, no filter needed",
      "Happy to be in the picture",
      "Like my eyes finally look awake",
      "Proud of how I look",
    ],
  },
  {
    id: 6,
    text: "What would you do if you loved how you looked in photos?",
    options: [
      "Post without editing first",
      "Take more photos with friends",
      "Actually enjoy being tagged",
      "All of the above",
    ],
  },
  {
    id: 7,
    text: "Which of these would mean the most to you?",
    options: [
      "Looking at a photo and smiling, not cringing",
      "Someone saying 'you look great' instead of 'you look tired'",
      "Feeling beautiful without a filter",
      "All of it",
    ],
  },
  {
    id: 8,
    text: "We found a formula that targets the real cause of dark circles — not just covers them up. Made with 3 organic actives that wake up your under-eyes at the source. Want to see it?",
    options: ["Yes, show me the formula →"],
    isFinal: true,
  },
];

// Cores específicas deste quiz
const quizColors = {
  primary: "#2D3A54",
  primaryHover: "#1F2A3D",
  primaryLight: "#E8EDF5",
  bg: "#F7F9FC",
  text: "#1A1C20",
  textLight: "#6B7280",
  cardBg: "#FFFFFF",
  progressBg: "#E0E7F0",
};

// Schema.org do Quiz (enriquecido)
const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Dark Circles Photo Insecurity Quiz",
  description: "Discover how dark circles affect your confidence in photos and identify your specific under-eye concerns.",
  url: "https://lumaruskin.com/quiz/dark-circles-photo-insecurity",
  timeRequired: "PT2M",
  interactivityType: "mixed",
  educationalLevel: "Beginner",
  teaches: "Understanding dark circle types and under-eye skin concerns",
  assessment: "Self-assessment",
  learningResourceType: "Quiz",
};

export default function DarkCirclesQuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <QuizContainer 
        questions={questions}
        colors={quizColors}
        title="The Insecurity Check"
        icon="✨"
      />
    </>
  );
}