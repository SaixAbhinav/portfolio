import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArtPanel } from "./ArtPanel";
import type { ArtAsset } from "./content";

type PageShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  art: ArtAsset;
  children: ReactNode;
  next?: { href: string; label: string };
};

export function PageShell({
  eyebrow,
  title,
  subtitle,
  art,
  children,
  next,
}: PageShellProps) {
  return (
    <main className="relative z-10 mx-auto min-h-dvh w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
        <div className="soft-reveal">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-[var(--peach)]">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[0.95] text-[var(--cream)] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            {subtitle}
          </p>
        </div>
        <ArtPanel asset={art} priority className="min-h-[19rem]" />
      </section>
      <div className="mt-14">{children}</div>
      {next ? (
        <footer className="mt-16 border-t border-[color:var(--line)] pt-6">
          <Link
            href={next.href}
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--peach)] transition hover:text-[var(--cream)]"
          >
            Next: {next.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </footer>
      ) : null}
    </main>
  );
}
