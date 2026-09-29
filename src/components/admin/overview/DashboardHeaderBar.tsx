"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
} from "lucide-react";

export default function DashboardHeaderBar() {
  const [period, setPeriod] = useState("Last 30 days");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
      {/* Left: Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Dashboard
          </h1>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-white/10 font-semibold">
            Overview
          </span>
        </div>
      </div>

      {/* Right: Date Picker, Period Dropdown, Add Widget, Export Button */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Date Range pill */}
        <div className="px-3.5 py-2 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-300 shadow-sm">
          <CalendarIcon size={14} className="text-[#ff6a00]" />
          <span>Sep 01, 2026 - {formattedDate}</span>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3.5 py-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center gap-2 text-xs font-medium text-zinc-300 cursor-pointer transition-colors shadow-sm"
          >
            <span>{period}</span>
            <ChevronDown size={14} className="text-zinc-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-zinc-900 border border-white/10 rounded-2xl shadow-xl p-1 z-30 space-y-0.5 backdrop-blur-md">
              {["Last 7 days", "Last 30 days", "Q4 2026", "All Time"].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                    period === p ? "bg-white/10 text-white font-semibold" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Button */}
        <button
          onClick={() => alert("Dashboard report exported successfully.")}
          className="px-4 py-2 rounded-2xl bg-[#ff6a00] hover:bg-[#ff8804] text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_16px_rgba(255,106,0,0.25)] cursor-pointer"
        >
          <Download size={14} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
