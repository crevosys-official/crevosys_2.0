"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  FolderKanban,
  Wrench,
  MessageSquareQuote,
  Users,
  BarChart3,
  ArrowUpRight,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Sparkles },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Tools & skills", href: "/admin/tools", icon: Wrench },
  { label: "Feedbacks", href: "/admin/feedbacks", icon: MessageSquareQuote },
  { label: "Teams", href: "/admin/teams", icon: Users },
  { label: "About Stats", href: "/admin#about-stats", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [isLocking, setIsLocking] = useState(false);

  const handleLock = async () => {
    setIsLocking(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      window.location.reload();
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".admin-logo-block",
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 }
      )
        .fromTo(
          ".admin-nav-item",
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35, stagger: 0.04 },
          "-=0.2"
        )
        .fromTo(
          ".admin-sidebar-footer",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2"
        );
    },
    { scope: sidebarRef }
  );

  return (
    <>
      {/* Mobile Top Navigation Toggle Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#08080b]/90 backdrop-blur-md border-b border-white/[0.08] px-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image
            src="/crevoicon.webp"
            alt="Crevosys"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-tight">
              Crevosys
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ff6a00]/15 text-[#ff8804] border border-[#ff6a00]/30">
              Admin
            </span>
          </div>
        </Link>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white transition-colors"
          aria-label="Toggle Navigation"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Main Sidebar (Desktop fixed & Mobile Drawer) */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 h-screen bg-[#08080b]/95 lg:bg-[#07070a]/90 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Subtle Ambient Sidebar Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#ff6a00]/[0.07] to-transparent pointer-events-none" />

        {/* Top Header & Logo Area (Fixed height) */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/[0.07] shrink-0 relative z-10">
          <div className="admin-logo-block flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setSelectedItem("Dashboard")}
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02]"
            >
              <div className="relative">
                <Image
                  src="/crevoicon.webp"
                  alt="Crevosys"
                  width={38}
                  height={38}
                  className="w-9 h-9 object-contain drop-shadow-[0_0_12px_rgba(255,106,0,0.35)]"
                  priority
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#07070a]" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg tracking-tight">
                    Crevosys
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ff6a00]/15 text-[#ff8804] border border-[#ff6a00]/30 shadow-[0_0_10px_rgba(255,106,0,0.2)]">
                    Admin
                  </span>
                </div>
                <span className="text-zinc-500 text-xs font-mono tracking-wider">
                  v2.0 Workspace
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation Links Area (Takes available space, scrollable if needed) */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3.5 space-y-1 relative z-10">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 pb-2 select-none">
            Main Menu
          </span>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href ||
                  (item.href.startsWith("/admin/") && pathname.startsWith(item.href)) ||
                  selectedItem === item.label;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => {
                  setSelectedItem(item.label);
                  setIsMobileOpen(false);
                }}
                className={cn(
                  "admin-nav-item group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none",
                  isActive
                    ? "text-white bg-gradient-to-r from-[#ff6a00]/15 to-transparent border border-[#ff6a00]/30 shadow-[0_0_20px_rgba(255,106,0,0.1)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={cn(
                      "transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-[#ff8804]" : "text-zinc-400 group-hover:text-zinc-200"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff8804] shadow-[0_0_8px_#ff8804]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: System Status & User Profile (Fixed at bottom) */}
        <div className="admin-sidebar-footer p-4 sm:p-5 relative z-10 border-t border-white/[0.07] bg-white/[0.01] shrink-0 mt-auto">
          {/* Status Capsule */}
          <div className="mb-3.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                System Status
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wide">
              OPTIMAL
            </span>
          </div>

          {/* Admin User Card */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white tracking-tight">
                  Crevosys Admin
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  admin@crevosys.com
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Lock Admin Screen Button */}
              <button
                type="button"
                onClick={handleLock}
                disabled={isLocking}
                title="Lock Admin Screen"
                className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 cursor-pointer disabled:opacity-50"
              >
                <Lock size={15} />
              </button>

              {/* Back to Live Site Button */}
              <Link
                href="/"
                title="View Public Site"
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10"
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
