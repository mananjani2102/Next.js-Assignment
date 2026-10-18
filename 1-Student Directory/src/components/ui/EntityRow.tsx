import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EntityRowMetaItem {
  icon?: ReactNode;
  label: ReactNode;
}

export interface EntityRowProps {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  meta?: EntityRowMetaItem[];
  action?: ReactNode;
  className?: string;
}

export function EntityRow({
  icon,
  title,
  description,
  meta,
  action,
  className,
}: EntityRowProps) {
  return (
    <div
      className={cn(
        "p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className="size-9 bg-chip rounded-tile flex items-center justify-center shrink-0 text-primary mt-0.5"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="flex flex-col">
          <div className="text-title font-semibold text-ink">{title}</div>
          <div className="text-body text-body mt-1">{description}</div>
          {meta && meta.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-muted">
              {meta.map((item, index) => (
                <div key={index} className="inline-flex items-center gap-1.5">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="text-subtle select-none mr-1"
                    >
                      ·
                    </span>
                  )}
                  {item.icon && (
                    <span className="size-4 shrink-0 text-subtle inline-flex items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {action && <div className="shrink-0 self-start sm:self-center">{action}</div>}
    </div>
  );
}
