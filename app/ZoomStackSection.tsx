"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  id?: string;
  /** Classes for the inner content wrapper (min-height, flex, padding, etc.). */
  contentClassName?: string;
  /** The decorative backdrop that pins and zooms (e.g. <SkyBackdrop /> or <HeroScene />). */
  backdrop: ReactNode;
  /** Optional extra classes on the outer <section> (e.g. tint helpers like twk-soft). */
  className?: string;
  /** Transform origin for the zoom (e.g. "center", "bottom"). */
  zoomOrigin?: string;
  children: ReactNode;
};

// Recreates the "Hero Zoom on Scroll / load article" effect, generalized to
// every section: the backdrop is pinned to the viewport (sticky) and zooms in
// as the section scrolls past, while the *next* opaque section slides up and
// covers it. Each <section> carries an opaque bg so it occludes the pinned
// backdrop of the section before it — that overlap is the page-to-page
// transition.
//
// The zoom is scroll-coupled motion, so it honors prefers-reduced-motion; the
// cover/slide-up is plain layout (just scrolling) and stays on regardless.
export function ZoomStackSection({
  id,
  contentClassName = "",
  backdrop,
  className = "",
  zoomOrigin = "center",
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const force = localStorage.getItem("__forceZoomTest") === "1";
    setReduced(mq.matches && !force);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 while the section sits at the top of the viewport, ramping to 1 as it
      // scrolls up and the next section covers it.
      const progress = Math.min(1, Math.max(0, -rect.top / vh));
      setScale(1 + progress * 0.16);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative isolate bg-night ${className}`}
    >
      {/* Pinned, zooming backdrop. The negative margin cancels its layout
          height so the content overlaps it instead of being pushed down. */}
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-0 -mb-[100dvh] h-[100dvh] overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: zoomOrigin,
            transition: reduced ? "none" : "transform 120ms linear",
          }}
        >
          {backdrop}
        </div>
      </div>

      {/* Soft top edge so the covering panel reads as sliding over the one below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cream/15 to-transparent"
      />

      <div className={`relative ${contentClassName}`}>{children}</div>
    </section>
  );
}
