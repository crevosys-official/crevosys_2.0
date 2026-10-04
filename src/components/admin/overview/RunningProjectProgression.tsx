"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MoreVertical,
  ChevronRight,
  Clock,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";

interface ProjectTimelineItem {
  id: string;
  letter: string;
  letterColor: string;
  badgeBg: string;
  title: string;
  subtitle: string;
  milestone: string;
  progress: number;
  // Timeline start & span relative to 10 days (0 to 9 index)
  startIndex: number; // 0 = 28, 1 = 29, 2 = 30, etc.
  spanDays: number; // length of total scheduled bar
  barColor: string;
  trackBg: string;
  phase: "DRAFT" | "IN PROGRESS" | "EDITING" | "DONE";
  assignees: { name: string; avatar: string }[];
}

const TIMELINE_DATES = [
  { day: "28", label: "Sep 28" },
  { day: "29", label: "Sep 29" },
  { day: "30", label: "Sep 30", isToday: true },
  { day: "31", label: "Sep 31" },
  { day: "01", label: "Oct 01" },
  { day: "02", label: "Oct 02" },
  { day: "03", label: "Oct 03" },
  { day: "04", label: "Oct 04" },
  { day: "05", label: "Oct 05" },
  { day: "06", label: "Oct 06" },
];

const PROJECTS_PROGRESSION: ProjectTimelineItem[] = [
  {
    id: "proj-a",
    letter: "A",
    letterColor: "text-blue-400",
    badgeBg: "bg-blue-500/15 border-blue-500/30",
    title: "The Palace Resort",
    subtitle: "Hospitality Web Suite & Booking Engine",
    milestone: "Stripe Engine",
    progress: 85,
    startIndex: 0, // starts at 28
    spanDays: 5,   // spans 28 to 02
    barColor: "bg-blue-600",
    trackBg: "bg-blue-900/30",
    phase: "IN PROGRESS",
    assignees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
    ],
  },
  {
    id: "proj-b",
    letter: "B",
    letterColor: "text-purple-400",
    badgeBg: "bg-purple-500/15 border-purple-500/30",
    title: "Meetup Food Platform",
    subtitle: "Multi-vendor Delivery & Geo-tracking",
    milestone: "Driver Telemetry",
    progress: 80,
    startIndex: 1, // starts at 29
    spanDays: 7,   // spans 29 to 05
    barColor: "bg-purple-600",
    trackBg: "bg-purple-900/30",
    phase: "IN PROGRESS",
    assignees: [
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
      { name: "Abid Shahriar", avatar: "/Team/abid_withoutGlow.webp" },
    ],
  },
  {
    id: "proj-c",
    letter: "C",
    letterColor: "text-pink-400",
    badgeBg: "bg-pink-500/15 border-pink-500/30",
    title: "Skylet Bank Ltd Portal",
    subtitle: "Modern Banking & Biometric Vault",
    milestone: "Pen-Testing QA",
    progress: 65,
    startIndex: 1, // starts at 29
    spanDays: 5,   // spans 29 to 03
    barColor: "bg-pink-600",
    trackBg: "bg-pink-900/30",
    phase: "EDITING",
    assignees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Abid Shahriar", avatar: "/Team/abid_withoutGlow.webp" },
    ],
  },
  {
    id: "proj-d",
    letter: "D",
    letterColor: "text-amber-400",
    badgeBg: "bg-amber-500/15 border-amber-500/30",
    title: "AI SaaS Enterprise Landing",
    subtitle: "Dynamic Interactive Funnel & Micro-UI",
    milestone: "Canvas 3D UI",
    progress: 75,
    startIndex: 3, // starts at 31
    spanDays: 6,   // spans 31 to 06
    barColor: "bg-amber-600",
    trackBg: "bg-amber-900/30",
    phase: "IN PROGRESS",
    assignees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
    ],
  },
];

export default function RunningProjectProgression() {
  const [selectedPhase, setSelectedPhase] = useState<string>("ALL");

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md transition-colors space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Running Project Progression
            </h2>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 font-semibold">
              Gantt Velocity
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Realtime project milestones, scheduled timeline sprints, and sprint completion velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 px-3 py-1.5 rounded-xl bg-zinc-950 border border-white/10">
            Sep 28 - Oct 06, 2026
          </span>
        </div>
      </div>

      {/* Main Gantt Timeline Container (Exact Layout from Screenshot) */}
      <div className="overflow-x-auto no-scrollbar pt-2">
        <div className="min-w-[760px] space-y-4">
          {/* Top Dates Timeline Header */}
          <div className="grid grid-cols-12 gap-3 items-center text-xs font-mono text-zinc-400 pb-2 border-b border-white/5">
            {/* Left 4 cols for Project Pill placeholder */}
            <div className="col-span-4 text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-500 pl-2">
              Active Projects
            </div>

            {/* Right 8 cols for Days 28, 29, 30, 31, 01, 02, 03, 04, 05, 06 */}
            <div className="col-span-8 grid grid-cols-10 text-center">
              {TIMELINE_DATES.map((d, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <span
                    className={`text-xs ${
                      d.isToday ? "text-[#ff6a00] font-bold" : "text-zinc-400"
                    }`}
                  >
                    {d.day}
                  </span>
                  {d.isToday && (
                    <span className="w-1 h-1 rounded-full bg-[#ff6a00] mt-0.5" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Project Rows */}
          <div className="relative space-y-4">
            {/* Subtle vertical grid lines running down the right 8 columns */}
            <div className="absolute inset-y-0 right-0 w-8/12 grid grid-cols-10 pointer-events-none z-0">
              {TIMELINE_DATES.map((_, i) => (
                <div
                  key={i}
                  className="border-r border-white/[0.04] h-full"
                />
              ))}
            </div>

            {/* Each Project Row: Left capsule + Right Gantt bar */}
            {PROJECTS_PROGRESSION.map((proj) => {
              // Calculate positioning on a 10-day grid (0% to 100%)
              const leftPercent = (proj.startIndex / 10) * 100;
              const widthPercent = (proj.spanDays / 10) * 100;

              return (
                <div
                  key={proj.id}
                  className="relative z-10 grid grid-cols-12 gap-3 items-center group"
                >
                  {/* Left Pill Capsule (Exact design from screenshot: circle letter + text + 3 dots) */}
                  <div className="col-span-4 bg-zinc-950/80 hover:bg-zinc-950 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-2.5 flex items-center justify-between shadow-sm transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Letter badge (A, B, C, D) */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${proj.badgeBg} ${proj.letterColor}`}
                      >
                        {proj.letter}
                      </div>

                      {/* Text */}
                      <div className="min-w-0 pr-1">
                        <h4 className="text-xs font-bold text-white tracking-tight truncate">
                          {proj.title}
                        </h4>
                        <span className="text-[10px] text-zinc-400 block truncate">
                          {proj.subtitle}
                        </span>
                      </div>
                    </div>

                    <button className="text-zinc-500 hover:text-zinc-300 p-1 shrink-0">
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {/* Right Timeline Bar Track (Exact design from screenshot: rounded pill spanning dates with progress inside) */}
                  <div className="col-span-8 relative h-12 flex items-center">
                    <div
                      className="absolute h-10 rounded-full flex items-center overflow-hidden transition-all duration-300 shadow-sm border border-white/5"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {/* Outer scheduled span track */}
                      <div
                        className={`absolute inset-0 opacity-40 ${proj.trackBg}`}
                      />

                      {/* Filled Progress Bar (e.g. 85%, 80%, 65%, 75%) */}
                      <div
                        className={`h-full ${proj.barColor} rounded-full flex items-center justify-between px-3 relative z-10 shadow-sm transition-all duration-700`}
                        style={{ width: `${proj.progress}%` }}
                      >
                        {/* Inside Left: Overlapping Avatars & Milestone text */}
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="flex items-center -space-x-1.5 shrink-0">
                            {proj.assignees.map((mem, i) => (
                              <div
                                key={i}
                                className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20 bg-zinc-900"
                                title={mem.name}
                              >
                                <Image
                                  src={mem.avatar}
                                  alt={mem.name}
                                  width={20}
                                  height={20}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>

                          <span className="text-[10px] font-semibold text-white/90 truncate hidden md:inline-block">
                            {proj.milestone}
                          </span>
                        </div>

                        {/* Inside Right: Bold Percentage */}
                        <span className="text-xs font-mono font-extrabold text-white shrink-0 pl-2">
                          {proj.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Phase Columns: DRAFT | IN PROGRESS | EDITING | DONE (from screenshot) */}
      <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {(
          [
            { title: "DRAFT", count: "1 Project", active: false },
            { title: "IN PROGRESS", count: "3 Projects", active: true },
            { title: "EDITING / QA", count: "1 Project", active: false },
            { title: "DONE", count: "2 Projects", active: false },
          ] as const
        ).map((phase) => (
          <div
            key={phase.title}
            className={`p-3 rounded-2xl border transition-all ${
              phase.active
                ? "bg-zinc-950/80 border-white/15 text-white"
                : "bg-zinc-950/40 border-white/5 text-zinc-400"
            }`}
          >
            <span className="text-[11px] font-mono uppercase tracking-widest font-bold block">
              {phase.title}
            </span>
            <span className="text-xs font-mono text-zinc-300 font-medium mt-1 block">
              {phase.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
