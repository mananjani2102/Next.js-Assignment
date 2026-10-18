import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  href?: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: ComponentPropsWithoutRef<"button">["onClick"];
  "aria-label"?: string;
}

const variantStyles: Record<"primary" | "secondary", string> = {
  primary: "bg-action text-white hover:bg-action-hover",
  secondary: "bg-surface text-muted border border-line hover:bg-canvas hover:text-ink",
};

const sizeStyles: Record<"sm" | "md", string> = {
  sm: "min-h-[40px] sm:min-h-[26px] h-auto sm:h-[26px] px-3 py-2 sm:py-0 text-small",
  md: "min-h-[40px] sm:min-h-[32px] h-auto sm:h-8 px-4 py-2 sm:py-0 text-small font-medium",
};

export function Button({
  variant = "secondary",
  size = "md",
  href,
  disabled = false,
  children,
  className,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-card transition-colors select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

  const disabledStyles =
    "opacity-60 cursor-not-allowed pointer-events-none hover:bg-transparent";

  if (href) {
    if (disabled) {
      return (
        <span
          aria-disabled="true"
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            disabledStyles,
            className
          )}
        >
          {children}
        </span>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && disabledStyles,
        className
      )}
    >
      {children}
    </button>
  );
}
