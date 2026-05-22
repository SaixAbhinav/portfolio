"use client";

import { useState, useCallback } from "react";

const BULLETS = [
  "Extracted 3 key action items from raw meeting notes",
  "Identified priority tasks and assigned deadlines",
  "Generated structured summary ready for stakeholder review",
];

const RAW_TEXT = "Team sync re: Q3 roadmap. John mentioned the API refactor is blocked on design sign-off. Sarah wants to push the analytics dashboard to next sprint. Budget approval for new infra is pending finance sign-off...";

export function WorkflowDemo() {
  const [phase, setPhase] = useState<"idle" | "working" | "done">("idle");
  const [fading, setFading] = useState(false);

  const run = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("working");
    setTimeout(() => setPhase("done"), 600);
  }, [phase]);

  const reset = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setPhase("idle");
      setFading(false);
    }, 200);
  }, []);

  return (
    <div className="flex h-full min-h-[13rem] flex-col p-4">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-widest text-zinc-500">
        Workflow Automation
      </p>

      {/* Input */}
      <div className="mb-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2">
        <p className="mb-1 text-[0.6rem] uppercase tracking-widest text-zinc-600">Raw input</p>
        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">{RAW_TEXT}</p>
      </div>

      {/* Output */}
      <div
        className="flex flex-1 flex-col rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 transition-opacity duration-200"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[0.6rem] uppercase tracking-widest text-zinc-600">AI Summary</p>
          {phase === "done" && (
            <button onClick={reset} className="text-[0.6rem] text-zinc-600 hover:text-zinc-400 transition-colors">
              Reset
            </button>
          )}
        </div>

        {phase === "idle" && (
          <div className="flex flex-1 items-center">
            <span className="inline-block h-3.5 w-0.5 animate-pulse rounded-sm bg-zinc-700" />
          </div>
        )}

        {phase === "working" && (
          <div className="flex flex-1 flex-col justify-center gap-2">
            {[90, 70, 55].map((w, i) => (
              <div key={i} className="h-2 animate-pulse rounded-full bg-zinc-800" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {phase === "done" && (
          <ul className="flex flex-1 flex-col justify-center gap-1.5">
            {BULLETS.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs leading-relaxed text-zinc-300"
                style={{
                  opacity: 0,
                  animation: "fadeSlideUp 0.35s ease-out forwards",
                  animationDelay: `${i * 150}ms`,
                }}
              >
                <span className="mt-0.5 shrink-0 text-emerald-500">›</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={run}
        disabled={phase !== "idle"}
        className="mt-2 rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200 disabled:opacity-40"
      >
        {phase === "idle" ? "→ Run Workflow" : phase === "working" ? "Processing…" : "Done"}
      </button>
    </div>
  );
}
