"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  Video,
  Plus,
} from "lucide-react";

export interface ScheduleMeeting {
  id: string;
  title: string;
  timeSlot: string;
  exactTime: string;
  platform: "Google Meet" | "Zoom" | "Discord";
  meetUrl: string;
  attendees: { name: string; avatar: string }[];
  status: "upcoming" | "scheduled";
}

const MEETINGS_DATA: ScheduleMeeting[] = [
  {
    id: "meet-1",
    title: "Client Architecture Kickoff (AeroLogistics)",
    timeSlot: "19:30 - 20:30",
    exactTime: "Starts in 1h 45m",
    platform: "Google Meet",
    meetUrl: "https://meet.google.com/cre-arch-log",
    attendees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
    ],
    status: "upcoming",
  },
  {
    id: "meet-2",
    title: "Sprint 42 Retrospective & Sync",
    timeSlot: "11:00 - 12:00",
    exactTime: "Tomorrow Morning",
    platform: "Discord",
    meetUrl: "https://discord.gg/crevosys",
    attendees: [
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
      { name: "Joyant Sheikhar", avatar: "/Team/joyant_withoutGlow.webp" },
      { name: "Mahbuba Khanom", avatar: "/Team/mumu_withoutGlow.webp" },
      { name: "Abid Shahriar", avatar: "/Team/abid_withoutGlow.webp" },
    ],
    status: "scheduled",
  },
  {
    id: "meet-3",
    title: "Nordic Wood 3D Customizer Review",
    timeSlot: "16:00 - 17:00",
    exactTime: "Oct 02, 2026",
    platform: "Zoom",
    meetUrl: "https://zoom.us/j/9823482394",
    attendees: [
      { name: "Mahbuba Khanom", avatar: "/Team/mumu_withoutGlow.webp" },
      { name: "MD Abu Sahid", avatar: "/Team/sahid_withoutGlow.webp" },
    ],
    status: "scheduled",
  },
];

export default function UpcomingMeetingsSchedule() {
  const [selectedDay, setSelectedDay] = useState(30);

  const days = [
    { day: "Mon", date: 28 },
    { day: "Tue", date: 29 },
    { day: "Wed", date: 30 },
    { day: "Thu", date: 1 },
    { day: "Fri", date: 2 },
    { day: "Sat", date: 3 },
  ];

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 shadow-md space-y-4 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-zinc-950 text-zinc-300 border border-white/10">
              <CalendarIcon size={14} />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Upcoming Meetings
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            September 2026 • Live Schedule
          </span>
        </div>

        <a
          href="https://meet.google.com/new"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-[11px] transition-all cursor-pointer border border-white/10 shadow-sm"
        >
          <Plus size={12} />
          <span>New Call</span>
        </a>
      </div>

      {/* Date Ribbon */}
      <div className="grid grid-cols-6 gap-1.5 p-1 bg-zinc-950 border border-white/10 rounded-2xl">
        {days.map((item) => {
          const isSelected = selectedDay === item.date;
          return (
            <button
              key={`${item.day}-${item.date}`}
              onClick={() => setSelectedDay(item.date)}
              className={`py-2 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? "bg-white/10 text-white font-bold border border-white/15 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="text-[10px] uppercase font-mono">{item.day}</span>
              <span className="text-sm font-mono mt-0.5">{item.date}</span>
            </button>
          );
        })}
      </div>

      {/* Meeting Timeline Items */}
      <div className="space-y-3 pt-1">
        {MEETINGS_DATA.map((meeting) => (
          <div
            key={meeting.id}
            className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-white/10 transition-all duration-200 space-y-2 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {meeting.platform} • {meeting.timeSlot}
                </span>
                <h4 className="text-xs font-bold text-white tracking-tight mt-0.5">
                  {meeting.title}
                </h4>
              </div>

              <span
                className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold ${
                  meeting.status === "upcoming"
                    ? "bg-[#ff6a00]/15 text-[#ff8804] border border-[#ff6a00]/30"
                    : "bg-white/5 text-zinc-400"
                }`}
              >
                {meeting.exactTime}
              </span>
            </div>

            {/* Bottom: Attendees & Join Button */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center -space-x-1.5">
                {meeting.attendees.map((att, idx) => (
                  <div
                    key={idx}
                    className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-900"
                    title={att.name}
                  >
                    <Image
                      src={att.avatar}
                      alt={att.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <a
                href={meeting.meetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-medium transition-colors border border-white/10"
              >
                <Video size={11} />
                <span>Join Call</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
