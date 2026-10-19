import type { DocItem } from '@/types';

export const gettingStartedDocs: DocItem[] = [
  {
    slug: ['getting-started', 'introduction'],
    title: 'Introduction',
    description:
      'An overview of the Next.js App Router architecture and documentation structure.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'what-is-the-app-router',
        text: 'What is the App Router?',
      },
      {
        type: 'paragraph',
        text: 'The Next.js App Router is a modern application architecture built on top of React Server Components, Suspense and concurrent features. It uses file-system based routing where directories inside the `app` folder define the route structure.',
      },
      {
        type: 'paragraph',
        text: 'In the App Router, components are Server Components by default. This design minimizes client JavaScript bundle size and executes data loading operations directly on the server next to your databases and backend APIs.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Architecture Note',
        text: 'Server Components execute only on the server and never re-render on the client. To add client-side interactivity, use the `use client` directive at the top of a file.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'documentation-structure',
        text: 'Documentation Structure',
      },
      {
        type: 'paragraph',
        text: 'Orbit Docs divides App Router reference material into three main sections:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '**Getting Started**: Prerequisites, environment variables and initial project setup.',
          '**Core Concepts**: In-depth explanations of [Routing](/docs/core-concepts/routing), [Layouts](/docs/core-concepts/layouts) and [Data Fetching](/docs/core-concepts/data-fetching).',
          '**Reference**: Technical specifications for [Configuration](/docs/reference/configuration) and [CLI Commands](/docs/reference/cli-commands).',
        ],
      },
      {
        type: 'heading',
        level: 2,
        id: 'prerequisites',
        text: 'Prerequisites',
      },
      {
        type: 'paragraph',
        text: 'Before building applications with the App Router, ensure familiarity with modern React concepts such as Server Components, Promises, async/await in JSX, and TypeScript typing conventions.',
      },
    ],
  },
  {
    slug: ['getting-started', 'installation'],
    title: 'Installation',
    description:
      'System requirements and installation procedures for creating a new Next.js application.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'system-requirements',
        text: 'System Requirements',
      },
      {
        type: 'paragraph',
        text: 'Next.js requires Node.js version 20.9.0 or newer. Operating system support includes macOS, Windows (including WSL), and Linux distributions.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Node Version Check',
        text: 'Run `node -v` in your terminal to verify your installed Node.js version matches the 20.9.0 minimum requirement before scaffolding.',
      },
      {
        type: 'heading',
        level: 2,
        id: 'automatic-installation',
        text: 'Automatic Installation',
      },
      {
        type: 'paragraph',
        text: 'We recommend creating a new Next.js app using `create-next-app`, which automatically sets up TypeScript, ESLint and Tailwind CSS:',
      },
      {
        type: 'code',
        variant: 'terminal',
        title: 'Terminal',
        language: 'bash',
        code: 'npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias "@/*"',
      },
      {
        type: 'heading',
        level: 2,
        id: 'manual-installation-and-scripts',
        text: 'Manual Installation and Scripts',
      },
      {
        type: 'paragraph',
        text: 'To install Next.js manually in an existing project, install the core packages and configure the project package scripts:',
      },
      {
        type: 'code',
        variant: 'terminal',
        title: 'Terminal',
        language: 'bash',
        code: 'npm install next@latest react@latest react-dom@latest',
      },
      {
        type: 'table',
        headers: ['Script', 'Command', 'Purpose'],
        columnStyles: ['mono-accent', 'mono', 'text'],
        rows: [
          ['dev', 'next dev', 'Starts development server with Turbopack'],
          ['build', 'next build', 'Creates optimized production build'],
          ['start', 'next start', 'Runs the production server'],
          ['lint', 'eslint', 'Executes ESLint directly across files'],
        ],
      },
      {
        type: 'paragraph',
        text: 'In Next.js 16, the previous `next lint` CLI command was removed in favor of calling ESLint directly through package scripts.',
      },
    ],
  },
  {
    slug: ['getting-started', 'project-setup'],
    title: 'Project Setup',
    description:
      'Directory structure conventions, path aliases and environment configuration in Next.js.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'directory-structure',
        text: 'Directory Structure',
      },
      {
        type: 'paragraph',
        text: 'Next.js App Router projects use the `src/app` directory to store layouts, pages, loading indicators and error boundaries. Static assets live in the root `public` directory.',
      },
      {
        type: 'table',
        headers: ['Path', 'Role', 'Required'],
        columnStyles: ['mono-accent', 'text', 'mono-chip'],
        rows: [
          ['src/app/layout.tsx', 'Root layout with html and body tags', 'Yes'],
          ['src/app/page.tsx', 'Root index page component', 'Yes'],
          ['src/app/globals.css', 'Global CSS styles and design tokens', 'Optional'],
          ['public/', 'Static assets served from the root URL', 'Optional'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        id: 'path-aliases',
        text: 'Path Aliases',
      },
      {
        type: 'paragraph',
        text: 'Next.js automatically supports path aliases defined in `tsconfig.json`. The standard alias maps `@/*` to `./src/*`, enabling clean imports across deeply nested files without relative dot paths.',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'tsconfig.json',
        language: 'json',
        code: '{\n  "compilerOptions": {\n    "paths": {\n      "@/*": ["./src/*"]\n    }\n  }\n}',
      },
      {
        type: 'heading',
        level: 2,
        id: 'environment-variables',
        text: 'Environment Variables',
      },
      {
        type: 'paragraph',
        text: 'Next.js has built-in support for `.env` files. Variables prefixed with `NEXT_PUBLIC_` are inlined into client JavaScript bundles, while unprefixed variables remain strictly accessible only on the server.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Security Warning',
        text: 'Never prefix private database credentials, API secrets or encryption keys with `NEXT_PUBLIC_`.',
      },
    ],
  },
];
