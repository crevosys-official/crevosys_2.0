"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Radio,
} from "lucide-react";

export type StatusType = "working" | "meeting" | "leave";

export interface TeamMemberItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  glowAvatar: string;
  status: StatusType;
  task: string;
  tool: string;
  hours: string;
}

const INITIAL_MEMBERS: TeamMemberItem[] = [
  {
    id: 1,
    name: "MD Abu Sahid",
    role: "CEO • MERN & UI/UX",
    avatar: "/Team/sahid_withoutGlow.webp",
    glowAvatar: "/Team/sahid_withGlow.webp",
    status: "working",
    task: "Next.js 15 App Router Architecture",
    tool: "Cursor",
    hours: "6h 25m",
  },
  {
    id: 2,
    name: "Joyant Sheikhar",
    role: "CTO • Software Dev",
    avatar: "/Team/joyant_withoutGlow.webp",
    glowAvatar: "/Team/joyant_withGlow.webp",
    status: "working",
    task: "Redis Session Caching & Supabase ORM",
    tool: "VS Code",
    hours: "5h 45m",
  },
  {
    id: 4,
    name: "Abid Shahriar",
    role: "COO • Web Developer",
    avatar: "/Team/abid_withoutGlow.webp",
    glowAvatar: "/Team/abid_withGlow.webp",
    status: "working",
    task: "Multi-Currency Stripe & SSLCommerz",
    tool: "WebStorm",
    hours: "5h 10m",
  },
  {
    id: 5,
    name: "Shamsul Islam",
    role: "CMO • Marketer",
    avatar: "/Team/sumon_withoutGlow.webp",
    glowAvatar: "/Team/sumon_withGlow.webp",
    status: "leave",
    task: "Approved Annual Leave (Returns Oct 2)",
    tool: "Offline",
    hours: "0h 00m",
  },
];

export default function TeamLiveTrackingSidebar() {
  const [members, setMembers] = useState<TeamMemberItem[]>(INITIAL_MEMBERS);
  const [filter, setFilter] = useState<"all" | "working" | "leave">("all");

  const toggleStatus = (id: number) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const next: StatusType =
          m.status === "working" ? "meeting" : m.status === "meeting" ? "leave" : "working";
        return { ...m, status: next };
      })
    );
  };

  const filtered = members.filter((m) =>
    filter === "all" ? true : filter === "working" ? m.status === "working" : m.status === "leave"
  );

  const workingCount = members.filter((m) => m.status === "working").length;
  const meetingCount = members.filter((m) => m.status === "meeting").length;
  const leaveCount = members.filter((m) => m.status === "leave").length;

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 shadow-md space-y-4 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-zinc-950 text-zinc-300 border border-white/10">
              <Radio size={14} className="animate-pulse" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Team Live Tracking
            </h3>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {workingCount} working{meetingCount > 0 ? ` • ${meetingCount} meeting` : ""} • {leaveCount} on leave
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1 bg-zinc-950 border border-white/10 p-0.5 rounded-xl">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
              filter === "all" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("working")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
              filter === "working" ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Live
          </button>
        </div>
      </div>

      {/* Member Items List */}
      <div className="space-y-2.5">
        {filtered.map((member) => {
          const isWorking = member.status === "working";
          const isMeeting = member.status === "meeting";
          const isLeave = member.status === "leave";

          return (
            <div
              key={member.id}
              className="p-3 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-white/10 transition-all duration-200 flex items-center justify-between gap-3 shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar with Glow hover & online dot */}
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-zinc-900">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src={member.glowAvatar}
                    alt={member.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 ${
                      isWorking
                        ? "bg-emerald-400"
                        : isMeeting
                        ? "bg-amber-400"
                        : "bg-zinc-500"
                    }`}
                  />
                </div>

                {/* Name, Role & current task */}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white tracking-tight truncate">
                    {member.name}
                  </h4>
                  <span className="text-[10px] text-zinc-400 block truncate">
                    {member.role}
                  </span>
                  <span className="text-[10px] text-zinc-300 font-medium block truncate mt-0.5">
                    {member.task}
                  </span>
                </div>
              </div>

              {/* Status Toggle Badge & Hours */}
              <div className="shrink-0 flex flex-col items-end gap-1">
                <button
                  onClick={() => toggleStatus(member.id)}
                  title="Toggle status"
                  className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold tracking-wide border cursor-pointer transition-all ${
                    isWorking
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : isMeeting
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-zinc-900 text-zinc-400 border-white/5"
                  }`}
                >
                  {isWorking ? "Working" : isMeeting ? "Meeting" : "On Leave"}
                </button>
                <span className="text-[10px] font-mono text-zinc-500">
                  {member.hours}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
