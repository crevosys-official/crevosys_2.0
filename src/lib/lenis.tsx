"use client";

import React, { useEffect, useState } from "react";
import {
  ReactLenis as BaseReactLenis,
  useLenis,
  LenisContext,
} from "lenis/react";
import "lenis/dist/lenis.css";

export * from "lenis/react";

interface ResponsiveLenisProps extends React.ComponentProps<typeof BaseReactLenis> {
  children?: React.ReactNode;
}

/**
 * Check if the current device is a mobile, tablet, or touch-first device (e.g., iPhone, iPad, Android).
 * Touch devices already have hardware-accelerated momentum scrolling natively in WebKit / Blink.
 * Intercepting touch events with smooth scroll libraries degrades performance and causes WebKit freezes.
 */
function isTouchOrMobileDevice(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.innerWidth < 768 ||
    /iPad|iPhone|iPod|Android.*Mobile/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent)) ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 767.98px)").matches
  );
}

/**
 * Centralized Responsive Lenis Controller
 * - Desktop (>= 768px with fine pointer): Initializes smooth Lenis scrolling.
 * - Mobile / iOS Touch devices: Completely bypasses Lenis, ensuring
 *   100% native hardware momentum scrolling and zero interference with touch gestures or pull-to-refresh.
 */
export function ReactLenis({ children, root = true, ...props }: ResponsiveLenisProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      if (typeof window === "undefined") return;
      const isMobile = isTouchOrMobileDevice();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsEnabled(!isMobile && !prefersReducedMotion);
    };

    evaluate();

    const mql = window.matchMedia("(min-width: 768px)");
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const handleChange = () => {
      // Ignore mobile address bar collapses where width does not change
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        evaluate();
      }
    };

    mql.addEventListener("change", evaluate);
    motionMql.addEventListener("change", evaluate);
    window.addEventListener("resize", handleChange, { passive: true });

    return () => {
      mql.removeEventListener("change", evaluate);
      motionMql.removeEventListener("change", evaluate);
      window.removeEventListener("resize", handleChange);
    };
  }, []);

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <BaseReactLenis
      root={root}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        ...props.options,
      }}
      {...props}
    >
      {children}
    </BaseReactLenis>
  );
}

export default ReactLenis;
