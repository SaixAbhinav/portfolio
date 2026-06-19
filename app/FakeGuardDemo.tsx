"use client";

import { useState, useCallback } from "react";

const PROFILES = {
  A: { label: "Profile A", followers: "1.2K", following: "980", posts: "47", verdict: "AUTHENTIC" as const, confidence: 92 },
  B: { label: "Profile B", followers: "312", following: "5.4K", posts: "3", verdict: "SUSPICIOUS" as const, confidence: 87 },
};

type ProfileKey = keyof typeof PROFILES;

export function FakeGuardDemo() {
  const [selected, setSelected] = useState<ProfileKey | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<(typeof PROFILES)[ProfileKey] | null>(null);
  const [barWidth, setBarWidth] = useState(0);

  const analyze = useCallback((key: ProfileKey) => {
    if (analyzing) return;
    setSelected(key);
    setAnalyzing(true);
    setResult(null);
    setBarWidth(0);
    setTimeout(() => {
      const profile = PROFILES[key];
      setResult(profile);
      setAnalyzing(false);
      requestAnimationFrame(() => setBarWidth(profile.confidence));
    }, 800);
  }, [analyzing]);

  const isAuthentic = result?.verdict === "AUTHENTIC";

  return (
    <div className="flex h-full min-h-[13rem] flex-col p-4">
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-widest text-ink-soft">
        Profile Analyzer
      </p>

      {/* Profile selector */}
      <div className="mb-3 flex gap-2">
        {(Object.keys(PROFILES) as ProfileKey[]).map((key) => {
          const p = PROFILES[key];
          const active = selected === key;
          return (
            <button
              key={key}
              onClick={() => analyze(key)}
              disabled={analyzing}
              className={`flex flex-1 flex-col rounded-xl border p-2.5 text-left transition-all duration-200 disabled:opacity-50 ${
                active
                  ? "border-amber-flame/60 bg-peach/40"
                  : "border-ink/12 bg-paper hover:border-ink/25"
              }`}
            >
              <span className="text-xs font-semibold text-ink">{p.label}</span>
              <span className="mt-0.5 text-[0.6rem] text-ink-soft">
                {p.followers} followers · {p.posts} posts
              </span>
            </button>
          );
        })}
      </div>

      {/* Result area */}
      <div className="flex flex-1 flex-col justify-center rounded-xl border border-ink/10 bg-paper p-3">
        {!selected && !analyzing && (
          <p className="text-center text-xs text-ink-soft">Select a profile to analyze</p>
        )}

        {analyzing && (
          <div className="space-y-2">
            {[80, 60, 40].map((w, i) => (
              <div key={i} className="h-2 animate-pulse rounded-full bg-wildflower" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {result && !analyzing && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-ink ${
                  isAuthentic ? "bg-mint" : "bg-dawn"
                }`}
              >
                {isAuthentic ? "✓" : "✗"} {result.verdict}
              </span>
              <span className="text-xs text-ink-soft">{result.confidence}% confidence</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width: `${barWidth}%`,
                  backgroundColor: isAuthentic ? "#2f3142" : "#b45c1e",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
