"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  TrendingUp,
  Inbox,
  FolderKanban,
  Sparkles,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change: string;
  changeType: "positive" | "neutral";
  subtitle: string;
  accentColor: string;
  glowColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  sparklineData: number[];
}

const STATS_DATA: StatItem[] = [
  {
    id: "inquiries",
    label: "Customer Inquiries",
    value: 1284,
    prefix: "",
    suffix: "",
    decimals: 0,
    change: "+18.4%",
    changeType: "positive",
    subtitle: "vs previous 30 days",
    accentColor: "#ff6a00",
    glowColor: "rgba(255, 106, 0, 0.25)",
    icon: Inbox,
    sparklineData: [20, 35, 28, 45, 38, 62, 55, 78, 70, 92],
  },
  {
    id: "projects",
    label: "Active Projects",
    value: 28,
    prefix: "",
    suffix: "",
    decimals: 0,
    change: "+6 active",
    changeType: "positive",
    subtitle: "Solutions in development",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    icon: FolderKanban,
    sparklineData: [12, 16, 14, 22, 19, 24, 21, 26, 25, 28],
  },
  {
    id: "satisfaction",
    label: "Client Satisfaction",
    value: 99.2,
    prefix: "",
    suffix: "%",
    decimals: 1,
    change: "+0.8%",
    changeType: "positive",
    subtitle: "Across verified feedback",
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.25)",
    icon: Sparkles,
    sparklineData: [92, 94, 93, 96, 95, 97, 98, 98.5, 99, 99.2],
  },
  {
    id: "reach",
    label: "Platform Reach",
    value: 48.6,
    prefix: "",
    suffix: "K",
    decimals: 1,
    change: "+24.2%",
    changeType: "positive",
    subtitle: "Monthly unique visitors",
    accentColor: "#0ea5e9",
    glowColor: "rgba(14, 165, 233, 0.25)",
    icon: BarChart3,
    sparklineData: [18, 22, 29, 26, 34, 38, 41, 45, 43, 48.6],
  },
];

export default function AdminStatistics() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".admin-stat-crop");

      // 1. Entrance timeline for the cards
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.94,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      // 2. Animate counter values
      STATS_DATA.forEach((stat) => {
        const valEl = containerRef.current?.querySelector(
          `#stat-val-${stat.id}`
        );
        if (!valEl) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          delay: 0.2,
          onUpdate: () => {
            if (valEl) {
              const formatted =
                stat.decimals && stat.decimals > 0
                  ? counter.val.toFixed(stat.decimals)
                  : Math.round(counter.val).toLocaleString();
              valEl.textContent = `${stat.prefix || ""}${formatted}${
                stat.suffix || ""
              }`;
            }
          },
        });
      });

      // 3. Animate SVG sparkline paths (draw-in effect)
      const sparklines = gsap.utils.toArray<SVGPathElement>(
        ".stat-sparkline-path"
      );
      sparklines.forEach((path) => {
        const length = path.getTotalLength ? path.getTotalLength() : 200;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          delay: 0.4,
          ease: "power2.out",
        });
      });

      // 4. Animate bottom progress tracks
      const progressBars =
        gsap.utils.toArray<HTMLElement>(".stat-progress-bar");
      progressBars.forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width") || "70%";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: targetWidth,
            duration: 1.4,
            delay: 0.5,
            ease: "power2.out",
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full">
      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {STATS_DATA.map((stat, idx) => {
          const Icon = stat.icon;

          // Generate simple SVG sparkline path from data
          const min = Math.min(...stat.sparklineData);
          const max = Math.max(...stat.sparklineData);
          const range = max - min || 1;
          const points = stat.sparklineData.map((val, i) => {
            const x = (i / (stat.sparklineData.length - 1)) * 120;
            const y = 36 - ((val - min) / range) * 28;
            return `${x},${y}`;
          });
          const pathD = `M ${points.join(" L ")}`;

          return (
            <div
              key={stat.id}
              className="admin-stat-crop group relative bg-[#0d0d12]/90 hover:bg-[#121218]/95 border border-white/[0.08] hover:border-white/[0.2] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden"
              style={{
                willChange: "transform, opacity",
              }}
            >
              {/* Ambient radial card glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: stat.glowColor }}
              />

              {/* Top Row: Icon badge + Live Trend pill */}
              <div className="flex items-center justify-between relative z-10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${stat.accentColor}15`,
                    borderColor: `${stat.accentColor}35`,
                    color: stat.accentColor,
                    boxShadow: `0 0 16px ${stat.glowColor}`,
                  }}
                >
                  <Icon size={20} />
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-zinc-300">
                  <TrendingUp size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-mono">
                    {stat.change}
                  </span>
                </div>
              </div>

              {/* Middle: Number Counter + Sparkline */}
              <div className="mt-5 relative z-10">
                <div className="flex items-baseline justify-between">
                  <div
                    id={`stat-val-${stat.id}`}
                    className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono select-text"
                  >
                    0
                  </div>

                  {/* Minimalist SVG Sparkline */}
                  <div className="w-24 h-9 overflow-visible opacity-75 group-hover:opacity-100 transition-opacity">
                    <svg
                      viewBox="0 0 120 40"
                      className="w-full h-full overflow-visible"
                    >
                      <path
                        d={pathD}
                        fill="none"
                        stroke={stat.accentColor}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stat-sparkline-path"
                        style={{
                          filter: `drop-shadow(0 0 6px ${stat.glowColor})`,
                        }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-1 flex flex-col">
                  <span className="text-sm font-semibold text-zinc-200">
                    {stat.label}
                  </span>
                  <span className="text-xs text-zinc-500 mt-0.5">
                    {stat.subtitle}
                  </span>
                </div>
              </div>

              {/* Bottom: Micro Progress Bar indicating velocity */}
              <div className="mt-4 pt-3 border-t border-white/[0.05] relative z-10">
                <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="stat-progress-bar h-full rounded-full transition-all"
                    data-width={`${65 + idx * 10}%`}
                    style={{
                      background: `linear-gradient(90deg, ${stat.accentColor}90, ${stat.accentColor})`,
                      boxShadow: `0 0 8px ${stat.accentColor}80`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
