"use client";

import React, { useState, useRef } from "react";
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
  isWhite?: boolean;
}

const INTEGRATION_ITEMS: IntegrationItem[] = [
  { id: "item-1", name: "Flutter", icon: "/icons/Flutter-Dark.svg" },
  { id: "item-2", name: "Firebase", icon: "/icons/Firebase-Dark.svg" },
  { id: "item-3", name: "MongoDB", icon: "/icons/MongoDB.svg" },
  { id: "item-4", name: "Tailwind CSS", icon: "/icons/TailwindCSS-Dark.svg" },
  { id: "item-5", name: "TypeScript", icon: "/icons/TypeScript.svg" },
  { id: "item-6", name: "React", icon: "/icons/React-Dark.svg" },
  { id: "item-7", name: "Next.js", icon: "/icons/NextJS-Dark.svg" },
  { id: "item-8", name: "Node.js", icon: "/icons/NodeJS-Dark.svg" },
  { id: "item-9", name: "Figma", icon: "/icons/Figma-Dark.svg" },
  { id: "item-10", name: "Supabase", icon: "/icons/Supabase-Dark.svg" },
  { id: "item-11", name: "GitHub", icon: "/icons/Github-Dark.svg" },
  { id: "item-12", name: "Express.js", icon: "/icons/ExpressJS-Dark.svg" },
  { id: "item-13", name: "Redux", icon: "/icons/Redux.svg" },
  { id: "item-14", name: "VS Code", icon: "/icons/VSCode-Dark.svg" },
  { id: "item-15", name: "Android Studio", icon: "/icons/AndroidStudio-Dark.svg" },
  { id: "item-16", name: "HTML5", icon: "/icons/HTML.svg" },
  { id: "item-17", name: "CSS3", icon: "/icons/CSS.svg" },
  { id: "item-18", name: "Bootstrap", icon: "/icons/Bootstrap.svg" },
  { id: "item-19", name: "Blender", icon: "/icons/Blender-Dark.svg" },
  { id: "item-20", name: "Photoshop", icon: "/icons/Photoshop.svg" },
  { id: "item-21", name: "Illustrator", icon: "/icons/Illustrator.svg" },
  { id: "item-22", name: "Clerk", icon: "/icons/clerk.png" },
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
    // At 185: opacity = 0
    // At 142: opacity = 1
    const t = Math.max(0, Math.min(1, (185 - theta) / 43));
    opacity = t;
    scale = 0.65 + 0.35 * t;
  } else if (theta < 38) {
    // Ending side fade: angle goes from 38 down to -5
    // At 38: opacity = 1
    // At -5: opacity = 0
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
  isHovered: boolean;
  onHover: (name: string | null) => void;
  innerRef: (el: HTMLDivElement | null) => void;
}

function TechBadge({ item, index, isHovered, onHover, innerRef }: TechBadgeProps) {
  // Initial position at rotation = 0
  const initialBaseAngle = START_ANGLE + index * ANGLE_STEP;
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
      className="absolute pointer-events-auto z-20 group"
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="badge-reveal-wrapper">
        <motion.div
          whileHover={{ scale: 1.18, y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] rounded-full flex items-center justify-center transition-all cursor-pointer ${
            item.isWhite
              ? "bg-white text-zinc-900 shadow-[0_4px_24px_rgba(255,255,255,0.45)]"
              : "bg-[#161226]/90 border border-white/20 text-zinc-100 shadow-[0_6px_20px_rgba(0,0,0,0.65)] hover:border-purple-400/70 hover:shadow-[0_0_25px_rgba(168,85,247,0.45)] backdrop-blur-sm"
          }`}
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center">
            <Image
              src={item.icon}
              alt={item.name}
              width={44}
              height={44}
              className="w-full h-full object-contain rounded-md"
            />
          </div>

          {/* Hover ripple */}
          <div className="absolute inset-0 rounded-full border border-purple-400/0 group-hover:border-purple-400/60 group-hover:scale-125 transition-all duration-300 pointer-events-none" />
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: -6, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-zinc-900/95 border border-purple-500/30 text-[11px] font-medium text-purple-200 whitespace-nowrap shadow-xl backdrop-blur-md pointer-events-none z-40"
            >
              {item.name}
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const glowLineRef = useRef<SVGPathElement>(null);
  const dashedLineRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rotationRef = useRef(0);
  const speedRef = useRef({ value: 0 }); // Starts at 0 until scroll entrance finishes
  const isHoveredRef = useRef(false);

  // Handle smooth pause / resume on hover
  const handleBadgeHover = (name: string | null) => {
    setHoveredItem(name);
    isHoveredRef.current = !!name;
    gsap.to(speedRef.current, {
      value: name ? 0 : 1,
      duration: name ? 0.35 : 0.6,
      ease: "power2.out",
    });
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

      if (contentRef.current) {
        gsap.set(contentRef.current, {
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

      // 1. Central content lifts & reveals
      if (contentRef.current) {
        entranceTl.to(
          contentRef.current,
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

        // Update each badge along the circular orbit
        for (let i = 0; i < TOTAL_ITEMS; i++) {
          const el = badgeRefs.current[i];
          if (!el) continue;

          const baseAngle = START_ANGLE + i * ANGLE_STEP;
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
      className="relative w-full overflow-hidden bg-[#000000] pt-12 sm:pt-20 lg:pt-28 pb-0 select-none"
    >
      {/* Responsive SVG Clip Paths */}
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
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Arc Stage Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full mx-auto aspect-[2/1] min-h-[360px] sm:min-h-0 flex items-center justify-center">
          {/* 1. Road Track & Radial Ambient Dome */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 500"
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
            {INTEGRATION_ITEMS.map((item, index) => (
              <TechBadge
                key={item.id}
                item={item}
                index={index}
                innerRef={(el) => {
                  badgeRefs.current[index] = el;
                }}
                isHovered={hoveredItem === item.name}
                onHover={handleBadgeHover}
              />
            ))}
          </div>

          {/* 3. Curved Liquid Glass Lenses */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <CurvedGlassOverlay clipId="leftGlassClip" direction="br" />
            <CurvedGlassOverlay clipId="rightGlassClip" direction="bl" />
          </div>

          {/* 4. Central Content & CTA */}
          <div
            ref={contentRef}
            className="relative z-30 flex flex-col items-center text-center px-4 max-w-xl mx-auto mt-20 sm:mt-24 md:mt-26"
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
            <h2 className="text-2xl sm:text-4xl md:text-[44px] lg:text-[48px] font-medium text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              Tools &amp; Technologies
              <br />
              We Work With
            </h2>

            {/* Subheading */}
            <p className="mt-2.5 sm:mt-3.5 text-zinc-400 text-xs sm:text-sm md:text-[15px] font-normal max-w-md mx-auto leading-relaxed">
              We leverage modern frameworks, scalable cloud services, and battle-tested tools to craft high-impact digital solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

