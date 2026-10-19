import type { ContentBlock, IconName } from '@/types';

export interface HomeCard {
  icon: IconName;
  title: string;
  description: string;
  cta: string;
  targetSlug: string[];
}

export interface HomeContent {
  breadcrumbLeaf: string;
  title: string;
  lead: string;
  cards: HomeCard[];
  blocks: ContentBlock[];
}

export const homeContent: HomeContent = {
  breadcrumbLeaf: 'Overview',
  title: 'Documentation',
  lead: 'Orbit Docs is a reference for building with the Next.js App Router: project setup, routing, layouts, data fetching, configuration and command-line tools.',
  cards: [
    {
      icon: 'arrow-right-to-line',
      title: 'Getting Started',
      description:
        'Quickstart guides, prerequisites and initial project configuration.',
      cta: 'Start reading',
      targetSlug: ['getting-started'],
    },
    {
      icon: 'git-fork',
      title: 'Core Concepts',
      description:
        'Nested routing patterns, catch-all segments and data loading.',
      cta: 'Explore concepts',
      targetSlug: ['core-concepts'],
    },
    {
      icon: 'settings',
      title: 'Reference',
      description: 'Configuration options, flags and CLI commands.',
      cta: 'View reference',
      targetSlug: ['reference'],
    },
  ],
  blocks: [
    {
      type: 'callout',
      variant: 'info',
      title: 'Server Components by default',
      text: "Components in the App Router are Server Components unless a file opts in to the client with the `'use client'` directive. Read [Layouts](/docs/core-concepts/layouts) and [Data Fetching](/docs/core-concepts/data-fetching) before moving existing client-side code.",
    },
    {
      type: 'code',
      variant: 'terminal',
      title: 'Terminal: Quick Setup',
      language: 'bash',
      code: 'npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"\ncd my-app && npm run dev',
    },
  ],
};
