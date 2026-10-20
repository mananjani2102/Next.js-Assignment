'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  code: string;
  variant?: 'dark' | 'light';
}

export function CopyButton({ code, variant = 'dark' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Shows nothing special on failure per spec
    }
  }

  const isDark = variant === 'dark';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[12px] rounded-xs border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 select-none ${
        isDark
          ? 'text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border-white/10'
          : 'text-muted hover:text-ink bg-white hover:bg-surface border-line-strong'
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Copy</span>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied code to clipboard' : ''}
      </span>
    </button>
  );
}
