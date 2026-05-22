"use client";

import { useState, useCallback, useEffect } from "react";

const SAMPLES = [
  { label: "Sample 1", gradient: "from-rose-900/60 to-zinc-800", classification: "Benign", confidence: 94, color: "#10b981" },
  { label: "Sample 2", gradient: "from-amber-900/60 to-zinc-800", classification: "Malignant", confidence: 88, color: "#f59e0b" },
  { label: "Sample 3", gradient: "from-pink-900/60 to-zinc-800", classification: "Benign", confidence: 91, color: "#10b981" },
];

export function SkinCancerDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<(typeof SAMPLES)[number] | null>(null);
  const [barWidth, setBarWidth] = useState(0);

  const analyze = useCallback((index: number) => {
    if (analyzing) return;
    setSelected(index);
    setAnalyzing(true);
    setResult(null);
    setBarWidth(0);
    setTimeout(() => {
      const sample = SAMPLES[index];
      setResult(sample);
      setAnalyzing(false);
      requestAnimationFrame(() => setBarWidth(sample.confidence));
    }, 600);
  }, [analyzing]);

  useEffect(() => {
    analyze(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full min-h-[13rem] flex-col p-4">
      <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-widest text-zinc-500">
        Dermoscopic Image Classifier
      </p>

      {/* Sample chips */}
      <div className="mb-3 flex gap-2">
        {SAMPLES.map((s, i) => (
          <button
            key={i}
            onClick={() => analyze(i)}
            disabled={analyzing}
            className="flex flex-col items-center gap-1.5 rounded-lg border p-2 transition-all duration-200 disabled:opacity-50"
            style={{
              borderColor: selected === i ? "rgba(16,185,129,0.4)" : "#3f3f46",
              backgroundColor: selected === i ? "rgba(16,185,129,0.06)" : "transparent",
            }}
          >
            <div className={`h-9 w-9 rounded-md bg-gradient-to-br ${s.gradient}`} />
            <span className="text-[0.6rem] text-zinc-500">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="flex flex-1 flex-col justify-center rounded-lg bg-zinc-900 p-3">
        {analyzing && (
          <div className="space-y-2">
            {[75, 55, 40].map((w, i) => (
              <div key={i} className="h-2 animate-pulse rounded-full bg-zinc-800" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {result && !analyzing && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span
                className="rounded px-2 py-0.5 text-xs font-bold"
                style={{
                  color: result.color,
                  backgroundColor: result.classification === "Benign"
                    ? "rgba(16,185,129,0.12)"
                    : "rgba(245,158,11,0.12)",
                }}
              >
                {result.classification}
              </span>
              <span className="text-xs text-zinc-500">{result.confidence}% confidence</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{ width: `${barWidth}%`, backgroundColor: result.color }}
              />
            </div>
            <p className="mt-2 text-[0.65rem] text-zinc-600">
              Early detection model · CNN + transfer learning
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
