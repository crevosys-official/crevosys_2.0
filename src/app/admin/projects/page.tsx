import React from "react";
import type { Metadata } from "next";
import ProjectsManagement from "@/components/admin/overview/ProjectsManagement";
import Link from "next/link";
import { ChevronRight, FolderKanban, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects Portfolio Management | Admin Dashboard",
  description: "Manage, update, and add projects dynamically in MongoDB for Crevosys.",
};

export default function AdminProjectsPage() {
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
            <span className="text-[#ff8804] font-medium">Projects</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
              <FolderKanban size={16} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Projects Portfolio Management
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Create, update, reorder, and manage all showcase projects stored in MongoDB collection `projects` displayed across the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#portfolio"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>Live Portfolio Section</span>
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

      {/* Main Projects Management Workspace */}
      <ProjectsManagement />
    </div>
  );
}
