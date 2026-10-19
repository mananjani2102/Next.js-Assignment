import type { DocItem } from '@/types';

export const coreConceptsDocs: DocItem[] = [
  {
    slug: ['core-concepts', 'routing'],
    title: 'Routing',
    description:
      'The App Router maps folders inside the app directory to URL segments, with support for static paths, dynamic segments and catch-all routes.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'overview',
        text: 'Overview',
      },
      {
        type: 'paragraph',
        text: 'Every folder inside the `app` directory maps to a URL segment. A segment becomes publicly reachable when its folder contains a `page.tsx` or a `route.ts` file.',
      },
      {
        type: 'paragraph',
        text: 'Layouts, loading states and error boundaries attach to a segment through the special files `layout.tsx`, `loading.tsx` and `error.tsx`. Routes come from the file system, so there is no route table to maintain: adding a folder with a `page.tsx` adds a route, and removing it removes the route.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Convention Note',
        text: 'The file names `layout.tsx`, `loading.tsx`, `error.tsx` and `not-found.tsx` are reserved. Each one applies to the segment folder that contains it and to every segment nested below it.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'catch-all-routes',
        text: 'Catch-all Routes',
      },
      {
        type: 'paragraph',
        text: 'A dynamic segment can match every following URL segment when you add an ellipsis inside the brackets: `[...slug]`. The matched segments are delivered as an array of strings.',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'app/shop/[...slug]/page.tsx',
        language: 'tsx',
        icon: 'marker',
        code: `// app/shop/[...slug]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  return <div>Path: {slug.join('/')}</div>
}`,
      },
      {
        type: 'table',
        headers: ['Route path pattern', 'Example URL', 'Params object'],
        columnStyles: ['mono', 'mono-muted', 'mono-accent'],
        rows: [
          ['app/shop/[...slug]/page.tsx', '/shop/clothes', "{ slug: ['clothes'] }"],
          ['app/shop/[...slug]/page.tsx', '/shop/clothes/tops', "{ slug: ['clothes', 'tops'] }"],
          ['app/shop/[...slug]/page.tsx', '/shop', 'No match (404)'],
        ],
      },
      {
        type: 'paragraph',
        text: 'A catch-all segment does not match its parent path. To match `/shop` as well, use an optional catch-all segment, described in [Dynamic Routes](/docs/guides/nextjs/app-router/dynamic-routes).',
      },
      {
        type: 'heading',
        level: 2,
        id: 'route-groups',
        text: 'Route Groups',
      },
      {
        type: 'paragraph',
        text: 'Wrapping a folder name in parentheses, such as `(marketing)` or `(dashboard)`, groups routes for organization without changing the URL. The folder name is omitted from the path. A group can hold its own `layout.tsx`, so sibling sections can use different layouts. See [nested layouts](/docs/core-concepts/layouts) and the [route definition guide](/docs/guides/nextjs/app-router/defining-routes).',
      },
    ],
  },
  {
    slug: ['core-concepts', 'layouts'],
    title: 'Layouts',
    description:
      'Shared UI wrappers that preserve state and avoid unnecessary re-renders across route navigations.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'root-layout',
        text: 'Root Layout',
      },
      {
        type: 'paragraph',
        text: 'The top-most layout is called the Root Layout and is required in every Next.js App Router application. It must define the outer `<html>` and `<body>` tags because Next.js does not automatically inject them.',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'app/layout.tsx',
        language: 'tsx',
        icon: 'code',
        code: `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'nested-layouts',
        text: 'Nested Layouts',
      },
      {
        type: 'paragraph',
        text: 'Layouts defined inside child folders nest inside parent layouts. On navigation between sibling routes, layouts preserve their state, avoid re-rendering and do not re-mount child DOM elements.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'route-groups-and-multiple-layouts',
        text: 'Route Groups and Multiple Layouts',
      },
      {
        type: 'paragraph',
        text: 'By organizing segments inside route groups like `(marketing)` and `(app)`, you can create completely distinct visual experiences within a single application without altering route URLs.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Metadata Inheritance',
        text: 'Metadata defined in a parent layout merges with metadata defined in child layouts and pages. Nested pages override matching properties.',
      },
    ],
  },
  {
    slug: ['core-concepts', 'data-fetching'],
    title: 'Data Fetching',
    description:
      'Patterns for loading data on the server with async components, Suspense and streaming.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'async-server-components',
        text: 'Async Server Components',
      },
      {
        type: 'paragraph',
        text: 'In the App Router, Server Components can be declared as asynchronous functions using standard `async/await` syntax. Data fetching runs directly on the server without client-side hooks like `useEffect`.',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'app/users/page.tsx',
        language: 'tsx',
        icon: 'code',
        code: `export default async function UsersPage() {
  const users = await fetch('https://api.example.com/users').then((res) => res.json())

  return (
    <ul>
      {users.map((user: { id: string; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'streaming-with-suspense',
        text: 'Streaming with Suspense',
      },
      {
        type: 'paragraph',
        text: 'The App Router streams UI progressively to the client using React Suspense boundaries. Creating a `loading.tsx` file in a segment folder automatically wraps the page content in a Suspense boundary with your fallback component.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'static-and-dynamic-generation',
        text: 'Static and Dynamic Generation',
      },
      {
        type: 'paragraph',
        text: 'When a dynamic route segment exports `generateStaticParams()`, Next.js statically renders those paths at build time. Routes that access incoming request headers or search parameters render dynamically on demand.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Client Components',
        text: 'Use Client Components only when you need browser APIs, event listeners like `onClick`, or stateful React hooks such as `useState` and `useReducer`.',
      },
    ],
  },
];
