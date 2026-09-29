"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  RefreshCw,
  Terminal,
  Zap,
  Server,
  Bug,
} from "lucide-react";

export interface CrashEvent {
  id: string;
  code: string;
  project: string;
  message: string;
  stackTrace: string;
  severity: "critical" | "warning" | "resolved";
  timestamp: string;
  occurrences: number;
  environment: "Production" | "Staging";
  handled: boolean;
}

const CRASH_EVENTS: CrashEvent[] = [
  {
    id: "crash-101",
    code: "ERR_RESEND_RATE_LIMIT",
    project: "Meetup Food Platform",
    message: "Resend email webhook throttled under concurrent signup burst",
    stackTrace: "at sendNotificationEmail (api/auth/verify/route.ts:48:12)",
    severity: "resolved",
    timestamp: "Today, 14:22 GMT+6",
    occurrences: 3,
    environment: "Production",
    handled: true,
  },
  {
    id: "crash-102",
    code: "WARN_SUPABASE_POOL_SPIKE",
    project: "The Palace Resort",
    message: "Connection pool exhausted during peak booking schedule check",
    stackTrace: "at pgBouncer.acquireClient (lib/supabase.ts:112:5)",
    severity: "resolved",
    timestamp: "Today, 11:05 GMT+6",
    occurrences: 1,
    environment: "Production",
    handled: true,
  },
  {
    id: "crash-103",
    code: "INFO_WEBGL_FALLBACK",
    project: "Skylet Bank Ltd",
    message: "Low-end mobile browser failed WebGL2 context, gracefully reverted to CSS3 3D",
    stackTrace: "at initThreeCanvas (components/canvas/Hero3D.tsx:84:18)",
    severity: "warning",
    timestamp: "Yesterday, 19:40 GMT+6",
    occurrences: 8,
    environment: "Production",
    handled: true,
  },
  {
    id: "crash-104",
    code: "CACHE_PURGE_TIMEOUT",
    project: "Lunaria Hill Hospital",
    message: "Edge CDN stale revalidation timeout exceeded 3500ms threshold",
    stackTrace: "at revalidateTag (app/api/cache/route.ts:22:9)",
    severity: "resolved",
    timestamp: "Sep 27, 2026",
    occurrences: 2,
    environment: "Staging",
    handled: true,
  },
];

export default function CrashAnalysis() {
  const [events, setEvents] = useState<CrashEvent[]>(CRASH_EVENTS);
  const [filter, setFilter] = useState<"all" | "warning" | "resolved">("all");
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const handleRunDiagnostics = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
    }, 1000);
  };

  const filteredEvents = events.filter((e) =>
    filter === "all" ? true : e.severity === filter
  );

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md transition-colors space-y-5">
      {/* 1. Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-zinc-950 border border-white/10 text-zinc-300">
              <ShieldCheck size={16} />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Crash Analysis & System Health
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-950 text-zinc-400 border border-white/10 font-semibold">
              Production Verified
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Realtime exception monitoring, unhandled crash telemetry, and client crash-free rates.
          </p>
        </div>

        <button
          onClick={handleRunDiagnostics}
          disabled={isDiagnosing}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-white transition-all cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw size={13} className={isDiagnosing ? "animate-spin text-zinc-300" : ""} />
          <span>{isDiagnosing ? "Pinging Nodes..." : "Run Health Check"}</span>
        </button>
      </div>

      {/* 2. Diagnostics Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Crash-Free Rate</span>
            <ShieldCheck size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-white">99.94%</div>
          <p className="text-[11px] text-emerald-400 font-mono">0 fatal crashes in 24h</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Edge Load</span>
            <Zap size={14} className="text-zinc-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-white">142.8k</div>
          <p className="text-[11px] text-zinc-500 font-mono">22ms avg latency</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Handled Errors</span>
            <Bug size={14} className="text-zinc-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-white">2</div>
          <p className="text-[11px] text-zinc-400 font-mono">100% auto-recovered</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Server Uptime</span>
            <Server size={14} className="text-zinc-400" />
          </div>
          <div className="text-2xl font-mono font-extrabold text-white">99.99%</div>
          <p className="text-[11px] text-zinc-400 font-mono">Zero downtime</p>
        </div>
      </div>

      {/* 3. Crash Incident Log Stream */}
      <div className="pt-2 border-t border-white/5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal size={15} className="text-zinc-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Live Telemetry & Handled Exceptions Log
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            {(
              [
                { id: "all", label: `All (${events.length})` },
                { id: "warning", label: "Warnings" },
                { id: "resolved", label: "Resolved" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filter === t.id
                    ? "bg-white/10 text-white font-semibold border border-white/10"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="py-3 px-2 rounded-2xl hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-white tracking-tight">
                    {evt.code}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-950 text-zinc-400 border border-white/10">
                    {evt.project}
                  </span>
                  <span
                    className={`px-2 py-0.2 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      evt.severity === "resolved"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-white/5 text-zinc-300 border border-white/10"
                    }`}
                  >
                    {evt.severity}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-medium">
                  {evt.message}
                </p>

                <p className="text-[11px] font-mono text-zinc-500 truncate max-w-xl">
                  {evt.stackTrace}
                </p>
              </div>

              <div className="shrink-0 flex items-center md:flex-col md:items-end justify-between text-right text-xs">
                <span className="text-zinc-400 font-mono text-[11px]">{evt.timestamp}</span>
                <span className="text-[11px] text-zinc-500 font-mono mt-0.5">
                  {evt.occurrences} {evt.occurrences === 1 ? "occurrence" : "occurrences"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
