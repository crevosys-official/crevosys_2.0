"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DashboardHeaderBar from "@/components/admin/overview/DashboardHeaderBar";
import OverviewKpiRow from "@/components/admin/overview/OverviewKpiRow";
import RunningProjectProgression from "@/components/admin/overview/RunningProjectProgression";
import CrashAnalysis from "@/components/admin/overview/CrashAnalysis";
import FeedbackAndProductsTable from "@/components/admin/overview/FeedbackAndProductsTable";
import TeamLiveTrackingSidebar from "@/components/admin/overview/TeamLiveTrackingSidebar";
import UpcomingMeetingsSchedule from "@/components/admin/overview/UpcomingMeetingsSchedule";
import ReliabilityGaugeCard from "@/components/admin/overview/ReliabilityGaugeCard";
import AiAssistantCard from "@/components/admin/overview/AiAssistantCard";
import SystemHealthAndActivity from "@/components/admin/overview/SystemHealthAndActivity";

export default function AdminDashboardPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".dash-header", {
        opacity: 0,
        y: -15,
        duration: 0.5,
      })
        .from(
          ".dash-kpis",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".dash-main-col",
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".dash-side-col",
          {
            opacity: 0,
            x: 20,
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(
          ".dash-bottom-col",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3"
        );
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="space-y-6 select-none pb-16">
      {/* 1. Top Header Bar */}
      <div className="dash-header">
        <DashboardHeaderBar />
      </div>

      {/* 2. Top KPI Cards Row */}
      <div className="dash-kpis">
        <OverviewKpiRow />
      </div>

      {/* 3. Main 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT / MAIN COLUMN (8 cols - approx 67% width) */}
        <div className="dash-main-col lg:col-span-8 space-y-6">
          {/* Running Project Progression (Gantt Velocity Timeline) */}
          <RunningProjectProgression />

          {/* Top Performing Projects & Verified Feedback Table */}
          <FeedbackAndProductsTable />

          {/* Crash Analysis & Telemetry Log */}
          <div id="crash-analysis">
            <CrashAnalysis />
          </div>
        </div>

        {/* RIGHT SIDEBAR COLUMN (4 cols - approx 33% width) */}
        <div className="dash-side-col lg:col-span-4 flex flex-col gap-6">
          {/* Team Live Tracking & Attendance */}
          <TeamLiveTrackingSidebar />

          {/* Upcoming Meetings & Daily Calendar Schedule */}
          <UpcomingMeetingsSchedule />

          {/* Reliability Gauge */}
          <ReliabilityGaugeCard />

          {/* Crevosys AI Assistant Copilot - fills full height and eliminates bottom gap */}
          <div className="flex-1 flex flex-col min-h-[220px]">
            <AiAssistantCard />
          </div>
        </div>
      </div>

      {/* 4. Bottom Full-Width Infrastructure & Event Audit Stream */}
      <div className="dash-bottom-col">
        <SystemHealthAndActivity />
      </div>
    </div>
  );
}
