'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { topNav, type TopNavItem } from '@/data/site';

export function HeaderNav() {
  const pathname = usePathname();

  function isItemActive(item: TopNavItem): boolean {
    if (item.excludePrefix && pathname.startsWith(item.excludePrefix)) {
      return false;
    }
    return pathname.startsWith(item.matchPrefix);
  }

  return (
    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 h-full ml-6">
      {topNav.map((item) => {
        const active = isItemActive(item);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={`h-16 flex items-center px-3.5 text-[14px] font-medium transition-colors border-b-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs ${
              active
                ? 'text-primary border-primary'
                : 'text-ink hover:text-primary border-transparent'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
