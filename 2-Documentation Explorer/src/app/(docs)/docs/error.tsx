'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DocsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full py-8">
      {/* Status badge */}
      <div className="mb-4">
        <span className="font-mono text-[12px] uppercase tracking-wider bg-warn-bg border border-warn-line rounded-xs px-2.5 py-1 text-warn-ink font-semibold inline-block">
          STATUS: 500_RENDER_ERROR
        </span>
      </div>

      <h1 className="text-[40px] font-bold tracking-tight text-ink leading-tight mb-3">
        Something went wrong
      </h1>

      <p className="text-[17px] text-muted leading-relaxed mb-6 max-w-xl">
        An unexpected error occurred while rendering this page.
      </p>

      {error.digest && (
        <div className="font-mono text-[13px] text-muted mb-6">
          Reference: {error.digest}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="h-10 px-5 bg-primary hover:bg-primary-hover text-white text-[14px] font-medium rounded-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 select-none"
        >
          Try again
        </button>

        <Link
          href="/docs"
          className="text-[14px] font-medium text-primary hover:text-primary-hover transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Back to Documentation
        </Link>
      </div>
    </div>
  );
}
