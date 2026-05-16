"use client";

import { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";

const sections = ["about", "experience", "projects", "contact"] as const;
type Section = (typeof sections)[number];

export function Nav() {
  const [active, setActive] = useState<Section | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(top.target.id as Section);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    const observed: Element[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="text-base font-bold tracking-[0.25em] text-zinc-100 uppercase"
          aria-label="Back to top"
        >
          SA
        </a>
        <div className="flex items-center gap-8 text-base">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`transition-colors ${
                active === id
                  ? "text-emerald-400"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a
            href="https://github.com/SaixAbhinav"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <GitBranch size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
