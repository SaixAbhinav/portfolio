"use client";

// Dark "journal cover" hero backdrop: a drifting star field over the night
// canvas, a soft campfire glow, and the gold line-art scene (explorer at a
// campfire under the mountains). Decorative + aria-hidden; pure SVG/CSS.
// Each layer also drifts slightly opposite the cursor — a layered, mouse-
// driven parallax (more shift the closer a layer reads as "foreground").

import { useEffect, useRef, useState } from "react";
import { HeroLineArt } from "./LineArt";

const STAR_LAYER =
  "radial-gradient(1.6px 1.6px at 12% 18%, rgba(245,243,255,0.9), transparent)," +
  "radial-gradient(1.4px 1.4px at 78% 12%, rgba(216,192,138,0.9), transparent)," +
  "radial-gradient(1px 1px at 34% 30%, rgba(245,243,255,0.7), transparent)," +
  "radial-gradient(1.5px 1.5px at 64% 22%, rgba(245,243,255,0.8), transparent)," +
  "radial-gradient(1px 1px at 88% 34%, rgba(216,192,138,0.7), transparent)," +
  "radial-gradient(1.4px 1.4px at 22% 46%, rgba(245,243,255,0.7), transparent)," +
  "radial-gradient(1px 1px at 52% 14%, rgba(245,243,255,0.6), transparent)," +
  "radial-gradient(1.4px 1.4px at 92% 52%, rgba(216,192,138,0.7), transparent)";

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let raf = 0;
    let latest = { x: 0, y: 0 };

    const apply = () => {
      raf = 0;
      setOffset(latest);
    };

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) {
        latest = { x: 0, y: 0 };
      } else {
        latest = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      latest = { x: 0, y: 0 };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(${offset.x * -depth}px, ${offset.y * -depth * 0.65}px, 0)`,
    transition: "transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
  });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Night vignette + dawn glow near the horizon */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_8%,rgba(57,59,81,0.55),transparent_55%)]"
        style={layer(8)}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(60%_100%_at_50%_120%,rgba(255,179,71,0.12),transparent_70%)]"
        style={layer(12)}
      />

      {/* Drifting star field */}
      <div
        className="star-field absolute -inset-32 opacity-80"
        style={{ backgroundImage: STAR_LAYER, backgroundSize: "340px 340px", ...layer(20) }}
      />

      {/* Gold line-art scene, anchored to the lower band */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center text-gold" style={layer(32)}>
        <HeroLineArt className="h-auto w-full max-w-6xl translate-y-[6%] origin-bottom scale-95 opacity-90" />
      </div>
    </div>
  );
}
