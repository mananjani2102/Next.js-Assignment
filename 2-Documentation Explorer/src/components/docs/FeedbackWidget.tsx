'use client';

import { useState } from 'react';

// This is UI only and sends and stores nothing; the README documents this client widget.
export function FeedbackWidget() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-surface border border-line-strong rounded-xs p-5 my-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <span className="text-[14px] font-medium text-ink">
        Was this guide helpful?
      </span>

      {submitted ? (
        <span className="text-[13px] text-muted font-medium" aria-live="polite">
          Thanks for the feedback.
        </span>
      ) : (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="px-3.5 py-1.5 text-[13px] font-medium text-ink bg-white border border-line-strong rounded-xs hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 select-none"
          >
            Yes, thanks!
          </button>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="px-3.5 py-1.5 text-[13px] font-medium text-ink bg-white border border-line-strong rounded-xs hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 select-none"
          >
            Could be better
          </button>
        </div>
      )}
    </div>
  );
}
