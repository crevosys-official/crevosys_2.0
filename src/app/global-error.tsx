"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global critical error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white m-0 p-0 font-sans flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
          <h2 className="text-2xl font-bold mb-3">Critical Error</h2>
          <p className="text-zinc-400 text-sm mb-6">
            A critical system error occurred. Please try reloading the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-full bg-[#ff6a00] hover:bg-[#e05d00] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-none"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
