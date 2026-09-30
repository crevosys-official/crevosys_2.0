import React from "react";
import type { Metadata } from "next";
import TeamManagement from "@/components/admin/overview/TeamManagement";
import Link from "next/link";
import { ChevronRight, Users, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Team & Leadership Directory | Admin Dashboard",
  description: "Manage, update, and add team members dynamically in MongoDB for Crevosys.",
};

export default function AdminTeamsPage() {
  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/60 p-4 sm:p-6 rounded-3xl border border-white/10 backdrop-blur-md">
        <div>
          <nav className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-2">
            <Link href="/admin" className="hover:text-zinc-300 transition-colors">
              Dashboard
            </Link>
            <ChevronRight size={13} className="text-zinc-600" />
            <span className="text-[#ff8804] font-medium">Teams</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
              <Users size={16} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Team &amp; Leadership Directory
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Create, update, reorder, and manage all team members and executive leadership stored in MongoDB collection `teams` rendered on the public `/team` page and squad showcase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/team"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>Live Team Page</span>
            <ExternalLink size={13} />
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>Homepage</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* Main Team Management Workspace */}
      <TeamManagement />
    </div>
  );
}
