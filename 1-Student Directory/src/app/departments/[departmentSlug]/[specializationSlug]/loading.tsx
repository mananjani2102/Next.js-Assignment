import { PageContainer } from "@/components/layout/PageContainer";
import { Divider } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { DetailHeaderSkeleton } from "@/components/skeletons/DetailHeaderSkeleton";
import { StudentCardSkeleton } from "@/components/skeletons/StudentCardSkeleton";

export default function SpecializationDetailLoading() {
  return (
    <div role="status">
      <span className="sr-only">Loading specialization...</span>
      <div className="pt-6 pb-12">
        <PageContainer size="wide">
          {/* Breadcrumb line */}
          <Skeleton className="h-4 w-64" />

          {/* Link row */}
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-28" />
          </div>

          <Divider className="mt-4" />

          {/* Detail Header */}
          <div className="mt-6">
            <DetailHeaderSkeleton />
          </div>

          {/* 4 compact student cards */}
          <div className="mt-8">
            <div className="flex items-center justify-between pb-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StudentCardSkeleton variant="compact" />
              <StudentCardSkeleton variant="compact" />
              <StudentCardSkeleton variant="compact" />
              <StudentCardSkeleton variant="compact" />
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
}
