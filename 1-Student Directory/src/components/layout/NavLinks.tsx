// "use client": needs usePathname for active navigation link state
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
  isActive: (pathname: string) => boolean;
}

const navItems: NavItem[] = [
  {
    label: "Students",
    href: routes.students(),
    isActive: (pathname) =>
      pathname === "/students" || pathname.startsWith("/students/"),
  },
  {
    label: "Departments",
    href: routes.departments(),
    isActive: (pathname) =>
      pathname === "/departments" || pathname.startsWith("/departments/"),
  },
  {
    label: "About",
    href: routes.about(),
    isActive: (pathname) =>
      pathname === "/about" || pathname.startsWith("/about/"),
  },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="h-full flex items-center gap-5">
      {navItems.map((item) => {
        const active = item.isActive(pathname);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative h-full flex items-center text-[14px] font-medium transition-colors select-none",
              active ? "text-ink" : "text-muted hover:text-ink"
            )}
          >
            <span>{item.label}</span>
            <span
              className={cn(
                "absolute inset-x-0 -bottom-px h-0.5 transition-colors",
                active ? "bg-primary" : "bg-transparent"
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}
