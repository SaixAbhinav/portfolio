import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ArtPanel } from "./ArtPanel";
import { artAssets, type Project } from "./content";

type ProjectDiscoveryProps = {
  project: Project;
  index: number;
};

export function ProjectDiscovery({ project, index }: ProjectDiscoveryProps) {
  const art = artAssets[project.art];

  return (
    <article className="journal-frame grid gap-6 bg-[rgba(12,23,34,0.72)] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-stretch">
      <div className="flex flex-col">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--copper)]">
              Discovery {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-none text-[var(--cream)] sm:text-5xl">
              {project.title}
            </h2>
            <p className="mt-3 text-base text-[var(--sky)]">
              {project.subtitle}
            </p>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository opens in a new tab`}
            className="journal-frame inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--peach)] transition hover:border-[color:var(--line-strong)] hover:text-[var(--cream)]"
          >
            GitHub
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <p className="max-w-3xl flex-1 text-base leading-8 text-[var(--muted)]">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[color:var(--line)] bg-[rgba(246,221,201,0.04)] px-3 py-2 text-xs text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.metric ? (
          <div className="mt-6 inline-flex w-fit items-center gap-3 border-l border-[color:var(--peach)] pl-4">
            {project.metric.trend === "down" ? (
              <ArrowDownRight size={18} className="text-[var(--mint)]" />
            ) : (
              <ArrowUpRight size={18} className="text-[var(--mint)]" />
            )}
            <span className="font-serif text-3xl text-[var(--peach)]">
              {project.metric.value}
            </span>
            <span className="text-sm uppercase tracking-[0.16em] text-[var(--dim)]">
              {project.metric.label}
            </span>
          </div>
        ) : null}
      </div>

      <ArtPanel asset={art} className="min-h-[16rem]" />
    </article>
  );
}
