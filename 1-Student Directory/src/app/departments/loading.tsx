import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { PageHeaderSkeleton } from "@/components/skeletons/PageHeaderSkeleton";
import { EntityRowSkeleton } from "@/components/skeletons/EntityRowSkeleton";

export default function DepartmentsLoading() {
  return (
    <div role="status">
      <span className="sr-only">Loading departments...</span>
      <div className="pt-8 pb-12">
        <PageContainer size="medium">
          <PageHeaderSkeleton divided />

          {/* 3 Department rows */}
          <Card padding="none" className="mt-6 overflow-hidden">
            <ul className="divide-y divide-line">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i}>
                  <EntityRowSkeleton />
                </li>
              ))}
            </ul>
          </Card>

          {/* Footer note skeleton */}
          <div className="mt-3 px-1 flex flex-col sm:flex-row justify-between items-center gap-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3.5 w-56" />
          </div>
        </PageContainer>
      </div>
    </div>
  );
}
