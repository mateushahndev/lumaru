"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ScreenshotContextType {
  isScreenshotMode: boolean;
}

const ScreenshotContext = createContext<ScreenshotContextType>({
  isScreenshotMode: false,
});

export function useScreenshot() {
  return useContext(ScreenshotContext);
}

export function ScreenshotProvider({ children }: { children: React.ReactNode }) {
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsScreenshotMode(params.get("screenshot") === "true");
    }
  }, []);

  return (
    <ScreenshotContext.Provider value={{ isScreenshotMode }}>
      {children}
    </ScreenshotContext.Provider>
  );
}