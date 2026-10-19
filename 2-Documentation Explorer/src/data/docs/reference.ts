import type { DocItem } from '@/types';

export const referenceDocs: DocItem[] = [
  {
    slug: ['reference', 'configuration'],
    title: 'Configuration',
    description:
      'Configuration options, defaults and TypeScript definitions for next.config.ts.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'configuration-file',
        text: 'Configuration File',
      },
      {
        type: 'paragraph',
        text: 'Next.js can be configured using a `next.config.ts` or `next.config.js` file located at the root of your project directory. Using TypeScript ensures autocomplete and type safety with the `NextConfig` type.',
      },
      {
        type: 'code',
        variant: 'file',
        title: 'next.config.ts',
        language: 'ts',
        icon: 'code',
        code: `import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.example.com',
      },
    ],
  },
}

export default nextConfig`,
      },
      {
        type: 'heading',
        level: 2,
        id: 'common-options',
        text: 'Common Options',
      },
      {
        type: 'table',
        headers: ['Property', 'Type', 'Default', 'Description'],
        columnStyles: ['mono-accent', 'mono', 'mono-chip', 'text'],
        rows: [
          ['reactStrictMode', 'boolean', 'true', 'Enables React strict mode checks in development'],
          ['poweredByHeader', 'boolean', 'true', 'Controls the X-Powered-By response header'],
          ['redirects', 'function', 'none', 'Defines custom URL redirects at request time'],
          ['headers', 'function', 'none', 'Sets custom HTTP response headers per path'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        id: 'custom-headers-and-redirects',
        text: 'Custom Headers and Redirects',
      },
      {
        type: 'paragraph',
        text: 'The `redirects` and `headers` asynchronous functions in `next.config.ts` allow you to return an array of objects matching source paths and destination routes.',
      },
    ],
  },
  {
    slug: ['reference', 'cli-commands'],
    title: 'CLI Commands',
    description:
      'Command-line interface options and build flags supported in Next.js.',
    context: 'docs',
    blocks: [
      {
        type: 'heading',
        level: 2,
        id: 'core-commands',
        text: 'Core Commands',
      },
      {
        type: 'paragraph',
        text: 'The Next.js CLI comes bundled with the `next` package and exposes key commands for development, production builds and diagnostics.',
      },
      {
        type: 'table',
        headers: ['Command', 'Usage', 'Description'],
        columnStyles: ['mono-accent', 'mono', 'text'],
        rows: [
          ['next dev', 'next dev [dir] [options]', 'Starts the local development server'],
          ['next build', 'next build [dir] [options]', 'Compiles and generates the optimized production build'],
          ['next start', 'next start [dir] [options]', 'Starts the production server after building'],
          ['next info', 'next info', 'Prints environment and system diagnostic info'],
          ['next typegen', 'next typegen', 'Generates TypeScript types for App Router routes'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        id: 'cli-flags-and-options',
        text: 'CLI Flags and Options',
      },
      {
        type: 'paragraph',
        text: 'You can pass options to adjust port binding, hostname and bundler behavior across development and production:',
      },
      {
        type: 'table',
        headers: ['Flag', 'Short', 'Description'],
        columnStyles: ['mono-accent', 'mono', 'text'],
        rows: [
          ['--port', '-p', 'Specify a custom port number (default is 3000)'],
          ['--hostname', '-H', 'Specify a hostname to bind to (default is localhost)'],
          ['--turbopack', '', 'Enables Turbopack explicitly in supported commands'],
          ['--help', '-h', 'Displays available options and command arguments'],
        ],
      },
      {
        type: 'heading',
        level: 2,
        id: 'command-execution',
        text: 'Command Execution',
      },
      {
        type: 'paragraph',
        text: 'Execute CLI commands through your package manager scripts or directly via `npx next <command>`.',
      },
    ],
  },
];
