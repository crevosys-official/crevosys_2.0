"use client";

import React, { useState } from "react";
import {
  Send,
  Paperclip,
  Bot,
  Sparkles,
} from "lucide-react";

export default function AiAssistantCard() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsThinking(true);
    setResponse(null);

    setTimeout(() => {
      setIsThinking(false);
      const query = prompt.toLowerCase();
      if (query.includes("revenue") || query.includes("profit") || query.includes("money")) {
        setResponse("Total Projects Revenue is $184,500 (+24.4% YoY) with $42,800 in active contract milestones.");
      } else if (query.includes("leave") || query.includes("team") || query.includes("who")) {
        setResponse("4 engineers working right now, 1 in client meeting (Abid), and Shamsul is on annual leave returning Oct 2.");
      } else if (query.includes("crash") || query.includes("bug") || query.includes("health")) {
        setResponse("System health is optimal at 99.94% crash-free rate. 0 fatal crashes logged in the last 24h.");
      } else {
        setResponse(`All 8 running projects are progressing on schedule. Next upcoming milestone is The Palace Resort on Oct 15.`);
      }
      setPrompt("");
    }, 600);
  };

  return (
    <div className="bg-zinc-900 border border-white/10 hover:border-white/[0.18] rounded-3xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden transition-colors h-full flex-1">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-zinc-950 text-zinc-300 border border-white/10">
              <Bot size={15} />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Crevosys Copilot AI
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-950 border border-white/10">
            Assistant
          </span>
        </div>
      </div>

      {/* Center Minimalist 3D Sphere & Dynamic Response */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto py-4 select-none">
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Subtle soft backdrop */}
          <div className="absolute inset-0 rounded-full bg-[#ff6a00]/10 blur-xl opacity-50" />

          {/* 3D Sphere */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-700 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_6px_16px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white/20 blur-[1px] absolute top-2 left-2.5 pointer-events-none" />
            <Sparkles size={15} className="text-[#ff6a00]" />
          </div>
        </div>

        {/* AI Response Bubble */}
        {response && (
          <div className="mt-3 p-3 rounded-2xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 animate-in fade-in leading-relaxed text-center max-w-xs shadow-sm">
            {response}
          </div>
        )}

        {isThinking && (
          <div className="mt-2 text-xs font-mono text-zinc-400 animate-pulse">
            Analyzing Crevosys telemetry...
          </div>
        )}

        {/* Quick prompt suggestions when idle */}
        {!response && !isThinking && (
          <div className="mt-4 flex flex-wrap gap-1.5 justify-center max-w-[280px]">
            {["Revenue Summary", "Team Live Status", "System SLA"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setPrompt(tag)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-zinc-950/80 hover:bg-zinc-800 border border-white/5 hover:border-white/20 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="mt-auto p-1.5 rounded-2xl bg-zinc-950 border border-white/10 flex items-center gap-2"
      >
        <button
          type="button"
          className="p-1.5 text-zinc-500 hover:text-white transition-colors"
          title="Attach context"
        >
          <Paperclip size={14} />
        </button>

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask copilot anything..."
          className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 outline-none"
        />

        <button
          type="submit"
          disabled={!prompt.trim() || isThinking}
          className="p-2 rounded-xl bg-[#ff6a00] hover:bg-[#ff8804] text-black transition-all cursor-pointer disabled:opacity-40"
        >
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}
