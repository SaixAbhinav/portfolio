"use client";

import { useEffect, useState } from "react";
import {
  Compass,
  Sparkles,
  Smile,
  Telescope,
  Heart,
  ArrowRight,
  FileDown,
  GitBranch,
} from "lucide-react";

const PERSONALITY = [
  { label: "Curious", Icon: Sparkles, tint: "bg-lavender" },
  { label: "Playful", Icon: Smile, tint: "bg-dawn" },
  { label: "Explorative", Icon: Compass, tint: "bg-wildflower" },
  { label: "Unknown", Icon: Telescope, tint: "bg-mint" },
  { label: "Meaningful", Icon: Heart, tint: "bg-peach" },
] as const;

// Each block fades+rises in sequence on mount. CSS transitions only, so the
// content is fully present for reduced-motion / no-JS — only the entrance is gated.
function revealClass(shown: boolean) {
  return `transition-all duration-700 ease-out ${
    shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;
}

export function HeroIntro() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Kicker */}
      <p
        style={{ transitionDelay: "0ms" }}
        className={`${revealClass(shown)} mb-5 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft`}
      >
        Explorer · Builder · Learner
      </p>

      {/* Name */}
      <h1
        style={{ transitionDelay: "120ms" }}
        className={`${revealClass(shown)} font-display text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[1.02] tracking-tight text-ink`}
      >
        Sai Abhinav
      </h1>

      {/* Handwritten tagline */}
      <p
        style={{ transitionDelay: "260ms" }}
        className={`${revealClass(shown)} mt-3 font-hand text-[clamp(1.75rem,4vw,2.75rem)] leading-none text-ember`}
      >
        The universe is larger than the map.
      </p>

      {/* Manifesto line */}
      <p
        style={{ transitionDelay: "400ms" }}
        className={`${revealClass(shown)} mt-7 max-w-xl text-balance text-lg leading-relaxed text-ink-soft sm:text-xl`}
      >
        I build intelligent systems to better understand worlds that haven&apos;t
        been mapped yet.
      </p>

      {/* Personality chips */}
      <div
        style={{ transitionDelay: "540ms" }}
        className={`${revealClass(shown)} mt-8 flex flex-wrap items-center justify-center gap-2.5`}
      >
        {PERSONALITY.map(({ label, Icon, tint }) => (
          <span
            key={label}
            className={`flex items-center gap-1.5 rounded-full ${tint} px-3.5 py-1.5 text-sm font-medium text-ink shadow-[0_2px_10px_-4px_rgba(47,49,66,0.18)]`}
          >
            <Icon size={14} strokeWidth={2} />
            {label}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div
        style={{ transitionDelay: "680ms" }}
        className={`${revealClass(shown)} mt-10 flex flex-col items-center gap-5`}
      >
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#discoveries"
            className="group flex items-center gap-2 rounded-full bg-amber-flame px-7 py-3.5 text-base font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(255,179,71,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            Explore the Journey
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#logbook"
            className="rounded-full border border-ink/15 bg-paper px-7 py-3.5 text-base font-semibold text-ink shadow-[0_2px_12px_-4px_rgba(47,49,66,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-flame/50"
          >
            Read the Logbook
          </a>
        </div>

        {/* Social + résumé */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://github.com/SaixAbhinav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-paper/70 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <GitBranch size={15} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saixabhinav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-paper/70 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-paper/70 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <FileDown size={15} />
            Résumé
          </a>
        </div>
      </div>
    </div>
  );
}
