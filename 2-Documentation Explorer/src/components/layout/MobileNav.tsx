'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { topNav, type TopNavItem } from '@/data/site';
import { SearchBox } from './SearchBox';
import { SidebarNav } from './SidebarNav';
import type { NavSectionView, SearchEntry } from '@/types';

interface MobileNavProps {
  entries: SearchEntry[];
  docs: NavSectionView[];
  guides: NavSectionView[];
}

export function MobileNav({ entries, docs, guides }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Focus management and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
          return;
        }

        // Basic focus trap within the dialog
        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function isItemActive(item: TopNavItem): boolean {
    if (item.excludePrefix && pathname.startsWith(item.excludePrefix)) {
      return false;
    }
    return pathname.startsWith(item.matchPrefix);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="lg:hidden p-2 -ml-2 mr-2 text-ink hover:text-primary transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/30 transition-colors"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Drawer Dialog */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
            className="relative w-80 max-w-[85vw] bg-white h-full border-r border-line shadow-lg flex flex-col z-10 overflow-y-auto"
          >
            {/* Top Bar with Title and Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-line">
              <h2
                id="mobile-nav-title"
                className="text-[16px] font-semibold text-ink"
              >
                Menu
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close navigation menu"
                className="p-1.5 text-muted hover:text-ink transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Top Navigation */}
            <nav aria-label="Mobile top navigation" className="p-4 border-b border-line">
              <ul className="space-y-1">
                {topNav.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={handleClose}
                        aria-current={active ? 'page' : undefined}
                        className={`block px-3 py-2 text-[14px] font-medium rounded-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          active
                            ? 'bg-surface-active text-primary font-semibold'
                            : 'text-ink hover:bg-surface'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Search Box in Drawer */}
            <div className="p-4 border-b border-line">
              <SearchBox entries={entries} compact />
            </div>

            {/* Sidebar Navigation Tree */}
            <div className="flex-1">
              <SidebarNav
                docs={docs}
                guides={guides}
                className="sticky-none h-auto w-full border-r-0 bg-transparent"
                onNavigate={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
