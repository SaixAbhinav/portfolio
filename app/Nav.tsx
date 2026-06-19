"use client";

import { useEffect, useState } from "react";
import { Compass } from "lucide-react";

// Journal section map: id in the page → label in the nav.
const sections = [
  { id: "about", label: "About" },
  { id: "logbook", label: "Logbook" },
  { id: "discoveries", label: "Discoveries" },
  { id: "signals", label: "Signals" },
] as const;
type SectionId = (typeof sections)[number]["id"];

export function Nav() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(top.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    const observed: Element[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex items-center gap-1 rounded-full border border-ink/10 bg-paper/85 px-2 py-2 shadow-[0_8px_30px_-12px_rgba(47,49,66,0.28)] backdrop-blur-md sm:gap-2 sm:px-3">
        {/* Brand mark → home */}
        <a
          href="#top"
          aria-label="Back to top"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-ink transition-colors hover:text-amber-flame"
        >
          <Compass size={18} strokeWidth={2} />
          <span className="font-display text-base font-semibold tracking-tight">
            Sai Abhinav
          </span>
        </a>

        <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-ink/10 md:block" />

        <div className="hidden items-center gap-0.5 text-sm md:flex md:gap-1">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                active === id
                  ? "bg-skymilk text-ink"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Contact — the amber CTA pill */}
        <a
          href="#contact"
          className="ml-0.5 rounded-full bg-amber-flame px-4 py-1.5 text-sm font-semibold text-ink shadow-[0_4px_14px_-4px_rgba(255,179,71,0.9)] transition-all hover:-translate-y-0.5"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
