"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/lib/lenis";
import { shouldRunAnimations } from "@/lib/animation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
    // Safety check for iOS Safari: Ensure body/html overflow: hidden is never stuck on load
    if (typeof document !== "undefined") {
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
      if (document.documentElement.style.overflow === "hidden") {
        document.documentElement.style.overflow = "";
      }
    }

    // On mobile / iOS — skip all ScrollTrigger setup entirely
    if (!shouldRunAnimations()) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastWidth = window.innerWidth;

    const handleResize = () => {
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
