/**
 * Rendering Strategy:
 * - src/app/(docs)/docs/[[...slug]]/page.tsx is a Server Component, statically generated at build time (SSG) through generateStaticParams().
 * - export const dynamicParams = false so any slug not produced at build time returns a real HTTP 404 instead of rendering on demand. The page ALSO calls notFound() when resolveDoc() returns null, as a defensive second guard and so the requirement "call notFound() for unknown slugs" is met in code.
 * - Client Components are limited to CopyButton, TableOfContents (scroll spy) and FeedbackWidget (plus the ones from prompt 2).
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FolderOpen, FileText } from 'lucide-react';
import {
  buildBreadcrumbs,
  getReadingMinutes,
  getStaticSlugParams,
  getToc,
  resolveDoc,
  slugToHref,
} from '@/lib/docs';
import { docsSections, guidesSections } from '@/data/navigation';
import { homeContent } from '@/data/home';
import { siteConfig } from '@/data/site';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ArticleHeader } from '@/components/docs/ArticleHeader';
import { DocContentRenderer } from '@/components/docs/DocContentRenderer';
import { DocPagination } from '@/components/docs/DocPagination';
import { TableOfContents } from '@/components/docs/TableOfContents';
import { HomeSectionCard } from '@/components/docs/HomeSectionCard';
import { LinkCard } from '@/components/docs/LinkCard';
import { FeedbackWidget } from '@/components/docs/FeedbackWidget';
import type { IconName } from '@/types';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticSlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  let decodedSlug: string[];
  try {
    decodedSlug = slug.map((segment) => decodeURIComponent(segment));
  } catch {
    notFound();
  }

  const resolved = resolveDoc(decodedSlug);
  if (!resolved) {
    notFound();
  }

  const pagePath = slugToHref(decodedSlug);

  if (resolved.kind === 'home') {
    return {
      title: 'Documentation',
      description: siteConfig.description,
      alternates: {
        canonical: pagePath,
      },
    };
  }

  if (resolved.kind === 'index') {
    return {
      title: resolved.label,
      description: resolved.description,
      alternates: {
        canonical: pagePath,
      },
    };
  }

  return {
    title: resolved.item.title,
    description: resolved.item.description,
    alternates: {
      canonical: pagePath,
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params;
  let decodedSlug: string[];
  try {
    decodedSlug = slug.map((segment) => decodeURIComponent(segment));
  } catch {
    notFound();
  }

  const resolved = resolveDoc(decodedSlug);
  if (!resolved) {
    notFound();
  }

  // Branch 1: Home View
  if (resolved.kind === 'home') {
    const breadcrumbs = buildBreadcrumbs([]);

    return (
      <div className="w-full">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-[40px] font-bold tracking-tight text-ink leading-tight mb-4">
            {homeContent.title}
          </h1>
          <p className="text-[18px] text-muted max-w-2xl leading-relaxed">
            {homeContent.lead}
          </p>
          <hr className="border-line mt-8 mb-8" />
        </header>

        <div className="flex flex-col gap-4">
          {homeContent.cards.map((card) => (
            <HomeSectionCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              cta={card.cta}
              href={slugToHref(card.targetSlug)}
            />
          ))}
        </div>

        <div className="mt-8">
          <DocContentRenderer blocks={homeContent.blocks} />
        </div>
      </div>
    );
  }

  // Branch 2: Section Index View
  if (resolved.kind === 'index') {
    const breadcrumbs = buildBreadcrumbs(decodedSlug);

    // Helper to find icon for index children
    function getChildIcon(childSlug: string[], kind: 'page' | 'index'): IconName | typeof FolderOpen | typeof FileText {
      if (kind === 'index') {
        return FolderOpen;
      }

      const key = childSlug.join('/');
      for (const section of docsSections) {
        for (const entry of section.entries) {
          if (entry.slug.join('/') === key && entry.icon) {
            return entry.icon;
          }
        }
      }

      for (const section of guidesSections) {
        for (const entry of section.entries) {
          if (entry.slug.join('/') === key && entry.icon) {
            return entry.icon;
          }
        }
      }

      return FileText;
    }

    return (
      <div className="w-full">
        <Breadcrumbs items={breadcrumbs} />

        <ArticleHeader
          title={resolved.label}
          description={resolved.description}
        />

        <div className="flex flex-col gap-4 mt-6">
          {resolved.children.map((child) => {
            const childSlugSegments = child.href.replace(/^\/docs\/?/, '').split('/');
            const icon = getChildIcon(childSlugSegments, child.kind);

            return (
              <LinkCard
                key={child.href}
                title={child.title}
                description={child.description}
                href={child.href}
                icon={icon}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Branch 3: Article Page View
  const breadcrumbs = buildBreadcrumbs(decodedSlug);
  const tocItems = getToc(resolved.item);
  const showToc = tocItems.length >= 2;
  const isGuide =
    resolved.item.context === 'guides' || resolved.item.badge === 'Guide';
  const readingMinutes = isGuide ? getReadingMinutes(resolved.item) : undefined;

  return (
    <div
      className={
        showToc
          ? 'grid gap-12 xl:grid-cols-[minmax(0,1fr)_15rem]'
          : 'w-full'
      }
    >
      <article className="min-w-0">
        <Breadcrumbs items={breadcrumbs} />

        <ArticleHeader
          title={resolved.item.title}
          description={resolved.item.description}
          badge={resolved.item.badge}
          readingMinutes={readingMinutes}
        />

        <DocContentRenderer blocks={resolved.item.blocks} />

        <DocPagination item={resolved.item} />

        {isGuide && <FeedbackWidget />}
      </article>

      {showToc && (
        <div className="hidden xl:block">
          <TableOfContents items={tocItems} />
        </div>
      )}
    </div>
  );
}
