import { cn } from "@/lib/cn";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-line-soft rounded-card animate-pulse motion-reduce:animate-none",
        className
      )}
    />
  );
}
