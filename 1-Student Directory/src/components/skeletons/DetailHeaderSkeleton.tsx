import { Card, Divider } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

export interface DetailHeaderSkeletonProps {
  className?: string;
}

export function DetailHeaderSkeleton({ className }: DetailHeaderSkeletonProps) {
  return (
    <Card padding="lg" className={cn("w-full", className)}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="mt-2.5 space-y-1.5 max-w-[560px]">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-28 rounded-card" />
        </div>
      </div>

      <Divider className="my-6" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-28 mt-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}
