import type { Department, Student } from "@/types";
import { Card, Divider } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { routes } from "@/lib/routes";
import { ordinalYear, shortYear } from "@/lib/format";
import { cn } from "@/lib/cn";

export type StudentCardProps =
  | {
      variant: "directory";
      student: Student;
      department: Department;
      className?: string;
    }
  | {
      variant: "specialization";
      student: Student;
      department?: never;
      className?: string;
    };

export function StudentCard(props: StudentCardProps) {
  const { variant, student, className } = props;

  if (variant === "directory") {
    const { department } = props;
    const badgeVariant =
      department.badgeTone === "primary"
        ? "department-primary"
        : "department-neutral";

    return (
      <Card
        padding="md"
        className={cn(
          "relative flex flex-col justify-between hover:border-subtle transition-colors group",
          className
        )}
      >
        <div>
          <div className="flex items-start justify-between">
            <Avatar size="md" name={student.name} colors={student.avatar} />
            <Badge variant="id-mono">{student.id}</Badge>
          </div>

          <h3 className="text-card font-semibold text-ink mt-3">
            {student.name}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <Badge variant={badgeVariant}>{department.name}</Badge>
            <span className="text-body text-muted">
              {ordinalYear(student.year)}
            </span>
          </div>
        </div>

        <div>
          <Divider className="mt-4" />
          <div className="pt-3 flex items-center">
            <ArrowLink
              href={routes.student(student.id)}
              direction="forward"
              tone="primary"
              size="md"
              stretched
            >
              View profile
            </ArrowLink>
          </div>
        </div>
      </Card>
    );
  }

  // specialization variant
  return (
    <Card
      padding="md"
      className={cn(
        "relative flex flex-col justify-between hover:border-subtle transition-colors group",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* specialization card uses default avatar colors */}
            <Avatar size="md" name={student.name} />
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-ink leading-5">
                {student.name}
              </h3>
              <span className="text-badge font-semibold text-muted leading-4">
                {student.id}
              </span>
            </div>
          </div>
          <Badge variant="outline">{shortYear(student.year)}</Badge>
        </div>
      </div>

      <div>
        <Divider className="my-3" />
        <div className="flex items-center justify-between gap-2">
          <span className="text-small font-semibold text-muted truncate">
            {student.focusArea}
          </span>
          <ArrowLink
            href={routes.student(student.id)}
            direction="forward"
            tone="primary"
            size="sm"
            stretched
          >
            View profile
          </ArrowLink>
        </div>
      </div>
    </Card>
  );
}
