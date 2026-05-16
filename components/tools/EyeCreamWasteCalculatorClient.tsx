"use client";

import { useSearchParams } from "next/navigation";
import Footer from "@/components/landing/Footer";
import EyeCreamWasteCalculator from "./EyeCreamWasteCalculator";

export default function EyeCreamWasteCalculatorClient() {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";

  return (
    <>
      <EyeCreamWasteCalculator />
      {!isEmbedded && <Footer />}
    </>
  );
}