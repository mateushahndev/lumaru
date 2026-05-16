import type { Metadata } from "next";
import EyeCreamWasteCalculatorClient from "@/components/tools/EyeCreamWasteCalculatorClient";

export const metadata: Metadata = {
  title: "How Much Have You Spent on Eye Creams? | Free Calculator",
  description:
    "Find out how much you've spent on eye creams that didn't work. Free calculator — enter your numbers and see the real cost.",
  openGraph: {
    title: "How Much Have You Spent on Eye Creams? | Free Calculator",
    description:
      "Find out how much you've spent on eye creams that didn't work.",
    url: "https://lumaruskin.com/tools/eye-cream-waste-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://lumaruskin.com/tools/eye-cream-waste-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <EyeCreamWasteCalculatorClient />
    </main>
  );
}