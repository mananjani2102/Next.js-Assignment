import { allDocs } from '@/data/docs';
import { docsSections, guidesSections } from '@/data/navigation';
import { segmentMeta } from '@/data/segments';
import { homeContent } from '@/data/home';
import type {
  BreadcrumbItem,
  DocContext,
  DocItem,
  IndexChild,
  NavNode,
  NavSectionView,
  PaginationLink,
  ResolvedDoc,
  SearchEntry,
  TocItem,
} from '@/types';

export { allDocs };

export function slugToHref(slug: string[]): string {
  if (slug.length === 0) {
    return '/docs';
  }
  return '/docs/' + slug.join('/');
}

export function getContext(slug: string[]): DocContext {
  return slug[0] === 'guides' ? 'guides' : 'docs';
}

export function getDocBySlug(slug: string[]): DocItem | undefined {
  return allDocs.find(
    (doc) =>
      doc.slug.length === slug.length &&
      doc.slug.every((segment, i) => segment === slug[i])
  );
}

export function resolveDoc(slug: string[]): ResolvedDoc | null {
  if (slug.length === 0) {
    return { kind: 'home' };
  }

  const page = getDocBySlug(slug);
  if (page) {
    return { kind: 'page', item: page };
  }

  // Check if slug is a proper prefix of any existing page
  const matchingDocs = allDocs.filter(
    (doc) =>
      doc.slug.length > slug.length &&
      slug.every((segment, i) => segment === doc.slug[i])
  );

  if (matchingDocs.length === 0) {
    return null;
  }

  const currentSegmentKey = slug[slug.length - 1];
  const meta = segmentMeta[currentSegmentKey];
  const label = meta ? meta.label : currentSegmentKey;
  const description = meta ? meta.description : '';

  // Collect distinct next segments
  const nextSegmentKeys: string[] = [];
  for (const doc of matchingDocs) {
    const nextKey = doc.slug[slug.length];
    if (!nextSegmentKeys.includes(nextKey)) {
      nextSegmentKeys.push(nextKey);
    }
  }

  const children: IndexChild[] = nextSegmentKeys.map((nextKey) => {
    const childSlug = [...slug, nextKey];
    const childDoc = getDocBySlug(childSlug);
    if (childDoc) {
      return {
        title: childDoc.title,
        description: childDoc.description,
        href: slugToHref(childSlug),
        kind: 'page',
      };
    }

    const childMeta = segmentMeta[nextKey];
    return {
      title: childMeta ? childMeta.label : nextKey,
      description: childMeta ? childMeta.description : '',
      href: slugToHref(childSlug),
      kind: 'index',
    };
  });

  return {
    kind: 'index',
    slug,
    label,
    description,
    children,
  };
}

export function getStaticSlugParams(): { slug: string[] }[] {
  const seen = new Set<string>();
  const params: { slug: string[] }[] = [];

  const addSlug = (slug: string[]) => {
    const key = slug.join('/');
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ slug });
    }
  };

  addSlug([]);

  for (const doc of allDocs) {
    for (let len = 1; len <= doc.slug.length; len++) {
      addSlug(doc.slug.slice(0, len));
    }
  }

  return params;
}

export function getNavSections(context: DocContext): NavSectionView[] {
  const sections = context === 'guides' ? guidesSections : docsSections;

  return sections.map((section) => {
    const nodes: NavNode[] = section.entries.map((entry) => {
      const doc = getDocBySlug(entry.slug);
      const title = doc
        ? (doc.navTitle ?? doc.title)
        : entry.slug[entry.slug.length - 1];
      const href = slugToHref(entry.slug);

      const children: NavNode[] | undefined = entry.children?.map((child) => {
        const childDoc = getDocBySlug(child.slug);
        const childTitle = childDoc
          ? (childDoc.navTitle ?? childDoc.title)
          : child.slug[child.slug.length - 1];
        return {
          title: childTitle,
          href: slugToHref(child.slug),
        };
      });

      return {
        title,
        href,
        icon: entry.icon,
        children,
      };
    });

    return {
      id: section.id,
      title: section.title,
      nodes,
    };
  });
}

export function getOrderedPages(context: DocContext): DocItem[] {
  if (context === 'docs') {
    const pages: DocItem[] = [];
    for (const section of docsSections) {
      for (const entry of section.entries) {
        const doc = getDocBySlug(entry.slug);
        if (doc) {
          pages.push(doc);
        }
      }
    }
    return pages;
  }

  // guides context: only the children of nav entries, in order
  const pages: DocItem[] = [];
  for (const section of guidesSections) {
    for (const entry of section.entries) {
      if (entry.children) {
        for (const child of entry.children) {
          const doc = getDocBySlug(child.slug);
          if (doc) {
            pages.push(doc);
          }
        }
      }
    }
  }
  return pages;
}

export function getPrevNext(item: DocItem): {
  prev?: PaginationLink;
  next?: PaginationLink;
} {
  const pages = getOrderedPages(item.context);
  const index = pages.findIndex(
    (page) =>
      page.slug.length === item.slug.length &&
      page.slug.every((s, i) => s === item.slug[i])
  );

  if (index === -1) {
    return {};
  }

  const prev =
    index > 0
      ? {
          title: pages[index - 1].title,
          href: slugToHref(pages[index - 1].slug),
        }
      : undefined;

  const next =
    index < pages.length - 1
      ? {
          title: pages[index + 1].title,
          href: slugToHref(pages[index + 1].slug),
        }
      : undefined;

  return { prev, next };
}

export function getToc(item: DocItem): TocItem[] {
  return item.blocks
    .filter((block): block is Extract<typeof block, { type: 'heading' }> =>
      block.type === 'heading' && block.level === 2
    )
    .map((block) => ({
      id: block.id,
      text: block.text,
    }));
}

export function getReadingMinutes(item: DocItem): number {
  const textParts: string[] = [item.description];

  for (const block of item.blocks) {
    if (block.type === 'paragraph' || block.type === 'heading') {
      textParts.push(block.text);
    } else if (block.type === 'callout') {
      textParts.push(block.title, block.text);
    } else if (block.type === 'list') {
      textParts.push(...block.items);
    } else if (block.type === 'table') {
      textParts.push(...block.headers);
      for (const row of block.rows) {
        textParts.push(...row);
      }
    }
  }

  const combined = textParts.join(' ');
  const words = combined
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  return Math.max(1, Math.ceil(words / 200));
}

export function buildBreadcrumbs(slug: string[]): BreadcrumbItem[] {
  if (slug.length === 0) {
    return [
      { label: 'Documentation', href: '/docs' },
      { label: 'Overview' },
    ];
  }

  const isGuides = slug[0] === 'guides';

  if (isGuides) {
    const items: BreadcrumbItem[] = [];
    for (let i = 1; i <= slug.length; i++) {
      const prefix = slug.slice(0, i);
      const isLast = i === slug.length;
      const childDoc = getDocBySlug(prefix);
      const segmentKey = prefix[prefix.length - 1];
      const meta = segmentMeta[segmentKey];

      const label = childDoc
        ? childDoc.title
        : meta
        ? meta.label
        : segmentKey;

      if (isLast) {
        items.push({ label });
      } else {
        const resolved = resolveDoc(prefix);
        items.push({
          label,
          href: resolved !== null ? slugToHref(prefix) : undefined,
        });
      }
    }
    return items;
  }

  // docs context
  const items: BreadcrumbItem[] = [
    { label: 'Documentation', href: '/docs' },
  ];

  for (let i = 1; i <= slug.length; i++) {
    const prefix = slug.slice(0, i);
    const isLast = i === slug.length;
    const childDoc = getDocBySlug(prefix);
    const segmentKey = prefix[prefix.length - 1];
    const meta = segmentMeta[segmentKey];

    const label = childDoc
      ? childDoc.title
      : meta
      ? meta.label
      : segmentKey;

    if (isLast) {
      items.push({ label });
    } else {
      const resolved = resolveDoc(prefix);
      items.push({
        label,
        href: resolved !== null ? slugToHref(prefix) : undefined,
      });
    }
  }

  return items;
}

export function getSearchEntries(): SearchEntry[] {
  return allDocs.map((doc) => {
    let group = 'Guides';
    if (doc.context === 'docs') {
      const section = docsSections.find((s) =>
        s.entries.some((e) => e.slug.join('/') === doc.slug.join('/'))
      );
      group = section ? section.title : 'Documentation';
    }

    return {
      title: doc.title,
      description: doc.description,
      href: slugToHref(doc.slug),
      group,
    };
  });
}

export function assertDataIntegrity(): void {
  // 1. Duplicate slugs
  const slugSet = new Set<string>();
  for (const doc of allDocs) {
    const key = doc.slug.join('/');
    if (slugSet.has(key)) {
      throw new Error(`Data Integrity Error: Duplicate slug found: ${key}`);
    }
    slugSet.add(key);
  }

  // 2. Nav slug without a DocItem
  for (const section of docsSections) {
    for (const entry of section.entries) {
      if (!getDocBySlug(entry.slug)) {
        throw new Error(
          `Data Integrity Error: docsSections entry '${entry.slug.join('/')}' has no matching DocItem`
        );
      }
    }
  }

  for (const section of guidesSections) {
    for (const entry of section.entries) {
      if (!getDocBySlug(entry.slug)) {
        throw new Error(
          `Data Integrity Error: guidesSections entry '${entry.slug.join('/')}' has no matching DocItem`
        );
      }
      if (entry.children) {
        for (const child of entry.children) {
          if (!getDocBySlug(child.slug)) {
            throw new Error(
              `Data Integrity Error: guidesSections child '${child.slug.join('/')}' has no matching DocItem`
            );
          }
        }
      }
    }
  }

  // 3. DocItem missing from nav of its context
  for (const doc of allDocs) {
    const key = doc.slug.join('/');
    if (doc.context === 'docs') {
      const found = docsSections.some((s) =>
        s.entries.some((e) => e.slug.join('/') === key)
      );
      if (!found) {
        throw new Error(
          `Data Integrity Error: DocItem '${key}' is missing from docsSections`
        );
      }
    } else if (doc.context === 'guides') {
      const foundInEntry = guidesSections.some((s) =>
        s.entries.some((e) => e.slug.join('/') === key)
      );
      const foundInChildren = guidesSections.some((s) =>
        s.entries.some((e) =>
          e.children?.some((c) => c.slug.join('/') === key)
        )
      );
      if (!foundInEntry && !foundInChildren) {
        throw new Error(
          `Data Integrity Error: DocItem '${key}' is missing from guidesSections`
        );
      }
    }
  }

  // 4. Duplicate heading ids within a page
  for (const doc of allDocs) {
    const headingIds = new Set<string>();
    for (const block of doc.blocks) {
      if (block.type === 'heading') {
        if (headingIds.has(block.id)) {
          throw new Error(
            `Data Integrity Error: Duplicate heading id '${block.id}' in doc '${doc.slug.join('/')}'`
          );
        }
        headingIds.add(block.id);
      }
    }
  }

  // 5. Internal link in any inline string that does not resolve with resolveDoc
  const linkRegex = /\]\((\/docs[^)]*)\)/g;
  const stringsToCheck: string[] = [
    homeContent.lead,
    ...homeContent.cards.map((c) => c.description),
  ];

  for (const block of homeContent.blocks) {
    if (block.type === 'paragraph' || block.type === 'heading') {
      stringsToCheck.push(block.text);
    } else if (block.type === 'callout') {
      stringsToCheck.push(block.title, block.text);
    }
  }

  for (const doc of allDocs) {
    stringsToCheck.push(doc.description);
    for (const block of doc.blocks) {
      if (block.type === 'paragraph' || block.type === 'heading') {
        stringsToCheck.push(block.text);
      } else if (block.type === 'callout') {
        stringsToCheck.push(block.title, block.text);
      } else if (block.type === 'list') {
        stringsToCheck.push(...block.items);
      } else if (block.type === 'table') {
        stringsToCheck.push(...block.headers);
        for (const row of block.rows) {
          stringsToCheck.push(...row);
        }
      }
    }
  }

  for (const text of stringsToCheck) {
    let match: RegExpExecArray | null;
    linkRegex.lastIndex = 0;
    while ((match = linkRegex.exec(text)) !== null) {
      const fullUrl = match[1];
      const withoutHash = fullUrl.split('#')[0];
      const relative = withoutHash.replace(/^\/docs\/?/, '');
      const segments = relative.length === 0 ? [] : relative.split('/');
      const resolved = resolveDoc(segments);
      if (!resolved) {
        throw new Error(
          `Data Integrity Error: Unresolved internal link '${fullUrl}' in documentation copy`
        );
      }
    }
  }

  // 6. Heading with step in a page where steps are not 1..n in order
  for (const doc of allDocs) {
    const steps: number[] = [];
    for (const block of doc.blocks) {
      if (block.type === 'heading' && block.step !== undefined) {
        steps.push(block.step);
      }
    }
    if (steps.length > 0) {
      for (let i = 0; i < steps.length; i++) {
        if (steps[i] !== i + 1) {
          throw new Error(
            `Data Integrity Error: Steps in doc '${doc.slug.join('/')}' are not ordered 1..n: found ${steps.join(', ')}`
          );
        }
      }
    }
  }
}

// Call once at module load
assertDataIntegrity();
