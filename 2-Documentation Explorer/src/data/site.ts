import type { DocContext, IconName } from '@/types';

export interface SiteConfig {
  name: string;
  version: string;
  description: string;
  url: string;
  repoUrl: string;
  contactEmail: string;
  legalName: string;
  apiReferenceUrl: string;
}

export interface TopNavItem {
  label: string;
  href: string;
  matchPrefix: string;
  excludePrefix?: string;
}

export interface ContextMetaItem {
  eyebrow?: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
}

export interface NotFoundSuggestion {
  slug: string[];
  title: string;
  description: string;
  icon: IconName;
}

export const siteConfig: SiteConfig = {
  name: 'Orbit Docs',
  version: 'v1.0',
  description:
    'A technical reference for building scalable web applications with the Next.js App Router.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  repoUrl: process.env.NEXT_PUBLIC_REPO_URL || '',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || '',
  apiReferenceUrl: 'https://nextjs.org/docs/app/api-reference',
};

export const topNav: TopNavItem[] = [
  {
    label: 'Documentation',
    href: '/docs',
    matchPrefix: '/docs',
    excludePrefix: '/docs/guides',
  },
  {
    label: 'Guides',
    href: '/docs/guides',
    matchPrefix: '/docs/guides',
  },
  {
    label: 'About',
    href: '/about',
    matchPrefix: '/about',
  },
];

export const contextMeta: Record<DocContext, ContextMetaItem> = {
  docs: {
    title: 'Core Documentation',
    subtitle: 'v1.0 Architecture Guide',
    searchPlaceholder: 'Search documentation...',
  },
  guides: {
    eyebrow: 'Guides context',
    title: 'Next.js App Router',
    subtitle: 'v1.0 Architecture Guide',
    searchPlaceholder: 'Search guides, APIs, config...',
  },
};

export const notFoundSuggestions: NotFoundSuggestion[] = [
  {
    slug: ['getting-started', 'installation'],
    title: 'Quickstart and Installation',
    description: 'Setup steps, package requirements and environment variables.',
    icon: 'download',
  },
  {
    slug: ['core-concepts', 'routing'],
    title: 'Routing and Catch-All Rules',
    description: 'File-based routing, dynamic segments and not-found handling.',
    icon: 'git-fork',
  },
  {
    slug: ['reference', 'configuration'],
    title: 'Configuration Reference',
    description: 'Options, defaults and examples for next.config.ts.',
    icon: 'settings',
  },
];
