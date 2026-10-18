import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { NavLinks } from "@/components/layout/NavLinks";
import { routes } from "@/lib/routes";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 h-[52px] bg-surface border-b border-line">
      <div className="max-w-[1100px] mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8 h-full">
          <Link
            href={routes.students()}
            className="flex items-center gap-2 select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <GraduationCap className="size-5 text-primary shrink-0" aria-hidden="true" />
            <span className="text-[16px] font-semibold tracking-tight text-ink whitespace-nowrap">
              Campus Directory
            </span>
          </Link>
          <NavLinks />
        </div>

        <div className="hidden sm:inline-flex">
          <Badge variant="chip">Frontend Practice</Badge>
        </div>
      </div>
    </header>
  );
}
