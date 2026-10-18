import { PencilRuler, SquareTerminal, TrendingUp } from "lucide-react";
import type { DepartmentIconKey } from "@/types";

export interface DepartmentIconProps {
  icon: DepartmentIconKey;
  className?: string;
}

function assertUnreachable(x: never): never {
  throw new Error(`Unexpected department icon key: ${String(x)}`);
}

export function DepartmentIcon({ icon, className }: DepartmentIconProps) {
  switch (icon) {
    case "terminal":
      return <SquareTerminal className={className} aria-hidden="true" />;
    case "design":
      return <PencilRuler className={className} aria-hidden="true" />;
    case "trend":
      return <TrendingUp className={className} aria-hidden="true" />;
    default:
      return assertUnreachable(icon);
  }
}
