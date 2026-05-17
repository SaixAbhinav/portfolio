"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[40] h-[200px] w-[200px] rounded-full opacity-60 mix-blend-screen blur-2xl"
      style={{
        background:
          "radial-gradient(circle, rgba(16,185,129,0.18), transparent 60%)",
      }}
    />
  );
}
