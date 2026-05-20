"use client";

import { useEffect, useRef, useState } from "react";

type SkillGroup = { category: string; items: string[]; primary?: boolean };

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

  // Precompute the global chip offset per group up-front so render is side-effect free
  const groupOffsets: number[] = [];
  let runningCount = 0;
  for (const group of skills) {
    groupOffsets.push(runningCount);
    runningCount += group.items.length;
  }

  return (
    <div ref={ref} className={className}>
      {skills.map((group, groupIdx) => {
        const offset = groupOffsets[groupIdx];
        const labelDelay = delay + offset * stagger;
        const isPrimary = group.primary ?? false;
        return (
          <div key={group.category}>
            <p
              style={{ transitionDelay: `${labelDelay}ms` }}
              className={`mb-3 font-mono text-xs uppercase tracking-[0.25em] transition-opacity duration-500 ease-out ${
                visible ? "opacity-100" : "opacity-0"
              } ${isPrimary ? "text-emerald-400" : "text-emerald-400/50"}`}
            >
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, itemIdx) => {
                const chipDelay = delay + (offset + itemIdx) * stagger;
                return (
                  <div
                    key={item}
                    style={{ transitionDelay: `${chipDelay}ms` }}
                    className={`inline-block transition-all duration-500 ease-out ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span
                      className={`inline-block rounded-lg border px-3 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                        isPrimary
                          ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-100 hover:border-emerald-500/60 hover:bg-emerald-500/[0.15] hover:text-emerald-50"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-100"
                      }`}
                    >
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
