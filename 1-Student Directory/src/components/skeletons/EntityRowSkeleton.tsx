import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

export interface EntityRowSkeletonProps {
  className?: string;
}

export function EntityRowSkeleton({ className }: EntityRowSkeletonProps) {
  return (
    <div
      className={cn(
        "p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <Skeleton className="size-9 rounded-tile shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
          <Skeleton className="h-4 w-56 mt-3" />
        </div>
      </div>
      <div className="shrink-0 self-start sm:self-center">
        <Skeleton className="h-7 w-24 rounded-card" />
      </div>
    </div>
  );
}
