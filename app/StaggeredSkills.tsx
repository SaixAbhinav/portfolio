"use client";

import { useEffect, useRef, useState } from "react";

type SkillGroup = { category: string; items: string[] };

type Props = {
  skills: SkillGroup[];
  delay?: number;
  stagger?: number;
  threshold?: number;
  className?: string;
};

export function StaggeredSkills({
  skills,
  delay = 0,
  stagger = 70,
  threshold = 0.15,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Running chip index so each chip across all groups gets a unique stagger delay
  let chipIdx = 0;

  return (
    <div ref={ref} className={className}>
      {skills.map((group) => {
        const labelDelay = delay + chipIdx * stagger;
        return (
          <div key={group.category}>
            <p
              style={{ transitionDelay: `${labelDelay}ms` }}
              className={`mb-3 font-mono text-xs uppercase tracking-[0.25em] text-emerald-400/70 transition-opacity duration-500 ease-out ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => {
                const chipDelay = delay + chipIdx * stagger;
                chipIdx++;
                return (
                  <div
                    key={item}
                    style={{ transitionDelay: `${chipDelay}ms` }}
                    className={`inline-block transition-all duration-500 ease-out ${
                      visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span className="inline-block rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-zinc-900 hover:text-emerald-300">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
