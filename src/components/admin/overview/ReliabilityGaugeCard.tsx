"use client";

import React from "react";
import { ShieldCheck, ChevronRight } from "lucide-react";

export default function ReliabilityGaugeCard() {
  const stability = 99.94;
  const totalTicks = 28;
  const activeTicks = Math.round((stability / 100) * totalTicks);

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 shadow-md flex flex-col justify-between transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            System Crash-Free Rate
          </span>
          <span className="p-1 rounded-lg bg-zinc-950 text-zinc-300 border border-white/10">
            <ShieldCheck size={14} />
          </span>
        </div>

        {/* Semi-circular Tick Arc Gauge with mathematically centered text inside SVG */}
        <div className="relative flex items-center justify-center my-1 select-none">
          <svg viewBox="0 0 200 112" className="w-48 h-28 overflow-visible">
            {Array.from({ length: totalTicks }).map((_, i) => {
              const angle = Math.PI + (i / (totalTicks - 1)) * Math.PI;
              const r1 = 68;
              const r2 = 84;
              const x1 = 100 + r1 * Math.cos(angle);
              const y1 = 102 + r1 * Math.sin(angle);
              const x2 = 100 + r2 * Math.cos(angle);
              const y2 = 102 + r2 * Math.sin(angle);

              const isActive = i <= activeTicks;
              const color = isActive ? "#10b981" : "rgba(255, 255, 255, 0.08)";

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              );
            })}

            {/* Centered Value & SLA label inside SVG with dominantBaseline for pixel-perfect vertical centering */}
            <text
              x="100"
              y="68"
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-white text-2xl font-mono font-extrabold tracking-tight"
            >
              99.94%
            </text>
            <text
              x="100"
              y="88"
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-emerald-400 text-[9px] font-mono font-semibold tracking-wider"
            >
              Target 99.90% SLA met
            </text>
          </svg>
        </div>

        {/* Micro statistics */}
        <div className="pt-2.5 border-t border-white/5 grid grid-cols-2 gap-2 text-center text-xs">
          <div>
            <span className="text-zinc-500 text-[10px] block">Crashes (24h)</span>
            <strong className="text-emerald-400 font-mono text-sm">0 Fatal</strong>
          </div>
          <div>
            <span className="text-zinc-500 text-[10px] block">Edge Latency</span>
            <strong className="text-white font-mono text-sm">22ms avg</strong>
          </div>
        </div>
      </div>

      <a
        href="#crash-analysis"
        className="mt-3 w-full py-2 rounded-2xl bg-zinc-950 hover:bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <span>View Crash Telemetry</span>
        <ChevronRight size={13} />
      </a>
    </div>
  );
}
