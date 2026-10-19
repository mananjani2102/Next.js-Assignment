import type { DocItem } from '@/types';

export const guidesDocs: DocItem[] = [
  {
    slug: ['guides', 'nextjs', 'app-router', 'defining-routes'],
    title: 'Defining Routes',
    description:
      'Learn how folders in the app directory map to route segments, pages and nested hierarchies.',
    context: 'guides',
    badge: 'Guide',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'route-segments-and-special-files',
        text: 'Route Segments and Special Files',
      },
      {
        type: 'paragraph',
        text: 'Routes in the Next.js App Router are defined by creating folders inside the `app` directory. A route segment becomes publicly accessible when it contains a `page.tsx` file.',
      },
      {
        type: 'table',
        headers: ['File', 'Purpose', 'Component Type'],
        columnStyles: ['mono-accent', 'text', 'mono-chip'],
        rows: [
          ['page.tsx', 'Unique UI for a route segment', 'Server Component'],
          ['layout.tsx', 'Shared wrapper UI across segments', 'Server Component'],
          ['loading.tsx', 'Loading fallback UI wrapped in Suspense', 'Client or Server'],
          ['error.tsx', 'Error boundary for unexpected exceptions', 'Client Component'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        id: 'route-groups-and-colocation',
        text: 'Route Groups and Colocation',
      },
      {
        type: 'paragraph',
        text: 'Folders wrapped in parentheses, such as `(marketing)`, are route groups. Next.js omits them from URL paths, allowing logical code organization and layout segregation.',
      },
      {
        type: 'paragraph',
        text: 'Private folders prefixed with an underscore, such as `_components`, prevent files from being treated as route segments, enabling safe colocation of helper functions and components.',
      },
    ],
  },
  {
    slug: ['guides', 'nextjs', 'app-router', 'dynamic-routes'],
    title: 'Dynamic Routes',
    navTitle: undefined,
    badge: 'Guide',
    description:
      'Learn how to define dynamic route segments and handle catch-all parameters in nested application architectures.',
    context: 'guides',
    blocks: [
      {
        type: 'callout',
        variant: 'info',
        title: 'Prerequisite Knowledge',
        text: 'In the App Router, dynamic segments let part of a URL path vary without query parameters. A dynamic segment is rendered at request time, or pre-rendered at build time when the route exports `generateStaticParams()`.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'creating-the-segment-folder',
        text: 'Creating the segment folder',
        step: 1,
      },
      {
        type: 'paragraph',
        text: 'A dynamic segment is created by wrapping a folder name in square brackets: `[id]` or `[slug]`. To handle an arbitrary project ID, structure the `app` directory like this:',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'app/projects/[id]/page.tsx',
        language: 'tsx',
        icon: 'folder',
        code: `export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <section className="project-container">
      <h1>Active Project ID: {id}</h1>
    </section>
  )
}`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'accessing-route-parameters',
        text: 'Accessing route parameters',
        step: 2,
      },
      {
        type: 'paragraph',
        text: 'Dynamic segment values are passed to `layout`, `page`, `route` and `generateMetadata` functions as the `params` prop. In Next.js 16 `params` is a Promise, so read it with `await` in async components.',
      },
      {
        type: 'table',
        headers: ['Route pattern', 'Example URL', 'Resolved params'],
        columnStyles: ['mono-accent', 'text', 'mono-chip'],
        rows: [
          ['app/blog/[slug]/page.tsx', '/blog/hello-world', "{ slug: 'hello-world' }"],
          ['app/shop/[category]/[item]/page.tsx', '/shop/shoes/boots', "{ category: 'shoes', item: 'boots' }"],
        ],
      },
      {
        type: 'heading',
        level: 2,
        id: 'optional-catch-all-segments',
        text: 'Handling optional catch-all segments',
        step: 3,
      },
      {
        type: 'paragraph',
        text: 'When paths vary in depth, as in a documentation site or a CMS tree, use double brackets: `[[...slug]]`. The segment becomes optional, so the route matches the parent path and every nested sub-path.',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'app/docs/[[...slug]]/page.tsx',
        language: 'tsx',
        icon: 'code',
        code: `type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async function DocsReader({ params }: Props) {
  const { slug } = await params
  const currentPath = slug ? slug.join('/') : 'index'
  return <article>Displaying documentation tree: {currentPath}</article>
}`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'providing-fallback-behavior',
        text: 'Providing fallback behavior',
        step: 4,
      },
      {
        type: 'paragraph',
        text: 'When a dynamic segment does not resolve to a known record in your database or content source, call `notFound()` from `next/navigation`. Next.js then renders the nearest `not-found.tsx` file.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Safety Tip',
        text: 'Never pass unsanitized route parameters into raw HTML or database queries. Validate incoming params with a schema library such as Zod before performing any I/O.',
      },
    ],
  },
  {
    slug: [
      'guides',
      'nextjs',
      'app-router',
      'parallel-and-intercepting-routes',
    ],
    title: 'Parallel and Intercepting Routes',
    navTitle: 'Parallel & Intercepting',
    badge: 'Guide',
    description:
      'Advanced routing patterns for simultaneous view rendering and modal overlays in the App Router.',
    context: 'guides',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'parallel-routes',
        text: 'Parallel Routes',
      },
      {
        type: 'paragraph',
        text: 'Parallel routing allows you to simultaneously or conditionally render one or more pages within the same layout. Parallel routes are defined using named slots denoted with an `@` symbol, such as `@analytics` and `@team`.',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'app/dashboard/layout.tsx',
        language: 'tsx',
        icon: 'code',
        code: `export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      {children}
      <aside>{analytics}</aside>
      <aside>{team}</aside>
    </div>
  )
}`,
      },
      {
        type: 'paragraph',
        text: 'Each parallel slot should provide a `default.tsx` file to render an unmatched fallback view on hard navigation reloads.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'intercepting-routes',
        text: 'Intercepting Routes',
      },
      {
        type: 'paragraph',
        text: 'Intercepting routes allow you to load a route from another part of your application within the current layout, such as opening a photo modal while preserving the background page and URL bar.',
      },
      {
        type: 'table',
        headers: ['Pattern', 'Scope Description'],
        columnStyles: ['mono-accent', 'text'],
        rows: [
          ['(.)', 'Matches segments on the same level'],
          ['(..)', 'Matches segments one level above'],
          ['(..)(..)', 'Matches segments two levels above'],
          ['(...)', 'Matches segments from the root app directory'],
        ],
      },
    ],
  },
];
