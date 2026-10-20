'use client';

import { useState, useEffect, useRef, useId, useSyncExternalStore } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { contextMeta } from '@/data/site';
import { scoreSearchEntries } from '@/lib/search';
import type { SearchEntry } from '@/types';

interface SearchBoxProps {
  entries: SearchEntry[];
  compact?: boolean;
}

export function SearchBox({ entries, compact = false }: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close and reset on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setQuery('');
    setIsOpen(false);
    setActiveIndex(-1);
  }

  // Determine placeholder based on context
  const isGuides = pathname.startsWith('/docs/guides');
  const placeholder = isGuides
    ? contextMeta.guides.searchPlaceholder
    : contextMeta.docs.searchPlaceholder;

  // Hydration-safe shortcut key detection
  const shortcutText = useSyncExternalStore(
    () => () => {},
    () =>
      typeof navigator !== 'undefined' &&
      !navigator.platform.toUpperCase().includes('MAC')
        ? 'Ctrl K'
        : '⌘K',
    () => '⌘K'
  );

  // Global Cmd+K or Ctrl+K shortcut
  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Score matching via shared utility
  const results = scoreSearchEntries(entries, query, 6);

  function handleSelect(entry: SearchEntry) {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(-1);
    router.push(entry.href);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) {
      if (event.key === 'ArrowDown' && results.length > 0) {
        setIsOpen(true);
        setActiveIndex(0);
        event.preventDefault();
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        handleSelect(results[activeIndex]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      setQuery('');
      setActiveIndex(-1);
    }
  }

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div
      ref={containerRef}
      className={`relative ${compact ? 'w-full' : 'w-64'}`}
    >
      <div className="relative flex items-center">
        <Search
          className="absolute left-2.5 w-4 h-4 text-muted pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          className="w-full h-9 pl-8 pr-14 text-[13px] bg-surface text-ink placeholder:text-muted/70 border border-line-strong rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:bg-white transition-colors"
        />
        <kbd className="absolute right-2 px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted bg-white border border-line-strong rounded-xs select-none pointer-events-none">
          {shortcutText}
        </kbd>
      </div>

      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-line-strong rounded-xs shadow-sm z-50 overflow-hidden"
        >
          {results.length === 0 ? (
            <div className="px-3 py-3 text-xs text-muted text-center">
              No results for &quot;{query}&quot;.
            </div>
          ) : (
            results.map((entry, index) => {
              const isSelected = index === activeIndex;
              return (
                <div
                  key={entry.href}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(entry)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`px-3 py-2 text-left w-full flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-surface-active text-primary'
                      : 'text-ink hover:bg-surface'
                  }`}
                >
                  <span className="text-[13px] font-medium truncate">
                    {entry.title}
                  </span>
                  <span className="font-mono text-[11px] text-muted ml-2 shrink-0">
                    {entry.group}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
