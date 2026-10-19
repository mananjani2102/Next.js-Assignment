import type { DocSection } from '@/types';

export const docsSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    entries: [
      {
        slug: ['getting-started', 'introduction'],
        icon: 'arrow-right-to-line',
      },
      {
        slug: ['getting-started', 'installation'],
        icon: 'download',
      },
      {
        slug: ['getting-started', 'project-setup'],
        icon: 'folder',
      },
    ],
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    entries: [
      {
        slug: ['core-concepts', 'routing'],
        icon: 'git-fork',
      },
      {
        slug: ['core-concepts', 'layouts'],
        icon: 'panels-top-left',
      },
      {
        slug: ['core-concepts', 'data-fetching'],
        icon: 'refresh-cw',
      },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    entries: [
      {
        slug: ['reference', 'configuration'],
        icon: 'settings',
      },
      {
        slug: ['reference', 'cli-commands'],
        icon: 'square-terminal',
      },
    ],
  },
];

export const guidesSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    entries: [
      {
        slug: ['getting-started', 'introduction'],
        icon: 'arrow-right-to-line',
      },
      {
        slug: ['getting-started', 'installation'],
        icon: 'download',
      },
      {
        slug: ['getting-started', 'project-setup'],
        icon: 'folder',
      },
    ],
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    entries: [
      {
        slug: ['core-concepts', 'routing'],
        icon: 'git-fork',
        children: [
          { slug: ['guides', 'nextjs', 'app-router', 'defining-routes'] },
          { slug: ['guides', 'nextjs', 'app-router', 'dynamic-routes'] },
          {
            slug: [
              'guides',
              'nextjs',
              'app-router',
              'parallel-and-intercepting-routes',
            ],
          },
        ],
      },
      {
        slug: ['core-concepts', 'layouts'],
        icon: 'panels-top-left',
      },
      {
        slug: ['core-concepts', 'data-fetching'],
        icon: 'refresh-cw',
      },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    entries: [
      {
        slug: ['reference', 'configuration'],
        icon: 'settings',
      },
      {
        slug: ['reference', 'cli-commands'],
        icon: 'square-terminal',
      },
    ],
  },
];
