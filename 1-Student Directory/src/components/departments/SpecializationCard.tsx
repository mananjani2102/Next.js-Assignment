import { Users } from "lucide-react";
import type { Specialization } from "@/types";
import { Card } from "@/components/ui/Card";
import { EntityRow } from "@/components/ui/EntityRow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { routes } from "@/lib/routes";
import { pluralize } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface SpecializationCardProps {
  specialization: Specialization;
  studentCount: number;
  as?: "div" | "li";
  className?: string;
}

export function SpecializationCard({
  specialization,
  studentCount,
  as = "div",
  className,
}: SpecializationCardProps) {
  return (
    <Card
      as={as}
      padding="none"
      className={cn("hover:bg-canvas transition-colors", className)}
    >
      <EntityRow
        title={specialization.name}
        description={specialization.description}
        meta={[
          {
            label: (
              <span className="font-mono text-small text-muted font-normal">
                {specialization.code}
              </span>
            ),
          },
          {
            icon: <Users className="size-4 text-subtle" aria-hidden="true" />,
            label: `${studentCount} ${pluralize(studentCount, "Student")}`,
          },
        ]}
        action={
          <ArrowLink
            href={routes.specialization(
              specialization.departmentSlug,
              specialization.slug
            )}
            direction="forward"
            tone="primary"
            size="md"
          >
            View specialization
          </ArrowLink>
        }
      />
    </Card>
  );
}
