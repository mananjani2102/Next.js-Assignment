import { Card, Divider } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

export interface StudentCardSkeletonProps {
  variant?: "directory" | "compact";
  className?: string;
}

export function StudentCardSkeleton({
  variant = "directory",
  className,
}: StudentCardSkeletonProps) {
  if (variant === "compact") {
    return (
      <Card
        padding="md"
        className={cn("relative flex flex-col justify-between min-h-[130px]", className)}
      >
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-tile shrink-0" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-5 w-12" />
          </div>
        </div>

        <div>
          <Divider className="my-3" />
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      padding="md"
      className={cn("relative flex flex-col justify-between min-h-[170px]", className)}
    >
      <div>
        <div className="flex items-start justify-between">
          <Skeleton className="size-10 rounded-tile" />
          <Skeleton className="h-5 w-16" />
        </div>

        <Skeleton className="h-5 w-36 mt-3" />

        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div>
        <Divider className="mt-4" />
        <div className="pt-3 flex items-center">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </Card>
  );
}
