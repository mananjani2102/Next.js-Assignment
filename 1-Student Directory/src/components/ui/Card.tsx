import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface CardProps {
  padding?: "none" | "md" | "lg" | "xl";
  as?: "div" | "article" | "section" | "li";
  className?: string;
  children: ReactNode;
}

const paddingStyles: Record<"none" | "md" | "lg" | "xl", string> = {
  none: "p-0",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

export function Card({
  padding = "md",
  as = "div",
  className,
  children,
}: CardProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn(
        "bg-surface border border-line rounded-card",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}

export interface DividerProps {
  soft?: boolean;
  className?: string;
}

export function Divider({ soft = false, className }: DividerProps) {
  return (
    <div
      role="separator"
      className={cn("h-px w-full", soft ? "bg-line-soft" : "bg-line", className)}
    />
  );
}
