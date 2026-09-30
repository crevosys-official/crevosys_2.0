"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IntegrationItem {
  id: string;
  name: string;
  icon: string;
  category?: string;
  isWhite?: boolean;
}

const INTEGRATION_ITEMS: IntegrationItem[] = [
  { id: "item-1", name: "Flutter", icon: "/icons/Flutter-Dark.svg", category: "Mobile" },
  { id: "item-2", name: "Firebase", icon: "/icons/Firebase-Dark.svg", category: "Backend" },
  { id: "item-3", name: "MongoDB", icon: "/icons/MongoDB.svg", category: "Database" },
  { id: "item-4", name: "Tailwind CSS", icon: "/icons/TailwindCSS-Dark.svg", category: "Styling" },
  { id: "item-5", name: "TypeScript", icon: "/icons/TypeScript.svg", category: "Language" },
  { id: "item-6", name: "React", icon: "/icons/React-Dark.svg", category: "Frontend" },
  { id: "item-7", name: "Next.js", icon: "/icons/NextJS-Dark.svg", category: "Framework" },
  { id: "item-8", name: "Node.js", icon: "/icons/NodeJS-Dark.svg", category: "Runtime" },
  { id: "item-9", name: "Figma", icon: "/icons/Figma-Dark.svg", category: "Design" },
  { id: "item-10", name: "Supabase", icon: "/icons/Supabase-Dark.svg", category: "Backend" },
  { id: "item-11", name: "GitHub", icon: "/icons/Github-Dark.svg", category: "DevOps" },
  { id: "item-12", name: "Express.js", icon: "/icons/ExpressJS-Dark.svg", category: "API" },
  { id: "item-13", name: "Redux", icon: "/icons/Redux.svg", category: "State" },
  { id: "item-14", name: "VS Code", icon: "/icons/VSCode-Dark.svg", category: "Editor" },
  { id: "item-15", name: "Android Studio", icon: "/icons/AndroidStudio-Dark.svg", category: "Mobile IDE" },
  { id: "item-16", name: "HTML5", icon: "/icons/HTML.svg", category: "Web" },
  { id: "item-17", name: "CSS3", icon: "/icons/CSS.svg", category: "Styling" },
  { id: "item-18", name: "Bootstrap", icon: "/icons/Bootstrap.svg", category: "UI Kit" },
  { id: "item-19", name: "Blender", icon: "/icons/Blender-Dark.svg", category: "3D Graphics" },
  { id: "item-20", name: "Photoshop", icon: "/icons/Photoshop.svg", category: "Design" },
  { id: "item-21", name: "Illustrator", icon: "/icons/Illustrator.svg", category: "Vector" },
  { id: "item-22", name: "Clerk", icon: "/icons/clerk.png", category: "Auth" },
];

const TOTAL_ITEMS = INTEGRATION_ITEMS.length; // 22
const ANGLE_STEP = 360 / TOTAL_ITEMS; // ~16.3636°
const START_ANGLE = 8; // Angle of badge 0, placing badge 10 at ~171.6° and badge 5 at ~89.8°

// Normalizes angle into [-90, 270) so the upper semicircle [-15, 195] is continuous without seam jumps
function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a < -90) a += 360;
  if (a > 270) a -= 360;
  return a;
}

// Calculate smooth fade at the reveal (left) and ending (right) sides
function getAngleFade(theta: number) {
  if (theta < -12 || theta > 192) {
    return { opacity: 0, scale: 0.6, visible: false };
  }

  let opacity = 1;
  let scale = 1;

  if (theta > 142) {
    // Reveal side fade: angle goes from 185 down to 142
    const t = Math.max(0, Math.min(1, (185 - theta) / 43));
    opacity = t;
    scale = 0.65 + 0.35 * t;
  } else if (theta < 38) {
    // Ending side fade: angle goes from 38 down to -5
    const t = Math.max(0, Math.min(1, (theta - (-5)) / 43));
    opacity = t;
    scale = 0.65 + 0.35 * t;
  }

  return { opacity, scale, visible: true };
}

// Precomputed static clip paths for the left & right curved liquid glass lenses
const LEFT_GLASS_CLIP_PATH =
  "M 0.0991 0.4471 A 0.4870 0.9740 0 0 1 0.2595 0.1530 A 0.0220 0.0440 0 0 1 0.2889 0.1714 L 0.3343 0.3496 A 0.0220 0.0440 0 0 1 0.3250 0.4100 A 0.3430 0.6860 0 0 0 0.2214 0.5999 A 0.0220 0.0440 0 0 1 0.1905 0.6132 L 0.1057 0.5072 A 0.0220 0.0440 0 0 1 0.0991 0.4471 Z";

const RIGHT_GLASS_CLIP_PATH =
  "M 0.7903 0.2179 A 0.4870 0.9740 0 0 1 0.9316 0.5489 A 0.0220 0.0440 0 0 1 0.9214 0.6070 L 0.8308 0.6915 A 0.0220 0.0440 0 0 1 0.8009 0.6708 A 0.3430 0.6860 0 0 0 0.7096 0.4570 A 0.0220 0.0440 0 0 1 0.7041 0.3948 L 0.7600 0.2290 A 0.0220 0.0440 0 0 1 0.7903 0.2179 Z";

interface TechBadgeProps {
  item: IntegrationItem;
  index: number;
  totalCount: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (name: string | null) => void;
  onSelect: (item: IntegrationItem) => void;
  innerRef: (el: HTMLDivElement | null) => void;
}

function TechBadge({
  item,
  index,
  totalCount,
  isHovered,
  isSelected,
  onHover,
  onSelect,
  innerRef,
}: TechBadgeProps) {
  // Initial position at rotation = 0 calculated dynamically from totalCount
  const step = 360 / Math.max(totalCount, 1);
  const initialBaseAngle = START_ANGLE + index * step;
  const initialTheta = normalizeAngle(initialBaseAngle);
  const initialFade = getAngleFade(initialTheta);

  const rad = (initialTheta * Math.PI) / 180;
  const initialLeftPct = 50 + 41.5 * Math.cos(rad);
  const initialTopPct = 100 - 83 * Math.sin(rad);

  return (
    <div
      ref={innerRef}
      style={{
        left: `${initialLeftPct}%`,
        top: `${initialTopPct}%`,
        opacity: initialFade.opacity,
        visibility: initialFade.visible ? "visible" : "hidden",
        transform: `translate(-50%, -50%) scale(${initialFade.scale})`,
      }}
      className="absolute pointer-events-auto z-20 group cursor-pointer"
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
    >
      <div className="badge-reveal-wrapper">
        <motion.div
          whileHover={{ scale: 1.18, y: -4 }}
          whileTap={{ scale: 0.95 }}
          animate={isSelected ? { scale: 1.15, y: -3 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`relative w-9 h-9 sm:w-11 sm:h-11 md:w-15 md:h-15 lg:w-[68px] lg:h-[68px] rounded-full flex items-center justify-center transition-all ${
            item.isWhite
              ? "bg-white text-zinc-900 shadow-[0_4px_24px_rgba(255,255,255,0.45)]"
              : isSelected
              ? "bg-[#1f1936] border-2 border-purple-400 text-zinc-100 shadow-[0_0_25px_rgba(168,85,247,0.7)] backdrop-blur-sm"
              : "bg-[#161226]/90 border border-white/20 text-zinc-100 shadow-[0_6px_20px_rgba(0,0,0,0.65)] hover:border-purple-400/70 hover:shadow-[0_0_25px_rgba(168,85,247,0.45)] backdrop-blur-sm"
          }`}
        >
          <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center">
            <Image
              src={item.icon}
              alt={item.name}
              width={38}
              height={38}
              className="w-full h-full object-contain rounded-md"
            />
          </div>

          {/* Hover / Active ring */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
              isSelected
                ? "border-2 border-purple-400 scale-110"
                : "border border-purple-400/0 group-hover:border-purple-400/60 group-hover:scale-125"
            }`}
          />
        </motion.div>

        {/* Desktop Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: -6, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-zinc-900/95 border border-purple-500/30 text-[11px] font-medium text-purple-200 whitespace-nowrap shadow-xl backdrop-blur-md pointer-events-none z-40"
            >
              {item.name}
              {item.category && (
                <span className="text-zinc-400 text-[10px] ml-1.5 font-normal">
                  ({item.category})
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CurvedGlassOverlay({
  clipId,
  direction = "br",
}: {
  clipId: string;
  direction?: "br" | "bl";
}) {
  const gradient =
    direction === "br"
      ? "bg-gradient-to-br from-purple-400/10 via-purple-600/12 to-indigo-800/14"
      : "bg-gradient-to-bl from-purple-400/10 via-purple-600/12 to-indigo-800/14";

  return (
    <div
      style={{ clipPath: `url(#${clipId})` }}
      className={`absolute inset-0 backdrop-blur-[2px] backdrop-saturate-[125%] ${gradient} pointer-events-none`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function Integrations() {
  const [items, setItems] = useState<IntegrationItem[]>(INTEGRATION_ITEMS);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<IntegrationItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const glowLineRef = useRef<SVGPathElement>(null);
  const dashedLineRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemsRef = useRef<IntegrationItem[]>(INTEGRATION_ITEMS);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    fetch("/api/tools?active=true")
      .then((res) => res.json())
      .then((resData) => {
        const loaded = Array.isArray(resData) ? resData : resData?.data;
        if (Array.isArray(loaded) && loaded.length > 0) {
          const mapped: IntegrationItem[] = loaded.map((t: any) => ({
            id: t._id || t.id,
            name: t.name,
            icon: t.icon,
            category: t.category,
            isWhite: t.isWhite,
          }));
          setItems(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch tools from MongoDB, using defaults:", err);
      });
  }, []);

  const rotationRef = useRef(0);
  const speedRef = useRef({ value: 0 }); // Starts at 0 until scroll entrance finishes
  const isHoveredRef = useRef(false);

  // Handle smooth pause / resume on hover
  const handleBadgeHover = (name: string | null) => {
    setHoveredItem(name);
    // Only alter speed from hover if user hasn't explicitly selected/paused an item
    if (!selectedItem) {
      isHoveredRef.current = !!name;
      gsap.to(speedRef.current, {
        value: name ? 0 : 1,
        duration: name ? 0.35 : 0.6,
        ease: "power2.out",
      });
    }
  };

  // Handle tap / click on a badge for mobile touch support
  const handleBadgeSelect = (item: IntegrationItem | null) => {
    if (!item || selectedItem?.id === item.id) {
      setSelectedItem(null);
      setIsPaused(false);
      isHoveredRef.current = false;
      gsap.to(speedRef.current, {
        value: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      setSelectedItem(item);
      setIsPaused(true);
      isHoveredRef.current = true;
      gsap.to(speedRef.current, {
        value: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Ordered visible badges from left side down (index 10, ~171.6°) to right side down (index 0, ~8°)
      const leftToRightIndices = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
      const revealWrappers = leftToRightIndices
        .map((idx) => badgeRefs.current[idx]?.querySelector(".badge-reveal-wrapper"))
        .filter(Boolean);

      // Pre-set initial hidden state for entrance reveal
      gsap.set(revealWrappers, {
        opacity: 0,
        scale: 0.3,
        y: 24,
      });

      const textTargets = [mobileHeaderRef.current, contentRef.current].filter(Boolean);
      if (textTargets.length > 0) {
        gsap.set(textTargets, {
          opacity: 0,
          y: 28,
        });
      }

      // Entrance timeline triggered on scroll enter - snappy & responsive
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // 1. Text headers lift & reveal
      if (textTargets.length > 0) {
        entranceTl.to(
          textTargets,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          0
        );
      }

      // 2. Glowing orbital beam draws from left side down line to right side down line
      if (glowLineRef.current) {
        entranceTl.fromTo(
          glowLineRef.current,
          { strokeDashoffset: 1304, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.9, duration: 0.7, ease: "power2.out" },
          0.05
        );
        entranceTl.to(
          glowLineRef.current,
          { opacity: 0.15, duration: 0.45, ease: "power2.out" },
          0.6
        );
      }

      // 3. Reveal icons sequentially from left side down line across to right side down line
      entranceTl.to(
        revealWrappers,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.45,
          ease: "back.out(1.5)",
        },
        0.1
      );

      // 4. Smoothly start spinning like an orbital wheel once revealed
      entranceTl.to(
        speedRef.current,
        {
          value: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.1"
      );

      // Continuous orbital rotation ticker
      const ORBIT_SPEED = 0.18; // smooth, steady orbital rotation (degrees per frame)

      const tickerCallback = (_time: number, deltaTime: number) => {
        if (speedRef.current.value <= 0.0001) return;

        // Frame-rate independent delta adjustment
        const deltaFactor = Math.min(deltaTime / (1000 / 60), 2.5);
        rotationRef.current += ORBIT_SPEED * speedRef.current.value * deltaFactor;

        const rot = rotationRef.current;

        // Move dashed track line in sync with orbital wheel
        if (dashedLineRef.current) {
          dashedLineRef.current.style.strokeDashoffset = `${-rot * 3.62}px`;
        }

        // Update each badge along the circular orbit dynamically
        const currentItems = itemsRef.current;
        const total = currentItems.length || TOTAL_ITEMS;
        const angleStep = 360 / Math.max(total, 1);

        for (let i = 0; i < total; i++) {
          const el = badgeRefs.current[i];
          if (!el) continue;

          const baseAngle = START_ANGLE + i * angleStep;
          const theta = normalizeAngle(baseAngle - rot);

          // If underneath the fold / horizon, keep completely hidden
          if (theta < -12 || theta > 192) {
            el.style.visibility = "hidden";
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            continue;
          }

          const fade = getAngleFade(theta);
          const rad = (theta * Math.PI) / 180;
          const leftPct = 50 + 41.5 * Math.cos(rad);
          const topPct = 100 - 83 * Math.sin(rad);

          el.style.visibility = "visible";
          el.style.left = `${leftPct}%`;
          el.style.top = `${topPct}%`;
          el.style.opacity = `${fade.opacity}`;
          el.style.transform = `translate(-50%, -50%) scale(${fade.scale})`;
          el.style.pointerEvents = fade.opacity > 0.25 ? "auto" : "none";
        }
      };

      gsap.ticker.add(tickerCallback);

      // Pause ticker updates when section is offscreen to preserve resources
      const visibilityST = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => {
          gsap.to(speedRef.current, { value: 0, duration: 0.2 });
        },
        onLeaveBack: () => {
          gsap.to(speedRef.current, { value: 0, duration: 0.2 });
        },
        onEnter: () => {
          if (!isHoveredRef.current && entranceTl.progress() > 0.8) {
            gsap.to(speedRef.current, { value: 1, duration: 0.5 });
          }
        },
        onEnterBack: () => {
          if (!isHoveredRef.current && entranceTl.progress() > 0.8) {
            gsap.to(speedRef.current, { value: 1, duration: 0.5 });
          }
        },
      });

      return () => {
        gsap.ticker.remove(tickerCallback);
        visibilityST.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="relative w-full overflow-hidden bg-[#000000] pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-6 sm:pb-8 md:pb-0 md:-mb-8 select-none"
    >
      {/* Responsive SVG Clip Paths (for desktop glass overlays) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="leftGlassClip" clipPathUnits="objectBoundingBox">
            <path d={LEFT_GLASS_CLIP_PATH} />
          </clipPath>
          <clipPath id="rightGlassClip" clipPathUnits="objectBoundingBox">
            <path d={RIGHT_GLASS_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[850px] max-w-[95vw] h-[480px] rounded-full blur-[110px] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 85%, rgba(147, 51, 234, 0.45) 0%, rgba(79, 70, 229, 0.25) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-1/2 top-10 -translate-x-1/2 w-[650px] max-w-[85vw] h-[300px] rounded-full blur-[120px] opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Mobile Section Header (< md) */}
      <div
        ref={mobileHeaderRef}
        className="md:hidden relative z-20 flex flex-col items-center text-center px-4 max-w-lg mx-auto mb-4 sm:mb-6"
      >
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/40 bg-teal-950/40 text-teal-300 text-xs font-semibold tracking-wider uppercase shadow-[0_0_16px_rgba(20,184,166,0.22)] backdrop-blur-md mb-3">
          <svg
            className="w-3.5 h-3.5 stroke-teal-300 fill-none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>SKILLS &amp; TOOLS</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-[1.2]">
          Tools &amp; Technologies
          <br />
          We Work With
        </h2>

        {/* Subheading */}
        <p className="mt-2.5 text-zinc-400 text-xs sm:text-sm font-normal max-w-sm mx-auto leading-relaxed">
          We leverage modern frameworks, scalable cloud services, and battle-tested tools to craft high-impact digital solutions.
        </p>
      </div>

      {/* Arc Stage Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          onClick={() => handleBadgeSelect(null)}
          className="relative w-full mx-auto aspect-[2/1] flex items-center justify-center cursor-default"
        >
          {/* 1. Road Track & Radial Ambient Dome */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <defs>
              <radialGradient id="domeGlow" cx="500" cy="500" r="420" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7c3aedac" stopOpacity="0.22" />
                <stop offset="45%" stopColor="#4d1d95ff" stopOpacity="0.12" />
                <stop offset="85%" stopColor="#0a0518" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Road Gradient with smooth zero-opacity fade at reveal & ending edges */}
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="8%" stopColor="#0d0a1a" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#180e30" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#241047" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#180e30" stopOpacity="0.8" />
                <stop offset="92%" stopColor="#0d0a1a" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>

              {/* Dashed track gradient fading at both ends */}
              <linearGradient id="dashedTrackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="12%" stopColor="#a855f7" stopOpacity="0.22" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.45" />
                <stop offset="88%" stopColor="#a855f7" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>

              {/* Glowing beam gradient for entrance reveal sweep */}
              <linearGradient id="glowBeamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                <stop offset="25%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f0abfc" stopOpacity="1" />
                <stop offset="75%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path d="M 15 500 A 485 485 0 0 1 985 500 Z" fill="url(#domeGlow)" />
            <path
              d="M 85 500 A 415 415 0 0 1 915 500"
              stroke="url(#roadGradient)"
              strokeWidth="144"
              strokeLinecap="butt"
            />
            <path
              ref={dashedLineRef}
              d="M 85 500 A 415 415 0 0 1 915 500"
              stroke="url(#dashedTrackGradient)"
              strokeWidth="1.5"
              strokeDasharray="8 8"
            />
            {/* Entrance beam path */}
            <path
              ref={glowLineRef}
              d="M 85 500 A 415 415 0 0 1 915 500"
              stroke="url(#glowBeamGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1304"
              strokeDashoffset="1304"
            />
          </svg>

          {/* 2. Interactive Orbiting Tech Badges */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {items.map((item, index) => (
              <TechBadge
                key={item.id}
                item={item}
                index={index}
                totalCount={items.length}
                innerRef={(el) => {
                  badgeRefs.current[index] = el;
                }}
                isHovered={hoveredItem === item.name}
                isSelected={selectedItem?.id === item.id}
                onHover={handleBadgeHover}
                onSelect={handleBadgeSelect}
              />
            ))}
          </div>

          {/* 3. Curved Liquid Glass Lenses (Desktop/Tablet >= md) */}
          <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
            <CurvedGlassOverlay clipId="leftGlassClip" direction="br" />
            <CurvedGlassOverlay clipId="rightGlassClip" direction="bl" />
          </div>

          {/* 4. Desktop Central Content & CTA (>= md) */}
          <div
            ref={contentRef}
            className="hidden md:flex relative z-30 flex-col items-center text-center px-4 max-w-xl mx-auto mt-20 sm:mt-24 md:mt-26"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/40 bg-teal-950/40 text-teal-300 text-xs font-semibold tracking-wider uppercase shadow-[0_0_16px_rgba(20,184,166,0.22)] backdrop-blur-md mb-3 sm:mb-4">
              <svg
                className="w-3.5 h-3.5 stroke-teal-300 fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>SKILLS &amp; TOOLS</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-[44px] lg:text-[48px] font-medium text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              Tools &amp; Technologies
              <br />
              We Work With
            </h2>

            {/* Subheading */}
            <p className="mt-2.5 sm:mt-3.5 text-zinc-400 text-xs sm:text-sm md:text-[15px] font-normal max-w-md mx-auto leading-relaxed">
              We leverage modern frameworks, scalable cloud services, and battle-tested tools to craft high-impact digital solutions.
            </p>
          </div>

          {/* 5. Mobile Central Interactive Indicator (< md) */}
          <div className="md:hidden absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-auto">
            <motion.div
              key={selectedItem?.id || "empty"}
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                handleBadgeSelect(selectedItem);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-zinc-200 shadow-[0_4px_24px_rgba(168,85,247,0.3)] backdrop-blur-md cursor-pointer active:scale-95 transition-transform"
            >
              {selectedItem ? (
                <>
                  <div className="w-4 h-4 relative flex items-center justify-center">
                    <Image
                      src={selectedItem.icon}
                      alt={selectedItem.name}
                      width={16}
                      height={16}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-white">{selectedItem.name}</span>
                  {selectedItem.category && (
                    <span className="text-[10px] text-purple-300/80 border-l border-white/10 pl-2">
                      {selectedItem.category}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs font-medium text-zinc-300">Tap icon to inspect</span>
                </>
              )}
            </motion.div>
            <span className="text-[9px] text-zinc-500 mt-1 font-mono tracking-wider uppercase">
              {isPaused ? "Paused • Tap to resume" : "Orbital Tech Radar"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


