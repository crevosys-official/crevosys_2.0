"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Video,
  Users,
  ExternalLink,
  Plus,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

export interface MeetingItem {
  id: string;
  title: string;
  type: "client" | "internal" | "design" | "executive";
  date: string;
  time: string;
  relativeTime: string;
  platform: "Google Meet" | "Zoom" | "Discord";
  meetUrl: string;
  attendees: {
    name: string;
    avatar: string;
  }[];
  agenda: string;
}

const INITIAL_MEETINGS: MeetingItem[] = [
  {
    id: "m-1",
    title: "Enterprise Architecture Review - AeroLogistics",
    type: "client",
    date: "Today",
    time: "07:30 PM (GMT+6)",
    relativeTime: "Starts in 1h 45m",
    platform: "Google Meet",
    meetUrl: "https://meet.google.com/cre-arch-log",
    attendees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
    ],
    agenda: "Finalize telemetry ingestion schema & AWS GovCloud container orchestration parameters.",
  },
  {
    id: "m-2",
    title: "Sprint 42 Retrospective & Architecture Sync",
    type: "internal",
    date: "Tomorrow",
    time: "11:00 AM (GMT+6)",
    relativeTime: "Tomorrow Morning",
    platform: "Discord",
    meetUrl: "https://discord.gg/crevosys-team",
    attendees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
      { name: "Mahbuba Khanom", avatar: "/Team/mumu_withoutGlow.webp" },
      { name: "Abid Shahriar", avatar: "/Team/abid_withoutGlow.webp" },
      { name: "Nahid Jenifa", avatar: "/Team/jenifa_withoutGlow.webp" },
    ],
    agenda: "Review velocity on The Palace Resort booking engine and plan upcoming AeroLogistics kickoff.",
  },
  {
    id: "m-3",
    title: "Brand Identity & 3D Interactive Assets Signoff",
    type: "design",
    date: "Oct 02, 2026",
    time: "04:00 PM (GMT+6)",
    relativeTime: "In 3 days",
    platform: "Zoom",
    meetUrl: "https://zoom.us/j/9823482394",
    attendees: [
      { name: "Mahbuba Khanom", avatar: "/Team/mumu_withoutGlow.webp" },
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
    ],
    agenda: "Present Nordic Wood 3D product customizer models and dark/light typography system.",
  },
  {
    id: "m-4",
    title: "Q4 Financial & Revenue Pipeline Review",
    type: "executive",
    date: "Oct 05, 2026",
    time: "10:00 AM (GMT+6)",
    relativeTime: "Next Monday",
    platform: "Google Meet",
    meetUrl: "https://meet.google.com/cre-exec-rev",
    attendees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Abid Shahriar", avatar: "/Team/abid_withoutGlow.webp" },
      { name: "Shamsul Islam", avatar: "/Team/sumon_withoutGlow.webp" },
    ],
    agenda: "Quarterly milestone reconciliation, Upwork enterprise retainers, and cashflow forecast.",
  },
];

export default function UpcomingMeetings() {
  const [meetings, setMeetings] = useState<MeetingItem[]>(INITIAL_MEETINGS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMeeting: MeetingItem = {
      id: `m-${Date.now()}`,
      title: newTitle,
      type: "client",
      date: "Scheduled",
      time: newTime || "03:00 PM (GMT+6)",
      relativeTime: "Upcoming",
      platform: "Google Meet",
      meetUrl: "https://meet.google.com/cre-custom-call",
      attendees: [{ name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" }],
      agenda: "General client consultation and project alignment session.",
    };

    setMeetings((prev) => [newMeeting, ...prev]);
    setNewTitle("");
    setNewTime("");
    setShowQuickAdd(false);
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d0d12]/90 border border-white/[0.08] p-4 sm:p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <Calendar size={16} />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Upcoming Meetings & Client Calls
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25">
              Google Meet & Zoom
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Scheduled client reviews, sprint retrospectives, and architecture alignments.
          </p>
        </div>

        <button
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#ff6a00] hover:bg-[#ff8804] text-black font-semibold text-xs transition-all shadow-[0_0_16px_rgba(255,106,0,0.3)] cursor-pointer self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Schedule Call</span>
        </button>
      </div>

      {/* Quick Add Form Drawer */}
      {showQuickAdd && (
        <form
          onSubmit={handleAddMeeting}
          className="p-4 rounded-2xl bg-[#12121a] border border-[#ff6a00]/30 space-y-3 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Schedule Meeting
            </h4>
            <button
              type="button"
              onClick={() => setShowQuickAdd(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Meeting topic (e.g., Client Architecture Kickoff)"
              className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff6a00]"
            />
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Time & Date (e.g. Today, 5:00 PM)"
              className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-[#ff6a00]"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-[#ff6a00] text-black font-semibold text-xs rounded-xl hover:bg-[#ff8804] transition-all cursor-pointer"
          >
            Confirm & Save to Calendar
          </button>
        </form>
      )}

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meetings.map((meeting) => {
          const isUrgent = meeting.date === "Today";

          return (
            <div
              key={meeting.id}
              className={`group relative bg-[#0e0e13]/90 hover:bg-[#121218]/95 border rounded-2xl p-5 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between ${
                isUrgent
                  ? "border-[#ff6a00]/30 hover:border-[#ff6a00]/60"
                  : "border-white/[0.08] hover:border-blue-500/40"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        {meeting.platform}
                      </span>
                      <span
                        className={`px-2 py-0.2 rounded-full text-[10px] font-mono font-semibold ${
                          isUrgent
                            ? "bg-[#ff6a00]/15 text-[#ff8804] border border-[#ff6a00]/30 animate-pulse"
                            : "bg-white/[0.04] text-zinc-400"
                        }`}
                      >
                        {meeting.relativeTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight mt-1 group-hover:text-[#ff8804] transition-colors">
                      {meeting.title}
                    </h3>
                  </div>

                  <span
                    className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                      meeting.type === "client"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/25"
                        : meeting.type === "design"
                        ? "bg-pink-500/10 text-pink-400 border-pink-500/25"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/25"
                    }`}
                  >
                    {meeting.type}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#ff6a00]" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-blue-400" />
                    <span>{meeting.time}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mt-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] line-clamp-2">
                  {meeting.agenda}
                </p>
              </div>

              {/* Bottom: Attendees & Join Action */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
                {/* Attendees Avatars */}
                <div className="flex items-center -space-x-2">
                  {meeting.attendees.map((att, i) => (
                    <div
                      key={i}
                      className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-[#0e0e13] bg-zinc-800"
                      title={att.name}
                    >
                      <Image
                        src={att.avatar}
                        alt={att.name}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <span className="pl-3 text-[11px] text-zinc-500">
                    {meeting.attendees.length} participants
                  </span>
                </div>

                {/* Actions: Copy Link & Join */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyLink(meeting.id, meeting.meetUrl)}
                    title="Copy Meeting Link"
                    className="p-1.5 rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    {copiedId === meeting.id ? (
                      <Check size={13} className="text-emerald-400" />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>

                  <a
                    href={meeting.meetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-medium text-xs transition-colors"
                  >
                    <Video size={13} className="text-[#ff6a00]" />
                    <span>Join</span>
                    <ExternalLink size={11} className="opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
