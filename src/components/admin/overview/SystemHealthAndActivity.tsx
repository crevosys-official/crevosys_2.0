"use client";

import React from "react";
import {
  Activity,
  Server,
  Database,
  Cloud,
  Mail,
  GitBranch,
} from "lucide-react";

export default function SystemHealthAndActivity() {
  const infraServices = [
    { name: "Vercel Edge Network", status: "Operational", ping: "18ms", icon: Cloud },
    { name: "Supabase DB & Pool", status: "Operational", ping: "28ms", icon: Database },
    { name: "Resend Email Webhook", status: "Operational", ping: "42ms", icon: Mail },
    { name: "GitHub CI/CD Runner", status: "Passing", ping: "100%", icon: GitBranch },
  ];

  const recentActivities = [
    {
      id: 1,
      actor: "MD Abu Sahid",
      action: "Completed Milestone 4 (Stripe Inventory Engine) for",
      target: "The Palace Resort",
      time: "14 mins ago",
    },
    {
      id: 2,
      actor: "Stripe Automated Billing",
      action: "Received contract milestone settlement of $4,500 for",
      target: "Skylet Bank Ltd Portal",
      time: "38 mins ago",
    },
    {
      id: 3,
      actor: "Joyant Sheikhar",
      action: "Merged pull request #94: Redis session caching & query optimization into",
      target: "crevosys_2.0 main",
      time: "1 hour ago",
    },
    {
      id: 4,
      actor: "MD Abu Sahid",
      action: "Updated Gantt sprint timeline & deployment targets for",
      target: "AeroLogistics Portal",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Infrastructure Services Health (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-zinc-950 text-zinc-300 border border-white/10">
                <Server size={14} />
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Infrastructure Status
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              HEALTHY
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {infraServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} className="text-zinc-400" />
                    <span className="text-zinc-300 font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-zinc-500">{service.ping}</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {service.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Activity Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-white/10 lg:pl-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-zinc-950 text-zinc-300 border border-white/10">
                <Activity size={14} />
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Live Audit Stream
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              Realtime Node Feed
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {recentActivities.map((act) => (
              <div key={act.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] shrink-0 mt-1.5" />
                  <p className="text-zinc-300 leading-snug">
                    <strong className="text-white font-semibold">{act.actor} </strong>
                    <span className="text-zinc-400">{act.action} </span>
                    <strong className="text-zinc-200">{act.target}</strong>
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 shrink-0 whitespace-nowrap">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
