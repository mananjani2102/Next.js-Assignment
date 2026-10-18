import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface MetaGridItem {
  label: string;
  value: ReactNode;
}

export interface MetaGridProps {
  items: MetaGridItem[];
  columns?: 2 | 4;
  labelStyle?: "caps" | "plain";
  className?: string;
}

export function MetaGrid({
  items,
  columns = 2,
  labelStyle = "caps",
  className,
}: MetaGridProps) {
  const isCaps = labelStyle === "caps";

  const gridColumns =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <dl
      className={cn(
        "grid",
        gridColumns,
        isCaps ? "gap-x-6 gap-y-5" : "gap-x-6 gap-y-4",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={item.label + index} className="flex flex-col">
          <dt
            className={cn(
              isCaps
                ? "text-label font-semibold uppercase tracking-[0.06em] text-muted"
                : "text-small font-medium text-muted"
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              "mt-1 font-semibold text-ink",
              isCaps ? "text-body" : "text-[15px]"
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
