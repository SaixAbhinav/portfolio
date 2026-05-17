"use client";

import { MouseEvent, ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spotlight-x", `50%`);
    el.style.setProperty("--spotlight-y", `50%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        backgroundImage:
          "radial-gradient(360px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(16, 185, 129, 0.08), transparent 45%)",
        transition: "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease",
      }}
    >
      {children}
    </div>
  );
}
