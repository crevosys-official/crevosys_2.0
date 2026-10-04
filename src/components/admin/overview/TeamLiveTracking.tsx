"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Search,
  Sparkles,
  Clock,
  Laptop,
  CheckCircle2,
  CalendarOff,
  Coffee,
  MessageSquare,
  Activity,
  ChevronDown,
  Globe,
  Radio,
} from "lucide-react";

export type WorkStatus = "working" | "meeting" | "leave";

export interface TeamMemberLive {
  id: number;
  name: string;
  designation: string;
  position: string;
  avatar: string;
  glowAvatar: string;
  status: WorkStatus;
  statusNote?: string;
  currentTask: string;
  projectAssigned: string;
  hoursToday: string;
  lastActive: string;
  activeTool: string;
  location: string;
  timezone: string;
}

const INITIAL_TEAM: TeamMemberLive[] = [
  {
    id: 1,
    name: "MD Abu Sahid",
    designation: "Chief Executive Officer (CEO)",
    position: "MERN-Developer & UI/UX",
    avatar: "/Team/sahid_withoutGlow.webp",
    glowAvatar: "/Team/sahid_withGlow.webp",
    status: "working",
    currentTask: "Architecting Next.js 15 App Router & Core Overview API",
    projectAssigned: "The Palace Resort",
    hoursToday: "6h 25m",
    lastActive: "Active just now",
    activeTool: "Cursor IDE",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
  },
  {
    id: 2,
    name: "Joyant Sheikhar Gupta Joy",
    designation: "Chief Technology Officer (CTO)",
    position: "Software Developer",
    avatar: "/Team/joyant_withoutGlow.webp",
    glowAvatar: "/Team/joyant_withGlow.webp",
    status: "working",
    currentTask: "Refactoring Database ORM & Redis Session Caching Layer",
    projectAssigned: "Meetup Food Platform",
    hoursToday: "5h 45m",
    lastActive: "Active 2m ago",
    activeTool: "VS Code & Docker",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
  },
  {
    id: 4,
    name: "Abid Shahriar",
    designation: "Chief Operating Officer (COO)",
    position: "Web Developer",
    avatar: "/Team/abid_withoutGlow.webp",
    glowAvatar: "/Team/abid_withGlow.webp",
    status: "working",
    currentTask: "Integrating Stripe & SSLCommerz Multi-Currency Checkout",
    projectAssigned: "Skylet Bank Ltd",
    hoursToday: "5h 10m",
    lastActive: "Active just now",
    activeTool: "WebStorm",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
  },
  {
    id: 5,
    name: "Shamsul Islam",
    designation: "Chief Marketing Officer (CMO)",
    position: "Digital Marketer",
    avatar: "/Team/sumon_withoutGlow.webp",
    glowAvatar: "/Team/sumon_withGlow.webp",
    status: "leave",
    statusNote: "Approved Personal Leave • Returns in 2 days",
    currentTask: "Q4 Growth Campaign & Upwork Agency Pitch Deck",
    projectAssigned: "Crevosys Brand Expansion",
    hoursToday: "0h 00m",
    lastActive: "2 days ago",
    activeTool: "Offline",
    location: "Dhaka, Bangladesh",
    timezone: "GMT+6",
  },
 
];

export default function TeamLiveTracking() {
  const [team, setTeam] = useState<TeamMemberLive[]>(INITIAL_TEAM);
  const [filter, setFilter] = useState<"all" | "working" | "meeting" | "leave">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Dhaka",
        }).format(now)
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const workingCount = team.filter((m) => m.status === "working").length;
  const meetingCount = team.filter((m) => m.status === "meeting").length;
  const leaveCount = team.filter((m) => m.status === "leave").length;

  const filteredTeam = team.filter((m) => {
    const matchesFilter = filter === "all" ? true : m.status === filter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.currentTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.projectAssigned.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleStatus = (id: number) => {
    setTeam((prev) =>
      prev.map((member) => {
        if (member.id !== id) return member;
        const nextStatus: WorkStatus =
          member.status === "working"
            ? "meeting"
            : member.status === "meeting"
            ? "leave"
            : "working";
        return {
          ...member,
          status: nextStatus,
          lastActive: nextStatus === "working" ? "Active just now" : nextStatus === "meeting" ? "In Meeting" : "On Leave",
        };
      })
    );
  };

  return (
    <div id="teams" className="space-y-4">
      {/* Header bar with Live Dhaka Clock & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0d0d12]/90 border border-white/[0.08] p-4 sm:p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#ff6a00]/15 border border-[#ff6a00]/30 text-[#ff8804]">
              <Radio size={16} className="animate-pulse" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Team Live Tracking & Attendance
            </h2>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Ping
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time status monitoring, current active tasks, and team availability.
          </p>
        </div>

        {/* Live Clock & Counter badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 flex items-center gap-2">
            <Globe size={13} className="text-[#ff6a00]" />
            <span>Dhaka HQ (GMT+6):</span>
            <span className="text-white font-bold">{currentTime || "--:--:--"}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 border border-white/[0.08] p-1 rounded-xl">
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              {workingCount} Working
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/20">
              {meetingCount} In Meeting
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800/30 text-zinc-400 border border-zinc-800/40">
              {leaveCount} On Leave
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {(
            [
              { id: "all", label: `All Members (${team.length})` },
              { id: "working", label: `Working (${workingCount})` },
              { id: "meeting", label: `In Meeting (${meetingCount})` },
              { id: "leave", label: `On Leave (${leaveCount})` },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                filter === item.id
                  ? "bg-[#ff6a00] text-black font-semibold shadow-[0_0_12px_rgba(255,106,0,0.3)]"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member, project, task..."
            className="w-full pl-9 pr-3 py-1.5 bg-white/[0.03] border border-white/[0.08] focus:border-[#ff6a00]/50 rounded-xl text-xs text-white placeholder-zinc-500 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTeam.map((member) => {
          const isWorking = member.status === "working";
          const isMeeting = member.status === "meeting";
          const isLeave = member.status === "leave";

          return (
            <div
              key={member.id}
              className={`group relative bg-[#0e0e13]/90 hover:bg-[#121218]/95 border rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden ${
                isWorking
                  ? "border-emerald-500/20 hover:border-emerald-500/40"
                  : isMeeting
                  ? "border-amber-500/20 hover:border-amber-500/40"
                  : "border-zinc-800/20 hover:border-zinc-800/40 opacity-80"
              }`}
            >
              {/* Radial Glow based on status */}
              <div
                className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity ${
                  isWorking
                    ? "bg-emerald-500/15"
                    : isMeeting
                    ? "bg-amber-500/15"
                    : "bg-zinc-600/10"
                }`}
              />

              {/* Card Top: Avatar, Name, Designation & Status */}
              <div>
                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3">
                    {/* Glowing Avatar on hover */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-zinc-900 group-hover:border-[#ff6a00]/40 transition-colors">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <Image
                        src={member.glowAvatar}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      {/* Status indicator pin */}
                      <span
                        className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-[#0e0e13] ${
                          isWorking
                            ? "bg-emerald-500"
                            : isMeeting
                            ? "bg-amber-500"
                            : "bg-zinc-500"
                        }`}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white tracking-tight truncate">
                          {member.name}
                        </h3>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {member.designation}
                      </p>
                      <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ff8804]">
                        {member.position}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <button
                    onClick={() => toggleStatus(member.id)}
                    title="Click to toggle status for testing"
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border cursor-pointer transition-all hover:scale-105 ${
                      isWorking
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                        : isMeeting
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                        : "bg-zinc-800/40 text-zinc-400 border-zinc-800/40"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isWorking
                          ? "bg-emerald-400 animate-pulse"
                          : isMeeting
                          ? "bg-amber-400 animate-pulse"
                          : "bg-zinc-500"
                      }`}
                    />
                    <span>
                      {isWorking
                        ? "Working"
                        : isMeeting
                        ? "In Meeting"
                        : "On Leave"}
                    </span>
                  </button>
                </div>

                {/* Current Active Task / Focus Area */}
                <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] relative z-10 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Activity size={12} className={isWorking ? "text-emerald-400" : isMeeting ? "text-amber-400" : "text-zinc-500"} />
                      Active Focus
                    </span>
                    <span className="text-zinc-400 font-mono text-[10px]">
                      {member.projectAssigned}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 font-medium leading-snug line-clamp-2">
                    {isLeave && member.statusNote ? member.statusNote : member.currentTask}
                  </p>
                </div>
              </div>

              {/* Bottom Metadata: Hours logged, Active tool, Last active */}
              <div className="mt-4 pt-3 border-t border-white/[0.05] relative z-10 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock size={12} className="text-[#ff6a00]" />
                    <span>Logged:</span>
                    <span className="text-white font-mono font-semibold">
                      {member.hoursToday}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 truncate">
                    <Laptop size={12} className="text-cyan-400 shrink-0" />
                    <span className="truncate">{member.activeTool}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>{member.lastActive}</span>
                  <span>{member.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
