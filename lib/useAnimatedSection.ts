"use client";

import { useEffect, useRef } from "react";
import { useScreenshot } from "@/components/providers/ScreenshotProvider";

export function useAnimatedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isScreenshotMode } = useScreenshot();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Em modo screenshot, ativa imediatamente
    if (isScreenshotMode) {
      element.classList.add("animate-fade-in-up");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("animate-fade-in-up");
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isScreenshotMode]);

  return ref;
}