import React from "react";
import type { Metadata } from "next";
import ServicesManagement from "@/components/admin/overview/ServicesManagement";
import Link from "next/link";
import { ChevronRight, Sparkles, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Services Catalog & Management | Admin Dashboard",
  description: "Manage, upload, and update live MongoDB services for Crevosys.",
};

export default function AdminServicesPage() {
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
            <span className="text-[#ff8804] font-medium">Services</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#ff8804] flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Services Catalog Management
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            Create, update, reorder, or upload icons for all services displayed dynamically across the public website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>Live Directory</span>
            <ExternalLink size={13} />
          </Link>
          <Link
            href="/#services"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-200 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>Homepage Section</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* Main Services Management Workspace */}
      <ServicesManagement />
    </div>
  );
}
