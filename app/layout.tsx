import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Configuração otimizada das fontes com pré-carregamento
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

// Metadados globais para SEO máximo
export const metadata: Metadata = {
  metadataBase: new URL("https://lumaruskin.com"),
  title: {
    default: "Awake Eye Complex | Solução Premium para Olheiras | Lumaru",
    template: "%s | Lumaru",
  },
  description:
    "Awake Eye Complex: creme para olheiras com Shea Butter, Ginkgo Biloba e Horse Chestnut. Redução comprovada em 89% em 28 dias. Vegano e Cruelty-Free.",
  keywords:
    "creme para olheiras, olhos cansados, tratamento olheiras, produtos veganos, skincare premium",
  authors: [{ name: "Lumaru", url: "https://lumaruskin.com" }],
  creator: "Lumaru",
  publisher: "Lumaru",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Awake Eye Complex - Pareça que dormiu bem mesmo sem dormir",
    description:
      "Reduza olheiras e olhos cansados em até 28 dias. Fórmula clean beauty com 3 ativos clínicos.",
    url: "https://lumaruskin.com",
    siteName: "Lumaru",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Awake Eye Complex - Creme para Olheiras Lumaru",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awake Eye Complex - Lumaru",
    description: "Pareça que dormiu bem mesmo sem dormir",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lumaruskin.com",
  },
};

// Viewport separado (Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#B5A5D1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-text">
        {children}
      </body>
    </html>
  );
}