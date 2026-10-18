import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeaderSkeleton } from "@/components/skeletons/PageHeaderSkeleton";
import { StudentGridSkeleton } from "@/components/skeletons/StudentGridSkeleton";

export default function StudentsLoading() {
  return (
    <div role="status">
      <span className="sr-only">Loading students...</span>
      <div className="pt-8 pb-12">
        <PageContainer size="wide">
          <PageHeaderSkeleton />

          {/* Toolbar block */}
          <Card
            padding="none"
            className="mt-6 p-3 min-h-[58px] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
          >
            <Skeleton className="h-[34px] w-full sm:max-w-[448px]" />
            <Skeleton className="h-[34px] w-44 self-start sm:self-auto" />
          </Card>

          {/* 6 student cards */}
          <StudentGridSkeleton count={6} className="mt-4" />
        </PageContainer>
      </div>
    </div>
  );
}
