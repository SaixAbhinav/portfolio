"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT_PARAGRAPHS } from "./aboutConstants";

// Bio paragraphs reveal with a gentle stagger as the column enters view.
// Plain prose (no typewriter) — fully present for reduced-motion / no-JS.
export function AboutBio() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-5">
      {ABOUT_PARAGRAPHS.map((text, idx) => (
        <p
          key={idx}
          style={{ transitionDelay: `${idx * 160}ms` }}
          className={`text-lg leading-relaxed text-ink-soft transition-all duration-700 ease-out ${
            shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {text}
        </p>
      ))}
    </div>
  );
}
