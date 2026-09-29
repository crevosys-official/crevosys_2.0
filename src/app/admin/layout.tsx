import React from "react";
import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Crevosys",
  description: "Crevosys administrative workspace and overview",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#050508] text-foreground font-sans relative antialiased flex flex-col lg:flex-row selection:bg-[#ff6a00]/30 selection:text-white">
        {/* Background Ambient Glows inspired by Crevosys identity */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top-right subtle blue/indigo ambient glow */}
          <div className="absolute -top-[15%] right-[5%] w-[600px] h-[500px] bg-indigo-600/[0.05] blur-[150px] rounded-full" />
          {/* Top-left subtle Crevosys orange ambient glow */}
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[400px] bg-[#ff6a00]/[0.04] blur-[140px] rounded-full" />
          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Workspace Body */}
        <div className="flex-1 lg:pl-72 flex flex-col min-h-screen relative z-10 pt-16 lg:pt-0">
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1600px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
