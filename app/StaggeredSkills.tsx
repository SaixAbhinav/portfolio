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

// Each category leans on one pastel tint (the Pastel-Rotation Rule).
const CHIP_TINTS = [
  "bg-wildflower",
  "bg-dawn",
  "bg-mint",
  "bg-peach",
  "bg-lavender",
];

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
        const tint = CHIP_TINTS[groupIdx % CHIP_TINTS.length];
        return (
          <div key={group.category}>
            <p
              style={{ transitionDelay: `${labelDelay}ms` }}
              className={`mb-3 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-opacity duration-500 ease-out ${
                visible ? "opacity-100" : "opacity-0"
              } ${isPrimary ? "text-ink" : "text-ink-soft"}`}
            >
              {isPrimary && (
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-flame" />
              )}
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
                      className={`inline-block rounded-full ${tint} px-3.5 py-1.5 text-sm font-medium text-ink shadow-[0_2px_10px_-5px_rgba(47,49,66,0.25)] transition-transform duration-200 hover:-translate-y-0.5 ${
                        isPrimary ? "" : "opacity-90"
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
