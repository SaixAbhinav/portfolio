"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  TrafficCone,
  ShieldCheck,
  Workflow,
  Activity,
  Maximize2,
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { Counter } from "./Counter";
import { useFlipExpand } from "./useFlipExpand";
import { ProjectModal } from "./ProjectModal";
import { Lightbox } from "./Lightbox";

const ICON_MAP = { TrafficCone, ShieldCheck, Workflow, Activity } as const;
export type IconName = keyof typeof ICON_MAP;

export type Metric = { value: number; suffix?: string; label: string; trend: "up" | "down" };

export type Screenshot = { src: string; caption: string; width: number; height: number };

type Props = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  iconName: IconName;
  kicker?: string;
  metric?: Metric;
  highlights?: string[];
  screenshots?: Screenshot[];
  embedUrl?: string;
  demo: ReactNode;
};

export function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  github,
  iconName,
  kicker,
  metric,
  highlights,
  screenshots,
  embedUrl,
  demo,
}: Props) {
  const Icon = ICON_MAP[iconName];
  const cardRef = useRef<HTMLDivElement>(null);
  const { visible, animate, open, close, getStartTransform } = useFlipExpand(cardRef);
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState<Screenshot | null>(null);

  useEffect(() => setMounted(true), []);

  // While the overlay is open: lock body scroll, and let Escape close the
  // lightbox first (if open), otherwise the overlay.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightbox) setLightbox(null);
      else close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible, close, lightbox]);

  useEffect(() => {
    if (!visible) setLightbox(null);
  }, [visible]);

  return (
    <>
      <div ref={cardRef} onClick={open} className="cursor-pointer">
        <SpotlightCard className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-cream/10 bg-ink p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-amber-flame/45 hover:shadow-[0_22px_44px_-16px_rgba(0,0,0,0.7)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-flame via-peach to-transparent"
          />
          {/* Interactive demo area */}
          <div
            className="relative mb-4 min-h-[13rem] overflow-hidden rounded-2xl border border-cream/10 bg-night"
            onClick={(e) => e.stopPropagation()}
          >
            {demo}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
              aria-label={`Expand ${title} details`}
              className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-night/80 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-cream opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 hover:text-gold focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100"
            >
              <Maximize2 size={11} />
              Expand
            </button>
          </div>
          {/* Info area */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-wildflower/30 bg-wildflower/12 transition-transform duration-300 group-hover:-rotate-6">
                  <Icon size={20} className="text-wildflower" strokeWidth={1.6} />
                </div>
                <div>
                  {kicker && (
                    <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold">
                      {kicker}
                    </p>
                  )}
                  <h3 className="font-display text-lg font-semibold leading-tight text-cream">{title}</h3>
                  <p className="text-xs text-cream-soft">{subtitle}</p>
                </div>
              </div>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} repository (opens in a new tab)`}
                className="shrink-0 text-cream-soft transition-colors hover:text-gold"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
            {metric && (
              <div className="flex items-center gap-3 rounded-2xl border border-amber-flame/25 bg-amber-flame/10 px-3 py-2">
                <span className="font-display text-2xl font-bold leading-none text-cream">
                  <Counter target={metric.value} />
                  {metric.suffix}
                </span>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-widest text-amber-flame">
                    {metric.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {metric.trend === "up" ? "Increase" : "Reduction"}
                  </span>
                  <span className="text-xs text-cream-soft">{metric.label}</span>
                </div>
              </div>
            )}
            <p className="line-clamp-2 text-sm leading-relaxed text-cream-soft">{description}</p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cream/10 bg-night/50 px-2.5 py-0.5 text-xs font-medium text-cream-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
      {mounted &&
        visible &&
        createPortal(
          <ProjectModal
            title={title}
            subtitle={subtitle}
            description={description}
            tags={tags}
            github={github}
            kicker={kicker}
            metric={metric}
            highlights={highlights}
            screenshots={screenshots}
            embedUrl={embedUrl}
            demo={demo}
            Icon={Icon}
            animate={animate}
            getStartTransform={getStartTransform}
            onClose={close}
            onOpenLightbox={setLightbox}
          />,
          document.body
        )}
      {mounted &&
        lightbox &&
        createPortal(
          <Lightbox shot={lightbox} onClose={() => setLightbox(null)} />,
          document.body
        )}
    </>
  );
}
