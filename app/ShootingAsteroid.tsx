"use client";

import { useEffect, useState } from "react";

type Flight = {
  id: number;
  topVh: number;
  startSide: "left" | "right";
  dxVw: number;
  dyVh: number;
  duration: number;
  angle: number;
};

// Three distinct paths so the streak doesn't always read the same way:
// top-left -> bottom-right, top-right -> bottom-left, and a rising
// bottom-left -> top-right arc.
type Direction = "tl-br" | "tr-bl" | "bl-tr";

function randomFlight(id: number): Flight {
  const roll = Math.random();
  const direction: Direction = roll < 1 / 3 ? "tl-br" : roll < 2 / 3 ? "tr-bl" : "bl-tr";
  const travel = 120 + Math.random() * 20;
  const drop = 30 + Math.random() * 35;
  const duration = 2.2 + Math.random() * 1.6;

  let topVh: number;
  let startSide: "left" | "right";
  let dxVw: number;
  let dyVh: number;

  if (direction === "tl-br") {
    topVh = 4 + Math.random() * 50;
    startSide = "left";
    dxVw = travel;
    dyVh = drop;
  } else if (direction === "tr-bl") {
    topVh = 4 + Math.random() * 50;
    startSide = "right";
    dxVw = -travel;
    dyVh = drop;
  } else {
    topVh = 45 + Math.random() * 50;
    startSide = "left";
    dxVw = travel;
    dyVh = -drop;
  }

  // Approximate travel angle from the vw/vh deltas — purely for orienting
  // the streak's trail, doesn't need to be physically exact.
  const angle = (Math.atan2(dyVh, dxVw) * 180) / Math.PI;
  return { id, topVh, startSide, dxVw, dyVh, duration, angle };
}

export function ShootingAsteroid() {
  const [flight, setFlight] = useState<Flight | null>(null);

  useEffect(() => {
    // The asteroid is a deliberate decorative effect that runs regardless of
    // the OS reduced-motion preference (see the matching note in globals.css).
    let nextId = 1;
    let timeoutId: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 14000 + Math.random() * 18000;
      timeoutId = setTimeout(() => {
        const next = randomFlight(nextId);
        nextId += 1;
        setFlight(next);
        setTimeout(() => setFlight(null), next.duration * 1000 + 200);
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeoutId);
  }, []);

  if (!flight) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <div
        key={flight.id}
        className="asteroid-flight absolute"
        style={{
          top: `${flight.topVh}vh`,
          ...(flight.startSide === "left" ? { left: "-8vw" } : { right: "-8vw" }),
          animationDuration: `${flight.duration}s`,
          ["--asteroid-angle" as string]: `${flight.angle}deg`,
          ["--asteroid-dx" as string]: `${flight.dxVw}vw`,
          ["--asteroid-dy" as string]: `${flight.dyVh}vh`,
        }}
      >
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
          <defs>
            <linearGradient id={`asteroid-tail-${flight.id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#ffd6e7" stopOpacity="0" />
              <stop offset="65%" stopColor="#ffb347" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#f5f3ff" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path d="M0 12 L100 10.5 L100 13.5 Z" fill={`url(#asteroid-tail-${flight.id})`} />
          <circle cx="104" cy="12" r="6" fill="#ffd6e7" opacity="0.35" />
          <circle cx="104" cy="12" r="3" fill="#f5f3ff" />
        </svg>
      </div>
    </div>
  );
}
