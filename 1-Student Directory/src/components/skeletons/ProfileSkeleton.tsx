import { PageContainer } from "@/components/layout/PageContainer";
import { Card, Divider } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

export interface ProfileSkeletonProps {
  className?: string;
}

export function ProfileSkeleton({ className }: ProfileSkeletonProps) {
  return (
    <div className={cn("pt-6 pb-12", className)}>
      <PageContainer size="narrow">
        {/* Breadcrumb line skeleton */}
        <Skeleton className="h-4 w-40" />

        {/* Back link skeleton */}
        <div className="mt-3">
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Main Profile Card */}
        <Card padding="xl" className="mt-5">
          {/* Card Header */}
          <div className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-tile shrink-0" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-48" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          {/* Meta Grid (2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-32 mt-2" />
              </div>
            ))}
          </div>

          <Divider className="my-6" />

          {/* About Section */}
          <div>
            <Skeleton className="h-5 w-16 mb-2.5" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <Divider className="my-6" />

          {/* Academic Details Section */}
          <div>
            <Skeleton className="h-5 w-36 mb-4" />
            <div className="space-y-2.5">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>

            <Skeleton className="h-3 w-28 mt-4 mb-2.5" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-28 rounded-card" />
              <Skeleton className="h-7 w-32 rounded-card" />
              <Skeleton className="h-7 w-24 rounded-card" />
              <Skeleton className="h-7 w-36 rounded-card" />
            </div>
          </div>
        </Card>

        {/* Metadata footer row */}
        <div className="mt-4 px-1 flex justify-between items-center">
          <Skeleton className="h-3.5 w-44" />
          <Skeleton className="h-3.5 w-36" />
        </div>
      </PageContainer>
    </div>
  );
}
