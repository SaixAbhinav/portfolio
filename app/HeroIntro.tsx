"use client";

import { useEffect, useState } from "react";
import { ArrowRight, FileDown } from "lucide-react";

// lucide-react excludes trademarked brand glyphs, so GitHub/LinkedIn are
// hand-drawn inline marks sized to match the lucide icons around them.
type MarkProps = { size?: number; strokeWidth?: number; className?: string };

function GithubMark({ size = 14, className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M12 0.3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.23c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.82 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0.3" />
    </svg>
  );
}

function LinkedinMark({ size = 14, className }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56z" />
    </svg>
  );
}

const LINKS = [
  {
    label: "GitHub",
    Icon: GithubMark,
    href: "https://github.com/SaixAbhinav",
    ring: "border-lavender/55",
    ink: "text-lavender",
  },
  {
    label: "LinkedIn",
    Icon: LinkedinMark,
    href: "https://www.linkedin.com/in/saixabhinav",
    ring: "border-dawn/55",
    ink: "text-dawn",
  },
  {
    label: "Résumé",
    Icon: FileDown,
    href: "/resume.pdf",
    ring: "border-wildflower/55",
    ink: "text-wildflower",
  },
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
        AI Engineer
      </p>

      {/* GitHub / LinkedIn / Résumé — outlined, like the brand board */}
      <div
        style={{ transitionDelay: "540ms" }}
        className={`${revealClass(shown)} mt-8 flex flex-wrap items-center justify-center gap-2.5`}
      >
        {LINKS.map(({ label, Icon, href, ring, ink }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 rounded-full border ${ring} bg-ink/40 px-3.5 py-1.5 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink/60`}
          >
            <Icon size={14} strokeWidth={2} className={ink} />
            {label}
          </a>
        ))}
      </div>

      {/* CTAs */}
      <div
        style={{ transitionDelay: "680ms" }}
        className={`${revealClass(shown)} mt-10 flex flex-wrap items-center justify-center gap-3.5`}
      >
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
    </div>
  );
}
