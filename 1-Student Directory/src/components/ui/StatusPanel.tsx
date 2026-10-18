import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { routes } from "@/lib/routes";

export interface StatusPanelProps {
  breadcrumbLabel: string;
  statusLabel: ReactNode;
  title: string;
  description: string;
  actions: ReactNode;
  children?: ReactNode;
}

export function StatusPanel({
  breadcrumbLabel,
  statusLabel,
  title,
  description,
  actions,
  children,
}: StatusPanelProps) {
  return (
    <>
      {/* Full-bleed breadcrumb bar directly under the navbar */}
      <div className="bg-canvas border-b border-line h-[33px] flex items-center">
        <div className="max-w-[1100px] w-full mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Directory", href: routes.students() },
              { label: breadcrumbLabel },
            ]}
          />
        </div>
      </div>

      {/* Main centered status content */}
      <div className="flex flex-1 items-center justify-center py-16">
        <div className="max-w-[640px] w-full px-6 text-center">
          {/* Status pill */}
          <div className="inline-flex items-center h-6 px-2.5 gap-2 border border-line bg-canvas rounded-card text-[12px] font-semibold uppercase tracking-[0.06em] text-muted">
            <span
              className="w-1.5 h-1.5 rounded-full bg-muted shrink-0"
              aria-hidden="true"
            />
            <span>{statusLabel}</span>
          </div>

          {/* Heading */}
          <h1 className="text-h1 font-semibold tracking-tight text-ink mt-5">
            {title}
          </h1>

          {/* Description */}
          <p className="text-[16px] leading-6 text-muted max-w-[480px] mx-auto text-balance mt-3">
            {description}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center flex-wrap mt-6">
            {actions}
          </div>

          {/* Optional children */}
          {children && <div className="mt-10 w-full">{children}</div>}
        </div>
      </div>
    </>
  );
}
