import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface StudentDetailRowItem {
  label: string;
  value: ReactNode;
}

export interface StudentDetailRowsProps {
  items: StudentDetailRowItem[];
  className?: string;
}

export function StudentDetailRows({
  items,
  className,
}: StudentDetailRowsProps) {
  return (
    <div className={cn("divide-y divide-line-soft", className)}>
      {items.map((item, index) => (
        <div
          key={item.label + index}
          className="py-3 flex items-center justify-between gap-4 text-body"
        >
          <span className="text-muted select-none">{item.label}</span>
          <span className="font-medium text-ink text-right">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
