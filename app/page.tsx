import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { ArtPanel } from "./ArtPanel";
import { PageShell } from "./PageShell";
import { artAssets, contactLinks, metrics, projects } from "./content";

export default function JourneyPage() {
  const featured = projects.slice(0, 2);

  return (
    <PageShell
      eyebrow="00 / Journey"
      title="Sai Abhinav maps intelligent systems for unmapped problems."
      subtitle="Applied AI builder working across automation, machine learning, reinforcement learning, and prompt-engineered workflows."
      art={artAssets.hero}
      next={{ href: "/discoveries", label: "View discoveries" }}
    >
      <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="ruled-panel star-field p-6 sm:p-8">
          <p className="hand-note text-3xl leading-tight text-[var(--lavender)] sm:text-4xl">
            The universe is larger than the map.
          </p>
          <div className="mt-8 space-y-5 text-base leading-8 text-[var(--muted)] sm:text-lg">
            <p>
              Every project begins with a question. Every question becomes an
              experiment. Every experiment becomes a discovery.
            </p>
            <p>
              I build intelligent systems to better understand worlds that have
              not been mapped yet, then turn those observations into tools that
              people can actually use.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/discoveries"
              className="inline-flex items-center gap-3 rounded-md border border-[color:var(--peach)] bg-[rgba(255,189,129,0.12)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--peach)] transition hover:bg-[rgba(255,189,129,0.18)] hover:text-[var(--cream)]"
            >
              View discoveries
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={contactLinks.email}
              className="inline-flex items-center gap-3 rounded-md border border-[color:var(--line)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:border-[color:var(--line-strong)] hover:text-[var(--cream)]"
            >
              <Mail size={16} aria-hidden="true" />
              Contact
            </a>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="journal-frame bg-[rgba(12,23,34,0.72)] p-5"
            >
              <p className="font-serif text-4xl text-[var(--peach)]">
                {metric.value}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-[var(--copper)]">
            Discovery 01
          </p>
          <div className="grid gap-4">
            {featured.map((project) => (
              <Link
                key={project.title}
                href="/discoveries"
                className="group journal-frame flex flex-col gap-4 bg-[rgba(12,23,34,0.68)] p-5 transition hover:border-[color:var(--line-strong)] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-serif text-3xl text-[var(--cream)]">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    {project.subtitle}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--peach)]">
                  Read log
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
        <ArtPanel asset={artAssets.planet} className="min-h-[18rem]" />
      </section>
    </PageShell>
  );
}
