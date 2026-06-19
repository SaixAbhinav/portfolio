"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitBranch } from "lucide-react";
import { contactLinks, routes } from "./content";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(7,16,26,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="journal-frame star-field shrink-0 px-3 py-2 font-serif text-base leading-none tracking-[0.22em] text-[var(--cream)] transition hover:border-[color:var(--line-strong)] hover:text-[var(--peach)]"
          aria-label="Sai Abhinav journey"
        >
          SA
        </Link>

        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="flex w-max items-center gap-1 px-1 sm:ml-auto sm:w-auto sm:justify-end">
            {routes.map((route) => {
              const active = pathname === route.href;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition sm:text-[0.8rem] ${
                    active
                      ? "border-[color:var(--line-strong)] bg-[rgba(255,189,129,0.08)] text-[var(--peach)]"
                      : "border-transparent text-[var(--muted)] hover:border-[color:var(--line)] hover:text-[var(--cream)]"
                  }`}
                >
                  <span className="mr-2 font-mono text-[0.65rem] text-[var(--dim)]">
                    {route.eyebrow}
                  </span>
                  {route.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-[var(--peach)] transition-transform ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <a
          href={contactLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile opens in a new tab"
          className="journal-frame hidden shrink-0 p-2 text-[var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[var(--peach)] sm:inline-flex"
        >
          <GitBranch size={17} aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
