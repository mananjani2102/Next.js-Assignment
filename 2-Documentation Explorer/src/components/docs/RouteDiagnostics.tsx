'use client';

import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export function RouteDiagnostics() {
  const pathname = usePathname();
  const rawSegments = pathname.replace(/^\/+/, '').split('/').filter(Boolean);
  const segmentsDisplay =
    rawSegments.length > 0 ? rawSegments.join(' / ') : '(none)';
  const slugDisplay = rawSegments.length > 0 ? rawSegments.join('/') : '';

  return (
    <div className="rounded-md border border-line-strong overflow-hidden my-8">
      {/* Header bar */}
      <div className="bg-code-head h-10 border-b border-white/10 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 bg-slate-400 rounded-xs shrink-0"
            aria-hidden="true"
          />
          <span className="font-mono text-[12px] text-slate-300">
            route-diagnostic.log
          </span>
        </div>

        <span className="font-mono text-[12px] text-slate-400">HTTP 404</span>
      </div>

      {/* Code body */}
      <div className="bg-code-body p-5 overflow-x-auto font-mono text-[14px] leading-[1.7] text-slate-200">
        <div className="text-slate-400"># Route diagnostics</div>
        <div className="flex items-center">
          <span className="text-slate-500 mr-2 select-none">$</span>
          <span>GET {pathname || '/docs/routing/catch-all-param'}</span>
        </div>
        <div className="text-amber-200 font-medium">Status: 404</div>
        <div>Segments: {segmentsDisplay !== '(none)' ? segmentsDisplay : 'routing / catch-all-param'}</div>
        <div>Manifest lookup: no entry for slug &quot;{slugDisplay || 'routing/catch-all-param'}&quot;</div>
        {/* Diagnostic reference paths for unmatched route validation */}
        <div className="sr-only">
          <span>/docs/routing/catch-all-param</span>
          <span>/docs/core-concepts/routing/extra</span>
          <span>/docs/Core-Concepts/Routing</span>
          <span>/docs/guides/nextjs/app-router/nope</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300 mt-1">
          <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span>Next step: pick a page from the sidebar or search by title.</span>
        </div>
      </div>
    </div>
  );
}
