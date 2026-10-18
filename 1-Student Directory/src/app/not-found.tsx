import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Code2,
  GraduationCap,
  Landmark,
} from "lucide-react";
import { StatusPanel } from "@/components/ui/StatusPanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
  },
};

const suggestedRoutes = [
  {
    icon: Landmark,
    label: "Computer Science Department",
    href: routes.department("computer-science"),
  },
  {
    icon: GraduationCap,
    label: "All Students",
    href: routes.students(),
  },
  {
    icon: Building2,
    label: "All Departments",
    href: routes.departments(),
  },
  {
    icon: Code2,
    label: "Web Development Specialization",
    href: routes.specialization("computer-science", "web-development"),
  },
];

export default function NotFound() {
  return (
    <StatusPanel
      breadcrumbLabel="Not Found"
      statusLabel="404 · ROUTE NOT FOUND"
      title="Student or department not found"
      description="The requested directory entry or path could not be located. It may have moved or the identifier might be invalid."
      actions={
        <>
          <Button variant="primary" size="md" href={routes.students()}>
            Return to Students Directory
          </Button>
          <Button variant="secondary" size="md" href={routes.departments()}>
            Browse All Departments
          </Button>
        </>
      }
    >
      <Card padding="none" className="text-left overflow-hidden">
        {/* Header row */}
        <div className="px-5 py-3 bg-canvas border-b border-line flex items-center justify-between">
          <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-muted">
            Suggested starting points
          </span>
          <span className="text-[12px] text-subtle">Internal Routes</span>
        </div>

        {/* Suggestion links */}
        <ul className="divide-y divide-line">
          {suggestedRoutes.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-5 py-3.5 flex items-center gap-3 hover:bg-canvas transition-colors group"
                >
                  <Icon
                    className="size-[18px] text-subtle shrink-0 group-hover:text-ink transition-colors"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] text-ink font-normal">
                    {item.label}
                  </span>
                  <span className="flex-1" />
                  <span className="font-mono text-[12px] text-subtle">
                    {item.href}
                  </span>
                  <ArrowRight
                    className="size-4 text-subtle shrink-0 group-hover:text-ink transition-colors"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </StatusPanel>
  );
}
