"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "@/lib/lenis";

const FLIP_WORDS = [
  {
    text: "Plan,",
    gradient: "from-white via-[#ffaa66] to-[#ff6a00]",
    glow: "rgba(255,106,0,0.5)",
  },
  {
    text: "Design,",
    gradient: "from-white via-[#d8b4fe] to-[#a374ff]",
    glow: "rgba(163,116,255,0.5)",
  },
  {
    text: "Build,",
    gradient: "from-white via-[#7dd3fc] to-[#38bdf8]",
    glow: "rgba(56,189,248,0.5)",
  },
  {
    text: "Automate.",
    gradient: "from-white via-[#86efac] to-[#22c55e]",
    glow: "rgba(34,197,94,0.5)",
  },
];

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const cornerLoaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();
  const initializedRef = useRef(false);

  // Dedicated Lenis scroll lock that doesn't restart the GSAP timeline
  useEffect(() => {
    if (lenis && !isComplete) {
      lenis.stop();
    }
  }, [lenis, isComplete]);

  useEffect(() => {
    // Prevent duplicate animation in React StrictMode or upon Lenis state changes
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Lock scroll during preloading
    if (lenis) {
      lenis.stop();
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const wordEl = wordRef.current;

    const flipToWord = (newIndex: number) => {
      const el = wordRef.current;
      if (!el) return;

      // 3D Flip Out
      gsap.to(el, {
        rotateX: -90,
        y: -24,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = FLIP_WORDS[newIndex].text;
          el.className = `inline-block font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${FLIP_WORDS[newIndex].gradient} will-change-transform`;
          el.style.filter = `drop-shadow(0 0 25px ${FLIP_WORDS[newIndex].glow})`;

          setWordIndex(newIndex);

          // 3D Flip In
          gsap.fromTo(
            el,
            {
              rotateX: 90,
              y: 24,
              opacity: 0,
              filter: "blur(6px)",
            },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.4,
              ease: "back.out(1.4)",
            }
          );
        },
      });
    };

    const counterObj = { value: 0 };
    const masterTl = gsap.timeline();

    // Initial entrance for "Plan," (Part of the synchronized timeline - exactly ONCE)
    if (wordEl) {
      masterTl.fromTo(
        wordEl,
        {
          rotateX: 90,
          y: 26,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        0
      );
    }

    // 1. Percentage counter animation (0 -> 100% over 2.3s)
    masterTl.to(
      counterObj,
      {
        value: 100,
        duration: 2.3,
        ease: "power1.inOut",
        onUpdate: () => {
          const current = Math.round(counterObj.value);
          setPercent(current);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${current}%`;
          }
        },
      },
      0
    );

    // 2. Synchronized 3D Word Flips:
    // Initial is "Plan," (at 0s). Then Design -> Build -> Automate.
    masterTl.call(() => flipToWord(1), [], 0.6); // -> Design,
    masterTl.call(() => flipToWord(2), [], 1.2); // -> Build,
    masterTl.call(() => flipToWord(3), [], 1.8); // -> Automate.

    // 3. Pause at 100%
    masterTl.to({}, { duration: 0.25 });

    // 4. Trigger Hero entrance animation
    masterTl.add(() => {
      window.dispatchEvent(new CustomEvent("preloader-opening"));
    });

    // Lift & fade center text
    masterTl.to(
      centerTextRef.current,
      {
        y: -35,
        opacity: 0,
        scale: 0.96,
        duration: 0.45,
        ease: "power3.in",
      },
      "+=0.04"
    );

    // Fade bottom-right counter
    masterTl.to(
      cornerLoaderRef.current,
      {
        y: 16,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      },
      "<"
    );

    // Split curtain panels (Top lifts up, Bottom slides down)
    masterTl.to(
      topPanelRef.current,
      {
        yPercent: -100,
        duration: 1.05,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    masterTl.to(
      bottomPanelRef.current,
      {
        yPercent: 100,
        duration: 1.05,
        ease: "power4.inOut",
      },
      "<"
    );

    // 5. Complete and cleanup
    masterTl.add(() => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.dispatchEvent(new CustomEvent("preloader-done"));
      setIsComplete(true);
    });

    return () => {
      masterTl.kill();
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      id="site-preloader"
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-transparent"
      aria-label="Site Loading"
    >
      {/* Top Split Shutter: Seamless solid background with no harsh seam shadows or cutoffs */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-[51%] bg-[#030305] overflow-hidden will-change-transform"
      >
        {/* Subtle Ambient Top Aurora Glow */}
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-600/[0.14] via-purple-600/[0.08] to-transparent blur-[140px] rounded-full pointer-events-none" />
      </div>

      {/* Bottom Split Shutter: Seamless solid background perfectly meeting top panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-[51%] bg-[#030305] overflow-hidden will-change-transform"
      >
        {/* Subtle Ambient Bottom Glow */}
        <div className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#ff6a00]/[0.10] via-purple-600/[0.06] to-transparent blur-[140px] rounded-full pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* CENTER: Perfectly Centered "We [Plan, / Design, / Build, / Automate.]"     */}
      {/* ========================================================================= */}
      <div
        ref={centerTextRef}
        className="absolute inset-0 z-30 flex items-center justify-center px-4 pointer-events-none"
      >
        {/* Dynamic Ambient Glow behind active word */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[250px] rounded-full pointer-events-none transition-all duration-700 blur-[85px] opacity-35"
          style={{
            background: FLIP_WORDS[wordIndex].glow,
          }}
        />

        <div className="relative z-10 flex items-center justify-center text-center font-sans">
          {/* Static Prefix "We" */}
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-zinc-400 mr-2.5 sm:mr-4 md:mr-5 select-none">
            We
          </span>

          {/* 3D Flip Word */}
          <div
            className="inline-block overflow-visible"
            style={{ perspective: 1000 }}
          >
            <span
              ref={wordRef}
              className={`inline-block font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${FLIP_WORDS[wordIndex].gradient} will-change-transform`}
              style={{
                transformStyle: "preserve-3d",
                filter: `drop-shadow(0 0 25px ${FLIP_WORDS[wordIndex].glow})`,
              }}
            >
              {FLIP_WORDS[wordIndex].text}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM-RIGHT CORNER: Loading Animation (% counter & progress line)        */}
      {/* ========================================================================= */}
      <div
        ref={cornerLoaderRef}
        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-12 md:right-12 z-40 flex flex-col items-end pointer-events-none will-change-transform"
      >
        {/* Percentage Counter */}
        <div className="flex items-baseline font-mono tabular-nums select-none leading-none">
          <span className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            {percent}
          </span>
          <span className="text-xl sm:text-3xl md:text-4xl font-bold text-[#ff6a00] ml-1 sm:ml-2">
            %
          </span>
        </div>

        {/* Micro Progress Track */}
        <div className="w-28 sm:w-40 md:w-48 h-[2.5px] bg-white/[0.1] rounded-full overflow-hidden mt-3 relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#ff6a00] via-[#a374ff] to-[#ff7520] rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(255,106,0,0.9)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Subtle Status Caption */}
        <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase mt-2.5 select-none">
          LOADING EXPERIENCE
        </div>
      </div>
    </div>
  );
}
