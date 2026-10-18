import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  divided?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  aside,
  divided = false,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        divided && "border-b border-line pb-6",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <h1 className="text-h1 font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {aside && <div className="shrink-0 self-start sm:self-auto">{aside}</div>}
      </div>

      {description && (
        <p className="text-body text-muted mt-1 max-w-2xl">{description}</p>
      )}
    </div>
  );
}
