"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";

interface DataPoint {
  date: string;
  revenue: number;
  lastMonth: number;
  label: string;
}

const CHART_DATA: DataPoint[] = [
  { date: "Jan 1", revenue: 5200, lastMonth: 4100, label: "Jan 1, 2026" },
  { date: "Jan 5", revenue: 6400, lastMonth: 5300, label: "Jan 5, 2026" },
  { date: "Jan 8", revenue: 5800, lastMonth: 5900, label: "Jan 8, 2026" },
  { date: "Jan 12", revenue: 9800, lastMonth: 6200, label: "Jan 12, 2026" },
  { date: "Jan 15", revenue: 8600, lastMonth: 7100, label: "Jan 15, 2026" },
  { date: "Jan 18", revenue: 14200, lastMonth: 8400, label: "Jan 18, 2026" },
  { date: "Jan 22", revenue: 11800, lastMonth: 9200, label: "Jan 22, 2026" },
  { date: "Jan 26", revenue: 16400, lastMonth: 10100, label: "Jan 26, 2026" },
  { date: "Jan 29", revenue: 19500, lastMonth: 11400, label: "Jan 29, 2026" },
];

export default function RevenueChartCard() {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(CHART_DATA[5]);
  const [period, setPeriod] = useState<"30d" | "quarter" | "year">("30d");

  const maxVal = 22000;
  const width = 600;
  const height = 180;
  const paddingX = 20;
  const paddingY = 20;

  const getCoordinates = (val: number, index: number) => {
    const x = paddingX + (index / (CHART_DATA.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (val / maxVal) * (height - paddingY * 2);
    return { x, y };
  };

  const pointsPrimary = CHART_DATA.map((d, i) => getCoordinates(d.revenue, i));
  const pointsSecondary = CHART_DATA.map((d, i) => getCoordinates(d.lastMonth, i));

  const pathD = pointsPrimary.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pointsPrimary[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, "");

  const areaD = `${pathD} L ${pointsPrimary[pointsPrimary.length - 1].x} ${height - paddingY} L ${pointsPrimary[0].x} ${height - paddingY} Z`;

  const pathSecondaryD = pointsSecondary.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pointsSecondary[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, "");

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md relative overflow-hidden transition-colors">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Projects Revenue
          </span>
          <div className="flex items-baseline gap-3 mt-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              $184,500
            </h3>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-mono">
              <TrendingUp size={12} />
              +24.4% <span className="text-zinc-500 font-normal">vs last period</span>
            </span>
          </div>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-white/10 rounded-2xl self-start sm:self-auto">
          {(
            [
              { id: "30d", label: "Last 30 days" },
              { id: "quarter", label: "Q4 2026" },
              { id: "year", label: "This Year" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setPeriod(t.id)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                period === t.id
                  ? "bg-white/10 text-white font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chart Canvas */}
      <div className="mt-6 relative w-full h-52 select-none">
        {hoveredPoint && (
          <div
            className="absolute top-2 z-20 pointer-events-none transition-all duration-150 transform -translate-x-1/2 bg-zinc-950 border border-white/10 rounded-2xl p-3 shadow-xl backdrop-blur-md"
            style={{
              left: `${
                (CHART_DATA.findIndex((p) => p.date === hoveredPoint.date) /
                  (CHART_DATA.length - 1)) *
                  80 +
                10
              }%`,
            }}
          >
            <span className="text-[11px] font-mono text-zinc-400 block mb-1 font-medium">
              {hoveredPoint.label}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
              <span className="text-zinc-400">Current:</span>
              <strong className="text-white font-mono">
                ${hoveredPoint.revenue.toLocaleString()}
              </strong>
            </div>
            <div className="flex items-center gap-2 text-xs mt-0.5">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="text-zinc-400">Previous:</span>
              <span className="text-zinc-400 font-mono">
                ${hoveredPoint.lastMonth.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="revGradientDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ff6a00" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={(height - paddingY) / 2} x2={width - paddingX} y2={(height - paddingY) / 2} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

          {/* Area fill */}
          <path d={areaD} fill="url(#revGradientDark)" />

          {/* Secondary dotted line (last period) */}
          <path
            d={pathSecondaryD}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Main revenue line */}
          <path
            d={pathD}
            fill="none"
            stroke="#ff6a00"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hoverable points */}
          {pointsPrimary.map((pt, idx) => {
            const data = CHART_DATA[idx];
            const isHovered = hoveredPoint?.date === data.date;
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredPoint(data)}
                className="cursor-pointer"
              >
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="#ff6a00"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.8"
                  />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 3.5}
                  fill={isHovered ? "#ffffff" : "#ff6a00"}
                  stroke="#18181b"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* X-Axis Dates */}
        <div className="flex justify-between px-2 pt-2 text-[10px] font-mono text-zinc-500 border-t border-white/5">
          {CHART_DATA.map((d, i) => (
            <span key={i} className={hoveredPoint?.date === d.date ? "text-[#ff6a00] font-bold" : ""}>
              {d.date}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Category Breakdown Bars */}
      <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            <span>Web Applications</span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono text-white">$108,400</span>
            <span className="text-[11px] font-mono text-zinc-500">18 projects</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            <span>UI/UX & Branding</span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono text-white">$48,200</span>
            <span className="text-[11px] font-mono text-zinc-500">14 projects</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
            <span>Retainers & SLA</span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="text-xl font-bold font-mono text-white">$27,900</span>
            <span className="text-[11px] font-mono text-zinc-500">10 retainers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
