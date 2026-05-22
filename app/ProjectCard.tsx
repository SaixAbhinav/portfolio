"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  TrafficCone,
  ShieldCheck,
  Workflow,
  Activity,
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { Counter } from "./Counter";

const ICON_MAP = { TrafficCone, ShieldCheck, Workflow, Activity } as const;
export type IconName = keyof typeof ICON_MAP;

type Metric = { value: number; suffix?: string; label: string; trend: "up" | "down" };

type Props = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  iconName: IconName;
  metric?: Metric;
  demo: ReactNode;
};

export function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  github,
  iconName,
  metric,
  demo,
}: Props) {
  const Icon = ICON_MAP[iconName];
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);
  const showTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    // Capture card position NOW (before any scroll/layout changes)
    cardRectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
    showTimer.current = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }, 200);
  }, []);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => {
      setAnimate(false);
      setTimeout(() => setVisible(false), 380);
    }, 120);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, hide]);

  // Compute FLIP transform: start at card's screen position, end at viewport center
  const getStartTransform = () => {
    const r = cardRectRef.current;
    if (!r) return "translate(0px, 0px) scale(0.9)";
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const expandedW = Math.min(576, vpW - 48); // max-w-xl with p-6 gutters
    const dx = (r.left + r.width / 2) - vpW / 2;
    const dy = (r.top + r.height / 2) - vpH / 2;
    const scale = r.width / expandedW;
    return `translate(${dx}px, ${dy}px) scale(${scale})`;
  };

  const overlay = visible ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onMouseEnter={() => clearTimeout(hideTimer.current)}
      onMouseLeave={hide}
    >
      {/* Backdrop — fades in independently */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
        style={{ opacity: animate ? 1 : 0, transition: "opacity 350ms ease" }}
        onClick={hide}
      />

      {/* Expanded card — FLIP-animates from card origin to center */}
      <div
        className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-zinc-950"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translate(0px, 0px) scale(1)" : getStartTransform(),
          transition: "transform 480ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-emerald-500/80 via-emerald-400/30 to-transparent" />

        {/* Scrollable content */}
        <div className="p-7">
          {/* Header */}
          <div className="mb-5 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/[0.08]">
              <Icon size={28} className="text-emerald-400" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 pt-0.5">
              <h3 className="text-2xl font-bold text-zinc-50">{title}</h3>
              <p className="mt-0.5 text-sm text-zinc-400">{subtitle}</p>
            </div>
          </div>

          {/* Live interactive demo */}
          <div className="mb-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            {demo}
          </div>

          {/* Metric */}
          {metric && (
            <div className="mb-5 flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-5 py-4">
              <span className="font-mono text-4xl font-black leading-none text-emerald-400">
                <Counter target={metric.value} />
                {metric.suffix}
              </span>
              <div>
                <span className="flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-widest text-emerald-300/70">
                  {metric.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {metric.trend === "up" ? "Increase" : "Reduction"}
                </span>
                <span className="text-sm text-zinc-300">{metric.label}</span>
              </div>
            </div>
          )}

          {/* Full description */}
          <p className="mb-5 text-sm leading-relaxed text-zinc-300">{description}</p>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              disabled
              title="Live demo coming soon"
              className="flex cursor-not-allowed items-center gap-2 rounded-full bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-500/40"
            >
              <ExternalLink size={15} />
              Live Demo (Coming Soon)
            </button>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              <ArrowUpRight size={15} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div ref={cardRef} onMouseEnter={show} onMouseLeave={hide}>
        <SpotlightCard className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"
          />
          {/* Interactive demo area */}
          <div className="mb-4 min-h-[13rem] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            {demo}
          </div>
          {/* Info area */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[0.12]">
                  <Icon size={20} className="text-emerald-400" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight text-zinc-50">{title}</h3>
                  <p className="text-xs text-zinc-500">{subtitle}</p>
                </div>
              </div>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} repository (opens in a new tab)`}
                className="shrink-0 text-zinc-600 transition-colors hover:text-emerald-400"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
            {metric && (
              <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
                <span className="font-mono text-2xl font-black leading-none text-emerald-400">
                  <Counter target={metric.value} />
                  {metric.suffix}
                </span>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-widest text-emerald-300/70">
                    {metric.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {metric.trend === "up" ? "Increase" : "Reduction"}
                  </span>
                  <span className="text-xs text-zinc-400">{metric.label}</span>
                </div>
              </div>
            )}
            <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">{description}</p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
