"use client";

import React, { useEffect, useState } from "react";
import {
  ReactLenis as BaseReactLenis,
  useLenis,
  LenisContext,
} from "lenis/react";

export * from "lenis/react";

interface ResponsiveLenisProps extends React.ComponentProps<typeof BaseReactLenis> {
  children?: React.ReactNode;
}

/**
 * Centralized Responsive Lenis Controller
 * - Desktop & Tablet (>= 768px): Initializes smooth Lenis scrolling.
 * - Mobile (< 768px) & prefers-reduced-motion: Completely bypasses Lenis, ensuring
 *   100% native browser momentum scrolling and zero interference with touch gestures.
 */
export function ReactLenis({ children, root = true, ...props }: ResponsiveLenisProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      if (typeof window === "undefined") return;
      const isDesktopOrTablet = window.matchMedia("(min-width: 768px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsEnabled(isDesktopOrTablet && !prefersReducedMotion);
    };

    evaluate();

    const mql = window.matchMedia("(min-width: 768px)");
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => evaluate();

    mql.addEventListener("change", handleChange);
    motionMql.addEventListener("change", handleChange);
    window.addEventListener("resize", handleChange, { passive: true });

    return () => {
      mql.removeEventListener("change", handleChange);
      motionMql.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleChange);
    };
  }, []);

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <BaseReactLenis root={root} {...props}>
      {children}
    </BaseReactLenis>
  );
}

export default ReactLenis;
