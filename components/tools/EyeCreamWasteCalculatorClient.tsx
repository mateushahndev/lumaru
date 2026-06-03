"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/landing/Footer";
import EyeCreamWasteCalculator from "./EyeCreamWasteCalculator";

interface EyeCreamWasteCalculatorClientProps {
  isEmbedded?: boolean;
}

function EmbedLogic({ isEmbedded }: { isEmbedded: boolean }) {
  const searchParams = useSearchParams();
  const isEmbeddedFromUrl = searchParams.get("embed") === "true" || isEmbedded;

  // Enviar altura para o parent quando embedado
  useEffect(() => {
    if (isEmbeddedFromUrl && typeof window !== "undefined" && window.parent !== window) {
      const sendHeight = () => {
        const height = document.body.scrollHeight;
        window.parent.postMessage(
          { type: "lumaru-resize", height: height },
          "*"
        );
      };
      sendHeight();
      const observer = new ResizeObserver(() => sendHeight());
      observer.observe(document.body);
      return () => observer.disconnect();
    }
  }, [isEmbeddedFromUrl]);

  return (
    <>
      <EyeCreamWasteCalculator />
      {!isEmbeddedFromUrl && <Footer />}
    </>
  );
}

export default function EyeCreamWasteCalculatorClient({ isEmbedded = false }: EyeCreamWasteCalculatorClientProps) {
  return (
    <Suspense fallback={<EyeCreamWasteCalculator />}>
      <EmbedLogic isEmbedded={isEmbedded} />
    </Suspense>
  );
}