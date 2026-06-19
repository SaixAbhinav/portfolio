"use client";

import { useState, useCallback, useEffect } from "react";

const SAMPLES = [
  { label: "Sample 1", gradient: "from-peach to-dawn", classification: "Benign" as const, confidence: 94 },
  { label: "Sample 2", gradient: "from-dawn to-lavender", classification: "Malignant" as const, confidence: 88 },
  { label: "Sample 3", gradient: "from-mint to-wildflower", classification: "Benign" as const, confidence: 91 },
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
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-widest text-cream-soft">
        Dermoscopic Image Classifier
      </p>

      {/* Sample chips */}
      <div className="mb-3 flex gap-2">
        {SAMPLES.map((s, i) => (
          <button
            key={i}
            onClick={() => analyze(i)}
            disabled={analyzing}
            className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-all duration-200 disabled:opacity-50 ${
              selected === i
                ? "border-amber-flame/60 bg-amber-flame/12"
                : "border-cream/12 bg-ink hover:border-cream/25"
            }`}
          >
            <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${s.gradient}`} />
            <span className="text-[0.6rem] text-cream-soft">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="flex flex-1 flex-col justify-center rounded-xl border border-cream/10 bg-ink p-3">
        {analyzing && (
          <div className="space-y-2">
            {[75, 55, 40].map((w, i) => (
              <div key={i} className="h-2 animate-pulse rounded-full bg-cream/15" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {result && !analyzing && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-ink ${
                  result.classification === "Benign" ? "bg-mint/80" : "bg-peach/80"
                }`}
              >
                {result.classification}
              </span>
              <span className="text-xs text-cream-soft">{result.confidence}% confidence</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream/10">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width: `${barWidth}%`,
                  backgroundColor: result.classification === "Benign" ? "#cfefd9" : "#ffb347",
                }}
              />
            </div>
            <p className="mt-2 text-[0.65rem] text-cream-soft">
              Early detection model · CNN + transfer learning
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
