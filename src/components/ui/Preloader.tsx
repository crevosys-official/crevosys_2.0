"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useLenis } from "@/lib/lenis";
import { usePathname } from "next/navigation";

// Extend global window object for reliable synchronization with Hero
declare global {
  interface Window {
    __crevosysPreloaderOpeningDispatched?: boolean;
    __crevosysPreloaderDone?: boolean;
  }
}

// In-memory flag ensuring the preloader only runs once per page session
let hasPlayedPreloader = false;

const FLIP_WORDS = [
  {
    text: "Plan,",
    gradient: "from-white via-[#ffaa66] to-[#ff6a00]",
    glow: "rgba(255,106,0,0.45)",
  },
  {
    text: "Design,",
    gradient: "from-white via-[#d8b4fe] to-[#a374ff]",
    glow: "rgba(163,116,255,0.45)",
  },
  {
    text: "Build,",
    gradient: "from-white via-[#7dd3fc] to-[#38bdf8]",
    glow: "rgba(56,189,248,0.45)",
  },
  {
    text: "Automate.",
    gradient: "from-white via-[#86efac] to-[#22c55e]",
    glow: "rgba(34,197,94,0.45)",
  },
];

function checkAlreadySeen(): boolean {
  if (typeof window === "undefined") return false;
  if (hasPlayedPreloader) return true;
  try {
    return sessionStorage.getItem("crevosys_preloader_seen") === "1";
  } catch {
    return false;
  }
}

export default function Preloader() {
  const pathname = usePathname();
  const [percent, setPercent] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(() => pathname !== "/" || checkAlreadySeen());

  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const cornerLoaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();
  const isDoneRef = useRef(false);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);

  // Force unlock scroll and cleanup
  const cleanupAndUnlock = useCallback(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    if (lenis) {
      lenis.start();
    }
  }, [lenis]);

  // Immediate skip / instant dismissal
  const handleSkip = useCallback(() => {
    if (isDoneRef.current) return;
    isDoneRef.current = true;
    hasPlayedPreloader = true;
    try {
      sessionStorage.setItem("crevosys_preloader_seen", "1");
    } catch {}

    if (masterTlRef.current) {
      masterTlRef.current.kill();
    }

    if (typeof window !== "undefined") {
      window.__crevosysPreloaderOpeningDispatched = true;
      window.__crevosysPreloaderDone = true;
      window.dispatchEvent(new CustomEvent("preloader-opening"));
      window.dispatchEvent(new CustomEvent("preloader-done"));
    }

    cleanupAndUnlock();

    // Fast shutter slide out
    if (topPanelRef.current && bottomPanelRef.current) {
      gsap.to(topPanelRef.current, {
        yPercent: -100,
        duration: 0.35,
        ease: "power3.inOut",
      });
      gsap.to(bottomPanelRef.current, {
        yPercent: 100,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => setIsComplete(true),
      });
      if (centerTextRef.current) {
        gsap.to(centerTextRef.current, { opacity: 0, duration: 0.2 });
      }
      if (cornerLoaderRef.current) {
        gsap.to(cornerLoaderRef.current, { opacity: 0, duration: 0.2 });
      }
    } else {
      setIsComplete(true);
    }
  }, [cleanupAndUnlock]);

  // Dedicated Lenis scroll lock
  useEffect(() => {
    if (lenis && !isComplete && pathname === "/" && !checkAlreadySeen()) {
      lenis.stop();
    }
  }, [lenis, isComplete, pathname]);

  useEffect(() => {
    // If not on home page ("/") or preloader has already played, skip immediately
    if (pathname !== "/" || checkAlreadySeen()) {
      hasPlayedPreloader = true;
      isDoneRef.current = true;
      setIsComplete(true);
      cleanupAndUnlock();

      if (typeof window !== "undefined") {
        window.__crevosysPreloaderOpeningDispatched = true;
        window.__crevosysPreloaderDone = true;
        window.dispatchEvent(new CustomEvent("preloader-opening"));
        window.dispatchEvent(new CustomEvent("preloader-done"));
      }
      return;
    }

    hasPlayedPreloader = true;
    try {
      sessionStorage.setItem("crevosys_preloader_seen", "1");
    } catch {}

    // Lock scroll during preloading
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

    // Fast, responsive timings (0.75s on mobile, 1.1s on desktop)
    const counterDuration = isMobile ? 0.65 : 0.85;
    const wordInterval = isMobile ? 0.16 : 0.22;
    const curtainDuration = isMobile ? 0.5 : 0.65;

    const flipToWord = (newIndex: number) => {
      const el = wordRef.current;
      if (!el) return;

      gsap.to(el, {
        rotateX: -70,
        y: -14,
        opacity: 0,
        duration: isMobile ? 0.12 : 0.16,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = FLIP_WORDS[newIndex].text;
          el.className = `inline-block font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${FLIP_WORDS[newIndex].gradient} will-change-transform`;
          setWordIndex(newIndex);

          gsap.fromTo(
            el,
            { rotateX: 70, y: 14, opacity: 0 },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              duration: isMobile ? 0.16 : 0.22,
              ease: "back.out(1.2)",
            }
          );
        },
      });
    };

    const counterObj = { value: 0 };
    const masterTl = gsap.timeline();
    masterTlRef.current = masterTl;

    // Initial entrance for "Plan,"
    if (wordRef.current) {
      masterTl.fromTo(
        wordRef.current,
        { rotateX: 60, y: 16, opacity: 0 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.25 : 0.35,
          ease: "back.out(1.2)",
        },
        0
      );
    }

    // 1. Percentage counter animation (Snappy 0 -> 100%)
    masterTl.to(
      counterObj,
      {
        value: 100,
        duration: counterDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          const current = Math.round(counterObj.value);
          setPercent(current);
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${current / 100})`;
          }
        },
      },
      0
    );

    // 2. Rapid word flips synchronized with counter
    masterTl.call(() => flipToWord(1), [], wordInterval); // -> Design,
    masterTl.call(() => flipToWord(2), [], wordInterval * 2); // -> Build,
    masterTl.call(() => flipToWord(3), [], wordInterval * 3); // -> Automate.

    // 3. Short pause at 100%
    masterTl.to({}, { duration: isMobile ? 0.1 : 0.15 });

    // 4. Trigger Hero entrance animation early (as shutters begin parting)
    masterTl.add(() => {
      if (typeof window !== "undefined") {
        window.__crevosysPreloaderOpeningDispatched = true;
        window.dispatchEvent(new CustomEvent("preloader-opening"));
      }
    });

    // Fade center text and bottom-right counter
    masterTl.to(
      centerTextRef.current,
      {
        y: -24,
        opacity: 0,
        scale: 0.97,
        duration: isMobile ? 0.25 : 0.35,
        ease: "power2.in",
      },
      "+=0.02"
    );

    masterTl.to(
      cornerLoaderRef.current,
      {
        y: 12,
        opacity: 0,
        duration: isMobile ? 0.2 : 0.25,
        ease: "power2.in",
      },
      "<"
    );

    // Split curtain panels (Top lifts up, Bottom slides down)
    masterTl.to(
      topPanelRef.current,
      {
        yPercent: -100,
        duration: curtainDuration,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    masterTl.to(
      bottomPanelRef.current,
      {
        yPercent: 100,
        duration: curtainDuration,
        ease: "power4.inOut",
      },
      "<"
    );

    // 5. Complete and cleanup
    masterTl.add(() => {
      isDoneRef.current = true;
      cleanupAndUnlock();

      if (typeof window !== "undefined") {
        window.__crevosysPreloaderDone = true;
        window.dispatchEvent(new CustomEvent("preloader-done"));
      }
      setIsComplete(true);
    });

    // Hard safety timeout: Preloader will NEVER hang or block the user
    const safetyTimer = setTimeout(() => {
      if (!isDoneRef.current) {
        handleSkip();
      }
    }, isMobile ? 1500 : 1900);

    return () => {
      clearTimeout(safetyTimer);
      masterTl.kill();
      cleanupAndUnlock();
    };
  }, [cleanupAndUnlock, handleSkip, lenis, pathname]);

  if (isComplete || pathname !== "/") return null;

  return (
    <div
      ref={containerRef}
      id="site-preloader"
      onClick={handleSkip}
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-transparent cursor-pointer"
      aria-label="Site Loading (Tap to Skip)"
      title="Tap anywhere to skip"
    >
      {/* Top Split Shutter */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-[51%] bg-[#030305] overflow-hidden will-change-transform"
      >
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-indigo-600/[0.12] via-purple-600/[0.06] to-transparent blur-[90px] rounded-full pointer-events-none" />
      </div>

      {/* Bottom Split Shutter */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-[51%] bg-[#030305] overflow-hidden will-change-transform"
      >
        <div className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#ff6a00]/[0.10] via-purple-600/[0.05] to-transparent blur-[90px] rounded-full pointer-events-none" />
      </div>

      {/* Top-Right Quick Skip Button */}
      <div className="fixed top-5 right-5 sm:top-7 sm:right-7 z-50 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors uppercase cursor-pointer"
        >
          Skip ➔
        </button>
      </div>

      {/* CENTER: "We [Plan, / Design, / Build, / Automate.]" */}
      <div
        ref={centerTextRef}
        className="absolute inset-0 z-30 flex items-center justify-center px-4 pointer-events-none"
      >
        {/* Dynamic Ambient Glow */}
        {FLIP_WORDS.map((fw, idx) => (
          <div
            key={idx}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[180px] rounded-full pointer-events-none blur-[60px] transition-opacity duration-300 will-change-transform ${
              wordIndex === idx ? "opacity-30" : "opacity-0"
            }`}
            style={{ background: fw.glow }}
          />
        ))}

        <div className="relative z-10 flex items-center justify-center text-center font-sans">
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-400 mr-2.5 sm:mr-4 md:mr-5 select-none">
            We
          </span>

          <div
            className="inline-block overflow-visible"
            style={{ perspective: 800 }}
          >
            <span
              ref={wordRef}
              className={`inline-block font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${FLIP_WORDS[wordIndex].gradient} will-change-transform`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {FLIP_WORDS[wordIndex].text}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM-RIGHT CORNER: Progress & % counter */}
      <div
        ref={cornerLoaderRef}
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 z-40 flex flex-col items-end pointer-events-none will-change-transform"
      >
        <div className="flex items-baseline font-mono tabular-nums select-none leading-none">
          <span className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            {percent}
          </span>
          <span className="text-xl sm:text-3xl md:text-4xl font-bold text-[#ff6a00] ml-1 sm:ml-2">
            %
          </span>
        </div>

        <div className="w-24 sm:w-36 md:w-44 h-[2px] sm:h-[2.5px] bg-white/[0.1] rounded-full overflow-hidden mt-2.5 relative">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gradient-to-r from-[#ff6a00] via-[#a374ff] to-[#ff7520] rounded-full origin-left will-change-transform shadow-[0_0_10px_rgba(255,106,0,0.8)]"
            style={{ transform: `scaleX(${percent / 100})` }}
          />
        </div>

        <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mt-2 select-none">
          TAP ANYWHERE TO SKIP
        </div>
      </div>
    </div>
  );
}
