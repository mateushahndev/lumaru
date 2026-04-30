// Configuração centralizada para todos os quizzes
// Cada quiz terá suas próprias cores e perguntas

export interface QuizColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  bg: string;
  text: string;
  textLight: string;
  cardBg: string;
  progressBg: string;
}

export interface QuizConfig {
  slug: string;
  title: string;
  description: string;
  colors: QuizColors;
  icon: string;
}

// Quiz atual: Dark Circles Photo Insecurity
export const DARK_CIRCLES_QUIZ: QuizConfig = {
  slug: "dark-circles-photo-insecurity",
  title: "The Insecurity Check",
  description: "Do your dark circles make you feel insecure in photos?",
  icon: "✨",
  colors: {
    primary: "#2D3A54",
    primaryHover: "#1F2A3D",
    primaryLight: "#E8EDF5",
    bg: "#F7F9FC",
    text: "#1A1C20",
    textLight: "#6B7280",
    cardBg: "#FFFFFF",
    progressBg: "#E0E7F0",
  },
};

// Futuros quizzes terão suas próprias cores, ex:

// export const PUFFINESS_QUIZ: QuizConfig = {
//   slug: "puffy-eyes-morning",
//   title: "The Puffiness Check",
//   icon: "👁️",
//   colors: {
//     primary: "#D4A5A5",
//     primaryHover: "#B88383",
//     primaryLight: "#F5E8E8",
//     bg: "#FEF9F9",
//     text: "#2D1F1F",
//     textLight: "#8B6B6B",
//     cardBg: "#FFFFFF",
//     progressBg: "#F0E0E0",
//   },
// };