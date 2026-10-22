import type { AvatarColors } from "@/types";
import { getInitials } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface AvatarProps {
  name: string;
  size?: "md" | "lg";
  colors?: AvatarColors;
  className?: string;
}

const sizeStyles: Record<"md" | "lg", string> = {
  md: "size-10 text-small",
  lg: "size-12 text-card",
};

export function Avatar({
  name,
  size = "md",
  colors,
  className,
}: AvatarProps) {
  const initials = getInitials(name);
  const backgroundColor = colors?.background ?? "#e2ede5";
  const color = colors?.foreground ?? "#184e38";

  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor, color }}
      className={cn(
        "flex items-center justify-center shrink-0 rounded-tile font-semibold select-none",
        sizeStyles[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
