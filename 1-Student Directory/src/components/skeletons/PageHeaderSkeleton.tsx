import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

export interface PageHeaderSkeletonProps {
  divided?: boolean;
  className?: string;
}

export function PageHeaderSkeleton({
  divided = false,
  className,
}: PageHeaderSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        divided && "border-b border-line pb-6",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <Skeleton className="h-8 w-44" />
        {divided && <Skeleton className="h-5 w-36 self-start sm:self-auto" />}
      </div>
      <Skeleton className="h-4 w-72 mt-1.5" />
    </div>
  );
}
