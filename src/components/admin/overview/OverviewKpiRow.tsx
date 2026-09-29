"use client";

import React from "react";
import {
  DollarSign,
  FolderKanban,
  Users,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function OverviewKpiRow() {
  const kpis = [
    {
      id: "revenue",
      title: "TOTAL REVENUE",
      value: "$184,500",
      change: "+24.4%",
      changeType: "positive",
      subtext: "vs. $148,200 last period",
      icon: DollarSign,
    },
    {
      id: "projects",
      title: "TOTAL PROJECTS",
      value: "42",
      change: "+18.2%",
      changeType: "positive",
      subtext: "8 running • 5 pending",
      icon: FolderKanban,
    },
    {
      id: "team",
      title: "TEAM LIVE CAPACITY",
      value: "75%",
      change: "3 / 4 Online",
      changeType: "neutral",
      subtext: "3 working • 1 on leave",
      icon: Users,
    },
    {
      id: "crash",
      title: "CRASH-FREE RATE",
      value: "99.94%",
      change: "0 Crashes",
      changeType: "positive",
      subtext: "142.8k requests monitored",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;

        return (
          <div
            key={kpi.id}
            className="group relative bg-zinc-900 hover:bg-zinc-900/95 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-md flex flex-col justify-between min-h-[148px]"
          >
            {/* Top row: Label on left, Small indicator badge + Icon on right */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 truncate">
                {kpi.title}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                {/* Small indicator badge at top */}
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                    kpi.changeType === "positive"
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-zinc-300 bg-white/5 border border-white/10"
                  }`}
                >
                  <TrendingUp size={10} className="shrink-0" />
                  <span>{kpi.change}</span>
                </span>

                {/* Top Icon */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-950 text-zinc-300 border border-white/10 group-hover:border-white/20 transition-colors shrink-0">
                  <Icon size={15} />
                </div>
              </div>
            </div>

            {/* Middle: Big bold value */}
            <div className="my-auto py-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {kpi.value}
              </span>
            </div>

            {/* Bottom: Subtext */}
            <div className="text-xs text-zinc-400 font-normal truncate">
              {kpi.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
