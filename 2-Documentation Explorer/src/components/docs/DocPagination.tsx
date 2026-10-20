import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getPrevNext } from '@/lib/docs';
import type { DocItem } from '@/types';

interface DocPaginationProps {
  item: DocItem;
}

export function DocPagination({ item }: DocPaginationProps) {
  const { prev, next } = getPrevNext(item);

  if (!prev && !next) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-14 pt-8 border-t border-line">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex flex-col items-start p-3 -ml-3 rounded-xs transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <span className="font-mono text-[12px] text-muted mb-1 flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Previous</span>
            </span>
            <span className="text-[18px] font-semibold text-ink group-hover:text-primary transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col items-end p-3 -mr-3 rounded-xs text-right transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2"
          >
            <span className="font-mono text-[12px] text-muted mb-1 flex items-center gap-1.5">
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </span>
            <span className="text-[18px] font-semibold text-ink group-hover:text-primary transition-colors">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
