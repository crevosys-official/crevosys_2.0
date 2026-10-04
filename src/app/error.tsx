"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime application error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center p-4 relative overflow-hidden font-primary">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/[0.08] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 text-center shadow-2xl">
        <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-2 text-white font-sans">
          Something went wrong
        </h2>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          An unexpected error occurred while loading this page. You can try refreshing or returning home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ff6a00] hover:bg-[#e05d00] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
