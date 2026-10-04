"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FolderKanban,
  Clock,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export interface ProjectCardItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  dateStart: string;
  daysLeft: number;
  team: { name: string; avatar: string }[];
  liveUrl?: string;
  statusText: string;
}

const RUNNING_PROJECTS: ProjectCardItem[] = [
  {
    id: "palace-resort",
    title: "The Palace Resort",
    category: "Hospitality Web Suite",
    progress: 85,
    dateStart: "Oct 15, 2026",
    daysLeft: 16,
    team: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Nahid Akter Jenifa", avatar: "/Team/jenifa_withoutGlow.webp" },
    ],
    liveUrl: "https://the-palace-resort.vercel.app",
    statusText: "Booking Engine & Inventory Sync",
  },
  {
    id: "meetup-food",
    title: "Meetup Food Platform",
    category: "Multi-vendor Delivery",
    progress: 68,
    dateStart: "Oct 28, 2026",
    daysLeft: 29,
    team: [
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
      { name: "Abid Shahriar", avatar: "/Team/abid_withoutGlow.webp" },
    ],
    liveUrl: "https://meetup-restaurant.vercel.app",
    statusText: "Supabase Driver Geo-tracking",
  },
  {
    id: "skylet-bank",
    title: "Skylet Bank Portal",
    category: "Fintech & Banking",
    progress: 92,
    dateStart: "Oct 08, 2026",
    daysLeft: 9,
    team: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
    ],
    liveUrl: "https://skyletbankltd.netlify.app",
    statusText: "Final Pen-Testing & Biometrics",
  },
];

export default function RunningProjectsCards() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10">
              <FolderKanban size={16} />
            </span>
            Current Running Projects
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Active sprints, delivery milestones, and velocity tracking
          </p>
        </div>

        <Link
          href="#projects"
          className="text-xs text-zinc-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
        >
          <span>View all 8 projects</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* 3 Horizontal Cards in zinc-900 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RUNNING_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group relative bg-zinc-900 hover:bg-zinc-900/95 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 transition-all duration-200 shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Top: Date & Category */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>{project.dateStart}</span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Live Preview"
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              {/* Title & Category */}
              <h4 className="text-base font-bold text-white mt-1 group-hover:text-zinc-100 transition-colors">
                {project.title}
              </h4>
              <span className="text-xs text-zinc-400 font-medium block mt-0.5">
                {project.category}
              </span>

              {/* Progress Section */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">Progress</span>
                  <span className="text-white font-mono font-bold">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden p-[1px] border border-white/5">
                  <div
                    className="h-full rounded-full bg-[#ff6a00] transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Team Avatars & Days Left Badge */}
            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between">
              {/* Avatars stack */}
              <div className="flex items-center -space-x-2">
                {project.team.map((mem, i) => (
                  <div
                    key={i}
                    className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-zinc-900 bg-zinc-800"
                    title={mem.name}
                  >
                    <Image
                      src={mem.avatar}
                      alt={mem.name}
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Days left pill */}
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-zinc-950 border border-white/10 text-zinc-300 flex items-center gap-1">
                <Clock size={11} className="text-[#ff6a00]" />
                {project.daysLeft} days left
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
