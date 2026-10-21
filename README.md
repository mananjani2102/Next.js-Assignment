# Next.js App Router Projects

This repository contains two production-grade Next.js (App Router) projects built with TypeScript and Tailwind CSS, demonstrating modern routing architecture, rendering strategies, component design, and accessibility.

## Repository Overview

```text
.
├── 1-Student Directory/        # Project 1: Academic Student Directory
└── 2-Documentation Explorer/   # Project 2: Next.js App Router Documentation Explorer
```

---

## Projects Summary

### Project 1: Campus Directory (`1-Student Directory`)

An academic directory application demonstrating nested dynamic routing, data modeling, search filtering, and loading fallbacks in the Next.js App Router.

- **Key Routes**:
  - `/students`: Directory listing with real-time department and query filters.
  - `/students/[studentId]`: Dynamic student profile with academic status, course enrollments, and advisor information.
  - `/departments`: Department overview listing degree programs and faculty counts.
  - `/departments/[departmentSlug]`: Department detail page with specialization breakdown.
  - `/departments/[departmentSlug]/[specializationSlug]`: Deeply nested route displaying specialization curriculum and student cohorts.
  - `/about`, `/privacy-policy`, `/terms-and-conditions`: Static site and policy pages.
- **Tech Stack**: Next.js 16.4.2, React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3, Lucide Icons.
- **Rendering Strategy**: 100% Static (SSG) with `generateStaticParams()` and `export const dynamicParams = false`.
- **Documentation**: See [`1-Student Directory/README.md`](./1-Student%20Directory/README.md) for complete details.

### Project 2: Orbit Docs (`2-Documentation Explorer`)

A developer documentation explorer documenting the Next.js App Router architecture itself, demonstrating optional catch-all routing, server syntax highlighting, command-palette search, and strict design guardrails.

- **Key Routes**:
  - `/docs`: Documentation home screen with section cards and quick-start guides.
  - `/docs/[[...slug]]`: Unified optional catch-all route serving the home page, 8 technical articles, 3 multi-step guides, and 6 auto-generated section index pages (18 static slugs total).
  - `/docs/routing/catch-all-param`: Custom 404 error and diagnostic screen featuring route lookup, suggested articles, and terminal-style error logs.
  - `/about`, `/privacy-policy`, `/terms-and-conditions`: Standalone informational pages with centered reading layout.
- **Tech Stack**: Next.js 16.4.2, React 19.3.0, TypeScript 5.x, Tailwind CSS 4.3.3, Shiki 4.5.0, Lucide Icons.
- **Rendering Strategy**: 100% Static (SSG) with automated route crawling and 144 verification checks passing.
- **Documentation**: See [`2-Documentation Explorer/README.md`](./2-Documentation%20Explorer/README.md) for complete architectural specifications.

---

## Getting Started

### Project 1: Student Directory

```bash
cd "1-Student Directory"
npm install
npm run dev
# Accessible at http://localhost:3000
```

### Project 2: Documentation Explorer

```bash
cd "2-Documentation Explorer"
npm install
npm run dev
# Accessible at http://localhost:3000
```
