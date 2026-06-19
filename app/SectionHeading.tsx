"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  kicker?: string;
  icon?: ReactNode;
  prefix: string;
  emphasis: string;
  align?: "left" | "center";
  className?: string;
};

// Section heading: a small icon + kicker label, a Fraunces serif title in cream,
// and a hand-drawn amber underline that draws under the emphasis word on scroll.
// Content is always present; only the reveal is gated.
export function SectionHeading({
  kicker,
  icon,
  prefix,
  emphasis,
  align = "left",
  className = "",
}: Props) {
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
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const centered = align === "center";

  return (
    <div
      ref={ref}
      className={`${centered ? "text-center" : ""} transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {kicker && (
        <p
          className={`mb-3 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold ${
            centered ? "justify-center" : ""
          }`}
        >
          {icon}
          {kicker}
        </p>
      )}
      <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-cream">
        {prefix}
        <span className="relative inline-block whitespace-nowrap">
          {emphasis}
          <span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-[0.16em] w-full origin-left rounded-full bg-amber-flame transition-transform duration-700 ease-out"
            style={{
              transform: shown ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: "350ms",
            }}
          />
        </span>
      </h2>
    </div>
  );
}
