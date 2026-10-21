import { getNavSections, getSearchEntries } from '@/lib/docs';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { Footer } from '@/components/layout/Footer';

export default function DocsLayout({
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

      {/* Body Flex Row: Sidebar + Main Column */}
      <div className="flex-1 flex min-h-[calc(100dvh-4rem)]">
        <SidebarNav
          docs={docsNav}
          guides={guidesNav}
          className="hidden lg:flex"
        />

        <div className="flex-1 flex flex-col min-w-0">
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 focus:outline-none"
          >
            <div className="mx-auto w-full max-w-5xl px-6 lg:px-10 py-10">
              {children}
            </div>
          </main>

          <div className="mx-auto w-full max-w-5xl px-6 lg:px-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
