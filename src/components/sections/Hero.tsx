"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Headline word sets
const LINE_1_WORDS = ["Transform", "your", "Data", "into"];
const LINE_2_WORDS = ["Powerful", "and", "Smart", "Solutions"];

interface HeroProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCursorEnter, onCursorLeave }) => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shapeTiltRef = useRef<HTMLDivElement>(null);
  const shapeFloatRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      // =========================================================================
      // 1. SCROLL-DRIVEN PARALLAX TIMELINE
      // Handles upward exit on scroll down & reverse-reveal on scroll up
      // =========================================================================
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Text container gentle lift
      if (contentRef.current) {
        scrollTl.to(contentRef.current, { y: -80, ease: "none" }, 0);
      }

      // Headline words masked exit & blur
      scrollTl.to(
        ".hero-reveal-word",
        {
          yPercent: -130,
          opacity: 0,
          filter: "blur(10px)",
          rotateX: 30,
          stagger: { each: 0.035, from: "start" },
          ease: "power2.inOut",
          duration: 0.65,
        },
        0
      );

      // Subtitle lines exit
      scrollTl.to(
        ".hero-sub-line",
        {
          yPercent: -120,
          opacity: 0,
          filter: "blur(8px)",
          stagger: 0.05,
          ease: "power2.inOut",
          duration: 0.55,
        },
        0.04
      );

      // Badge & CTA exit
      scrollTl.to(
        ".hero-badge",
        {
          y: -30,
          opacity: 0,
          scale: 0.92,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 0.45,
        },
        0
      );

      scrollTl.to(
        ".hero-cta",
        {
          y: 28,
          opacity: 0,
          scale: 0.94,
          ease: "power2.inOut",
          duration: 0.45,
        },
        0.04
      );

      // Ambient Glow Parallax Drift
      if (glowRef.current) {
        scrollTl.to(
          glowRef.current,
          {
            y: 130,
            scale: 1.25,
            opacity: 0.45,
            ease: "none",
            duration: 1,
          },
          0
        );
      }

      // 3D Shape Parallax Drift
      scrollTl.to(
        ".hero-shape-parallax",
        {
          y: 175,
          scale: 1.08,
          ease: "none",
          duration: 1,
        },
        0
      );

      // =========================================================================
      // 2. INITIAL ENTRANCE INTRO ANIMATION
      // Plays cinematic reveal when at top; skips if already scrolled midway
      // =========================================================================
      const isAlreadyScrolled = window.scrollY > 30;
      const preloaderActive = typeof document !== "undefined" && !!document.getElementById("site-preloader");

      if (isAlreadyScrolled) {
        gsap.set(".hero-reveal-word", { yPercent: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" });
        gsap.set(".hero-badge", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
        gsap.set(".hero-sub-line", { yPercent: 0, opacity: 1, filter: "blur(0px)" });
        gsap.set(".hero-cta", { opacity: 1, y: 0, scale: 1 });
        gsap.set(".hero-shape-wrapper", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      } else {
        const introTl = gsap.timeline({
          paused: preloaderActive,
          defaults: { ease: "power4.out" },
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        });

        introTl
          // A. Badge Entrance
          .fromTo(
            ".hero-badge",
            { opacity: 0, y: -24, scale: 0.9, filter: "blur(8px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, delay: 0.1 }
          )
          // B. Headline Words 3D Reveal
          .fromTo(
            ".hero-reveal-word",
            {
              yPercent: 120,
              rotateX: -40,
              opacity: 0,
              filter: "blur(10px)",
              transformOrigin: "50% 100%",
            },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.15,
              stagger: 0.045,
              ease: "power4.out",
            },
            "-=0.6"
          )
          // C. Subtitle Lines Reveal
          .fromTo(
            ".hero-sub-line",
            { yPercent: 100, opacity: 0, filter: "blur(6px)" },
            { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.95, stagger: 0.08, ease: "power3.out" },
            "-=0.7"
          )
          // D. CTA Buttons Reveal
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 24, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" },
            "-=0.7"
          )
          // E. Hero 3D Shape Entrance
          .fromTo(
            ".hero-shape-wrapper",
            { opacity: 0, y: 60, scale: 1.18, filter: "blur(14px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
            "-=1.1"
          );

        if (preloaderActive) {
          const onOpening = () => {
            introTl.play();
          };
          window.addEventListener("preloader-opening", onOpening, { once: true });
        }

        // Fast-forward intro if user scrolls immediately
        const handleEarlyScroll = () => {
          if (introTl.isActive()) {
            introTl.progress(1);
          }
        };
        window.addEventListener("scroll", handleEarlyScroll, { passive: true, once: true });
      }

      // =========================================================================
      // 3. IDLE FLOATING ANIMATION (Organic 3D Breathing)
      // =========================================================================
      if (shapeFloatRef.current) {
        gsap.to(shapeFloatRef.current, {
          y: -10,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // =========================================================================
      // 4. INTERACTIVE 3D MOUSE PARALLAX (High-performance quickTo)
      // =========================================================================
      if (shapeTiltRef.current && glowRef.current && heroRef.current) {
        const tiltX = gsap.quickTo(shapeTiltRef.current, "x", { duration: 0.9, ease: "power3.out" });
        const tiltY = gsap.quickTo(shapeTiltRef.current, "y", { duration: 0.9, ease: "power3.out" });
        const rotX = gsap.quickTo(shapeTiltRef.current, "rotationX", { duration: 0.9, ease: "power3.out" });
        const rotY = gsap.quickTo(shapeTiltRef.current, "rotationY", { duration: 0.9, ease: "power3.out" });

        const glowX = gsap.quickTo(glowRef.current, "x", { duration: 1.3, ease: "power3.out" });
        const glowY = gsap.quickTo(glowRef.current, "y", { duration: 1.3, ease: "power3.out" });

        const onMouseMove = (e: MouseEvent) => {
          if (!heroRef.current) return;
          const rect = heroRef.current.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          tiltX(relX * 22);
          tiltY(relY * 18);
          rotX(-relY * 5);
          rotY(relX * 7);

          glowX(relX * 36);
          glowY(relY * 26);
        };

        const onMouseLeave = () => {
          tiltX(0);
          tiltY(0);
          rotX(0);
          rotY(0);
          glowX(0);
          glowY(0);
        };

        const heroEl = heroRef.current;
        heroEl.addEventListener("mousemove", onMouseMove);
        heroEl.addEventListener("mouseleave", onMouseLeave);

        return () => {
          heroEl.removeEventListener("mousemove", onMouseMove);
          heroEl.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#000000] pt-24 sm:pt-28 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background ambient radial gradients matching hero_shape colors */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(59,130,246,0.12),rgba(147,51,234,0.09),rgba(0,0,0,0)_80%)] pointer-events-none" />

      {/* Ambient background blur lights */}
      <div className="absolute top-[20%] left-[-10%] w-[550px] h-[450px] bg-blue-600/[0.08] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-600/[0.08] via-indigo-600/[0.11] to-purple-600/[0.09] blur-[135px] rounded-full pointer-events-none" />
      <div className="absolute top-[25%] right-[-10%] w-[550px] h-[450px] bg-purple-600/[0.08] blur-[140px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-4 sm:px-6 relative z-20 will-change-transform"
        onMouseEnter={onCursorEnter}
        onMouseLeave={onCursorLeave}
      >
        {/* Strategy Pill Badge */}
        <div className="hero-badge group relative inline-flex items-center gap-2 p-1 pr-4 rounded-full bg-[#18181b]/90 border border-white/10 backdrop-blur-xl mb-5 sm:mb-7 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#ff6a00] to-[#e85500] shadow-[0_0_14px_rgba(255,106,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.35)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Strategy
          </span>
          <span className="text-zinc-300 text-xs sm:text-sm font-medium tracking-wide">
            Business Growth
          </span>
        </div>

        {/* 2-Line Luxury Heading with Masked Word-Reveal */}
        <h1
          aria-label="Transform your Data into Powerful and Smart Solutions"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-semibold text-white tracking-[-0.035em] leading-[1.08] max-w-5xl select-text"
        >
          {/* Line 1 */}
          <span className="block overflow-hidden pb-1 sm:pb-2">
            <span className="flex flex-wrap justify-center items-center gap-x-[0.27em]">
              {LINE_1_WORDS.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-0.5">
                  <span
                    className={`hero-reveal-word inline-block will-change-transform transform-gpu ${
                      word === "Data"
                        ? "text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-indigo-200"
                        : "text-white"
                    }`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </span>

          {/* Line 2 */}
          <span className="block overflow-hidden pb-1 sm:pb-2">
            <span className="flex flex-wrap justify-center items-center gap-x-[0.27em]">
              {LINE_2_WORDS.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-0.5">
                  <span
                    className={`hero-reveal-word inline-block will-change-transform transform-gpu ${
                      word === "Powerful" || word === "Smart" || word === "Solutions"
                        ? "text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-300"
                        : "text-white"
                    }`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Subtitle with Masked Line Reveal */}
        <p className="mt-4 sm:mt-5 text-zinc-400 text-sm sm:text-base md:text-[1.05rem] font-normal max-w-xl leading-relaxed select-text">
          <span className="block overflow-hidden py-0.5">
            <span className="hero-sub-line inline-block will-change-transform">
              Discover insights, enhance choices, and grow your business
            </span>
          </span>
          <span className="block overflow-hidden py-0.5">
            <span className="hero-sub-line inline-block will-change-transform">
              using advanced data-driven innovations.
            </span>
          </span>
        </p>

        {/* Luxury CTA Buttons */}
        <div className="hero-cta flex items-center justify-center gap-3.5 sm:gap-4 mt-6 sm:mt-7 will-change-transform">
          <Link href="/contact" className="focus:outline-none">
            <button className="group relative px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-[#ff7520] via-[#f75200] to-[#cb3c00] shadow-[0_0_26px_rgba(247,82,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_36px_rgba(247,82,0,0.8)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 border border-orange-400/40 cursor-pointer overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            </button>
          </Link>
          <Link href="/services" className="focus:outline-none">
            <button className="group px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-100 shadow-[0_2px_14px_rgba(255,255,255,0.14)] hover:shadow-[0_4px_22px_rgba(255,255,255,0.25)] active:scale-[0.98] transition-all duration-300 cursor-pointer">
              See Features
            </button>
          </Link>
        </div>
      </div>

      {/* === 3D Hero Shape with GSAP Scroll Parallax & Organic Float === */}
      <div className="hero-shape-wrapper relative w-full flex items-end justify-center pointer-events-none mt-auto overflow-hidden will-change-transform">
        {/* Ambient glow matching the 3D shape gradient */}
        <div
          ref={glowRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[320px] bg-gradient-to-r from-blue-600/30 via-purple-600/35 to-pink-500/30 blur-[130px] rounded-full pointer-events-none will-change-transform"
        />

        {/* Parallax Container driven by GSAP ScrollTrigger */}
        <div className="hero-shape-parallax w-full flex items-end justify-center will-change-transform">
          {/* Idle breathing float */}
          <div
            ref={shapeFloatRef}
            className="w-full flex items-end justify-center will-change-transform"
          >
            {/* Interactive 3D mouse tilt */}
            <div
              ref={shapeTiltRef}
              className="w-full flex items-end justify-center will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/elements/hero_shape.png"
                alt="Hero 3D Shape"
                width={2905}
                height={1119}
                priority
                className="w-[130vw] min-w-[1300px] max-w-none h-auto object-contain object-bottom select-none pointer-events-none scale-125 sm:scale-135 md:scale-140 lg:scale-145 translate-y-[12%] sm:translate-y-[15%] md:translate-y-[32%] drop-shadow-[0_-15px_45px_rgba(0,0,0,0.65)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
