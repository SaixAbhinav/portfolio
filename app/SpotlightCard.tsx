"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// Plain card wrapper. The cursor-tracking radial "spotlight" glow was removed
// (no glow/light effects).
export function SpotlightCard({ children, className }: Props) {
  return (
    <div
      className={className}
      style={{
        transition: "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease",
      }}
    >
      {children}
    </div>
  );
}
