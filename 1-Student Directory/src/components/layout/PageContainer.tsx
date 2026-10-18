import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type PageContainerSize = "narrow" | "medium" | "wide";

export interface PageContainerProps {
  size?: PageContainerSize;
  className?: string;
  children: ReactNode;
}

const sizeStyles: Record<PageContainerSize, string> = {
  narrow: "max-w-[768px]",
  medium: "max-w-[884px]",
  wide: "max-w-[1100px]",
};

export function PageContainer({
  size = "wide",
  className,
  children,
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6", sizeStyles[size], className)}>
      {children}
    </div>
  );
}
