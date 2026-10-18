import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "id"
  | "id-mono"
  | "department-primary"
  | "department-neutral"
  | "success"
  | "outline"
  | "count"
  | "filter"
  | "chip";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  id: "bg-chip border-line text-muted tabular-nums",
  "id-mono": "font-mono text-[11px] text-subtle bg-chip border-line",
  "department-primary": "bg-chip-soft border-line text-primary",
  "department-neutral": "bg-chip-soft border-line text-muted",
  success: "bg-success-bg border-success-line text-success-fg",
  outline: "bg-canvas border-line text-muted",
  count: "bg-chip border-transparent text-ink min-w-6 text-center",
  filter: "bg-chip-strong border-line text-ink",
  chip: "bg-chip border-line text-muted",
};

export function Badge({
  variant = "chip",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border rounded-chip px-2 py-0.5 text-badge font-semibold leading-4 select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
