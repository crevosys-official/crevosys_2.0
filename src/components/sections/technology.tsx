"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface IntegrationItem {
  id: string;
  name: string;
  angle: number; // Degrees along the upper arc (180 = left, 90 = top, 0 = right)
  icon: string;
  isWhite?: boolean;
}

const INTEGRATION_ITEMS: IntegrationItem[] = [
  { id: "item-1", name: "Flutter", angle: 174, icon: "/icons/Flutter-Dark.svg" },
  { id: "item-2", name: "Firebase", angle: 158, icon: "/icons/Firebase-Dark.svg" },
  { id: "item-3", name: "MongoDB", angle: 140, icon: "/icons/MongoDB.svg" },
  { id: "item-4", name: "Tailwind CSS", angle: 122, icon: "/icons/TailwindCSS-Dark.svg" },
  { id: "item-5", name: "TypeScript", angle: 106, icon: "/icons/TypeScript.svg" },
  { id: "item-6", name: "React", angle: 90, icon: "/icons/React-Dark.svg" },
  { id: "item-7", name: "Next.js", angle: 74, icon: "/icons/NextJS-Dark.svg" },
  { id: "item-8", name: "Node.js", angle: 56, icon: "/icons/NodeJS-Dark.svg" },
  { id: "item-9", name: "Figma", angle: 38, icon: "/icons/Figma-Dark.svg" },
  { id: "item-10", name: "Supabase", angle: 22, icon: "/icons/Supabase-Dark.svg" },
  { id: "item-11", name: "GitHub", angle: 6, icon: "/icons/Github-Dark.svg" },
];

// Precomputed static clip paths for the left & right curved liquid glass lenses
const LEFT_GLASS_CLIP_PATH =
  "M 0.0991 0.4471 A 0.4870 0.9740 0 0 1 0.2595 0.1530 A 0.0220 0.0440 0 0 1 0.2889 0.1714 L 0.3343 0.3496 A 0.0220 0.0440 0 0 1 0.3250 0.4100 A 0.3430 0.6860 0 0 0 0.2214 0.5999 A 0.0220 0.0440 0 0 1 0.1905 0.6132 L 0.1057 0.5072 A 0.0220 0.0440 0 0 1 0.0991 0.4471 Z";

const RIGHT_GLASS_CLIP_PATH =
  "M 0.7903 0.2179 A 0.4870 0.9740 0 0 1 0.9316 0.5489 A 0.0220 0.0440 0 0 1 0.9214 0.6070 L 0.8308 0.6915 A 0.0220 0.0440 0 0 1 0.8009 0.6708 A 0.3430 0.6860 0 0 0 0.7096 0.4570 A 0.0220 0.0440 0 0 1 0.7041 0.3948 L 0.7600 0.2290 A 0.0220 0.0440 0 0 1 0.7903 0.2179 Z";

interface TechBadgeProps {
  item: IntegrationItem;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}

function TechBadge({ item, isHovered, onHover }: TechBadgeProps) {
  const rad = (item.angle * Math.PI) / 180;
  const x = 500 + 415 * Math.cos(rad);
  const y = 500 - 415 * Math.sin(rad);
  const leftPct = (x / 1000) * 100;
  const topPct = (y / 500) * 100;

  return (
    <div
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20 group"
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        whileHover={{ scale: 1.15, y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`relative w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          item.isWhite
            ? "bg-white text-zinc-900 shadow-[0_4px_24px_rgba(255,255,255,0.45)]"
            : "bg-[#19152b] border border-white/20 text-zinc-100 shadow-[0_6px_20px_rgba(0,0,0,0.65)] hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]"
        }`}
      >
        <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center">
          <Image
            src={item.icon}
            alt={item.name}
            width={36}
            height={36}
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

  return (
    <section
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

              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d0a1a" stopOpacity="0.35" />
                <stop offset="20%" stopColor="#180e30" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#241047" stopOpacity="0.85" />
                <stop offset="80%" stopColor="#180e30" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0d0a1a" stopOpacity="0.35" />
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
              d="M 85 500 A 415 415 0 0 1 915 500"
              stroke="#a855f7"
              strokeOpacity="0.18"
              strokeWidth="1.2"
              strokeDasharray="8 8"
            />
          </svg>

          {/* 2. Interactive Tech Badges */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {INTEGRATION_ITEMS.map((item) => (
              <TechBadge
                key={item.id}
                item={item}
                isHovered={hoveredItem === item.name}
                onHover={setHoveredItem}
              />
            ))}
          </div>

          {/* 3. Curved Liquid Glass Lenses */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <CurvedGlassOverlay clipId="leftGlassClip" direction="br" />
            <CurvedGlassOverlay clipId="rightGlassClip" direction="bl" />
          </div>

          {/* 4. Central Content & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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

          </motion.div>
        </div>
      </div>
    </section>
  );
}
