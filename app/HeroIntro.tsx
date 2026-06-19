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
  { label: "Curious", Icon: Sparkles, ring: "border-lavender/55", ink: "text-lavender" },
  { label: "Playful", Icon: Smile, ring: "border-dawn/55", ink: "text-dawn" },
  { label: "Explorative", Icon: Compass, ring: "border-wildflower/55", ink: "text-wildflower" },
  { label: "Unknown", Icon: Telescope, ring: "border-mint/55", ink: "text-mint" },
  { label: "Meaningful", Icon: Heart, ring: "border-amber-flame/55", ink: "text-amber-flame" },
] as const;

// Each block fades+rises in sequence on mount. CSS transitions only, so content
// is fully present for reduced-motion / no-JS — only the entrance is gated.
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
      {/* Name */}
      <h1
        style={{ transitionDelay: "120ms" }}
        className={`${revealClass(shown)} font-display text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[1.02] tracking-tight text-cream`}
      >
        Sai Abhinav
      </h1>

      {/* Handwritten tagline */}
      <p
        style={{ transitionDelay: "260ms" }}
        className={`${revealClass(shown)} mt-3 font-hand text-[clamp(1.75rem,4vw,2.75rem)] leading-none text-gold`}
      >
        Aspiring AI Engineer
      </p>

      {/* Personality chips — outlined, like the brand board */}
      <div
        style={{ transitionDelay: "540ms" }}
        className={`${revealClass(shown)} mt-8 flex flex-wrap items-center justify-center gap-2.5`}
      >
        {PERSONALITY.map(({ label, Icon, ring, ink }) => (
          <span
            key={label}
            className={`flex items-center gap-1.5 rounded-full border ${ring} bg-ink/40 px-3.5 py-1.5 text-sm font-medium text-cream`}
          >
            <Icon size={14} strokeWidth={2} className={ink} />
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
            href="#projects"
            className="group flex items-center gap-2 rounded-full bg-dawn px-7 py-3.5 text-base font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(255,214,231,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            View Projects
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-base font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-dawn/60"
          >
            Get in Touch
          </a>
        </div>

        {/* Social + résumé */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://github.com/SaixAbhinav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cream-soft transition-colors hover:text-cream"
          >
            <GitBranch size={15} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saixabhinav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cream-soft transition-colors hover:text-cream"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cream-soft transition-colors hover:text-cream"
          >
            <FileDown size={15} />
            Résumé
          </a>
        </div>
      </div>
    </div>
  );
}
