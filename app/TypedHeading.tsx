"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

type Props = {
  marker: string;
  prefix: string;
  emphasis: string;
  align?: "left" | "center";
  className?: string;
  speed?: number;
};

export function TypedHeading({
  marker,
  prefix,
  emphasis,
  align = "left",
  className = "",
  speed = 120,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<"idle" | "typing" | "done">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPhase("typing");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fullText = prefix + emphasis;
  const typingAnim: CSSProperties = {
    animation: `typing ${fullText.length * speed}ms steps(${fullText.length}, end) forwards`,
    width: 0,
  };

  const centered = align === "center";

  return (
    <div className={className}>
      <p
        className={`mb-4 font-mono text-sm tracking-[0.2em] text-emerald-400/70 ${
          centered ? "text-center" : ""
        }`}
      >
        {marker}
      </p>
      <div className={`${centered ? "mx-auto" : ""} w-max`}>
        <h2
          ref={ref}
          className={`overflow-hidden whitespace-nowrap pr-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${
            phase === "typing" ? "border-r-[4px] border-emerald-400" : ""
          }`}
          style={
            phase === "idle"
              ? { width: "100%", opacity: 0 }
              : phase === "typing"
                ? typingAnim
                : { width: "100%" }
          }
          onAnimationEnd={() => phase === "typing" && setPhase("done")}
        >
          <span className="bg-gradient-to-br from-white via-zinc-200 to-emerald-300 bg-clip-text text-transparent">
            {prefix}
          </span>
          <span className="text-emerald-400">{emphasis}</span>
          {phase === "done" && (
            <span
              aria-hidden="true"
              className="blink-bar ml-2 inline-block h-9 w-[4px] bg-emerald-400 align-middle sm:h-12 lg:h-14"
            />
          )}
        </h2>
      </div>
    </div>
  );
}
