import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface LegalSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function LegalSection({
  title,
  children,
  className,
}: LegalSectionProps) {
  return (
    <section className={cn("mt-8 first:mt-0", className)}>
      <h2 className="text-[17px] font-semibold text-ink mb-2">{title}</h2>
      <div className="text-[14px] leading-[24px] text-body space-y-3">
        {children}
      </div>
    </section>
  );
}
