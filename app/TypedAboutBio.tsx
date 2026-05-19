"use client";

import { useEffect, useRef, useState } from "react";

const PARAGRAPHS = [
  "I'm an Applied AI builder currently pursuing my MCA at Vivekananda Institute of Professional Studies (CGPA 8.6), with a BCA background from the same institution.",
  "My focus is on building systems that work in the real world — not just in notebooks. I've interned at IBM Skills Build as a Data Analyst, where I built a skin cancer detection model achieving 94% accuracy.",
  "I'm particularly interested in workflow automation, prompt engineering, and reinforcement learning — areas where AI can eliminate tedious manual work and create measurable impact.",
];

const SPEED = 13;
const GAP_BETWEEN_PARAGRAPHS = 400;

type Props = {
  delay?: number;
};

export function TypedAboutBio({ delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // -1 = not started; PARAGRAPHS.length = all done
  const [activeIdx, setActiveIdx] = useState(-1);
  const [chars, setChars] = useState(0);

  // Start typing once the bio block enters the viewport (with optional delay so it can sit in a sequence)
  useEffect(() => {
    const el = ref.current;
    if (!el || activeIdx !== -1) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          timer = setTimeout(() => setActiveIdx(0), delay);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [activeIdx, delay]);

  // Drive the per-paragraph typewriter
  useEffect(() => {
    if (activeIdx < 0 || activeIdx >= PARAGRAPHS.length) return;
    setChars(0);
    const text = PARAGRAPHS[activeIdx];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setChars(i);
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setActiveIdx((prev) => prev + 1), GAP_BETWEEN_PARAGRAPHS);
      }
    }, SPEED);
    return () => clearInterval(interval);
  }, [activeIdx]);

  return (
    <div ref={ref}>
      {PARAGRAPHS.map((text, idx) => {
        const isPast = idx < activeIdx || activeIdx >= PARAGRAPHS.length;
        const isCurrent = idx === activeIdx && activeIdx < PARAGRAPHS.length;
        const visibleText = isPast ? text : isCurrent ? text.slice(0, chars) : "";
        const isLast = idx === PARAGRAPHS.length - 1;
        return (
          <p
            key={idx}
            className={`relative text-lg leading-relaxed text-zinc-300 ${isLast ? "" : "mb-5"}`}
          >
            {/* Invisible spacer locks in the final height so the column doesn't grow as text types */}
            <span aria-hidden="true" className="invisible">
              {text}
            </span>
            {/* Visible typed overlay */}
            <span className="absolute inset-0">
              {visibleText}
              {isCurrent && (
                <span
                  aria-hidden="true"
                  className="blink-bar ml-0.5 inline-block h-5 w-[2px] -translate-y-0.5 bg-emerald-400 align-middle"
                />
              )}
            </span>
          </p>
        );
      })}
    </div>
  );
}
