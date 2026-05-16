"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/landing/Footer";
import EyeCreamWasteCalculator from "./EyeCreamWasteCalculator";

function EmbedLogic() {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";

  return (
    <>
      <EyeCreamWasteCalculator />
      {!isEmbedded && <Footer />}
    </>
  );
}

export default function EyeCreamWasteCalculatorClient() {
  return (
    <Suspense fallback={<EyeCreamWasteCalculator />}>
      <EmbedLogic />
    </Suspense>
  );
}