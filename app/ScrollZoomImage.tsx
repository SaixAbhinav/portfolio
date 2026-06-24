"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

// A hero-style image treatment: it loads noticeably zoomed in and eases down
// to its resting scale the moment it enters view, then keeps a subtle extra
// zoom tied to how far it has scrolled through the viewport (more zoom the
// closer it gets to the top or bottom edge). Two nested layers so the slow
// "settle on load" transition and the fast "follow the scroll" transition
// can run at different speeds without fighting each other.
export function ScrollZoomImage({ src, alt, sizes, className = "", imageClassName = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [scrollScale, setScrollScale] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reducedMotion) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const progress = (vh / 2 - center) / vh;
      const clamped = Math.max(-1, Math.min(1, progress));
      setScrollScale(1 + Math.abs(clamped) * 0.08);
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
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          opacity: loaded ? 1 : 0,
          transform: `scale(${loaded ? 1 : 1.22})`,
          transition: reducedMotion ? "none" : "opacity 1100ms ease-out, transform 1100ms ease-out",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${scrollScale})`,
            transition: reducedMotion ? "none" : "transform 150ms linear",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={`object-cover ${imageClassName}`}
          />
        </div>
      </div>
    </div>
  );
}
