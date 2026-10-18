# Campus Directory

Campus Directory is an academic student directory frontend project demonstrating modern web development with the Next.js App Router, TypeScript, and Tailwind CSS. The application allows visitors to browse students, inspect academic departments, explore degree specializations, and review individual student profiles. All student records, department details, enrollment numbers, course listings, and email addresses displayed in the application are simulated fictional data stored in local repository files. No authentic student records or personal data are used.

## Tech Stack

The project relies on a minimal, modern web development stack:

- Next.js 16.4.2 (App Router with Turbopack, static exports, and server components)
- React 19.3.0 and React DOM 19.3.0
- TypeScript 5.9.3 (configured in strict mode with no implicit any)
- Tailwind CSS 4.3.3 (CSS theme tokens, utility classes, zero external UI kits)
- lucide-react 1.61.0 (vector UI icons)
- clsx 2.1.1 and tailwind-merge 3.7.0 (utility class orchestration)
- Typography: Inter (sans) and JetBrains Mono (monospaced identifiers and routes) loaded via next/font/google with zero runtime third-party requests

## Getting Started

### Prerequisites

- Node.js 20.9.0 or later
- npm 10.0.0 or later

### Installation and Scripts

1. Install project dependencies:
   npm install

2. Start the local development server:
   npm run dev

3. Create an optimized production build:
   npm run build

4. Run the production server locally:
   npm start

5. Execute static code analysis and linting:
   npm run lint

### Environment Variables

The project reads configuration values from environment variables. A template is provided in .env.example.

| Variable | Description | Default Value |
| :--- | :--- | :--- |
| NEXT_PUBLIC_SITE_URL | Base canonical URL used for metadata, OpenGraph, sitemap, and robots | http://localhost:3000 |
| NEXT_PUBLIC_CONTACT_EMAIL | Contact email address displayed on legal and policy pages | contact@campus-directory.example |
| SIMULATE_LATENCY_MS | Milliseconds of artificial latency to preview loading skeletons in development | 0 (disabled) |

## Route Map

| URL | File Path | Rendering Strategy | Data Source | Reference Screenshot |
| :--- | :--- | :--- | :--- | :--- |
| / | src/app/page.tsx | Redirect (307 to /students) | None | N/A |
| /students | src/app/students/page.tsx | Static (SSG) with client island | getStudents(), getDepartments() | 2_students_listing.png |
| /students/[studentId] | src/app/students/[studentId]/page.tsx | SSG (dynamicParams = false, 8 paths) | getStudentBySlug(), getDepartmentBySlug() | 1_student_profile.png |
| /departments | src/app/departments/page.tsx | Static (SSG) | getDepartments(), getSpecializationsByDepartment() | 3_department_listing.png |
| /departments/[departmentSlug] | src/app/departments/[departmentSlug]/page.tsx | SSG (dynamicParams = false, 3 paths) | getDepartmentBySlug(), getSpecializationsByDepartment() | Backlink from 4_nested_department_page.png |
| /departments/[departmentSlug]/[specializationSlug] | src/app/departments/[departmentSlug]/[specializationSlug]/page.tsx | SSG (dynamicParams = false, 10 paths) | getDepartmentBySlug(), getSpecialization(), getStudentsBySpecialization() | 4_nested_department_page.png |
| /about | src/app/about/page.tsx | Static | Static project prose | None (nav link) |
| /privacy-policy | src/app/(legal)/privacy-policy/page.tsx | Static | siteConfig | Footer link |
| /terms-and-conditions | src/app/(legal)/terms-and-conditions/page.tsx | Static | siteConfig | Footer link |
| /robots.txt | src/app/robots.ts | Static Route Handler | siteConfig.url | N/A |
| /sitemap.xml | src/app/sitemap.ts | Static Route Handler | Directory queries and routes | N/A |
| /* (Not Found) | src/app/not-found.tsx | Server Component | routes helper | 5_directory_fallback_not_found.png |

## Rendering Strategy

Campus Directory adopts a Server Components first architecture:

1. Server Components by default: All pages, layouts, cards, headers, and metadata generators execute on the server at build time.
2. Minimal Client Components: Client execution is restricted to 5 files that require browser-specific capabilities:
   - NavLinks: Uses usePathname() to mark active links with visual indicators.
   - FooterPath: Uses usePathname() to display the current URL path and live indicator.
   - StudentsExplorer: Manages state for real-time text search, department dropdown selection, and pagination.
   - error.tsx: Standard client error boundary required by Next.js App Router to capture client runtime exceptions.
   - global-error.tsx: Root-level fallback shell with interactive reset trigger.
3. Static Generation: Dynamic segments utilize generateStaticParams() combined with export const dynamicParams = false. Any requested path outside the pre-rendered parameters immediately returns the root 404 handler without server-side compute.
4. Asynchronous Data Layer: Data access helper functions in src/lib/directory.ts return Promises. While currently powered by local data arrays, this pattern permits replacing the backend with a remote database or REST API without modifying page signatures.
5. Skeletons and Latency Simulation: Each page route is paired with an independent loading.tsx file that mirrors the precise geometry of its layout. Developers can test loading states by setting SIMULATE_LATENCY_MS=1500 in .env.local.

## Routing Decisions

- Explicit Dynamic Segments: The application uses /departments/[departmentSlug] and /departments/[departmentSlug]/[specializationSlug] as distinct routes rather than a catch-all route ([...slug]). Each level features distinct data requirements, page headers, breadcrumbs, and metadata.
- Single Route Group: The (legal) route group groups privacy-policy and terms-and-conditions under a unified narrow layout without polluting the URL structure.
- Department and Specialization Validation: The specialization route verifies that the requested specialization belongs to the specified department. Visiting /departments/design/web-development correctly triggers notFound() because Web Development belongs exclusively to Computer Science.
- Central Route Helper: All internal URLs are constructed via typed helper functions in src/lib/routes.ts, eliminating hardcoded string links across the UI.
- Lowercase Identifier Policy: Student IDs (for example STU-1042) are lowercased in route paths (/students/stu-1042) and parsed case-insensitively.

## Folder Structure

```
src/
├── app/
│   ├── (legal)/
│   │   ├── layout.tsx                # Narrow container wrapper for legal pages
│   │   ├── privacy-policy/
│   │   │   └── page.tsx              # /privacy-policy static page
│   │   └── terms-and-conditions/
│   │       └── page.tsx              # /terms-and-conditions static page
│   ├── about/
│   │   └── page.tsx                  # /about static informational page
│   ├── departments/
│   │   ├── [departmentSlug]/
│   │   │   ├── [specializationSlug]/
│   │   │   │   ├── loading.tsx       # Specialization loading skeleton
│   │   │   │   └── page.tsx          # /departments/:dept/:spec detail page
│   │   │   ├── loading.tsx           # Department loading skeleton
│   │   │   └── page.tsx              # /departments/:dept detail page
│   │   ├── loading.tsx               # Departments listing skeleton
│   │   └── page.tsx                  # /departments listing page
│   ├── students/
│   │   ├── [studentId]/
│   │   │   ├── loading.tsx           # Profile loading skeleton
│   │   │   └── page.tsx              # /students/:id profile page
│   │   ├── loading.tsx               # Students listing skeleton
│   │   └── page.tsx                  # /students listing page
│   ├── apple-icon.tsx                # Dynamic Apple touch icon generator
│   ├── error.tsx                     # Client error boundary
│   ├── global-error.tsx              # Root HTML client error boundary
│   ├── globals.css                   # Tailwind theme tokens and base styles
│   ├── icon.svg                      # SVG favicon
│   ├── layout.tsx                    # Root HTML layout with Navbar and Footer
│   ├── not-found.tsx                 # Root 404 status panel
│   ├── page.tsx                      # Root route redirecting to /students
│   ├── robots.ts                     # Search engine crawler instructions
│   └── sitemap.ts                    # Dynamic XML sitemap generator
├── components/
│   ├── departments/
│   │   ├── DepartmentCard.tsx        # Department list item card
│   │   └── SpecializationCard.tsx    # Specialization list item card
│   ├── layout/
│   │   ├── Footer.tsx                # Global footer
│   │   ├── FooterPath.tsx            # Active pathname indicator
│   │   ├── Navbar.tsx                # Sticky top header
│   │   ├── NavLinks.tsx              # Navigation links with active indicator
│   │   ├── PageContainer.tsx         # Responsive container (wide, medium, narrow)
│   │   └── PageHeader.tsx            # Standard page header with optional aside
│   ├── legal/
│   │   ├── LegalPage.tsx             # Standard legal document template
│   │   └── LegalSection.tsx          # Section wrapper with legal prose styles
│   ├── skeletons/
│   │   ├── DetailHeaderSkeleton.tsx  # Department detail header skeleton
│   │   ├── EntityRowSkeleton.tsx     # Department row skeleton
│   │   ├── PageHeaderSkeleton.tsx    # Page header skeleton
│   │   ├── ProfileSkeleton.tsx       # Student profile skeleton
│   │   ├── StudentCardSkeleton.tsx   # Student card skeleton (directory and compact)
│   │   └── StudentGridSkeleton.tsx   # Student card grid skeleton
│   ├── students/
│   │   ├── StudentCard.tsx           # Student card (directory and specialization)
│   │   ├── StudentDetailRows.tsx     # Academic detail attribute table
│   │   ├── StudentsExplorer.tsx      # Client search, filter, and pagination island
│   │   └── SubjectList.tsx           # Enrolled course code pills
│   └── ui/
│       ├── ArrowLink.tsx             # Text link with forward or back arrow
│       ├── Avatar.tsx                # Initials tile avatar
│       ├── Badge.tsx                 # Semantic status and department badges
│       ├── Breadcrumbs.tsx           # Breadcrumb navigation bar
│       ├── Button.tsx                # Primary and secondary button links
│       ├── Card.tsx                  # Standard surface card and divider
│       ├── DetailHeaderCard.tsx      # Entity detail header card
│       ├── EmptyState.tsx            # Empty results presentation
│       ├── EntityRow.tsx             # Generic entity row layout
│       ├── MetaGrid.tsx              # 2-column or 4-column attribute grid
│       ├── SectionHeading.tsx        # Heading with count badge and slot
│       ├── Skeleton.tsx              # Base pulse animation rectangle
│       └── StatusPanel.tsx           # Shared 404 and error status view
├── config/
│   └── site.ts                       # Global application metadata and constants
├── data/
│   ├── departments.ts                # Sample department records
│   ├── directory-meta.ts             # Academic term and curriculum constants
│   ├── specializations.ts            # Sample specialization records
│   └── students.ts                   # Sample student records
├── lib/
│   ├── cn.ts                         # Tailwind class merger
│   ├── directory.ts                  # Async data access layer
│   ├── format.ts                     # Academic formatting helpers
│   └── routes.ts                     # Central typed URL definitions
└── types/
    ├── department.ts                 # Department and Specialization types
    ├── index.ts                      # Common type re-exports
    └── student.ts                    # Student, Subject, and Avatar types
```

## Component Architecture

Components are organized into clear layers to guarantee reusability and avoid duplicate styles:

1. UI Primitives (src/components/ui/): Independent atoms such as Badge, Avatar, Button, Card, ArrowLink, and Breadcrumbs.
2. Layout Components (src/components/layout/): Structural elements including Navbar, NavLinks, Footer, PageContainer, and PageHeader.
3. Domain Components (src/components/students/ and src/components/departments/): Business components composing primitives, including StudentCard, DepartmentCard, SpecializationCard, and StudentsExplorer.
4. Skeletons (src/components/skeletons/): Pure presentational skeletons replicating the exact dimensions and spacing of real components.

### Component Variant Reference

| Component | Variant | Purpose |
| :--- | :--- | :--- |
| Button | primary | Solid blue action button used on primary call-to-actions and 404 return |
| Button | secondary | White surface button with border for secondary navigation and pagination |
| Badge | default | General informational tag |
| Badge | chip | Tag with chip background styling |
| Badge | filter | Selected filter pill indicator |
| Badge | id / id-mono | Student ID pill with monospaced typeface |
| Badge | outline | Subtle bordered badge for years and terms |
| Badge | success | Green status badge for active student enrollment |
| Badge | department-primary | Colored department indicator for Computer Science |
| Badge | department-neutral | Neutral department indicator for Design and Business |
| StudentCard | directory | Grid view card with avatar, ID, department badge, year, and divider |
| StudentCard | specialization | Compact card for department sub-pages with focus area |
| PageContainer | wide | 1052px content width (1100px with 24px padding) for listings and details |
| PageContainer | medium | 836px content width (884px with 24px padding) for departments directory |
| PageContainer | narrow | 720px content width (768px with 24px padding) for profiles, about, legal |

## Data and Types

All records are defined with strict TypeScript interfaces in src/types/.

- Student: id, name, email, departmentSlug, specializationSlug, year, status, enrolledTerm, about, focusArea, recordId, lastValidated, avatar, subjects.
- Department: slug, code, name, head, building, totalEnrollment, description, badgeTone, iconName.
- Specialization: slug, departmentSlug, code, name, description, requiredCredits, coordinator.

### Integrity Rules for New Records

1. Student IDs must follow the format stu-XXXX with unique numerical codes.
2. Every student must reference a valid departmentSlug and a valid specializationSlug matching that department.
3. Slugs must contain only lowercase alphanumeric characters and hyphens.
4. Total department enrollment reflects simulated school-wide figures.

## Design System

The application implements a custom design system defined in src/app/globals.css:

### Color Tokens

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| canvas | #faf8ff | Application body background |
| surface | #ffffff | Cards, navbar, modal sheets, elevated containers |
| line | #c3c6d7 | Standard 1px container and table divider borders |
| line-soft | #e5e6ee | Subtle separators and pulse skeleton fills |
| ink | #131b2e | High-contrast headings and prominent text |
| body | #434655 | Standard readable prose and descriptions |
| muted | #515f74 | Secondary labels, captions, and breadcrumbs |
| subtle | #6f7282 | Metadata icons, routes, timestamps (adjusted for WCAG 4.5:1 on canvas) |
| primary | #004ac6 | Brand accent, active navigation line, interactive links |
| primary-hover | #003ea8 | Hover state for primary links and brand elements |
| action | #2563eb | Primary button background |
| action-hover | #1d4ed8 | Primary button hover background |
| chip | #eaedff | Department badge background |
| chip-soft | #f2f3ff | Light badge background |
| success-bg | #f0fdf4 | Active status pill background |
| success-line | #bbf7d0 | Active status pill border |
| success-fg | #166534 | Active status pill foreground text |
| live | #10b981 | Pulse indicator dot on footer path |

### Type Scale

| Style | Font Size | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| text-h1 | 28px (1.75rem) | 34px (2.125rem) | 600 (semibold) | -0.02em (tight) |
| text-title | 17px (1.0625rem) | 24px (1.5rem) | 600 (semibold) | normal |
| text-card | 16px (1rem) | 24px (1.5rem) | 600 (semibold) | normal |
| text-body | 14px (0.875rem) | 22px (1.375rem) | 400 (regular) | normal |
| text-small | 13px (0.8125rem) | 20px (1.25rem) | 400 / 500 | normal |
| text-badge | 12px (0.75rem) | 16px (1rem) | 600 (semibold) | normal |
| text-label | 11px (0.6875rem) | 16px (1rem) | 600 (semibold) | 0.06em (uppercase) |

### Border Radii

- Cards, inputs, buttons, and status panels: 4px (--radius-card)
- Badges and chips: 2px (--radius-chip)
- Initials avatars and icon containers: 8px (--radius-tile)
- Status dots (active status and footer indicator): 50% (circle)

### Content Widths

- Wide Container: 1052px inner width (1100px with 24px padding)
- Medium Container: 836px inner width (884px with 24px padding)
- Narrow Container: 720px inner width (768px with 24px padding)

### Anti Vibe-Code Constraints

- No purple gradients or gradient text
- No pill-shaped buttons
- No rounded-xl, 2xl, or 3xl radii
- No emojis anywhere in user interface or copy
- No em dashes (U+2014) in source files
- No stock photography or placeholder raster images
- No scroll animations, parallax, or non-functional visual noise

## Error, Loading, and Not-Found Handling

- Root Not Found: src/app/not-found.tsx catches all unmatched URLs and explicit notFound() invocations. It displays the StatusPanel component along with verified starting point routes.
- Client Error Boundary: src/app/error.tsx catches page-level runtime errors, reports them to console.error, displays the Next.js error digest reference, and offers a Try Again action.
- Global Error Boundary: src/app/global-error.tsx provides a complete standalone HTML document fallback for critical errors occurring in the root layout.
- Loading Skeletons: Every page features an equivalent loading.tsx file wrapped in role="status" with a visually hidden announcement for assistive technology.

## SEO and Metadata

- Dynamic Titles: Configured via template %s | Campus Directory in src/app/layout.tsx.
- Canonical URLs: Dynamic routes generate canonical tags matching their official path.
- Robots: src/app/robots.ts permits all search engine indexing while pointing to the production sitemap.
- XML Sitemap: src/app/sitemap.ts indexes all static pages, department profiles, specialization pages, and student profiles (excluding the root redirect).
- Favicons: High-resolution SVG favicon (src/app/icon.svg) and Apple Touch Icon (src/app/apple-icon.tsx).

## Accessibility Notes

- Semantic Landmarks: All pages are structured with header, nav, main, article, section, and footer elements.
- Heading Hierarchy: Strictly one h1 element per page, followed by logical h2 and h3 subheadings.
- Stretched Card Links: Card components employ stretched anchor overlays (ArrowLink stretched) allowing the entire card area to be activated by touch or keyboard Enter while preserving accessibility tree semantics.
- Accessible Form Controls: Inputs and select dropdowns have explicit programmatic label associations.
- Live Region Announcements: StudentsExplorer incorporates an aria-live="polite" screen reader region announcing search count updates.
- Focus Indicators: Interactive elements provide a high-contrast 2px visible focus ring with 2px offset.
- Contrast Compliance: All text meets or exceeds WCAG AA 4.5:1 contrast requirements against surface and canvas backgrounds.
- Reduced Motion: Loading skeleton pulses respect motion-reduce:animate-none.

## Intentional Differences from Mockups

1. Department Headcounts: Department total enrollment counts reflect institution-wide sample figures (for example 840 students for Computer Science), while the sample directory contains 8 detailed student profiles.
2. Empty Specializations: Seven specializations do not have sample student records assigned and render a designated accessible empty state.
3. Unified Navbar: The navigation bar maintains consistent logo sizing and badge alignment across all pages.
4. Client-Side Pagination: Filtering and pagination run entirely client-side without URL query params to preserve static pre-rendering.
5. Real 404 Routes: The suggestions card on the not-found page lists active application routes instead of fictitious paths.

## Launch Checklist

- [ ] Custom domain connected and NEXT_PUBLIC_SITE_URL set to it (OWNER ACTION)
- [x] Favicon shows in the browser tab and apple-icon is in the head (verified)
- [x] No "Made with AI" or builder badge in the HTML, footer, meta tags or response headers of the production build (verified)
- [x] /privacy-policy and /terms-and-conditions live, linked in the footer, and the text matches actual behaviour (verified)
- [ ] NEXT_PUBLIC_CONTACT_EMAIL set to a real mailbox (OWNER ACTION)
- [ ] Legal text reviewed by the owner or a lawyer (OWNER ACTION)
- [x] robots.txt and sitemap.xml use the production domain (verified)
- [x] No fake reviews, metrics, counters, stock or AI photos, cursor effects or scroll animations (verified)
- [x] .env files git-ignored; .env.example committed (verified)

## Licences and Credits

- Application source code is released under the MIT Licence.
- UI Icons: Lucide icons from lucide-react, distributed under the ISC Licence.
- Fonts: Inter and JetBrains Mono, distributed under the SIL Open Font License (OFL).
