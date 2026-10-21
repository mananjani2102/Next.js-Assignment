import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Orbit Docs: a technical reference for building applications with the Next.js App Router.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <article className="w-full">
      <header className="mb-8">
        <h1 className="text-[40px] font-bold tracking-tight text-ink leading-tight mb-3">
          About Orbit Docs
        </h1>

        <p className="text-[18px] text-muted max-w-2xl leading-relaxed">
          Orbit Docs is an independent reference architecture and documentation
          explorer for the Next.js App Router.
        </p>

        <hr className="border-line my-8" />
      </header>

      <div className="space-y-10 text-[17px] leading-[1.7] text-body">
        <section>
          <h2 className="text-[24px] font-semibold text-ink tracking-tight mb-3">
            What is Orbit Docs?
          </h2>
          <p className="mb-4">
            Orbit Docs documents the conventions, routing mechanisms, and data
            loading paradigms introduced in the Next.js App Router. It covers
            file-based segments, async Server Components, streaming with
            Suspense, and production build configurations.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-semibold text-ink tracking-tight mb-3">
            Content Organization
          </h2>
          <p className="mb-4">
            Documentation content is structured into two primary contexts:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 mb-4">
            <li>
              <strong className="font-semibold text-ink">Core Documentation:</strong>{' '}
              Comprehensive references covering Getting Started, Core Concepts,
              and CLI specifications.
            </li>
            <li>
              <strong className="font-semibold text-ink">Guides:</strong> Step-by-step
              tutorials covering advanced routing patterns like dynamic parameters,
              catch-all routes, and route groups.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-semibold text-ink tracking-tight mb-3">
            How It Is Built
          </h2>
          <p className="mb-4">
            Orbit Docs is built with Next.js 16 (App Router), TypeScript with strict
            type verification, and Tailwind CSS v4 using CSS-first tokens. All
            documentation pages are statically pre-rendered at build time (SSG),
            and search queries execute entirely within browser memory without
            external API requests.
          </p>
          {siteConfig.repoUrl && (
            <p className="mb-4">
              The project source code is available in the public repository:{' '}
              <a
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                GitHub Repository
              </a>
              .
            </p>
          )}
        </section>

        <section>
          <h2 className="text-[24px] font-semibold text-ink tracking-tight mb-3">
            Policies and Terms
          </h2>
          <p className="mb-4">
            Review our operational disclosures and site terms:
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors font-medium rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors font-medium rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              Terms and Conditions
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
