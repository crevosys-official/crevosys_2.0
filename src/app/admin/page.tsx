"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AdminStatistics from "@/components/admin/AdminStatistics";
import { Sparkles, Calendar, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".admin-header-pill", {
        opacity: 0,
        y: -10,
        duration: 0.5,
      })
        .from(
          ".admin-header-title",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".admin-header-subtitle",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          ".admin-header-meta",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
          },
          "-=0.3"
        );
    },
    { scope: pageRef }
  );

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div ref={pageRef} className="space-y-8 select-none">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          {/* Status Pill */}
          <div className="admin-header-pill inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-zinc-300 mb-3 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-pulse" />
            <span>Crevosys Control Center</span>
          </div>

          {/* Heading */}
          <h1 className="admin-header-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="admin-header-subtitle text-sm sm:text-base text-zinc-400 mt-1 font-normal">
            Real-time performance indicators and operational metrics.
          </p>
        </div>

        {/* Live Date / Quick Indicator */}
        <div className="admin-header-meta flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-xs text-zinc-300">
            <Calendar size={14} className="text-[#ff6a00]" />
            <span className="font-mono">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Main Statistics Crops (Animated with GSAP) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Key Statistics
          </h2>
          <span className="text-[11px] font-mono text-zinc-500">
            Auto-synced
          </span>
        </div>

        <AdminStatistics />
      </section>
    </div>
  );
}
