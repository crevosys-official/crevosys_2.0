"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  DollarSign,
  FolderKanban,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";

export default function RevenueAndProjectsStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"quarter" | "all" | "month">("quarter");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".rev-stat-card");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 25,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#ff6a00]/10 border border-[#ff6a00]/20 text-[#ff6a00]">
            <DollarSign size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              Financial & Project Metrics
              <span className="text-[10px] font-normal normal-case px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Audit
              </span>
            </h2>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl self-start sm:self-auto">
          {(
            [
              { id: "month", label: "This Month" },
              { id: "quarter", label: "This Quarter" },
              { id: "all", label: "All Time" },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPeriod(p.id)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                selectedPeriod === p.id
                  ? "bg-[#ff6a00] text-black font-semibold shadow-[0_0_12px_rgba(255,106,0,0.35)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: Total Projects Revenue */}
        <div className="rev-stat-card group relative bg-gradient-to-b from-[#121118] to-[#0c0c10] border border-[#ff6a00]/30 hover:border-[#ff6a00]/60 rounded-2xl p-5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#ff6a00]/20 blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Projects Revenue
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} />
              +32.4%
            </span>
          </div>

          <div className="mt-3 relative z-10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              {selectedPeriod === "month"
                ? "$28,600"
                : selectedPeriod === "quarter"
                ? "$76,400"
                : "$184,500"}
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span className="text-[#ff8804] font-medium">$42,800</span>
              <span>in active contract milestones</span>
            </p>
          </div>

          {/* Mini Breakdown Strip */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] relative z-10 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-zinc-500 block">Monthly MRR</span>
              <span className="text-white font-mono font-semibold">$14,200</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Collection Rate</span>
              <span className="text-emerald-400 font-mono font-semibold">96.2%</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Total Projects Breakdown */}
        <div className="rev-stat-card group relative bg-[#0e0e13]/90 hover:bg-[#121218]/95 border border-white/[0.08] hover:border-purple-500/40 rounded-2xl p-5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-purple-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Projects
            </span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FolderKanban size={14} />
            </div>
          </div>

          <div className="mt-3 relative z-10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              42
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span className="text-purple-400 font-medium">8 running</span>
              <span>• 5 pending • 4 upcoming</span>
            </p>
          </div>

          {/* Micro Progress Bar */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] relative z-10 space-y-1.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Completion Velocity</span>
              <span className="text-purple-400 font-mono font-semibold">88%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full w-[60%]" title="Completed (25)" />
              <div className="bg-purple-500 h-full w-[20%]" title="Running (8)" />
              <div className="bg-amber-500 h-full w-[12%]" title="Pending (5)" />
              <div className="bg-blue-500 h-full w-[8%]" title="Upcoming (4)" />
            </div>
          </div>
        </div>

        {/* CARD 3: Current Running Velocity */}
        <div className="rev-stat-card group relative bg-[#0e0e13]/90 hover:bg-[#121218]/95 border border-white/[0.08] hover:border-cyan-500/40 rounded-2xl p-5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Running Projects
            </span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Activity size={14} />
            </div>
          </div>

          <div className="mt-3 relative z-10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              8
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span className="text-cyan-400 font-medium">100% on schedule</span>
              <span>across 6 developers</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] relative z-10 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-zinc-500 block">Avg Sprint Pace</span>
              <span className="text-white font-mono font-semibold">14 pts / wk</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Upcoming Milestones</span>
              <span className="text-cyan-400 font-mono font-semibold">3 this week</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Crash Stability & Uptime */}
        <div className="rev-stat-card group relative bg-[#0e0e13]/90 hover:bg-[#121218]/95 border border-white/[0.08] hover:border-emerald-500/40 rounded-2xl p-5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Crash-Free Rate
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck size={14} />
            </div>
          </div>

          <div className="mt-3 relative z-10">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              99.94%
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span className="text-emerald-400 font-medium">0 critical crashes</span>
              <span>in last 24h</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] relative z-10 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-zinc-500 block">Monitored Requests</span>
              <span className="text-white font-mono font-semibold">142.8k</span>
            </div>
            <div>
              <span className="text-zinc-500 block">API Latency</span>
              <span className="text-emerald-400 font-mono font-semibold">22ms avg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
