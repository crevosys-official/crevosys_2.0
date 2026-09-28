"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/lib/lenis";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Show indicator when scrolled down past 150px
      if (currentScrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (scrollHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (currentScrollY / scrollHeight) * 100)
        );
        setScrollProgress(progress);
      }
    };

    updateScroll();

    if (lenis) {
      lenis.on("scroll", updateScroll);
    }
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });

    return () => {
      if (lenis) {
        lenis.off("scroll", updateScroll);
      }
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [lenis]);

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 pointer-events-auto"
        >
          <div className="relative group">
            {/* Tooltip on hover */}
            <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wider uppercase bg-black/80 text-white/90 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              Top
            </div>

            <button
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
              className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-neutral-950/70 hover:bg-neutral-900/90 border border-white/15 hover:border-[#a374ff]/60 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_24px_rgba(163,116,255,0.45)] transition-all duration-300 active:scale-90 cursor-pointer group"
            >
              {/* SVG Scroll Progress Ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
                viewBox="0 0 48 48"
              >
                {/* Background Ring */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-white/10"
                  strokeWidth="2.5"
                  fill="none"
                />
                {/* Active Progress Ring */}
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-[#a374ff] transition-[stroke-dashoffset] duration-150 ease-out"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Up Arrow Icon */}
              <ArrowUp className="w-5 h-5 text-white/80 group-hover:text-white transition-all duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
