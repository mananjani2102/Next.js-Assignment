import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CircleAlert } from 'lucide-react';
import { notFoundSuggestions, siteConfig } from '@/data/site';
import { getSearchEntries, slugToHref } from '@/lib/docs';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LinkCard } from '@/components/docs/LinkCard';
import { NotFoundLookup } from '@/components/docs/NotFoundLookup';
import { RouteDiagnostics } from '@/components/docs/RouteDiagnostics';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DocsNotFound() {
  const searchEntries = getSearchEntries();

  const breadcrumbs = [
    { label: 'Documentation', href: '/docs' },
    { label: '404 Not Found' },
  ];

  return (
    <div className="w-full">
      <Breadcrumbs items={breadcrumbs} />

      {/* Status badge */}
      <div className="mb-3">
        <span className="font-mono text-[12px] uppercase tracking-wider bg-surface-active border border-line-strong rounded-xs px-2.5 py-1 text-primary font-semibold inline-block">
          STATUS: 404_PAGE_NOT_FOUND
        </span>
      </div>

      {/* Headings */}
      <h1 className="text-[40px] font-bold tracking-tight text-ink leading-tight mb-3">
        Page not found
      </h1>

      <p className="text-[18px] text-muted max-w-xl leading-relaxed mb-4">
        The documentation page you requested could not be located. The path may
        have changed or the slug might be invalid.
      </p>

      <Link
        href="/docs"
        className="inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:text-primary-hover transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-fit"
      >
        <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Back to Documentation</span>
      </Link>

      <hr className="border-line my-8" />

      {/* Quick path lookup panel */}
      <NotFoundLookup entries={searchEntries} />

      {/* Suggested articles */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-semibold text-ink tracking-tight">
            Suggested articles
          </h2>
          <span className="font-mono text-[12px] text-muted">
            Frequently accessed resources
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {notFoundSuggestions.map((suggestion) => (
            <LinkCard
              key={suggestion.title}
              title={suggestion.title}
              description={suggestion.description}
              href={slugToHref(suggestion.slug)}
              icon={suggestion.icon}
            />
          ))}
        </div>
      </section>

      {/* Route diagnostics */}
      <RouteDiagnostics />

      {/* Footer help row */}
      <div className="border-t border-line mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-muted">
        <span>Looking for something specific that should be here?</span>

        <div className="flex items-center gap-5">
          {siteConfig.repoUrl && (
            <a
              href={`${siteConfig.repoUrl}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs"
            >
              <CircleAlert className="w-4 h-4 shrink-0 text-muted" aria-hidden="true" />
              <span>Report broken link</span>
            </a>
          )}

          <Link
            href="/docs"
            className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xs"
          >
            Browse documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
