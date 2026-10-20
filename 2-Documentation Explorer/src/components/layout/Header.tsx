import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { HeaderNav } from './HeaderNav';
import { SearchBox } from './SearchBox';
import { MobileNav } from './MobileNav';
import type { NavSectionView, SearchEntry } from '@/types';

interface HeaderProps {
  searchEntries: SearchEntry[];
  docs: NavSectionView[];
  guides: NavSectionView[];
}

export function Header({ searchEntries, docs, guides }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-white">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Left: Mobile Nav trigger & Logo */}
        <div className="flex items-center">
          <MobileNav entries={searchEntries} docs={docs} guides={guides} />

          <Link
            href="/docs"
            className="flex items-center gap-2.5 font-semibold text-ink text-[16px] tracking-tight hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-6 h-6 rounded-xs shrink-0"
              aria-hidden="true"
            >
              <rect width="32" height="32" fill="#3525cd" />
              <path
                d="M9 10l6 6-6 6"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              <path
                d="M17 22h7"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
              />
            </svg>
            <span className="whitespace-nowrap">{siteConfig.name}</span>
          </Link>

          <HeaderNav />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Search, Divider, Version Badge, Terminal CLI link */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchBox entries={searchEntries} />
          </div>

          <div
            className="hidden sm:block h-5 w-px bg-line"
            aria-hidden="true"
          />

          <span className="hidden sm:inline-flex items-center font-mono text-[12px] bg-surface-active border border-line-strong rounded-xs px-2 py-0.5 text-ink select-none">
            {siteConfig.version}
          </span>

          <Link
            href="/docs/reference/cli-commands"
            aria-label="CLI commands"
            className="p-1.5 text-muted hover:text-primary transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Terminal className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
