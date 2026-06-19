type JournalEntryProps = {
  title: string;
  org: string;
  meta: string;
  body: string;
  index: number;
};

export function JournalEntry({
  title,
  org,
  meta,
  body,
  index,
}: JournalEntryProps) {
  return (
    <article className="relative border-l border-[color:var(--line-strong)] pl-6">
      <span className="absolute -left-[1.05rem] top-0 grid h-8 w-8 place-items-center rounded-full border border-[color:var(--line-strong)] bg-[var(--ink-soft)] font-mono text-xs text-[var(--peach)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="journal-frame bg-[rgba(12,23,34,0.72)] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl text-[var(--cream)]">
              {title}
            </h2>
            <p className="mt-1 text-base text-[var(--sky)]">{org}</p>
          </div>
          <span className="rounded-md border border-[color:var(--line)] px-3 py-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            {meta}
          </span>
        </div>
        <p className="mt-5 text-base leading-8 text-[var(--muted)]">{body}</p>
      </div>
    </article>
  );
}
