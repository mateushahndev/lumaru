import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import ExitIntentPopup from "@/components/ExitIntentPopup";
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

// Metadados globais para SEO máximo (Foco EUA - Inglês)
export const metadata: Metadata = {
  metadataBase: new URL("https://lumaruskin.com"),
  title: {
    default: "Awake Eye Complex | Premium Dark Circle Treatment | Lumaru",
    template: "%s | Lumaru",
  },
  description:
    "Awake Eye Complex with Shea Butter, Ginkgo Biloba & Horse Chestnut. Clinically shown to reduce dark circles and under-eye puffiness in 28 days. Vegan & Cruelty-Free.",
  authors: [{ name: "Lumaru", url: "https://lumaruskin.com" }],
  creator: "Lumaru",
  publisher: "Lumaru",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Awake Eye Complex - Look like you slept well. Even when you didn't.",
    description:
      "Reduce dark circles and tired eyes in up to 28 days. Clean beauty formula with 3 clinical-grade actives.",
    url: "https://lumaruskin.com",
    siteName: "Lumaru",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Awake Eye Complex - Lumaru Dark Circle Treatment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awake Eye Complex - Lumaru",
    description: "Look like you slept well. Even when you didn't.",
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
    languages: {
      "en-US": "https://lumaruskin.com",
    },
  },
  // Verificação do Pinterest
  verification: {
    other: {
      "p:domain_verify": "629a36d0ebf7fe0bdbfdf16cba1cefb0",
    },
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
    <html lang="en-US" className={`${inter.variable} ${playfair.variable}`}>
      <head />
      <body className="font-sans antialiased bg-background text-text">
        {children}
        {/* Exit Intent Popup */}
        <ExitIntentPopup />
      </body>
      {/* Google Analytics 4 */}
      <GoogleAnalytics gaId="G-TS8PPQ5WKC" />
      {/* Microsoft Clarity */}
      <Script id="clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wny6yx4g");
        `}
      </Script>
    </html>
  );
}