"use client";

import { type ReactNode } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Maximize2,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Counter } from "./Counter";
import { type Metric, type Screenshot } from "./ProjectCard";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  kicker?: string;
  metric?: Metric;
  highlights?: string[];
  screenshots?: Screenshot[];
  embedUrl?: string;
  demo: ReactNode;
  Icon: LucideIcon;
  animate: boolean;
  getStartTransform: () => string;
  onClose: () => void;
  onOpenLightbox: (shot: Screenshot) => void;
};

// Expanded project overlay: FLIP-animated card with the live demo / embed,
// metric, highlights, screenshots, tags, and actions. Rendered into a portal
// by ProjectCard.
export function ProjectModal({
  title,
  subtitle,
  description,
  tags,
  github,
  kicker,
  metric,
  highlights,
  screenshots,
  embedUrl,
  demo,
  Icon,
  animate,
  getStartTransform,
  onClose,
  onOpenLightbox,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-night/80 backdrop-blur-md"
        style={{ opacity: animate ? 1 : 0, transition: "opacity 350ms ease" }}
        onClick={onClose}
      />

      {/* Expanded card */}
      <div
        className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-cream/10 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translate(0px, 0px) scale(1)" : getStartTransform(),
          transition: "transform 480ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-20 flex items-start gap-4 border-b border-cream/10 bg-ink/90 px-7 py-5 backdrop-blur-md">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-flame via-peach to-transparent" />
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-wildflower/35 bg-wildflower/15">
            <Icon size={26} className="text-wildflower" strokeWidth={1.6} />
          </div>
          <div className="min-w-0 pt-0.5">
            {kicker && (
              <p className="mb-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                {kicker}
              </p>
            )}
            <h3 className="font-display text-2xl font-semibold text-cream">{title}</h3>
            <p className="mt-0.5 text-sm text-cream-soft">{subtitle}</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="px-7 pb-7 pt-5">
          {embedUrl ? (
            <div className="mb-5">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gold">
                  Live dashboard
                </p>
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-cream-soft transition-colors hover:text-gold"
                >
                  Open full <ArrowUpRight size={13} />
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-cream/10 bg-night">
                <iframe
                  src={embedUrl}
                  title={`${title} live dashboard`}
                  loading="lazy"
                  className="h-[34rem] w-full"
                />
              </div>
              <p className="mt-2 text-xs text-cream-soft">
                Live app on free hosting — the first load can take ~30s to wake up.
              </p>
            </div>
          ) : (
            <div className="mb-5 overflow-hidden rounded-2xl border border-cream/10 bg-night">
              {demo}
            </div>
          )}

          {/* Metric */}
          {metric && (
            <div className="mb-5 flex items-center gap-4 rounded-2xl border border-amber-flame/25 bg-amber-flame/10 px-5 py-4">
              <span className="font-display text-4xl font-bold leading-none text-cream">
                <Counter target={metric.value} />
                {metric.suffix}
              </span>
              <div>
                <span className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-widest text-amber-flame">
                  {metric.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {metric.trend === "up" ? "Increase" : "Reduction"}
                </span>
                <span className="text-sm text-cream-soft">{metric.label}</span>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-cream-soft">{description}</p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="mb-5">
              <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-widest text-gold">
                Highlights
              </p>
              <ul className="flex flex-col gap-2">
                {highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-cream-soft"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint/80">
                      <Check size={11} strokeWidth={3} className="text-ink" />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Screenshots */}
          {screenshots && screenshots.length > 0 && (
            <div className="mb-6">
              <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-widest text-gold">
                Screenshots
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {screenshots.map((shot) => (
                  <figure key={shot.src}>
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(shot)}
                      aria-label={`Expand screenshot: ${shot.caption}`}
                      className="group/shot relative block w-full cursor-pointer overflow-hidden rounded-xl border border-cream/10 bg-night transition-all duration-300 hover:border-amber-flame/60 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot.src}
                        alt={shot.caption}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        className="block h-auto w-full transition-transform duration-500 group-hover/shot:scale-[1.02]"
                      />
                      <span className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-full bg-night/90 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/shot:opacity-100">
                        <Maximize2 size={11} />
                        Expand
                      </span>
                    </button>
                    <figcaption className="mt-2 text-xs leading-relaxed text-cream-soft">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cream/12 bg-night/50 px-3 py-1 text-xs font-medium text-cream-soft"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-amber-flame/60"
            >
              <ArrowUpRight size={15} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
