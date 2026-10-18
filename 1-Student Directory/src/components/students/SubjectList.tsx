import type { EnrolledSubject } from "@/types";
import { formatCredits } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface SubjectListProps {
  subjects: EnrolledSubject[];
  className?: string;
}

export function SubjectList({ subjects, className }: SubjectListProps) {
  return (
    <div
      className={cn(
        "border border-line bg-canvas rounded-card overflow-hidden",
        className
      )}
    >
      <ul className="divide-y divide-line-soft">
        {subjects.map((subject) => (
          <li
            key={subject.code}
            className="px-3.5 py-2.5 flex items-center justify-between gap-4"
          >
            <span className="text-body font-medium text-ink">
              {subject.code}: {subject.title}
            </span>
            <span className="text-badge font-semibold text-muted shrink-0 select-none">
              {formatCredits(subject.credits)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
