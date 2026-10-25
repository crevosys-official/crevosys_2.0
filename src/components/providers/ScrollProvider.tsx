"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Prevent mobile browser toolbar / address-bar collapse from triggering heavy ScrollTrigger refreshes
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

interface ScrollProviderProps {
  children?: React.ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const lenis = useLenis();

  useEffect(() => {
    // Give the DOM a moment to complete first layout pass, then refresh ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    // Sync Lenis scroll updates with GSAP ScrollTrigger if Lenis is active (desktop)
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    // Only refresh on width changes (orientation change or desktop resize)
    // NEVER on vertical-only changes, which occur continuously when mobile Safari hides/reveals its address bar
    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      clearTimeout(resizeTimer);
    };
  }, [lenis]);

  return <>{children}</>;
}
