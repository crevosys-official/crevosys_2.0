"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface IntegrationItem {
  id: string;
  name: string;
  angle: number; // Degrees along the upper arc (180 = left, 90 = top, 0 = right)
  isWhite?: boolean;
  icon: React.ReactNode;
}

// 11 high-fidelity icon representations matching the user's reference screenshot
const INTEGRATION_ITEMS: IntegrationItem[] = [
  {
    id: "item-1",
    name: "Dual Sphere Payment",
    angle: 174,
    icon: (
      // Overlapping cyan & orange dual circles (bottom-left)
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="12" r="5.5" fill="#06b6d4" fillOpacity="0.85" />
        <circle cx="15" cy="12" r="5.5" fill="#f97316" fillOpacity="0.85" />
      </svg>
    ),
  },
  {
    id: "item-2",
    name: "Docker / Cloud",
    angle: 158,
    icon: (
      // Blue stylized circle with white cutout
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#2563eb" />
        <path
          d="M8 12.5a4.5 4.5 0 0 0 8 0c0-2.5-3.5-5.5-3.5-5.5S8 10 8 12.5Z"
          fill="white"
        />
        <circle cx="14" cy="10" r="1.5" fill="#38bdf8" />
      </svg>
    ),
  },
  {
    id: "item-3",
    name: "Clover Component",
    angle: 140, // Inside Left Glass Shape
    icon: (
      // Four purple circles clover brand icon
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="4" fill="#a855f7" />
        <circle cx="16" cy="8" r="4" fill="#7c3aed" opacity="0.85" />
        <circle cx="8" cy="16" r="4" fill="#c084fc" opacity="0.85" />
        <circle cx="16" cy="16" r="4" fill="#9333ea" />
      </svg>
    ),
  },
  {
    id: "item-4",
    name: "Citrus Core",
    angle: 122, // Inside Left Glass Shape (top)
    icon: (
      // Dark badge with lemon/shield outline
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 4C7.5 4 4 7.5 4 12c0 4.5 3.5 8 8 8 3 0 5.6-1.6 7-4l1.5-1.5c.3-.3.3-.8 0-1.1L19 12c0-4.5-3.5-8-7-8Z"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="3" fill="#facc15" />
      </svg>
    ),
  },
  {
    id: "item-5",
    name: "Purple Spiral",
    angle: 106,
    isWhite: true,
    icon: (
      // White circle badge with purple swirl/spiral logo
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M8.5 12a3.5 3.5 0 1 0 3.5-3.5A3.5 3.5 0 0 0 8.5 12Z"
          stroke="#7c3aed"
          strokeWidth="2.2"
          fill="none"
        />
        <path
          d="M15.5 12a3.5 3.5 0 1 1-3.5 3.5"
          stroke="#9333ea"
          strokeWidth="2.2"
          fill="none"
        />
        <circle cx="12" cy="12" r="1.5" fill="#7c3aed" />
      </svg>
    ),
  },
  {
    id: "item-6",
    name: "Linear Stepped Cube",
    angle: 90, // Top apex
    isWhite: true,
    icon: (
      // White circle badge with stepped blue isometric layers
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <rect
          x="7"
          y="7"
          width="8"
          height="8"
          rx="1.5"
          transform="rotate(45 11 11)"
          fill="#3b82f6"
        />
        <rect
          x="10"
          y="10"
          width="8"
          height="8"
          rx="1.5"
          transform="rotate(45 14 14)"
          fill="#2563eb"
          fillOpacity="0.85"
        />
      </svg>
    ),
  },
  {
    id: "item-7",
    name: "Coral Asterisk",
    angle: 74,
    isWhite: true,
    icon: (
      // White circle badge with coral/pink asterisk starburst
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <g stroke="#f87171" strokeWidth="2.2" strokeLinecap="round">
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
          <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
        </g>
      </svg>
    ),
  },
  {
    id: "item-8",
    name: "Red Gem",
    angle: 56, // Inside Right Glass Shape (top)
    icon: (
      // Red badge with shield/portal
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="5" width="14" height="14" rx="4" fill="#dc2626" opacity="0.9" />
        <circle cx="12" cy="12" r="3.5" fill="#fca5a5" />
      </svg>
    ),
  },
  {
    id: "item-9",
    name: "Blue Dot Matrix",
    angle: 38, // Inside Right Glass Shape (bottom)
    icon: (
      // Blue dotted mesh badge
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="1.8" fill="#38bdf8" />
        <circle cx="12" cy="8" r="1.8" fill="#60a5fa" />
        <circle cx="16" cy="8" r="1.8" fill="#38bdf8" />
        <circle cx="8" cy="12" r="1.8" fill="#60a5fa" />
        <circle cx="12" cy="12" r="2.2" fill="#93c5fd" />
        <circle cx="16" cy="12" r="1.8" fill="#60a5fa" />
        <circle cx="8" cy="16" r="1.8" fill="#38bdf8" />
        <circle cx="12" cy="16" r="1.8" fill="#60a5fa" />
        <circle cx="16" cy="16" r="1.8" fill="#38bdf8" />
      </svg>
    ),
  },
  {
    id: "item-10",
    name: "Spiral Shell",
    angle: 22,
    icon: (
      // Dark circle badge with blue geometric line art
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8">
        <path d="M12 12a2 2 0 1 0 2 2" strokeLinecap="round" />
        <path d="M12 8a6 6 0 1 1-6 6" strokeLinecap="round" />
        <path d="M12 4a10 10 0 1 1-10 10" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "item-11",
    name: "Four Point Star",
    angle: 6,
    icon: (
      // Dark badge with gold 4-point star
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3C12 7.97 16.03 12 21 12C16.03 12 12 16.03 12 21C12 16.03 7.97 12 3 12C7.97 12 12 7.97 12 3Z"
          fill="#d97706"
          opacity="0.9"
        />
        <circle cx="12" cy="12" r="2" fill="#fef08a" />
      </svg>
    ),
  },
];

/**
 * Calculates a smooth curved annular sector path with 4 rounded corners
 * that follows the exact circle arc of the road.
 */
function getCurvedSectorPath(
  cx: number,
  cy: number,
  startAngleDeg: number,
  endAngleDeg: number,
  rInner: number,
  rOuter: number,
  cornerR: number
): string {
  const d2r = Math.PI / 180;
  const dThetaOuter = (cornerR / rOuter) * (180 / Math.PI);
  const dThetaInner = (cornerR / rInner) * (180 / Math.PI);

  const a1Angle = (startAngleDeg - dThetaOuter) * d2r;
  const a2Angle = (endAngleDeg + dThetaOuter) * d2r;
  const b1Angle = endAngleDeg * d2r;
  const c1Angle = (endAngleDeg + dThetaInner) * d2r;
  const c2Angle = (startAngleDeg - dThetaInner) * d2r;
  const d1Angle = startAngleDeg * d2r;

  const a1 = { x: cx + rOuter * Math.cos(a1Angle), y: cy - rOuter * Math.sin(a1Angle) };
  const a2 = { x: cx + rOuter * Math.cos(a2Angle), y: cy - rOuter * Math.sin(a2Angle) };
  const b1 = { x: cx + (rOuter - cornerR) * Math.cos(b1Angle), y: cy - (rOuter - cornerR) * Math.sin(b1Angle) };
  const b2 = { x: cx + (rInner + cornerR) * Math.cos(b1Angle), y: cy - (rInner + cornerR) * Math.sin(b1Angle) };
  const c1 = { x: cx + rInner * Math.cos(c1Angle), y: cy - rInner * Math.sin(c1Angle) };
  const c2 = { x: cx + rInner * Math.cos(c2Angle), y: cy - rInner * Math.sin(c2Angle) };
  const d1 = { x: cx + (rInner + cornerR) * Math.cos(d1Angle), y: cy - (rInner + cornerR) * Math.sin(d1Angle) };
  const d2 = { x: cx + (rOuter - cornerR) * Math.cos(d1Angle), y: cy - (rOuter - cornerR) * Math.sin(d1Angle) };

  return `M ${a1.x.toFixed(1)} ${a1.y.toFixed(1)} A ${rOuter} ${rOuter} 0 0 1 ${a2.x.toFixed(1)} ${a2.y.toFixed(1)} A ${cornerR} ${cornerR} 0 0 1 ${b1.x.toFixed(1)} ${b1.y.toFixed(1)} L ${b2.x.toFixed(1)} ${b2.y.toFixed(1)} A ${cornerR} ${cornerR} 0 0 1 ${c1.x.toFixed(1)} ${c1.y.toFixed(1)} A ${rInner} ${rInner} 0 0 0 ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} A ${cornerR} ${cornerR} 0 0 1 ${d1.x.toFixed(1)} ${d1.y.toFixed(1)} L ${d2.x.toFixed(1)} ${d2.y.toFixed(1)} A ${cornerR} ${cornerR} 0 0 1 ${a1.x.toFixed(1)} ${a1.y.toFixed(1)} Z`;
}

function getNormalizedCurvedSectorPath(
  startAngleDeg: number,
  endAngleDeg: number,
  rInner: number,
  rOuter: number,
  cornerR: number
): string {
  const W = 1000;
  const H = 580;
  const cx = 500;
  const cy = 500;

  const d2r = Math.PI / 180;
  const dThetaOuter = (cornerR / rOuter) * (180 / Math.PI);
  const dThetaInner = (cornerR / rInner) * (180 / Math.PI);

  const a1Angle = (startAngleDeg - dThetaOuter) * d2r;
  const a2Angle = (endAngleDeg + dThetaOuter) * d2r;
  const b1Angle = endAngleDeg * d2r;
  const c1Angle = (endAngleDeg + dThetaInner) * d2r;
  const c2Angle = (startAngleDeg - dThetaInner) * d2r;
  const d1Angle = startAngleDeg * d2r;

  const nx = (x: number) => (x / W).toFixed(4);
  const ny = (y: number) => (y / H).toFixed(4);
  const nrx = (r: number) => (r / W).toFixed(4);
  const nry = (r: number) => (r / H).toFixed(4);

  const a1 = { x: cx + rOuter * Math.cos(a1Angle), y: cy - rOuter * Math.sin(a1Angle) };
  const a2 = { x: cx + rOuter * Math.cos(a2Angle), y: cy - rOuter * Math.sin(a2Angle) };
  const b1 = { x: cx + (rOuter - cornerR) * Math.cos(b1Angle), y: cy - (rOuter - cornerR) * Math.sin(b1Angle) };
  const b2 = { x: cx + (rInner + cornerR) * Math.cos(b1Angle), y: cy - (rInner + cornerR) * Math.sin(b1Angle) };
  const c1 = { x: cx + rInner * Math.cos(c1Angle), y: cy - rInner * Math.sin(c1Angle) };
  const c2 = { x: cx + rInner * Math.cos(c2Angle), y: cy - rInner * Math.sin(c2Angle) };
  const d1 = { x: cx + (rInner + cornerR) * Math.cos(d1Angle), y: cy - (rInner + cornerR) * Math.sin(d1Angle) };
  const d2 = { x: cx + (rOuter - cornerR) * Math.cos(d1Angle), y: cy - (rOuter - cornerR) * Math.sin(d1Angle) };

  const rxOut = nrx(rOuter);
  const ryOut = nry(rOuter);
  const rxIn = nrx(rInner);
  const ryIn = nry(rInner);
  const rxC = nrx(cornerR);
  const ryC = nry(cornerR);

  return `M ${nx(a1.x)} ${ny(a1.y)} A ${rxOut} ${ryOut} 0 0 1 ${nx(a2.x)} ${ny(a2.y)} A ${rxC} ${ryC} 0 0 1 ${nx(b1.x)} ${ny(b1.y)} L ${nx(b2.x)} ${ny(b2.y)} A ${rxC} ${ryC} 0 0 1 ${nx(c1.x)} ${ny(c1.y)} A ${rxIn} ${ryIn} 0 0 0 ${nx(c2.x)} ${ny(c2.y)} A ${rxC} ${ryC} 0 0 1 ${nx(d1.x)} ${ny(d1.y)} L ${nx(d2.x)} ${ny(d2.y)} A ${rxC} ${ryC} 0 0 1 ${nx(a1.x)} ${ny(a1.y)} Z`;
}

export default function Integrations() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Left Glass Shape: covers road from 148° down to 117°
  const leftGlassPath = getCurvedSectorPath(500, 500, 148, 117, 343, 487, 22);
  const leftNormalizedPath = getNormalizedCurvedSectorPath(148, 117, 343, 487, 22);

  // Right Glass Shape: covers road from 56° down to 25°
  const rightGlassPath = getCurvedSectorPath(500, 500, 56, 25, 343, 487, 22);
  const rightNormalizedPath = getNormalizedCurvedSectorPath(56, 25, 343, 487, 22);

  return (
    <section
      id="integrations"
      className="relative w-full overflow-hidden bg-[#000000] py-16 sm:py-24 lg:py-32 select-none"
    >
      {/* Hidden SVG for global responsive clipPaths */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="leftLiquidGlassClip" clipPathUnits="objectBoundingBox">
            <path d={leftNormalizedPath} />
          </clipPath>
          <clipPath id="rightLiquidGlassClip" clipPathUnits="objectBoundingBox">
            <path d={rightNormalizedPath} />
          </clipPath>
        </defs>
      </svg>

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[850px] max-w-[95vw] h-[480px] rounded-full blur-[110px] pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 85%, rgba(147, 51, 234, 0.45) 0%, rgba(79, 70, 229, 0.25) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-1/2 top-10 -translate-x-1/2 w-[650px] max-w-[85vw] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full mx-auto aspect-[1000/580] min-h-[460px] sm:min-h-[540px] md:min-h-[600px] flex items-center justify-center">
          
          {/* ========================================================================= */}
          {/* 1. TWO CURVED 3D LIQUID GLASS SHAPES (REAL BACKDROP BLUR, Z-INDEX 30)     */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Left Liquid Glass Shape with ultra-subtle 2px blur & crystal clear transparency */}
            <div
              style={{ clipPath: "url(#leftLiquidGlassClip)" }}
              className="absolute inset-0 backdrop-blur-[2px] backdrop-saturate-[125%] bg-gradient-to-br from-purple-400/10 via-purple-600/12 to-indigo-800/14 pointer-events-none"
            >
              {/* Internal liquid sheen gloss */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Liquid Glass Shape with ultra-subtle 2px blur & crystal clear transparency */}
            <div
              style={{ clipPath: "url(#rightLiquidGlassClip)" }}
              className="absolute inset-0 backdrop-blur-[3px] backdrop-saturate-[125%] bg-gradient-to-bl from-purple-400/10 via-purple-600/12 to-indigo-800/14 pointer-events-none"
            >
              {/* Internal liquid sheen gloss */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* SVG Soft Ambient Shadow */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 1000 580"
              fill="none"
            >
              <defs>
                <filter id="softGlassShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#7c3aed" floodOpacity="0.35" />
                </filter>
              </defs>
              <g filter="url(#softGlassShadow)">
                <path d={leftGlassPath} fill="none" stroke="none" />
                <path d={rightGlassPath} fill="none" stroke="none" />
              </g>
            </svg>
          </div>

          {/* ========================================================================= */}
          {/* 2. THE 11 CIRCULAR ICON BADGES ON THE ARC (BELOW SHAPES, Z-INDEX 20)       */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {INTEGRATION_ITEMS.map((item) => {
              const rad = (item.angle * Math.PI) / 180;
              const cx = 500;
              const cy = 500;
              const R = 415;

              const x = cx + R * Math.cos(rad);
              const y = cy - R * Math.sin(rad);

              const leftPct = (x / 1000) * 100;
              const topPct = (y / 580) * 100;

              return (
                <div
                  key={item.id}
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20 group"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
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
                    {item.icon}

                    {/* Active hover ripple */}
                    <div className="absolute inset-0 rounded-full border border-purple-400/0 group-hover:border-purple-400/60 group-hover:scale-125 transition-all duration-300 pointer-events-none" />
                  </motion.div>

                  {/* Tooltip on hover */}
                  {hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.9 }}
                      animate={{ opacity: 1, y: -6, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.9 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-zinc-900/95 border border-purple-500/30 text-[11px] font-medium text-purple-200 whitespace-nowrap shadow-xl backdrop-blur-md pointer-events-none z-40"
                    >
                      {item.name}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 3. ROADS & DOME (BELOW ICONS, Z-INDEX 10)                                  */}
          {/* ========================================================================= */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 580"
            fill="none"
          >
            <defs>
              <radialGradient id="domeGlow" cx="500" cy="500" r="420" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7c3aedac" stopOpacity="0.22" />
                <stop offset="45%" stopColor="#4d1d95ff" stopOpacity="0.12" />
                <stop offset="85%" stopColor="#0a0518" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Road track corridor fill - darker purple tone */}
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d0a1a" stopOpacity="0.35" />
                <stop offset="20%" stopColor="#180e30" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#241047" stopOpacity="0.85" />
                <stop offset="80%" stopColor="#180e30" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0d0a1a" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Dome soft radial fill */}
            <path
              d="M 15 500 A 485 485 0 0 1 985 500 Z"
              fill="url(#domeGlow)"
            />

            {/* Thick road track corridor - zero gap with borders */}
            <path
              d="M 85 500 A 415 415 0 0 1 915 500"
              stroke="url(#roadGradient)"
              strokeWidth="144"
              strokeLinecap="butt"
              fill="none"
            />

            {/* Centerline guiding road dash line */}
            <path
              d="M 85 500 A 415 415 0 0 1 915 500"
              stroke="#a855f7"
              strokeOpacity="0.18"
              strokeWidth="1.2"
              strokeDasharray="8 8"
              fill="none"
            />
          </svg>

          {/* ========================================================================= */}
          {/* 4. CENTRAL CONTENT (BADGE, HEADLINE, SUBTITLE, CTA BUTTON)                 */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-30 flex flex-col items-center text-center px-4 max-w-2xl mx-auto mt-16 sm:mt-24 md:mt-28"
          >
            {/* Pill Badge: SKILLS & TOOLS */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-teal-500/40 bg-teal-950/40 text-teal-300 text-xs font-semibold tracking-wider uppercase shadow-[0_0_16px_rgba(20,184,166,0.22)] backdrop-blur-md mb-4 sm:mb-5">
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
            <h2 className="text-2xl sm:text-4xl md:text-[46px] lg:text-[50px] font-medium text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              Tools &amp; Technologies
              <br />
              We Work With
            </h2>

            {/* Subheading */}
            <p className="mt-3 sm:mt-4 text-zinc-400 text-xs sm:text-sm md:text-base font-normal max-w-md mx-auto leading-relaxed">
              We leverage modern frameworks, scalable cloud services, and battle-tested tools to craft high-impact digital solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
