"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Effect = "slide-left" | "slide-right" | "fade-up";

type Props = {
  children: ReactNode;
  className?: string;
  effect?: Effect;
  threshold?: number;
  duration?: number;
  delay?: number;
};

const INITIAL: Record<Effect, string> = {
  "slide-left": "opacity-0 -translate-x-20",
  "slide-right": "opacity-0 translate-x-20",
  "fade-up": "opacity-0 translate-y-5",
};

export function ScrollReveal({
  children,
  className = "",
  effect = "fade-up",
  threshold = 0.15,
  duration = 900,
  delay = 0,
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

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`${className} transition-all ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : INITIAL[effect]
      }`}
    >
      {children}
    </div>
  );
}
