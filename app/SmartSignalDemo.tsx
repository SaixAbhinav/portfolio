"use client";

import { useState, useCallback } from "react";

export function SmartSignalDemo() {
  const [mode, setMode] = useState<"unoptimized" | "optimized">("unoptimized");
  const [switching, setSwitching] = useState(false);

  const toggle = useCallback(() => {
    if (switching) return;
    setSwitching(true);
    setTimeout(() => {
      setMode((m) => (m === "unoptimized" ? "optimized" : "unoptimized"));
      setSwitching(false);
    }, 250);
  }, [switching]);

  const isOptimized = mode === "optimized";
  const carCount = isOptimized ? 2 : 5;
  const waitLabel = isOptimized ? "~30s avg" : "~42s avg";

  return (
    <div className="flex h-full min-h-[13rem] flex-col p-4">
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-soft">
        Traffic Intersection Simulation
      </p>

      {/* Lane strip */}
      <div
        className="flex flex-1 items-center gap-4 rounded-xl border border-ink/10 bg-paper px-4 py-3"
        style={{ opacity: switching ? 0.4 : 1, transition: "opacity 200ms ease" }}
      >
        {/* Traffic light — literal red/green signal */}
        <div className="flex flex-col items-center gap-1.5">
          <div
            className="h-3 w-3 rounded-full transition-colors duration-500"
            style={{ backgroundColor: isOptimized ? "#d8c9b6" : "#ef4444" }}
          />
          <div
            className="h-3 w-3 rounded-full transition-colors duration-500"
            style={{ backgroundColor: isOptimized ? "#2e9e6b" : "#d8c9b6" }}
          />
        </div>

        {/* Queue */}
        <div className="flex flex-col gap-2">
          <p className="text-[0.6rem] uppercase tracking-widest text-ink-soft">Queue</p>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-3 w-5 rounded-sm transition-all duration-300"
                style={{
                  transitionDelay: `${i * 40}ms`,
                  backgroundColor: i < carCount ? "#2f3142" : "transparent",
                  border: i < carCount ? "none" : "1px dashed rgba(47,49,66,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Wait time */}
        <div className="ml-auto text-right">
          <p className="text-[0.6rem] uppercase tracking-widest text-ink-soft">Avg wait</p>
          <p
            className="font-display text-lg font-bold transition-colors duration-500"
            style={{ color: isOptimized ? "#2f3142" : "#595c6b" }}
          >
            {waitLabel}
          </p>
        </div>
      </div>

      {/* Stat badge */}
      <div
        className="mt-3 flex items-center gap-2 rounded-full bg-mint px-3 py-2 transition-all duration-500"
        style={{ opacity: isOptimized ? 1 : 0, transform: isOptimized ? "translateY(0)" : "translateY(4px)" }}
      >
        <span className="text-xs font-bold text-ink">↓ 28% wait time</span>
        <span className="text-xs text-ink-soft">via PPO reinforcement learning</span>
      </div>

      {/* Toggle */}
      <button
        onClick={toggle}
        disabled={switching}
        className="mt-3 rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-amber-flame/60 disabled:opacity-50"
      >
        {isOptimized ? "Show Baseline" : "Show AI-Optimized"}
      </button>
    </div>
  );
}
