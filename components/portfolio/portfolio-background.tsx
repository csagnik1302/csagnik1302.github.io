"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type VantaEffect = {
  destroy: () => void;
};

type VantaWindow = Window & {
  VANTA?: {
    NET: (options: Record<string, unknown>) => VantaEffect;
  };
  THREE?: unknown;
};

export function PortfolioBackground() {
  const effectRef = useRef<VantaEffect | null>(null);
  const [isThreeReady, setIsThreeReady] = useState(false);
  const [isVantaReady, setIsVantaReady] = useState(false);

  useEffect(() => {
    const vantaWindow = window as VantaWindow;

    if (effectRef.current || !isThreeReady || !isVantaReady || !vantaWindow.VANTA) {
      return;
    }

    try {
      effectRef.current = vantaWindow.VANTA.NET({
        el: "#portfolio-vanta-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xc5ff41,
        backgroundColor: 0x0e0d0d,
        points: 8,
        maxDistance: 22,
        spacing: 18,
        showDots: true,
      });
    } catch {
      // Fallback to ambient background styling if Vanta fails
    }

    return () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [isThreeReady, isVantaReady]);

  return (
    <>
      <div id="portfolio-vanta-background" className="portfolio-background pointer-events-none" aria-hidden="true" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsThreeReady(true)}
      />
      {isThreeReady && (
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
          strategy="afterInteractive"
          onLoad={() => setIsVantaReady(true)}
        />
      )}
    </>
  );
}
