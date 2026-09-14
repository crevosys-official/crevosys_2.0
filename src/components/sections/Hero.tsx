"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  onCursorEnter?: () => void;
  onCursorLeave?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCursorEnter, onCursorLeave }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const shapeWrapperRef = useRef<HTMLDivElement>(null);
  const shapeParallaxRef = useRef<HTMLDivElement>(null);
  const shapeTiltRef = useRef<HTMLDivElement>(null);
  const shapeFloatRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const line1Words = ["Transform", "your", "Data", "into"];
  const line2Words = ["Powerful", "and", "Smart", "Solutions"];

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. MASTER TIMELINE: Luxury Intro & Text Reveal Animation
      // -------------------------------------------------------------
      const introTl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // A. Badge Entrance
      if (badgeRef.current) {
        introTl.fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: -24,
            scale: 0.9,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            delay: 0.1,
          }
        );
      }

      // B. Headline Words Reveal (Masked 3D Slide & Blur Clear)
      introTl.fromTo(
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
      );

      // C. Subtitle Lines Reveal
      if (subtitleRef.current) {
        introTl.fromTo(
          subtitleRef.current.querySelectorAll(".hero-sub-line"),
          {
            yPercent: 100,
            opacity: 0,
            filter: "blur(6px)",
          },
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.7"
        );
      }

      // D. CTA Buttons Reveal
      if (ctaRef.current) {
        introTl.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 24,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.7"
        );
      }

      // E. Hero 3D Shape Dramatic Entrance
      if (shapeWrapperRef.current) {
        introTl.fromTo(
          shapeWrapperRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 1.18,
            filter: "blur(14px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1.1"
        );
      }

      // -------------------------------------------------------------
      // 2. IDLE FLOATING ANIMATION (Organic Breathing 3D Life)
      // -------------------------------------------------------------
      if (shapeFloatRef.current) {
        gsap.to(shapeFloatRef.current, {
          y: -10,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // -------------------------------------------------------------
      // 3. SCROLL PARALLAX EFFECT WITH hero_shape.png (ScrollTrigger)
      // -------------------------------------------------------------
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // A. Text Content floats upward and gracefully fades
      if (contentRef.current) {
        scrollTl.to(
          contentRef.current,
          {
            y: -110,
            opacity: 0.12,
            scale: 0.96,
            ease: "none",
          },
          0
        );
      }

      // B. Ambient Glow moves and expands
      if (glowRef.current) {
        scrollTl.to(
          glowRef.current,
          {
            y: 110,
            scale: 1.2,
            opacity: 0.45,
            ease: "none",
          },
          0
        );
      }

      // C. hero_shape.png deep weighted parallax (descends with scale depth)
      if (shapeParallaxRef.current) {
        scrollTl.to(
          shapeParallaxRef.current,
          {
            y: 160,
            scale: 1.07,
            ease: "none",
          },
          0
        );
      }

      // -------------------------------------------------------------
      // 4. INTERACTIVE 3D MOUSE PARALLAX (Buttery smooth quickTo)
      // -------------------------------------------------------------
      if (shapeTiltRef.current && glowRef.current && sectionRef.current) {
        const tiltX = gsap.quickTo(shapeTiltRef.current, "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const tiltY = gsap.quickTo(shapeTiltRef.current, "y", {
          duration: 0.9,
          ease: "power3.out",
        });
        const rotX = gsap.quickTo(shapeTiltRef.current, "rotationX", {
          duration: 0.9,
          ease: "power3.out",
        });
        const rotY = gsap.quickTo(shapeTiltRef.current, "rotationY", {
          duration: 0.9,
          ease: "power3.out",
        });

        const glowMoveX = gsap.quickTo(glowRef.current, "x", {
          duration: 1.3,
          ease: "power3.out",
        });
        const glowMoveY = gsap.quickTo(glowRef.current, "y", {
          duration: 1.3,
          ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          tiltX(relX * 22);
          tiltY(relY * 18);
          rotX(-relY * 5);
          rotY(relX * 7);

          glowMoveX(relX * 36);
          glowMoveY(relY * 26);
        };

        const handleMouseLeave = () => {
          tiltX(0);
          tiltY(0);
          rotX(0);
          rotY(0);
          glowMoveX(0);
          glowMoveY(0);
        };

        const currentSection = sectionRef.current;
        currentSection.addEventListener("mousemove", handleMouseMove);
        currentSection.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          currentSection.removeEventListener("mousemove", handleMouseMove);
          currentSection.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, sectionRef);

    // Refresh ScrollTrigger after paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#000000] pt-24 sm:pt-28 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Background ambient radial gradients matching hero_shape colors (blue, indigo, purple) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_-10%,rgba(59,130,246,0.12),rgba(147,51,234,0.09),rgba(0,0,0,0)_80%)] pointer-events-none" />

      {/* Left side subtle blue glow */}
      <div className="absolute top-[20%] left-[-10%] w-[550px] h-[450px] bg-blue-600/[0.08] blur-[140px] rounded-full pointer-events-none" />

      {/* Center heading indigo/purple aura */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-600/[0.08] via-indigo-600/[0.11] to-purple-600/[0.09] blur-[135px] rounded-full pointer-events-none" />

      {/* Right side subtle purple/pink glow */}
      <div className="absolute top-[25%] right-[-10%] w-[550px] h-[450px] bg-purple-600/[0.08] blur-[140px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="w-full max-w-5xl mx-auto flex flex-col items-center text-center px-4 sm:px-6 relative z-20 will-change-transform"
        onMouseEnter={onCursorEnter}
        onMouseLeave={onCursorLeave}
      >
        {/* Strategy Pill Badge */}
        <div
          ref={badgeRef}
          className="group relative inline-flex items-center gap-2 p-1 pr-4 rounded-full bg-[#18181b]/90 border border-white/10 backdrop-blur-xl mb-5 sm:mb-7 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* Subtle badge shimmer highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <span className="relative flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-gradient-to-r from-[#ff6a00] to-[#e85500] shadow-[0_0_14px_rgba(255,106,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.35)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Strategy
          </span>
          <span className="text-zinc-300 text-xs sm:text-sm font-medium tracking-wide">
            Business Growth
          </span>
        </div>

        {/* 2-line Luxury Heading with Masked Word-Reveal */}
        <h1
          aria-label="Transform your Data into Powerful and Smart Solutions"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-semibold text-white tracking-[-0.035em] leading-[1.08] max-w-5xl select-text"
        >
          {/* Line 1 */}
          <span className="block overflow-hidden pb-1 sm:pb-2">
            <span className="flex flex-wrap justify-center items-center gap-x-[0.27em]">
              {line1Words.map((word, i) => (
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
              {line2Words.map((word, i) => (
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
        <p
          ref={subtitleRef}
          className="mt-4 sm:mt-5 text-zinc-400 text-sm sm:text-base md:text-[1.05rem] font-normal max-w-xl leading-relaxed select-text"
        >
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
        <div
          ref={ctaRef}
          className="flex items-center justify-center gap-3.5 sm:gap-4 mt-6 sm:mt-7 will-change-transform"
        >
          <Link href="/contact" className="focus:outline-none">
            <button className="group relative px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-[#ff7520] via-[#f75200] to-[#cb3c00] shadow-[0_0_26px_rgba(247,82,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_36px_rgba(247,82,0,0.8)] hover:brightness-110 active:scale-[0.98] transition-all duration-300 border border-orange-400/40 cursor-pointer overflow-hidden">
              <span className="relative z-10">Get Started</span>
              {/* Luxury sheen sweep on hover */}
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
      <div
        ref={shapeWrapperRef}
        className="relative w-full flex items-end justify-center pointer-events-none mt-auto overflow-hidden will-change-transform"
      >
        {/* Ambient glow matching the 3D shape gradient with Parallax */}
        <div
          ref={glowRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[320px] bg-gradient-to-r from-blue-600/30 via-purple-600/35 to-pink-500/30 blur-[130px] rounded-full pointer-events-none will-change-transform"
        />

        {/* Parallax Container driven by GSAP ScrollTrigger */}
        <div
          ref={shapeParallaxRef}
          className="w-full flex items-end justify-center will-change-transform"
        >
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
