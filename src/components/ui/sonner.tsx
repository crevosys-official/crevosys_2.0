"use client";

import React from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";

const Toaster = ({ position = "bottom-right", ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group font-sans"
      position={position}
      duration={4000}
      closeButton
      icons={{
        success: (
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0 shadow-[0_0_14px_rgba(16,185,129,0.35)]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        ),
        error: (
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0 shadow-[0_0_14px_rgba(244,63,94,0.35)]">
            <AlertCircle className="w-4 h-4" />
          </div>
        ),
        warning: (
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0 shadow-[0_0_14px_rgba(245,158,11,0.35)]">
            <AlertTriangle className="w-4 h-4" />
          </div>
        ),
        info: (
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0 shadow-[0_0_14px_rgba(14,165,233,0.35)]">
            <Info className="w-4 h-4" />
          </div>
        ),
        loading: (
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#ff6a00]/15 border border-[#ff6a00]/30 text-[#ff8804] shrink-0 shadow-[0_0_14px_rgba(255,106,0,0.35)]">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast flex items-start gap-3.5 w-full p-4 rounded-2xl border backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-sm transition-all duration-300",
          title: "text-white font-semibold text-[13px] tracking-tight leading-snug",
          description: "text-zinc-400 text-xs mt-1 leading-relaxed",
          actionButton:
            "bg-[#ff6a00] hover:bg-[#ff8804] text-white font-medium text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all",
          cancelButton:
            "bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-all",
          closeButton:
            "!bg-[#14141c]/90 hover:!bg-[#1f1f2c] !border !border-white/15 !text-zinc-400 hover:!text-white !transition-all !w-6 !h-6 !rounded-full shadow-lg",
          success:
            "!bg-[#07150f]/95 !border-emerald-500/35 !text-emerald-100 shadow-[0_12px_40px_rgba(16,185,129,0.22)] ring-1 ring-emerald-500/20",
          error:
            "!bg-[#18070b]/95 !border-rose-500/35 !text-rose-100 shadow-[0_12px_40px_rgba(244,63,94,0.22)] ring-1 ring-rose-500/20",
          warning:
            "!bg-[#180e05]/95 !border-amber-500/35 !text-amber-100 shadow-[0_12px_40px_rgba(245,158,11,0.22)] ring-1 ring-amber-500/20",
          info:
            "!bg-[#051222]/95 !border-sky-500/35 !text-sky-100 shadow-[0_12px_40px_rgba(14,165,233,0.22)] ring-1 ring-sky-500/20",
          default:
            "!bg-[#0c0c14]/95 !border-white/10 !text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/5",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
