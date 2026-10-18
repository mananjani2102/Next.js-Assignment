import { Badge } from "@/components/ui/Badge";
import { Card, Divider } from "@/components/ui/Card";
import { MetaGrid, type MetaGridItem } from "@/components/ui/MetaGrid";
import { cn } from "@/lib/cn";

export interface DetailHeaderCardProps {
  title: string;
  badgeLabel?: string;
  description: string;
  codeLabel: string;
  code: string;
  meta: MetaGridItem[];
  className?: string;
}

export function DetailHeaderCard({
  title,
  badgeLabel,
  description,
  codeLabel,
  code,
  meta,
  className,
}: DetailHeaderCardProps) {
  return (
    <Card padding="lg" className={cn("w-full", className)}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-h1 font-semibold tracking-tight text-ink">
              {title}
            </h1>
            {badgeLabel && <Badge variant="outline">{badgeLabel}</Badge>}
          </div>
          <p className="text-[16px] leading-[24px] text-muted max-w-[560px] mt-2">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
          <span className="text-label font-semibold uppercase tracking-[0.06em] text-muted">
            {codeLabel}
          </span>
          <div className="bg-canvas border border-line text-[15px] font-semibold text-ink px-3 py-1.5 rounded-card font-mono">
            {code}
          </div>
        </div>
      </div>

      <Divider className="my-6" />

      <MetaGrid items={meta} columns={4} labelStyle="plain" />
    </Card>
  );
}
