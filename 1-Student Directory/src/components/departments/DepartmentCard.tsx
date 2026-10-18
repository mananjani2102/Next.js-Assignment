import { Shapes, Users } from "lucide-react";
import type { Department } from "@/types";
import { Card } from "@/components/ui/Card";
import { EntityRow } from "@/components/ui/EntityRow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { DepartmentIcon } from "@/components/departments/DepartmentIcon";
import { routes } from "@/lib/routes";
import { pluralize } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface DepartmentCardProps {
  department: Department;
  specializationCount: number;
  as?: "div" | "li";
  className?: string;
}

export function DepartmentCard({
  department,
  specializationCount,
  as = "div",
  className,
}: DepartmentCardProps) {
  return (
    <Card
      as={as}
      padding="none"
      className={cn("hover:bg-canvas transition-colors", className)}
    >
      <EntityRow
        icon={<DepartmentIcon icon={department.icon} className="size-[18px]" />}
        title={department.name}
        description={department.description}
        meta={[
          {
            icon: <Shapes className="size-4 text-subtle" aria-hidden="true" />,
            label: `${specializationCount} ${pluralize(specializationCount, "Specialization")}`,
          },
          {
            icon: <Users className="size-4 text-subtle" aria-hidden="true" />,
            label: `${department.totalEnrollment} ${pluralize(department.totalEnrollment, "Enrolled Student")}`,
          },
        ]}
        action={
          <ArrowLink
            href={routes.department(department.slug)}
            direction="forward"
            tone="primary"
            size="md"
          >
            View students
          </ArrowLink>
        }
      />
    </Card>
  );
}
