import type { Metadata } from "next";
import QuizContainer from "@/components/quiz/EmotionalQuizContainer";

export const metadata: Metadata = {
  title: "Are You Tired of Looking Tired? | Free Quiz",
  description:
    "How often do you hear 'you look tired', and how does it actually make you feel? Take this 2-minute quiz.",
  openGraph: {
    title: "Are You Tired of Looking Tired? | Free Quiz",
    description:
      "How often do you hear 'you look tired', and how does it actually make you feel? Take this 2-minute quiz.",
    url: "https://lumaruskin.com/quiz/are-you-tired-of-looking-tired",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/quiz/are-you-tired-of-looking-tired",
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
    text: "When was the last time someone told you that you look tired?",
    options: [
      "This week. It happens all the time.",
      "This month. I've lost count.",
      "I can't even remember. I've just accepted it as part of my face.",
      "It's been a while, but the feeling never really leaves.",
    ],
  },
  {
    id: 2,
    text: "How do you feel the moment someone says those words to you?",
    options: [
      "Frustrated. I sleep well, I take care of myself, and it still shows.",
      "Embarrassed. Like everyone is staring at my under-eyes.",
      "Defeated. No matter what I try, nothing changes.",
      "Angry. I'm so sick of having to explain myself.",
    ],
  },
  {
    id: 3,
    text: "Have you ever avoided a photo, a video call, or an event because of how your eyes looked?",
    options: [
      "Yes, more times than I'd like to admit.",
      "A few times. The camera flash is the worst.",
      "I've thought about it, but I pushed through.",
      "No, but I always regret not fixing myself up first.",
    ],
  },
  {
    id: 4,
    text: "What would it mean for you to wake up and actually look rested?",
    options: [
      "I'd feel confident. Like I don't have to hide anymore.",
      "I'd save so much time. No more layers of concealer just to look normal.",
      "I'd feel like myself again. The person I was before the dark circles took over.",
      "I'd finally be able to focus on things that actually matter, not my face.",
    ],
  },
  {
    id: 5,
    text: "Imagine tomorrow morning. You look in the mirror, and your eyes look bright, awake, and rested. What's the first thing you do?",
    options: [
      "Smile. Just stand there and enjoy it for a moment.",
      "Skip the concealer. Walk out the door with nothing to hide.",
      "Take a photo. Not to post, just for me. Proof that it's possible.",
      "Tell someone. Share the news that I finally found something that works.",
    ],
  },
];

const quizColors = {
  primary: "#1A1A1A",
  primaryHover: "#333333",
  primaryLight: "#E8E8E8",
  bg: "#F5F5F5",
  text: "#1A1A1A",
  textLight: "#666666",
  cardBg: "#FFFFFF",
  progressBg: "#E0E0E0",
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Are You Tired of Looking Tired?",
  description: "How often do you hear 'you look tired', and how does it actually make you feel?",
  url: "https://lumaruskin.com/quiz/are-you-tired-of-looking-tired",
  timeRequired: "PT2M",
  interactivityType: "mixed",
  educationalLevel: "Beginner",
  teaches: "Understanding emotional impact of under-eye concerns",
  assessment: "Self-assessment",
  learningResourceType: "Quiz",
};

export default function TiredOfLookingTiredQuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <QuizContainer
        questions={questions}
        colors={quizColors}
        title="The 'You Look Tired' Quiz"
        subtitle="How often do you hear it, and how does it actually make you feel?"
        ctaText="See the product →"
        ctaLink="/"
      />
    </>
  );
}