"use client";

import React, { useState } from "react";
import {
  FolderKanban,
  Clock,
  AlertCircle,
  ExternalLink,
  Check,
} from "lucide-react";

export interface RunningProject {
  id: string;
  name: string;
  category: string;
  progress: number;
  health: "on_track" | "review_needed" | "ahead";
  milestone: string;
  totalMilestones: number;
  completedMilestones: number;
  deadline: string;
  daysRemaining: number;
  tech: string[];
  team: string[];
  budget: string;
  liveUrl?: string;
}

export interface PendingWorkItem {
  id: string;
  project: string;
  title: string;
  blockerReason: string;
  priority: "urgent" | "high" | "medium";
  assignee: string;
  dateAdded: string;
  resolved: boolean;
}

export interface UpcomingWorkItem {
  id: string;
  name: string;
  client: string;
  country: string;
  kickoffDate: string;
  projectedValue: string;
  teamLead: string;
  scope: string;
  status: "contract_signed" | "discovery" | "proposal_review";
}

const RUNNING_PROJECTS: RunningProject[] = [
  {
    id: "palace-resort",
    name: "The Palace Resort",
    category: "Luxury Hospitality Management",
    progress: 85,
    health: "on_track",
    milestone: "Stripe Booking Engine & Automated Room Inventory Sync",
    totalMilestones: 5,
    completedMilestones: 4,
    deadline: "Oct 15, 2026",
    daysRemaining: 16,
    tech: ["Next.js 15", "TypeScript", "GSAP", "Tailwind CSS"],
    team: ["MD Abu Sahid", "Nahid Akter Jenifa"],
    budget: "$28,500",
    liveUrl: "https://the-palace-resort.vercel.app",
  },
  {
    id: "meetup-food",
    name: "Meetup Food Platform",
    category: "Multi-vendor Delivery & Admin",
    progress: 68,
    health: "review_needed",
    milestone: "Sprint 3: Realtime Supabase Driver Geo-tracking & Push Notifications",
    totalMilestones: 6,
    completedMilestones: 4,
    deadline: "Oct 28, 2026",
    daysRemaining: 29,
    tech: ["Next.js", "Supabase", "Tailwind CSS", "GSAP"],
    team: ["Joyant Sheikhar Gupta Joy", "Abid Shahriar"],
    budget: "$22,000",
    liveUrl: "https://meetup-restaurant.vercel.app",
  },
  {
    id: "skylet-bank",
    name: "Skylet Bank Ltd Portal",
    category: "Secure Banking & Crypto Vault",
    progress: 92,
    health: "ahead",
    milestone: "Final Pen-Testing, 2FA Biometrics & Micro-Interactions",
    totalMilestones: 5,
    completedMilestones: 5,
    deadline: "Oct 08, 2026",
    daysRemaining: 9,
    tech: ["React", "Three.js", "GSAP", "Framer Motion"],
    team: ["MD Abu Sahid", "Joyant Sheikhar Gupta Joy"],
    budget: "$34,000",
    liveUrl: "https://skyletbankltd.netlify.app",
  },
  {
    id: "ai-saas",
    name: "AI SaaS Enterprise Landing",
    category: "Interactive Conversion Funnel",
    progress: 45,
    health: "on_track",
    milestone: "Phase 2: Interactive Dynamic ROI Calculator & Dark Theme",
    totalMilestones: 4,
    completedMilestones: 2,
    deadline: "Nov 12, 2026",
    daysRemaining: 44,
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    team: ["Nahid Akter Jenifa", "MD Abu Sahid"],
    budget: "$14,500",
  },
];

const INITIAL_PENDING_WORKS: PendingWorkItem[] = [
  {
    id: "pw-1",
    project: "Lunaria Hill Hospital v2",
    title: "Client DNS & SSL Certificate Delegation",
    blockerReason: "Waiting for Hospital IT Admin to map Cloudflare nameservers",
    priority: "urgent",
    assignee: "Joyant Sheikhar Gupta Joy",
    dateAdded: "Sep 27, 2026",
    resolved: false,
  },
  {
    id: "pw-2",
    project: "Skylet Bank Ltd",
    title: "SSLCommerz Sandbox Merchant Key Approval",
    blockerReason: "Compliance document review pending at acquiring bank",
    priority: "high",
    assignee: "Abid Shahriar",
    dateAdded: "Sep 28, 2026",
    resolved: false,
  },
  {
    id: "pw-3",
    project: "The Palace Resort",
    title: "Figma High-Res Assets for Retina Displays",
    blockerReason: "Exporting 4K optimized SVG iconography with dark mode variants",
    priority: "medium",
    assignee: "Nahid Akter Jenifa",
    dateAdded: "Sep 29, 2026",
    resolved: false,
  },
  {
    id: "pw-4",
    project: "Meetup Food Platform",
    title: "Performance Optimization for Mobile WebGL Canvas",
    blockerReason: "Lighthouse mobile performance audit needs improvement to 95+",
    priority: "high",
    assignee: "MD Abu Sahid",
    dateAdded: "Sep 29, 2026",
    resolved: false,
  },
];

const UPCOMING_WORKS: UpcomingWorkItem[] = [
  {
    id: "uw-1",
    name: "AeroLogistics Global Tracking Portal",
    client: "AeroLogistics Corp",
    country: "Singapore",
    kickoffDate: "Oct 10, 2026",
    projectedValue: "$18,500",
    teamLead: "Joyant Sheikhar Gupta Joy",
    scope: "Realtime cargo tracking, IoT telemetry integration, enterprise fleet dashboard",
    status: "contract_signed",
  },
  {
    id: "uw-2",
    name: "Nordic Wood Craft Luxury E-Commerce",
    client: "Nordic Heritage Ltd",
    country: "Sweden",
    kickoffDate: "Oct 18, 2026",
    projectedValue: "$9,200",
    teamLead: "MD Abu Sahid",
    scope: "Minimalist Scandinavian design, 3D product customizer, headless Shopify backend",
    status: "contract_signed",
  },
  {
    id: "uw-3",
    name: "HealthPulse Telemedicine App",
    client: "HealthPulse Global",
    country: "USA",
    kickoffDate: "Nov 01, 2026",
    projectedValue: "$24,000",
    teamLead: "Abid Shahriar",
    scope: "HIPAA-compliant video consults, digital prescription management, React Native mobile",
    status: "discovery",
  },
  {
    id: "uw-4",
    name: "FinTrack Web3 Crypto Portfolio",
    client: "FinTrack Labs",
    country: "Dubai, UAE",
    kickoffDate: "Nov 15, 2026",
    projectedValue: "$15,800",
    teamLead: "MD Abu Sahid",
    scope: "Multi-chain wallet tracking, automated tax reporting, sleek dark cyberpunk UI",
    status: "proposal_review",
  },
];

export default function ProjectsProgressHub() {
  const [activeTab, setActiveTab] = useState<"running" | "pending" | "upcoming">("running");
  const [pendingItems, setPendingItems] = useState<PendingWorkItem[]>(INITIAL_PENDING_WORKS);

  const togglePendingResolved = (id: string) => {
    setPendingItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  const pendingUnresolvedCount = pendingItems.filter((i) => !i.resolved).length;

  return (
    <div id="projects" className="space-y-4">
      {/* Section Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900 border border-white/10 p-5 rounded-3xl shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-zinc-950 border border-white/10 text-zinc-300">
              <FolderKanban size={16} />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Projects Progress & Pipeline Hub
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track current running projects progress, pending blockers, and upcoming contracts.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-white/10 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("running")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "running"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Running ({RUNNING_PROJECTS.length})
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "pending"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>Pending Works</span>
            <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono">
              {pendingUnresolvedCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "upcoming"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Upcoming ({UPCOMING_WORKS.length})
          </button>
        </div>
      </div>

      {/* TAB 1: RUNNING PROJECTS */}
      {activeTab === "running" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {RUNNING_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 transition-all duration-200 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-zinc-950 text-zinc-300 border border-white/10">
                      {project.health === "ahead"
                        ? "Ahead of Schedule"
                        : project.health === "review_needed"
                        ? "Review Needed"
                        : "On Track"}
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-950 text-zinc-400 hover:text-white transition-colors border border-white/5"
                        title="Open Live Preview"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Progress</span>
                    <span className="text-white font-mono font-bold text-sm">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden p-[1px] border border-white/5">
                    <div
                      className="h-full rounded-full bg-[#ff6a00] transition-all duration-700"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Active Milestone Card */}
                <div className="mt-3.5 p-3 rounded-2xl bg-zinc-950/60 border border-white/5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Current Milestone</span>
                    <span className="font-mono text-zinc-300">
                      {project.completedMilestones}/{project.totalMilestones} Phases Complete
                    </span>
                  </div>
                  <p className="text-xs font-medium text-zinc-200 mt-1 line-clamp-1">
                    {project.milestone}
                  </p>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-zinc-950 border border-white/10 text-[10px] font-mono text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <div>
                    <span className="text-zinc-500 text-[11px]">Assigned: </span>
                    <span className="text-zinc-300 font-medium text-[11px]">
                      {project.team.join(", ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock size={12} className="text-[#ff6a00]" />
                    <span className="text-white font-semibold">{project.daysRemaining}d left</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: PENDING WORKS */}
      {activeTab === "pending" && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/10 text-xs text-zinc-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-zinc-400" />
              <span>
                <strong>{pendingUnresolvedCount} Pending Work Items</strong> currently require client signoff, credential handover, or developer review.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className={`bg-zinc-900 border rounded-3xl p-4 transition-all duration-200 flex flex-col justify-between ${
                  item.resolved
                    ? "opacity-50 border-white/5"
                    : "border-white/10 hover:border-white/[0.18] shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                        {item.project}
                      </span>
                      <h4
                        className={`text-sm font-bold mt-0.5 truncate ${
                          item.resolved ? "text-zinc-500 line-through" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>

                    <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-zinc-950 border border-white/10 text-zinc-300">
                      {item.priority}
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-2xl bg-zinc-950/60 border border-white/5 text-xs text-zinc-300">
                    <span className="text-zinc-500 text-[11px] block mb-0.5 font-medium">
                      Action Needed:
                    </span>
                    {item.blockerReason}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-zinc-400">
                    <span>Owner: </span>
                    <strong className="text-zinc-200">{item.assignee}</strong>
                  </div>

                  <button
                    onClick={() => togglePendingResolved(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      item.resolved
                        ? "bg-zinc-950 text-zinc-500"
                        : "bg-zinc-950 hover:bg-zinc-800 text-white border border-white/10"
                    }`}
                  >
                    <Check size={13} />
                    <span>{item.resolved ? "Resolved" : "Mark Resolved"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: UPCOMING WORKS */}
      {activeTab === "upcoming" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {UPCOMING_WORKS.map((upcoming) => (
            <div
              key={upcoming.id}
              className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 transition-all duration-200 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block">
                      {upcoming.client} • {upcoming.country}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                      {upcoming.name}
                    </h3>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-zinc-950 text-zinc-300 border border-white/10">
                    {upcoming.status.replace("_", " ")}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 mt-3 p-3 rounded-2xl bg-zinc-950/60 border border-white/5">
                  {upcoming.scope}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <span className="text-zinc-500 block">Value</span>
                  <span className="text-white font-mono font-bold text-xs">
                    {upcoming.projectedValue}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Kickoff</span>
                  <span className="text-white font-mono font-medium">
                    {upcoming.kickoffDate}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Lead</span>
                  <span className="text-zinc-300 font-medium truncate block">
                    {upcoming.teamLead.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
