"use client";

import React, { useRef, useLayoutEffect, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  education?: string;
  image: string;
}

interface TeamSquadSectionProps {
  title?: string;
  members?: TeamMember[];
}

export const CREVOSYS_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "MD ABU SAHID",
    role: "CEO • MERN Stack Developer & UI/UX Designer",
    education: "Metropolitan University, Sylhet",
    image: "/Team/sahid_withoutGlow.png",
  },
  {
    id: 2,
    name: "JOYANT SHEIKHAR",
    role: "CTO • Software Developer",
    education: "Metropolitan University, Sylhet",
    image: "/Team/joyant_withoutGlow.png",
  },
  
  {
    id: 4,
    name: "ABID SHAHRIAR",
    role: "COO • Web Developer",
    education: "Metropolitan University, Sylhet",
    image: "/Team/abid_withoutGlow.png",
  },
];

export const DEFAULT_MEMBERS: TeamMember[] = CREVOSYS_MEMBERS;


export default function TeamSquadSection({
  title = "THE SQUAD",
  members = DEFAULT_MEMBERS,
}: TeamSquadSectionProps) {
  const [squad, setSquad] = useState<TeamMember[]>(members);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/teams?active=true&leadership=true")
      .then((res) => res.json())
      .then((resData) => {
        const data = Array.isArray(resData) ? resData : resData?.data;
        if (Array.isArray(data) && data.length > 0) {
          setSquad(
            data.map((m: any) => ({
              id: m._id || m.id,
              name: m.name,
              role: m.role || `${m.designation} • ${m.position}`,
              education: m.education || "Metropolitan University, Sylhet",
              image: m.picture,
            }))
          );
        }
      })
      .catch((err) => console.error("Failed to load squad from MongoDB:", err));
  }, []);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const currentIndexRef = useRef<number | "default">("default");

  // Calculate card sizes with enlarged dimensions
  const getCardSizes = useCallback(() => {
    if (typeof window === "undefined") return { defaultSize: 116, expandedSize: 224 };
    const width = window.innerWidth;
    if (width <= 768) return { defaultSize: 64, expandedSize: 128 };
    if (width <= 1024) return { defaultSize: 88, expandedSize: 176 };
    return { defaultSize: 116, expandedSize: 224 };
  }, []);

  const getStaggerOrigin = (cardIdx: number | "default", total: number): "start" | "center" | "end" => {
    if (typeof cardIdx !== "number") return "center";
    const ratio = cardIdx / (total - 1);
    if (ratio <= 0.3) return "start";
    if (ratio >= 0.7) return "end";
    return "center";
  };

  // Switch between cards without React state re-render collision
  const activateMember = (newIndex: number) => {
    if (currentIndexRef.current === newIndex) return;

    const prevIndex = currentIndexRef.current;
    const { defaultSize, expandedSize } = getCardSizes();
    const staggerOrigin = getStaggerOrigin(newIndex, squad.length);

    // 1. Animate Out Previous Text immediately
    const prevSlideEl = slideRefs.current.get(prevIndex);
    if (prevSlideEl) {
      gsap.killTweensOf(prevSlideEl);
      const prevChars = prevSlideEl.querySelectorAll(".kinetic-char");
      const prevInfo = prevSlideEl.querySelector(".member-info");

      gsap.killTweensOf(prevChars);
      gsap.to(prevChars, {
        y: "-120%",
        rotateX: -65,
        opacity: 0,
        filter: "blur(3px)",
        duration: 0.28,
        ease: "power2.inOut",
        stagger: { amount: 0.07, from: staggerOrigin },
        overwrite: "auto",
        onComplete: () => {
          gsap.set(prevSlideEl, { visibility: "hidden" });
        },
      });

      if (prevInfo) {
        gsap.killTweensOf(prevInfo);
        gsap.to(prevInfo, {
          opacity: 0,
          y: -8,
          duration: 0.2,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    }

    // Reset Previous Card Size smoothly
    if (typeof prevIndex === "number" && cardRefs.current[prevIndex]) {
      const prevCard = cardRefs.current[prevIndex];
      prevCard?.classList.remove("is-active");
      gsap.to(prevCard, {
        width: defaultSize,
        height: defaultSize,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // 2. Expand New Card promptly
    const targetCard = cardRefs.current[newIndex];
    if (targetCard) {
      targetCard.classList.add("is-active");
      gsap.to(targetCard, {
        width: expandedSize,
        height: expandedSize,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // 3. Animate In New Name Characters with 3D Depth & Kinetic Feel
    const targetSlideEl = slideRefs.current.get(newIndex);
    if (targetSlideEl) {
      gsap.killTweensOf(targetSlideEl);
      gsap.set(targetSlideEl, { visibility: "visible" });
      const newChars = targetSlideEl.querySelectorAll(".kinetic-char");
      const newInfo = targetSlideEl.querySelector(".member-info");

      gsap.killTweensOf(newChars);
      gsap.fromTo(
        newChars,
        {
          y: "120%",
          rotateX: 65,
          rotateY: (i: number) => {
            const mid = (newChars.length - 1) / 2;
            return (i - mid) * 2;
          },
          opacity: 0,
          filter: "blur(3px)",
        },
        {
          y: "0%",
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.48,
          ease: "power3.out",
          stagger: { amount: 0.1, from: staggerOrigin },
          overwrite: "auto",
        }
      );

      if (newInfo) {
        gsap.killTweensOf(newInfo);
        gsap.fromTo(
          newInfo,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.08, overwrite: "auto" }
        );
      }
    }

    currentIndexRef.current = newIndex;
  };

  // Reset back to "THE SQUAD" (fast, smooth & responsive)
  const resetDefault = () => {
    if (currentIndexRef.current === "default") return;

    const prevIndex = currentIndexRef.current;
    const { defaultSize } = getCardSizes();

    // Shrink active card
    if (typeof prevIndex === "number" && cardRefs.current[prevIndex]) {
      const prevCard = cardRefs.current[prevIndex];
      prevCard?.classList.remove("is-active");
      gsap.to(prevCard, {
        width: defaultSize,
        height: defaultSize,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // Animate out active name characters downwards (fast & clean)
    const prevSlideEl = slideRefs.current.get(prevIndex);
    if (prevSlideEl) {
      gsap.killTweensOf(prevSlideEl);
      const prevChars = prevSlideEl.querySelectorAll(".kinetic-char");
      const prevInfo = prevSlideEl.querySelector(".member-info");

      gsap.killTweensOf(prevChars);
      gsap.to(prevChars, {
        y: "120%",
        rotateX: 65,
        opacity: 0,
        filter: "blur(3px)",
        duration: 0.24,
        ease: "power2.inOut",
        stagger: { amount: 0.06, from: "center" },
        overwrite: "auto",
        onComplete: () => {
          gsap.set(prevSlideEl, { visibility: "hidden" });
        },
      });

      if (prevInfo) {
        gsap.killTweensOf(prevInfo);
        gsap.to(prevInfo, {
          opacity: 0,
          y: 8,
          duration: 0.18,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    }

    // Reveal "THE SQUAD" promptly (descends down into place)
    const defaultSlideEl = slideRefs.current.get("default");
    if (defaultSlideEl) {
      gsap.killTweensOf(defaultSlideEl);
      gsap.set(defaultSlideEl, { visibility: "visible" });
      const defChars = defaultSlideEl.querySelectorAll(".kinetic-char");

      gsap.killTweensOf(defChars);
      gsap.fromTo(
        defChars,
        {
          y: "-120%",
          rotateX: -65,
          opacity: 0,
          filter: "blur(3px)",
        },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.42,
          ease: "power3.out",
          stagger: { amount: 0.08, from: "center" },
          overwrite: "auto",
        }
      );
    }

    currentIndexRef.current = "default";
  };

  // Initial Entrance Animation
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const { defaultSize } = getCardSizes();

      // Entrance animation for cards
      gsap.from(cardRefs.current, {
        scale: 0.3,
        opacity: 0,
        y: 20,
        duration: 0.85,
        stagger: 0.05,
        ease: "back.out(1.8)",
        delay: 0.1,
      });

      // Initialize default slide: "THE SQUAD"
      const defaultSlide = slideRefs.current.get("default");
      if (defaultSlide) {
        gsap.set(defaultSlide, { visibility: "visible" });
        const chars = defaultSlide.querySelectorAll(".kinetic-char");
        gsap.from(chars, {
          y: "140%",
          rotateX: 85,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          stagger: { amount: 0.28, from: "center" },
          ease: "power4.out",
          delay: 0.25,
        });
      }

      // Hide all member slides initially
      squad.forEach((_, idx) => {
        const slide = slideRefs.current.get(idx);
        if (slide) {
          gsap.set(slide, { visibility: "hidden" });
          const chars = slide.querySelectorAll(".kinetic-char");
          gsap.set(chars, { y: "130%", rotateX: 75, opacity: 0, filter: "blur(8px)" });
          const info = slide.querySelector(".member-info");
          if (info) gsap.set(info, { opacity: 0, y: 16 });
        }
      });

      // Window resize handling
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const { defaultSize: dSize, expandedSize: eSize } = getCardSizes();
          cardRefs.current.forEach((card, idx) => {
            if (!card) return;
            const isCurrent = idx === currentIndexRef.current;
            gsap.to(card, {
              width: isCurrent ? eSize : dSize,
              height: isCurrent ? eSize : dSize,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }, 120);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [squad, getCardSizes]);

  // Split string into 3D masked character boxes
  const renderSplitChars = (text: string) => {
    const words = text.split(" ");
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="inline-flex whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span
            key={charIndex}
            className="inline-block overflow-hidden align-top leading-[0.95] px-[0.01em] [perspective:900px] [transform-style:preserve-3d]"
          >
            <span className="kinetic-char inline-block will-change-[transform,opacity,filter] origin-[50%_100%] [transform-style:preserve-3d]">
              {char}
            </span>
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span className="inline-block w-[0.28em]">&nbsp;</span>
        )}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={resetDefault}
      className="relative flex min-h-[520px] sm:min-h-[600px] md:min-h-[660px] w-full flex-col items-center justify-center overflow-hidden py-10 sm:py-16 select-none bg-transparent"
    >
      {/* Top Cards Row */}
      <div
        onMouseLeave={resetDefault}
        className="relative z-10 mb-8 sm:mb-12 flex items-center justify-center gap-2.5 sm:gap-3.5 md:gap-4.5 px-4 py-2"
      >
        {squad.map((member, index) => (
          <div
            key={member.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            onMouseEnter={() => activateMember(index)}
            onClick={() => activateMember(index)}
            className="squad-profile-card group relative h-[64px] w-[64px] sm:h-[88px] sm:w-[88px] md:h-[116px] md:w-[116px] shrink-0 cursor-pointer overflow-hidden rounded-[14px] sm:rounded-[18px] md:rounded-[22px] bg-[#1a1a1a] shadow-[0_6px_20px_rgba(0,0,0,0.5)] will-change-[width,height] transition-shadow duration-300 [&.is-active]:shadow-[0_16px_40px_rgba(0,0,0,0.85)]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 176px, 224px"
                className="object-cover object-top pointer-events-none transform scale-100 transition-transform duration-600 ease-out group-[.is-active]:scale-110"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Massive Kinetic Typography Display */}
      <div className="relative flex h-[140px] sm:h-[180px] md:h-[220px] lg:h-[250px] w-full max-w-[1500px] items-center justify-center overflow-hidden text-center px-4">
        {/* Default Slide: "THE SQUAD" (Clean, bold, standalone) */}
        <div
          ref={(el) => {
            if (el) slideRefs.current.set("default", el);
            else slideRefs.current.delete("default");
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h1 className="flex items-center justify-center font-anton font-normal uppercase tracking-tight text-[#e2e3de] [perspective:1200px] text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.95] m-0 whitespace-nowrap">
            {renderSplitChars(title)}
          </h1>
        </div>

        {/* Dynamic Member Slides */}
        {squad.map((member, index) => (
          <div
            key={member.id}
            ref={(el) => {
              if (el) slideRefs.current.set(index, el);
              else slideRefs.current.delete(index);
            }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4"
          >
            <h2 className="flex flex-wrap items-center justify-center font-anton font-normal uppercase tracking-tight text-[#e2e3de] [perspective:1200px] text-3xl sm:text-5xl md:text-7xl lg:text-[7.5rem] xl:text-[9rem] leading-[0.95] m-0">
              {renderSplitChars(member.name)}
            </h2>

            {/* Member designation & education sub-line (Uses application font Inter Tight) */}
            <div className="member-info mt-3 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-primary tracking-wide text-[#9ea3af]">
              <span className="font-semibold text-[#cfd3dc]">{member.role}</span>
              {member.education && (
                <>
                  <span className="hidden sm:inline opacity-30 text-[11px]">•</span>
                  <div className="inline-flex items-center gap-1.5 font-medium text-[#a8adb9]">
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#e2e3de] opacity-80 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>{member.education}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
