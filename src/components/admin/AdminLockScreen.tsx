"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldAlert,
  KeyRound,
  Send,
  RefreshCw,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface AdminLockScreenProps {
  onUnlockSuccess: () => void;
  isSessionExpired?: boolean;
}

const TOTAL_COUNTDOWN_SECONDS = 120; // 2 minutes strictly

export default function AdminLockScreen({
  onUnlockSuccess,
  isSessionExpired,
}: AdminLockScreenProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successUnlocked, setSuccessUnlocked] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const cd = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(cd);
  }, [resendCooldown]);

  // Auto-focus first input when code is sent
  useEffect(() => {
    if (isSent && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [isSent]);

  const handleSendCode = async () => {
    if (isSending || resendCooldown > 0) return;

    setIsSending(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/auth/send-code", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send 2FA verification code.");
      }

      setIsSent(true);
      setTimeLeft(TOTAL_COUNTDOWN_SECONDS);
      setResendCooldown(20); // 20s anti-spam cooldown for requesting next code
      setCode(["", "", "", "", "", ""]);
      toast.success("Security code sent!", {
        description: "Check crevosysofficial@gmail.com for your 6-digit access code.",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error sending code.";
      setErrorMessage(msg);
      toast.error("Failed to send code", { description: msg });
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async (fullCodeToVerify?: string) => {
    const codeString = fullCodeToVerify || code.join("");
    if (codeString.length !== 6) {
      setErrorMessage("Please enter all 6 digits of the code.");
      return;
    }

    if (timeLeft <= 0) {
      setErrorMessage("This code has expired (2-minute limit). Please request a new code.");
      toast.error("Code Expired", {
        description: "2-minute validity exceeded. Please request a new code.",
      });
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeString }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Incorrect or expired code.");
      }

      setSuccessUnlocked(true);
      toast.success("Access Granted", {
        description: "2-Day Administrative Session Activated. Valid for 2 days without re-verification.",
      });

      setTimeout(() => {
        onUnlockSuccess();
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification failed.";
      setErrorMessage(msg);
      toast.error("Verification Failed", { description: msg });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    // Only accept numeric characters
    const sanitized = value.replace(/\D/g, "");
    if (!sanitized) {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    // Single digit input
    const char = sanitized.slice(-1);
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);
    setErrorMessage(null);

    // Auto move to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if all 6 digits entered
    const complete = newCode.join("");
    if (complete.length === 6 && !newCode.includes("")) {
      handleVerify(complete);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      handleVerify();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasted[i] || "";
    }
    setCode(newCode);
    setErrorMessage(null);

    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();

    if (pasted.length === 6) {
      handleVerify(pasted);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isExpired = isSent && timeLeft === 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#050508] flex items-center justify-center p-4 sm:p-6 overflow-y-auto selection:bg-[#ff6a00]/30 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[550px] h-[450px] bg-[#ff6a00]/[0.07] blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[15%] right-[20%] w-[600px] h-[500px] bg-indigo-600/[0.06] blur-[170px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Screen Lock Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0a0a0f]/90 border border-white/[0.09] rounded-3xl p-6 sm:p-9 shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/crevoicon.png"
                alt="Crevosys"
                width={36}
                height={36}
                className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(255,106,0,0.4)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                Crevosys System
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ff6a00]/15 text-[#ff8804] border border-[#ff6a00]/30">
                  Protected
                </span>
              </span>
              <span className="text-zinc-500 text-[11px] font-mono">
                Security Gateway v2.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            <Lock size={12} />
            <span>Screen Locked</span>
          </div>
        </div>

        {/* Lock Screen Center Graphic & Title */}
        <div className="text-center space-y-2 mb-7">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_0_30px_rgba(255,106,0,0.15)] mb-2 relative">
            <KeyRound size={28} className="text-[#ff8804]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6a00] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6a00]" />
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Two-Factor Verification
          </h2>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
            Administrative access requires a one-time verification passcode sent to your authorized email address.
          </p>
        </div>

        {/* 2-Day Session Inactivity Warning */}
        {isSessionExpired && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs text-amber-300">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
              <Clock size={15} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-amber-200">Session Expired (2-Day Limit)</p>
              <p className="text-amber-300/80 text-[11px] leading-relaxed mt-0.5">
                You have not accessed the admin panel for 2 days. A new verification code is required to regenerate your 2-day session token.
              </p>
            </div>
          </div>
        )}

        {/* Target Email Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#ff6a00]/15 border border-[#ff6a00]/30 flex items-center justify-center shrink-0">
              <Mail size={14} className="text-[#ff8804]" />
            </div>
            <div className="min-w-0">
              <p className="text-zinc-400 text-[11px] font-medium leading-none mb-1">
                Security Recipient
              </p>
              <p className="text-white font-mono font-semibold truncate">
                crevosysofficial@gmail.com
              </p>
            </div>
          </div>
          <span className="shrink-0 text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
            Verified
          </span>
        </div>

        {/* Action: Initial Send Button OR Input Fields */}
        {!isSent ? (
          <div className="space-y-4">
            <button
              onClick={handleSendCode}
              disabled={isSending}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff8804] text-white font-semibold text-sm shadow-[0_0_25px_rgba(255,106,0,0.35)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Dispatching Security Token...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Verification Code</span>
                </>
              )}
            </button>

            <p className="text-center text-[12px] text-zinc-500">
              A 6-digit code valid for exactly <strong>2 minutes</strong> will be dispatched to crevosysofficial@gmail.com.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Live 2-Minute Countdown Indicator */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Clock
                  size={15}
                  className={
                    isExpired
                      ? "text-red-400"
                      : timeLeft <= 30
                      ? "text-amber-400 animate-pulse"
                      : "text-[#ff8804]"
                  }
                />
                <span
                  className={
                    isExpired
                      ? "text-red-400 font-semibold"
                      : timeLeft <= 30
                      ? "text-amber-400 font-medium"
                      : "text-zinc-300 font-medium"
                  }
                >
                  {isExpired ? "Code Expired" : "Code Validity Window"}
                </span>
              </div>

              <div
                className={`font-mono text-sm font-bold px-2.5 py-0.5 rounded-lg border ${
                  isExpired
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : timeLeft <= 30
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    : "bg-[#ff6a00]/10 border-[#ff6a00]/30 text-[#ff8804]"
                }`}
              >
                {formattedTime}
              </div>
            </div>

            {/* Countdown Progress Bar */}
            <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  isExpired
                    ? "bg-red-500"
                    : timeLeft <= 30
                    ? "bg-amber-400"
                    : "bg-gradient-to-r from-[#ff6a00] to-[#ff8804]"
                }`}
                style={{
                  width: `${(timeLeft / TOTAL_COUNTDOWN_SECONDS) * 100}%`,
                }}
              />
            </div>

            {/* 6 Digit Input Group */}
            <div>
              <label className="block text-center text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Enter 6-Digit Verification Code
              </label>

              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={idx === 0 ? handlePaste : undefined}
                    disabled={isVerifying || successUnlocked || isExpired}
                    className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border bg-black/40 text-white transition-all outline-none ${
                      digit
                        ? "border-[#ff6a00] shadow-[0_0_15px_rgba(255,106,0,0.25)]"
                        : "border-white/10 hover:border-white/20 focus:border-[#ff6a00] focus:shadow-[0_0_15px_rgba(255,106,0,0.2)]"
                    } ${isExpired ? "opacity-50 border-red-500/30" : ""}`}
                  />
                ))}
              </div>
            </div>

            {/* Error / Feedback display */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-xs text-red-400">
                <AlertCircle size={15} className="shrink-0" />
                <span className="flex-1">{errorMessage}</span>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying || successUnlocked || isExpired || code.join("").length !== 6}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff8804] text-white font-semibold text-sm shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:shadow-[0_0_35px_rgba(255,106,0,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Validating Credentials...</span>
                </>
              ) : successUnlocked ? (
                <>
                  <CheckCircle2 size={16} className="text-white" />
                  <span>Unlocking Console...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Unlock Admin Access</span>
                </>
              )}
            </button>

            {/* Resend Action */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.06]">
              <span className="text-zinc-500">Didn&apos;t receive the code?</span>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={isSending || resendCooldown > 0}
                className="text-[#ff8804] hover:text-[#ffa133] transition-colors font-medium flex items-center gap-1 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <RefreshCw size={12} className={isSending ? "animate-spin" : ""} />
                <span>
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend Code"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Return to Site */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Crevosys</span>
          </Link>

          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
            <Sparkles size={12} className="text-[#ff8804]" />
            <span>Protected Route</span>
          </div>
        </div>
      </div>
    </div>
  );
}
