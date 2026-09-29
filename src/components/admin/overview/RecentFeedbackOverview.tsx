"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquareQuote,
  Star,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Globe,
  Quote,
  ExternalLink,
} from "lucide-react";

export interface FeedbackItem {
  id: number;
  feedback: string;
  sender_profile: string;
  sender_name: string;
  sender_country: string;
  project: string;
  date: string;
  rating: number;
}

const FEEDBACK_LIST: FeedbackItem[] = [
  {
    id: 1,
    feedback:
      "Working with this team was a fantastic experience! They delivered our project ahead of schedule and exceeded our expectations.",
    sender_profile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    sender_name: "John Doe",
    sender_country: "USA",
    project: "The Palace Resort Hospitality Suite",
    date: "Oct 24, 2024",
    rating: 5,
  },
  {
    id: 2,
    feedback:
      "Their attention to detail and creative approach truly set them apart. Highly recommended for any design and high-performance web needs.",
    sender_profile:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    sender_name: "Robert Johnson",
    sender_country: "Canada",
    project: "Skylet Bank Modern Banking Landing",
    date: "Oct 19, 2024",
    rating: 5,
  },
  {
    id: 3,
    feedback:
      "Excellent communication and top-notch technical skills. Fast turnaround and spotless Next.js TypeScript implementation.",
    sender_profile:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    sender_name: "Jane Smith",
    sender_country: "UK",
    project: "Meetup Food Platform & Delivery",
    date: "Oct 11, 2024",
    rating: 5,
  },
  {
    id: 4,
    feedback:
      "The engineering depth and modern UI aesthetics transformed our core product into an industry benchmark. Outstanding team!",
    sender_profile:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    sender_name: "Marcus Chen",
    sender_country: "Singapore",
    project: "AI SaaS Enterprise Landing",
    date: "Sep 28, 2024",
    rating: 5,
  },
  {
    id: 5,
    feedback:
      "Outstanding experience from discovery to deployment. They anticipated our edge cases and delivered a lightning-fast application.",
    sender_profile:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    sender_name: "Sophia Martinez",
    sender_country: "Spain",
    project: "Hospital Telemedicine Portal",
    date: "Sep 02, 2024",
    rating: 5,
  },
];

export default function RecentFeedbackOverview() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const countries = ["all", ...Array.from(new Set(FEEDBACK_LIST.map((f) => f.sender_country)))];

  const filteredFeedback = FEEDBACK_LIST.filter((f) =>
    selectedFilter === "all" ? true : f.sender_country === selectedFilter
  );

  return (
    <div id="feedbacks" className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0d0d12]/90 border border-white/[0.08] p-4 sm:p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400">
              <MessageSquareQuote size={16} />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Recent Client Feedback & Sentiment
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/25">
              Verified Global Reviews
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real customer reviews across delivered projects and active enterprise retainers.
          </p>
        </div>

        {/* Global stats pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="font-bold">5.0 / 5.0</span>
            <span className="text-zinc-500">(48 reviews)</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <Sparkles size={13} />
            <span>99.4% Positive</span>
          </div>
        </div>
      </div>

      {/* Country Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs text-zinc-500 px-2 flex items-center gap-1">
          <Globe size={12} />
          Filter:
        </span>
        {countries.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedFilter(c)}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all capitalize cursor-pointer ${
              selectedFilter === c
                ? "bg-[#ff6a00] text-black font-semibold shadow-[0_0_10px_rgba(255,106,0,0.3)]"
                : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
            }`}
          >
            {c === "all" ? "All Countries" : c}
          </button>
        ))}
      </div>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFeedback.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0e0e13]/90 hover:bg-[#121218]/95 border border-white/[0.08] hover:border-pink-500/40 rounded-2xl p-5 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col justify-between"
          >
            <div>
              {/* Stars & Project */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
                    />
                  ))}
                </div>

                <span className="text-[10px] font-mono text-zinc-500">
                  {item.date}
                </span>
              </div>

              {/* Quote text */}
              <p className="text-xs text-zinc-300 mt-3.5 leading-relaxed relative">
                &ldquo;{item.feedback}&rdquo;
              </p>

              {/* Project tag */}
              <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-[#ff8804]">
                {item.project}
              </div>
            </div>

            {/* Author */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={item.sender_profile}
                  alt={item.sender_name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.sender_name}
                  </h4>
                  <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                </div>
                <span className="text-[11px] text-zinc-500">
                  {item.sender_country}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
