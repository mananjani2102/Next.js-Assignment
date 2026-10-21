'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { scoreSearchEntries } from '@/lib/search';
import type { SearchEntry } from '@/types';

interface NotFoundLookupProps {
  entries: SearchEntry[];
}

export function NotFoundLookup({ entries }: NotFoundLookupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(pathname);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      setErrorMessage('No page matches that path or keyword.');
      return;
    }

    // Exact path match
    if (trimmed.startsWith('/')) {
      const exactMatch = entries.find((e) => e.href === trimmed);
      if (exactMatch) {
        setErrorMessage('');
        router.push(exactMatch.href);
        return;
      }
    }

    // Scored match
    const scored = scoreSearchEntries(entries, trimmed, 1);
    if (scored.length > 0) {
      setErrorMessage('');
      router.push(scored[0].href);
      return;
    }

    // No match
    setErrorMessage('No page matches that path or keyword.');
  }

  return (
    <div className="bg-surface border border-line-strong rounded-xs p-5 my-8">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-semibold">
          QUICK PATH LOOKUP
        </span>
        <span className="font-mono text-[12px] text-muted">
          Matches paths and titles
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            aria-label="Path or keyword lookup"
            placeholder="Type a path or keyword..."
            className="w-full h-10 pl-9 pr-3 font-mono text-[14px] bg-white text-ink border border-line-strong rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="h-10 px-5 bg-primary hover:bg-primary-hover text-white text-[14px] font-medium rounded-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shrink-0 select-none"
        >
          Search
        </button>
      </form>

      {errorMessage && (
        <div
          role="status"
          className="mt-3 font-mono text-[13px] text-warn-ink"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}
