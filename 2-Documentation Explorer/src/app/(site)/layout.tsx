import { getNavSections, getSearchEntries } from '@/lib/docs';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchEntries = getSearchEntries();
  const docsNav = getNavSections('docs');
  const guidesNav = getNavSections('guides');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:font-medium focus:rounded-xs focus:shadow-md focus:outline-none"
      >
        Skip to content
      </a>

      {/* Shared Header */}
      <Header
        searchEntries={searchEntries}
        docs={docsNav}
        guides={guidesNav}
      />

      {/* Main Column: max-w-3xl container, No sidebar */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <div className="mx-auto w-full max-w-3xl px-6 py-12">
          {children}
        </div>
      </main>

      <div className="mx-auto w-full max-w-3xl px-6">
        <Footer />
      </div>
    </div>
  );
}
