"use client";

import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-body font-sans flex items-center justify-center p-6">
        <div className="max-w-[480px] w-full text-center bg-surface border border-line rounded-card p-8">
          <div className="inline-flex items-center h-6 px-2.5 gap-2 border border-line bg-canvas rounded-card text-[12px] font-semibold uppercase tracking-[0.06em] text-muted mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full bg-muted shrink-0"
              aria-hidden="true"
            />
            <span>CRITICAL ERROR</span>
          </div>

          <h1 className="text-h1 font-semibold tracking-tight text-ink mb-3">
            Something went wrong
          </h1>
          <p className="text-[15px] leading-6 text-muted mb-6">
            A critical error interrupted this view. You can try again or return to the directory.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              type="button"
              onClick={() => reset()}
              className="h-8 px-4 text-small font-medium inline-flex items-center justify-center rounded-card bg-action text-white hover:bg-action-hover transition-colors select-none"
            >
              Try again
            </button>
            <Link
              href="/students"
              className="h-8 px-4 text-small font-medium inline-flex items-center justify-center rounded-card bg-surface text-muted border border-line hover:bg-canvas hover:text-ink transition-colors select-none"
            >
              Return to Students
            </Link>
          </div>

          {error.digest && (
            <p className="font-mono text-[12px] text-subtle mt-6">
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
