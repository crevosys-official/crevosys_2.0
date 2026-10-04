"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AdminLockScreen from "./AdminLockScreen";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const checkStatus = async () => {
    try {
      const res = await fetch("/api/admin/auth/status");
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(Boolean(data.authenticated));
        if (data.expired) {
          setIsSessionExpired(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  // Show a dark luxury loading state while verifying admin authentication session
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050508] flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative">
            <Image
              src="/crevoicon.webp"
              alt="Crevosys"
              width={48}
              height={48}
              className="w-12 h-12 object-contain animate-pulse drop-shadow-[0_0_20px_rgba(255,106,0,0.5)]"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00] animate-ping" />
            <span className="text-zinc-400 font-mono text-xs tracking-wider">
              Verifying Security Protocols...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, render Screen Lock
  if (!isAuthenticated) {
    return (
      <AdminLockScreen
        isSessionExpired={isSessionExpired}
        onUnlockSuccess={() => {
          setIsAuthenticated(true);
        }}
      />
    );
  }

  // User is authenticated, render protected admin workspace
  return <>{children}</>;
}
