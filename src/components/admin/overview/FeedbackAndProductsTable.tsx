"use client";

import React from "react";
import {
  Star,
  FolderKanban,
  MoreHorizontal,
} from "lucide-react";

interface ProjectReviewRow {
  id: string;
  name: string;
  client: string;
  country: string;
  category: string;
  revenue: string;
  rating: number;
}

const ROWS: ProjectReviewRow[] = [
  {
    id: "#83009",
    name: "The Palace Resort",
    client: "John Doe",
    country: "USA",
    category: "Hospitality Web Suite",
    revenue: "$28,500",
    rating: 5.0,
  },
  {
    id: "#83001",
    name: "Skylet Bank Ltd",
    client: "Robert Johnson",
    country: "Canada",
    category: "Modern Banking Landing",
    revenue: "$34,000",
    rating: 5.0,
  },
  {
    id: "#83004",
    name: "Meetup Food Platform",
    client: "Jane Smith",
    country: "UK",
    category: "Delivery & Admin",
    revenue: "$22,000",
    rating: 5.0,
  },
  {
    id: "#83002",
    name: "AI SaaS Growth Landing",
    client: "Marcus Chen",
    country: "Singapore",
    category: "Conversion Funnel",
    revenue: "$14,500",
    rating: 4.9,
  },
  {
    id: "#83005",
    name: "Lunaria Hill Hospital",
    client: "Sophia Martinez",
    country: "Spain",
    category: "Healthcare Management",
    revenue: "$19,200",
    rating: 5.0,
  },
];

export default function FeedbackAndProductsTable() {
  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-6 shadow-md space-y-4 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Top Performing Projects & Client Ratings
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Verified client feedback, contract revenues, and client satisfaction
          </p>
        </div>

        <button className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 border-b border-white/10 pb-2">
              <th className="pb-3 font-semibold">ID</th>
              <th className="pb-3 font-semibold">Project & Client</th>
              <th className="pb-3 font-semibold hidden sm:table-cell">Category</th>
              <th className="pb-3 font-semibold">Revenue</th>
              <th className="pb-3 font-semibold">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ROWS.map((row) => (
              <tr key={row.id} className="group hover:bg-white/[0.02] transition-colors">
                {/* ID */}
                <td className="py-3.5 font-mono text-zinc-500 text-[11px]">
                  {row.id}
                </td>

                {/* Name with Icon badge */}
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold bg-zinc-950 text-zinc-300 border border-white/10 shrink-0">
                      <FolderKanban size={15} />
                    </div>
                    <div>
                      <span className="font-bold text-white block group-hover:text-[#ff8804] transition-colors">
                        {row.name}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {row.client} • {row.country}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3.5 text-zinc-400 hidden sm:table-cell">
                  {row.category}
                </td>

                {/* Revenue */}
                <td className="py-3.5 font-mono font-bold text-emerald-400">
                  {row.revenue}
                </td>

                {/* Rating with stars */}
                <td className="py-3.5">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="text-white font-semibold">
                      ({row.rating.toFixed(1)})
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
