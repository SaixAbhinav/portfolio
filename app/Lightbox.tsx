"use client";

import { X } from "lucide-react";
import { type Screenshot } from "./ProjectCard";

// Full-screen screenshot viewer, rendered into a portal by ProjectCard.
export function Lightbox({ shot, onClose }: { shot: Screenshot; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm sm:p-10"
      onClick={onClose}
    >
      <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close screenshot"
          className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-ink text-cream transition-colors hover:text-gold"
        >
          <X size={16} />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.caption}
          width={shot.width}
          height={shot.height}
          className="max-h-[80vh] w-auto rounded-xl border border-cream/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        />
        <figcaption className="mt-3 text-center text-sm text-cream-soft">{shot.caption}</figcaption>
      </figure>
    </div>
  );
}
