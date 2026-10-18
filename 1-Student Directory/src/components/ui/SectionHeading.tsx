import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  title: string;
  count?: number;
  rightSlot?: ReactNode;
  className?: string;
}

export function SectionHeading({
  title,
  count,
  rightSlot,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "border-b border-line pb-3 mb-4 flex items-center justify-between flex-wrap gap-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-title font-semibold text-ink">{title}</h2>
        {typeof count === "number" && <Badge variant="count">{count}</Badge>}
      </div>
      {rightSlot && (
        <div className="flex items-center text-small text-muted">{rightSlot}</div>
      )}
    </div>
  );
}
