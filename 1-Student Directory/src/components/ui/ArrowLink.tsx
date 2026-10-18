import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  direction?: "forward" | "back";
  tone?: "primary" | "muted";
  size?: "sm" | "md";
  stretched?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function ArrowLink({
  href,
  children,
  direction = "forward",
  tone = "primary",
  size = "md",
  stretched = false,
  className,
  "aria-label": ariaLabel,
}: ArrowLinkProps) {
  const toneStyles =
    tone === "primary"
      ? "text-primary hover:text-primary-hover"
      : "text-muted hover:text-ink";

  const sizeStyles = size === "sm" ? "text-small" : "text-body";

  const Icon = direction === "forward" ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium transition-colors select-none",
        toneStyles,
        sizeStyles,
        stretched && "after:absolute after:inset-0",
        className
      )}
    >
      {direction === "back" && <Icon className="size-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {direction === "forward" && <Icon className="size-4 shrink-0" aria-hidden="true" />}
    </Link>
  );
}
