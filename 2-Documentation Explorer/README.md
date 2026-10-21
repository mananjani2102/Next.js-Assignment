# Orbit Docs

A technical documentation explorer built with Next.js (App Router), TypeScript, and Tailwind CSS.

## 1. Overview

Orbit Docs is a documentation explorer built to demonstrate production-grade Next.js App Router architecture. It documents the Next.js App Router file-system conventions, routing hierarchy, Server Components, data loading patterns, and configuration specifications.

The application interface implements four primary technical documentation views:
- **Documentation Home**: Section overview cards, featured guides, and quick setup instructions.
- **Technical Article View**: Hierarchical navigation, syntax-highlighted code blocks, and on-page table of contents.
- **Custom 404 & Route Diagnostics**: Interactive route lookup, suggested articles, and terminal-style error logs.
- **Step-by-Step Guides**: Multi-step technical guide layout with step counters, prerequisite callouts, and code examples.

## 2. Stack and Requirements

Real package versions from package.json:
- Next.js: 16.4.2 (App Router with Turbopack)
- React: 19.3.0
- React DOM: 19.3.0
- TypeScript: 5.x (strict mode enabled)
- Tailwind CSS: 4.3.3 (CSS-first engine with `@theme` token definitions)
- lucide-react: 1.61.0 (icon set)
- shiki: 4.5.0 (server-side syntax highlighting)
- Runtime requirement: Node.js 20.9.0 or newer

## 3. Getting Started

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development Server

Start the local Next.js development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Production Build

Create an optimized static production build:

```bash
npm run build
```

### Production Server

Start the compiled production application:

```bash
npm run start
```

### All NPM Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack on port 3000.
- `npm run build`: Compiles TypeScript, collects route data, and generates static HTML (SSG) for all documentation pages.
- `npm run start`: Serves the compiled production build locally.
- `npm run lint`: Executes ESLint to check for code quality and convention adherence.
- `npm run typecheck`: Runs `tsc --noEmit` to verify type safety across the entire codebase.
- `npm run check:guardrails`: Executes `scripts/check-guardrails.mjs` to enforce strict formatting, zero em dashes, zero emojis, and design system rules.
- `npm run verify`: Runs typecheck, lint, check:guardrails, and build sequentially as a unified CI gate.
- `npm run verify:routes`: Executes `scripts/verify-routes.mjs` to crawl all sitemap paths, validate HTML semantics, verify 404 responses, test redirects, and confirm icon assets.

## 4. Environment Variables

Orbit Docs supports four optional public environment variables defined in `.env.example`:

| Variable | Description | Default When Empty |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for `metadataBase`, `sitemap.xml`, and `robots.txt`. | `http://localhost:3000` |
| `NEXT_PUBLIC_REPO_URL` | Target repository URL for "Report broken link", "Edit on GitHub", and header GitHub links. | External GitHub links are hidden. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email address displayed on About, Privacy Policy, and Terms pages. | `support@example.com` |
| `NEXT_PUBLIC_LEGAL_NAME` | Legal organization or entity name displayed on legal pages and footer copyright. | `Orbit Docs Inc.` |

## 5. Routing Architecture

### Folder Tree Under `src/app`

The routing structure organizes shared layouts and page boundaries using Route Groups:

```text
src/app/
├── (docs)/
│   ├── docs/
│   │   ├── [[...slug]]/
│   │   │   └── page.tsx           # Optional catch-all documentation handler
│   │   ├── error.tsx              # Error boundary for documentation exceptions
│   │   ├── loading.tsx            # Static loading skeleton fallback
│   │   └── not-found.tsx          # Documentation 404 screen
│   └── layout.tsx                 # Documentation shell (Header, SidebarNav, Footer)
├── (site)/
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── privacy-policy/
│   │   └── page.tsx               # Privacy Policy page
│   ├── terms-and-conditions/
│   │   └── page.tsx               # Terms and Conditions page
│   └── layout.tsx                 # Site shell for standalone informational pages
├── apple-icon.png                 # Apple touch icon asset
├── favicon.ico                    # Standard favicon icon asset
├── global-error.tsx               # Root application error boundary
├── globals.css                    # Design system tokens and Tailwind CSS imports
├── icon.svg                       # Vector SVG favicon asset
├── layout.tsx                     # Root HTML and body layout
├── not-found.tsx                  # Root application 404 handler
├── page.tsx                       # Root redirect handler (redirects / to /docs)
├── robots.ts                      # Dynamic robots.txt metadata route
└── sitemap.ts                     # Dynamic sitemap.xml metadata route
```

### Route Segment Comparison: `[slug]`, `[...slug]`, and `[[...slug]]`

| Pattern | Route File Example | Matches `/docs`? | Matches `/docs/a/b`? | Resolved `params` Value |
| :--- | :--- | :--- | :--- | :--- |
| `[slug]` | `app/docs/[slug]/page.tsx` | No | No | `{ slug: 'getting-started' }` |
| `[...slug]` | `app/docs/[...slug]/page.tsx` | No | Yes | `{ slug: ['guides', 'app-router'] }` |
| `[[...slug]]` | `app/docs/[[...slug]]/page.tsx` | Yes | Yes | `/docs`: `{ slug: undefined }`<br>`/docs/a/b`: `{ slug: ['a', 'b'] }` |

### Why an Optional Catch-All Route is Used

In Orbit Docs, a single page component (`src/app/(docs)/docs/[[...slug]]/page.tsx`) handles all 18 documentation URLs uniformly. This architecture eliminates code duplication between root index pages, multi-level guides, and standalone articles:
- Home View (`/docs`): Served when `slug` is undefined or empty.
- 8 Technical Articles: Routed based on path segments such as `/docs/core-concepts/routing`.
- 3 Multi-Step Guides: Routed based on nested path segments such as `/docs/guides/nextjs/app-router/dynamic-routes`.
- 6 Section Index Pages: Automatically generated for intermediate category folders such as `/docs/core-concepts` or `/docs/guides/nextjs`.

### URL to Resolution Table

| URL Requested | `params.slug` | Document Kind | Resolution Behavior |
| :--- | :--- | :--- | :--- |
| `/docs` | `undefined` or `[]` | `home` | Renders `homeContent` with section cards and setup guide. |
| `/docs/core-concepts/routing` | `['core-concepts', 'routing']` | `page` | Resolves `DocItem` from `coreConceptsDocs` and renders article blocks. |
| `/docs/guides/nextjs/app-router/dynamic-routes` | `['guides', 'nextjs', 'app-router', 'dynamic-routes']` | `page` | Resolves `DocItem` from `guidesDocs` and renders numbered step guide. |
| `/docs/core-concepts` | `['core-concepts']` | `index` | Auto-generates card links for all child items in the Core Concepts section. |
| `/docs/routing/catch-all-param` | `['routing', 'catch-all-param']` | `null` | Returns `null` from `resolveDoc`, triggering `notFound()`. |

### How `resolveDoc` and `getStaticSlugParams` Work

- `getStaticSlugParams()`: Scans all registered items in `src/data/docs/` and intermediate navigation sections in `src/data/navigation.ts`. It returns an array of 18 slug objects for `generateStaticParams()`, ensuring every documentation page is pre-rendered at build time.
- `resolveDoc(decodedSlug)`: Normalizes the array of path segments. If empty, it returns `{ kind: 'home' }`. If matching a registered item, it returns `{ kind: 'page', item }`. If matching a parent folder segment, it returns `{ kind: 'index', label, description, children }`. If no match exists, it returns `null`.

### Why `dynamicParams = false` and `notFound()` is Still Called

`export const dynamicParams = false;` is exported from `src/app/(docs)/docs/[[...slug]]/page.tsx`. This informs Next.js that only slugs generated by `generateStaticParams()` are valid. If a request arrives for an unmatched path, Next.js rejects dynamic rendering on demand. `notFound()` is called explicitly within `DocPage` when `resolveDoc()` returns `null` as a defensive second guard, ensuring Next.js invokes the custom 404 error boundary lifecycle.

### Metadata Generation

`generateMetadata({ params })` is an asynchronous function exported from `page.tsx`. It awaits the `params` Promise, decodes incoming segments, and resolves the document data via `resolveDoc()`. It constructs the `<title>`, `<meta name="description">`, and canonical URL alternate tags statically for each pre-rendered page.

### Why Breadcrumbs are Built in Pages

Next.js layouts do not re-render during client-side navigation and cannot read route segment parameters. Because breadcrumb hierarchies depend on the active dynamic slug (for example, `Documentation > Guides > Next.js > App Router > Dynamic Routes`), breadcrumbs are constructed inside `page.tsx` using `buildBreadcrumbs(decodedSlug)` and passed directly to the presentational `Breadcrumbs` component.

### Why Sidebar Context is Chosen Client-Side

The documentation shell layout (`src/app/(docs)/layout.tsx`) wraps all documentation views. The active navigation highlight, section accordion expansions, and category toggles (`docs` versus `guides`) depend on the active URL. `SidebarNav` uses `usePathname()` in a Client Component to evaluate the current route without requiring server layout re-rendering.

## 6. Rendering Strategy Table

| File | Component Type | Rendering Strategy | Reason for Component Choice |
| :--- | :--- | :--- | :--- |
| `src/app/(docs)/docs/[[...slug]]/page.tsx` | Server Component | Static (SSG) | Pre-rendered at build time via `generateStaticParams()`. Zero client bundle overhead. |
| `src/app/(docs)/layout.tsx` | Server Component | Static Shell | Shared persistent layout providing header, sidebar shell, and main container. |
| `src/app/(site)/about/page.tsx` | Server Component | Static (SSG) | Informational marketing content pre-rendered to static HTML. |
| `src/app/(site)/privacy-policy/page.tsx` | Server Component | Static (SSG) | Static legal compliance document. |
| `src/app/(site)/terms-and-conditions/page.tsx` | Server Component | Static (SSG) | Static legal terms document. |
| `src/app/sitemap.ts` | Metadata Route | Static Route | Generates valid XML sitemap indexing all 21 site routes. |
| `src/app/robots.ts` | Metadata Route | Static Route | Generates standard robots exclusion protocol rules. |
| `SidebarNav.tsx` | Client Component | Interactive Island | Reads `usePathname()` to highlight active links and toggle accordion sections. |
| `HeaderNav.tsx` | Client Component | Interactive Island | Reads `usePathname()` to display the active bottom border tab indicator. |
| `MobileNav.tsx` | Client Component | Interactive Island | Manages drawer open state, traps focus, and listens for Escape key dismissals. |
| `SearchBox.tsx` | Client Component | Interactive Island | Manages modal search dialog, keyboard shortcuts (Command+K or Ctrl+K), and live filtering. |
| `TableOfContents.tsx` | Client Component | Interactive Island | Uses `IntersectionObserver` to track the visible heading during page scroll. |
| `CopyButton.tsx` | Client Component | Interactive Island | Interacts with `navigator.clipboard` and shows copied confirmation state. |
| `FeedbackWidget.tsx` | Client Component | Interactive Island | Captures client button clicks and renders feedback response confirmation. |
| `NotFoundLookup.tsx` | Client Component | Interactive Island | Provides live instant search filtering on the 404 not-found page. |
| `RouteDiagnostics.tsx` | Client Component | Interactive Island | Reads `usePathname()` to display real-time path debugging information. |
| `error.tsx` | Client Component | Error Boundary | Next.js requirement for App Router error boundaries to access the `reset()` callback. |

## 7. Not-Found, Loading, and Error Handling

### Component Locations and Boundaries

- `src/app/not-found.tsx`: Root application not-found fallback. Catches unmatched URLs across the entire domain, rendering the documentation shell with `STATUS: 404_PAGE_NOT_FOUND`, route diagnostics log, quick path lookup, and sidebar landmark.
- `src/app/(docs)/docs/not-found.tsx`: Documentation section not-found component used when nested boundaries trigger `notFound()`.
- `src/app/(docs)/docs/loading.tsx`: Server Component rendering an accessible loading skeleton with pulse animation and `aria-busy="true"` attribute.
- `src/app/(docs)/docs/error.tsx`: Documentation route error boundary catching unexpected render exceptions. Displays `STATUS: 500_RENDER_ERROR`, error details, and an interactive "Try again" button calling `reset()`.
- `src/app/global-error.tsx`: Root-level emergency error boundary that wraps the root `<html>` and `<body>` tags if `src/app/layout.tsx` fails to render.

### Verified HTTP Status Behavior

All not-found views return genuine HTTP 404 status codes. When an invalid route such as `/docs/routing/catch-all-param` or `/definitely-missing` is requested, the server sends a 404 header and serves the custom not-found document.

### Static Rendering Note Regarding `loading.tsx`

Because all 18 documentation routes are pre-rendered statically (SSG) at build time, `loading.tsx` is rarely seen by end users during ordinary navigation. It serves primarily as a graceful fallback during client-side hydration or edge network delays.

## 8. Data Model

### How to Add a New Documentation Page

1. Create or open the relevant data file in `src/data/docs/` (for example, `core-concepts.ts` or `guides.ts`).
2. Add a new `DocItem` definition:
   ```typescript
   {
     slug: ['core-concepts', 'caching'],
     title: 'Caching',
     description: 'Overview of caching layers in Next.js App Router.',
     context: 'docs',
     blocks: [
       {
         type: 'heading',
         level: 2,
         id: 'request-memoization',
         text: 'Request Memoization',
       },
       {
         type: 'paragraph',
         text: 'Next.js extends fetch to automatically memoize requests with the same URL and options.',
       },
     ],
   }
   ```
3. Add the route entry to `src/data/navigation.ts` under the target section in `docsSections` or `guidesSections`.
4. Run `npm run verify`. The automated `assertDataIntegrity()` utility validates that:
   - Slugs are unique and match navigation entries.
   - All referenced icons exist in `icons.ts`.
   - Section hierarchies resolve without circular references.

### Inline Markup Supported

Paragraphs and callouts support lightweight inline markdown tokens:
- Code chips: Encased in backticks, such as `` `next.config.ts` ``.
- Bold emphasis: Encased in double asterisks, such as `**Server Components**`.
- Navigation links: Bracketed text followed by parentheses, such as `[Routing Architecture](/docs/core-concepts/routing)`.

### Block Types

The `DocContentRenderer` processes an array of structured content blocks:
- `heading`: H2 and H3 elements with anchor IDs and optional step badge counters.
- `paragraph`: Standard body paragraphs supporting inline markdown tokens.
- `code`: Syntax-highlighted code blocks with language indicators, line numbers, file title bars, and one-click copy buttons.
- `callout`: Notice boxes with variants (`info`, `warning`, `tip`, `note`) and matching icons.
- `table`: Data tables with typed column styling (`mono-accent`, `mono`, `mono-chip`, `text`).
- `list`: Ordered and unordered lists with custom geometric bullet markers.

### Derived Metadata and Indices

- Table of Contents: Automatically extracted from all Level 2 and Level 3 `heading` blocks via `getToc()`.
- Reading Time: Calculated using an average reading speed of 200 words per minute across all blocks via `getReadingMinutes()`.
- Pagination: Previous and next article links are dynamically resolved from the sequence in `src/data/navigation.ts` via `getPagination()`.
- Search Entries: The client-side search index is generated by extracting titles, descriptions, and headings via `getSearchEntries()`.

## 9. Component Map

- `SidebarNav`: Collapsible left navigation bar organizing sections and articles with active route highlighting.
- `Breadcrumbs`: Navigation trail displaying the hierarchical location of the active document.
- `DocContentRenderer`: Core rendering engine mapping structured content blocks to HTML elements.
- `CalloutBox`: Styled advisory container for notes, tips, warnings, and informational alerts.
- `CodeBlock`: Shiki-powered syntax highlighter with file titles, copy button, and monospace formatting.
- `DocPagination`: Bottom navigation cards providing sequential navigation to previous and next articles.
- `Header`: Fixed top application bar with branding, section navigation, version badge, and search shortcut.
- `HeaderNav`: Navigation tabs switching active context between Documentation and Guides.
- `Footer`: Application footer providing copyright information, version tag, and legal links.
- `MobileNav`: Accessible slide-out navigation drawer for mobile and small tablet viewports.
- `SearchBox`: Modal command menu dialog enabling keyboard-driven full-text search across documentation.
- `ArticleHeader`: Hero section displaying article title, description, category badge, and reading time.
- `TableOfContents`: Right-hand sticky navigation outline tracking active headings with scroll spy.
- `HomeSectionCard`: Large overview card on the documentation home page highlighting key topic areas.
- `LinkCard`: Compact navigation card for section indexes and recommended articles.
- `FeedbackWidget`: Simple rating widget allowing readers to record page helpfulness feedback.
- `NotFoundLookup`: Live route search input displayed on 404 pages to assist lost readers.
- `RouteDiagnostics`: Terminal-style debug card displaying HTTP status, requested path, and segment details.
- `DocTable`: Styled responsive table for configuration options and command-line flags.
- `CopyButton`: Client button copying code blocks to the clipboard with visual checkmark feedback.
- `InlineText`: Parser transforming inline code, bold, and link markdown into styled React nodes.
- `LegalPage`: Standardized layout container for About, Privacy Policy, and Terms pages.

## 10. Design System

### Tokens and Theme Configuration

Design tokens are configured in `src/app/globals.css` using Tailwind CSS v4 `@theme`:
- Brand primary: `#3525cd`
- Brand primary hover: `#2a1da6`
- Surface background: `#f8fafc`
- Active surface: `#f1f5f9`
- Text ink: `#0f172a`
- Text muted: `#64748b`
- Border line: `#e2e8f0`
- Strong border line: `#cbd5e1`
- Terminal code background: `#0f172a`

### Typography and Fonts

- Sans-serif: `Inter` loaded via `next/font/google` for headings and body text.
- Monospace: `JetBrains Mono` loaded via `next/font/google` for code, terminal outputs, and status badges.

### Border Radius Rules

- Controls, cards, and badges: strictly 2px border radius (`rounded-xs`).
- Code block containers: strictly 6px border radius (`rounded-md`).
- Circular and pill shapes are strictly forbidden across all elements.

### Motion and Transition Rules

- Transitions are limited strictly to `transition-colors 150ms`.
- No keyframe animations, bouncing badges, cursor effects, or scroll-triggered motion libraries.

### Icon Policy

- Exclusively `lucide-react` icons. No custom SVGs, external sprites, or emojis.

### Guardrail Compliance Scanner

`scripts/check-guardrails.mjs` scans all source files, CSS, and markdown documents to enforce:
- Zero em dashes (`\u2014`).
- Zero emojis or pictographs.
- Zero color blend or ramp utilities (`from-*`, `to-*`).
- Zero pill button or circular radius utilities.
- Zero forbidden color classes (purple, violet, fuchsia, pink).
- Zero placeholder Latin filler text.
- Zero raw HTML string injection outside of `CodeBlock.tsx`.

## 11. Accessibility Notes

- WCAG 2.1 AA Compliance: All muted text exceeds the 4.5:1 contrast ratio against white and surface backgrounds.
- Skip to Content: Accessible skip link is rendered as the first focusable DOM element on every page.
- Keyboard Navigation: All buttons, links, search triggers, and drawer elements are operable using Tab, Enter, Space, and Escape.
- Focus Rings: Consistent 2px primary focus ring with 2px offset on all interactive controls.
- Screen Readers: Landmarks include `aria-label="Main navigation"`, `aria-label="Documentation sidebar"`, `aria-label="Table of contents"`, and `aria-label="Footer links"`.

## 12. Known Limitations

- Feedback Buttons: The rating buttons in `FeedbackWidget` provide immediate visual feedback in the UI but do not submit records to a persistent database.
- Search Engine: The search dialog performs client-side fuzzy filtering over a bundled JSON index rather than querying a remote backend search API.
- Color Modes: The application is designed exclusively in a high-contrast light theme; dark mode is not implemented.
- Legal Pages: Privacy policy and terms pages contain standard sample terms that must be reviewed and customized by legal counsel prior to commercial use.

## 13. Pre-Launch Checklist

The following items are open release requirements that must be completed prior to production launch:

- [ ] Connect a custom domain and set NEXT_PUBLIC_SITE_URL in production hosting configuration.
- [ ] Confirm favicon files (icon.svg, favicon.ico, apple-icon.png) are visible in a deployed production browser tab.
- [ ] Remove any "Made with" or platform badge added by the hosting provider in project dashboard settings.
- [ ] Privacy policy and terms pages reviewed by legal counsel with valid operator name, contact email, and governing jurisdiction added.
- [ ] Set NEXT_PUBLIC_REPO_URL or confirm GitHub links are intentionally hidden in production.
- [ ] Run npm run verify and npm run verify:routes against the live production deployment URL.

## 14. Differences from the Reference Screenshots

The following deliberate refinements were made relative to the reference specifications:

- Single Logo Mark: Adopted a single, unified square indigo logo mark with white terminal chevron across all views instead of disparate logo icons.
- Unified Active Nav Underline: Implemented a consistent 2px bottom border indicator for active top-level navigation tabs.
- Unified Version Badge: Standardized the version indicator to `v1.0` using monospace font, surface background, and subtle border across all headers.
- Documentation Breadcrumb Root: Set "Documentation" as the consistent breadcrumb root across all articles and guides.
- Square Markers: Applied geometric square bullet markers on list items instead of circular dots to maintain the precision technical design aesthetic.
- Colon in Terminal Titles: Replaced the em dash in "Terminal: Quick Setup" with a standard colon to comply with the project-wide zero em dash constraint.
- Corrected Code Samples: Updated all code snippets to reflect accurate Next.js 16 App Router APIs, including asynchronous `params` Promise unwrapping.
- Real Next.js Content: Replaced fictional Orbit CLI references with genuine, accurate Next.js App Router technical documentation.
- Removed External Placeholders: Removed Discord, Changelog, and license links that pointed to unmanaged external endpoints.
