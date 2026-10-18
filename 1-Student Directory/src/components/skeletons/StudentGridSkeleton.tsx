import { StudentCardSkeleton } from "@/components/skeletons/StudentCardSkeleton";
import { cn } from "@/lib/cn";

export interface StudentGridSkeletonProps {
  count?: number;
  className?: string;
}

export function StudentGridSkeleton({
  count = 6,
  className,
}: StudentGridSkeletonProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <StudentCardSkeleton key={index} />
      ))}
    </div>
  );
}
