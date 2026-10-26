"use client";

import React from "react";
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
 * Centralized Lenis Smooth Scroll Controller
 * - Desktop: Smooth wheel scrolling with lerp 0.1, duration 1.2
 * - Mobile / iOS Touch: syncTouch: false ensures Lenis NEVER hijacks native
 *   touch events or locks inertial momentum scrolling on iPhone / WebKit.
 */
export function ReactLenis({ children, root = true, ...props }: ResponsiveLenisProps) {
  return (
    <BaseReactLenis
      root={root}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false, // CRITICAL FOR iOS: Never hijack native touch scroll on iPhone
        touchMultiplier: 1,
        ...props.options,
      }}
      {...props}
    >
      {children}
    </BaseReactLenis>
  );
}

export default ReactLenis;
