type SkillGroup = {
  category: string;
  items: string[];
};

type Metric = {
  value: string;
  label: string;
};

type SignalGridProps = {
  skills: SkillGroup[];
  metrics: Metric[];
};

export function SignalGrid({ skills, metrics }: SignalGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="journal-frame bg-[rgba(12,23,34,0.72)] p-5"
          >
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--peach)]">
              {group.category}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[color:var(--line)] bg-[rgba(246,221,201,0.04)] px-3 py-2 text-sm text-[var(--muted)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="star-field journal-frame bg-[rgba(19,21,29,0.76)] p-5"
          >
            <p className="font-serif text-5xl text-[var(--peach)]">
              {metric.value}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
              {metric.label}
            </p>
          </div>
        ))}
      </aside>
    </div>
  );
}
