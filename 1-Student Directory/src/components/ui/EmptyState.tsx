import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card
      padding="none"
      className={cn("py-12 px-6 flex flex-col items-center text-center", className)}
    >
      <div
        className="size-10 bg-chip rounded-tile flex items-center justify-center text-primary mb-4 select-none shrink-0"
        aria-hidden="true"
      >
        <span className="size-5 inline-flex items-center justify-center [&>svg]:size-5">
          {icon}
        </span>
      </div>
      <h3 className="text-card font-semibold text-ink">{title}</h3>
      <p className="text-body text-muted max-w-sm mt-1">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  );
}
