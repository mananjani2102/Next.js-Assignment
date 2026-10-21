'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-white text-body min-h-screen flex items-center justify-center p-6 font-sans">
        <main className="max-w-lg w-full text-center flex flex-col items-center">
          <span className="font-mono text-[12px] uppercase tracking-wider bg-warn-bg border border-warn-line rounded-xs px-2.5 py-1 text-warn-ink font-semibold inline-block mb-4">
            STATUS: 500_RENDER_ERROR
          </span>

          <h1 className="text-[40px] font-bold tracking-tight text-ink leading-tight mb-3">
            Something went wrong
          </h1>

          <p className="text-[17px] text-muted leading-relaxed mb-6">
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
        </main>
      </body>
    </html>
  );
}
