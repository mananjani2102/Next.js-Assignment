interface ArticleHeaderProps {
  title: string;
  description: string;
  badge?: 'Guide';
  readingMinutes?: number;
}

export function ArticleHeader({
  title,
  description,
  badge,
  readingMinutes,
}: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      {badge === 'Guide' && (
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[11px] uppercase tracking-wider bg-surface-active text-primary rounded-xs px-2 py-0.5 font-semibold">
            GUIDE
          </span>
          {readingMinutes !== undefined && (
            <span className="font-mono text-[13px] text-muted">
              Estimated read: {readingMinutes} min
            </span>
          )}
        </div>
      )}

      <h1 className="text-[40px] font-bold tracking-tight text-ink leading-tight mb-4">
        {title}
      </h1>

      <p className="text-[18px] text-muted max-w-2xl leading-relaxed">
        {description}
      </p>

      <hr className="border-line mt-8 mb-8" />
    </header>
  );
}
