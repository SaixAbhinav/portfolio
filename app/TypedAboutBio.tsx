"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT_PARAGRAPHS, TYPING_SPEED, PARAGRAPH_GAP } from "./aboutConstants";

const PARAGRAPHS = ABOUT_PARAGRAPHS;

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
        setTimeout(() => setActiveIdx((prev) => prev + 1), PARAGRAPH_GAP);
      }
    }, TYPING_SPEED);
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
            {/* Screen-reader source: the full paragraph, always. */}
            <span className="sr-only">{text}</span>
            {/* Visual height spacer — invisible to both sight and AT. Reserves the paragraph's final height so the column doesn't grow as text types. */}
            <span aria-hidden="true" className="invisible">
              {text}
            </span>
            {/* Visible typed overlay — hidden from AT (it'd announce partial words mid-keystroke). */}
            <span aria-hidden="true" className="absolute inset-0">
              {visibleText}
              {isCurrent && (
                <span className="blink-bar ml-0.5 inline-block h-5 w-[2px] -translate-y-0.5 bg-emerald-400 align-middle" />
              )}
            </span>
          </p>
        );
      })}
    </div>
  );
}
