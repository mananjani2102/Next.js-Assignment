'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, CodeXml, FileText } from 'lucide-react';
import { contextMeta, siteConfig } from '@/data/site';
import { iconMap } from '@/components/ui/icons';
import type { NavSectionView } from '@/types';

interface SidebarNavProps {
  docs: NavSectionView[];
  guides: NavSectionView[];
  className?: string;
  onNavigate?: () => void;
}

export function SidebarNav({
  docs,
  guides,
  className = '',
  onNavigate,
}: SidebarNavProps) {
  const pathname = usePathname();
  const isGuides = pathname.startsWith('/docs/guides');
  const sections = isGuides ? guides : docs;
  const currentContextMeta = isGuides ? contextMeta.guides : contextMeta.docs;

  return (
    <aside
      className={`sticky top-16 h-[calc(100dvh-4rem)] w-72 shrink-0 border-r border-line bg-surface overflow-y-auto flex flex-col ${className}`}
    >
      <nav aria-label="Documentation sidebar" className="flex-1 px-4 py-6">
        {/* Top block */}
        <div className="mb-4 px-3">
          {isGuides && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary font-semibold mb-1.5">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>GUIDES CONTEXT</span>
            </div>
          )}
          <h2 className="text-[18px] font-semibold text-ink tracking-tight">
            {currentContextMeta.title}
          </h2>
          <p className="font-mono text-[12px] text-muted mt-0.5">
            {currentContextMeta.subtitle}
          </p>
        </div>

        <hr className="border-line my-4 mx-3" />

        {/* Section Groups */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id}>
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted font-semibold px-3 mb-2">
                {section.title}
              </div>
              <ul className="space-y-1">
                {section.nodes.map((node) => {
                  const Icon = node.icon ? iconMap[node.icon] : null;
                  const isDirectActive = pathname === node.href;
                  const isChildActive = Boolean(
                    node.children?.some((child) => pathname === child.href)
                  );
                  const isHighlighted = isDirectActive || isChildActive;

                  return (
                    <li key={node.href}>
                      <Link
                        href={node.href}
                        onClick={onNavigate}
                        aria-current={isDirectActive ? 'page' : undefined}
                        className={`flex items-center gap-2.5 px-3 py-2 text-[15px] rounded-xs border-l-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          isHighlighted
                            ? 'bg-surface-active border-primary text-primary font-medium'
                            : 'border-transparent text-ink hover:bg-surface-active/60'
                        }`}
                      >
                        {Icon && (
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isHighlighted ? 'text-primary' : 'text-muted'
                            }`}
                            aria-hidden="true"
                          />
                        )}
                        <span className="truncate">{node.title}</span>
                      </Link>

                      {/* Guides context children list */}
                      {isGuides && node.children && node.children.length > 0 && (
                        <ul className="border-l border-line ml-5 pl-3 my-1.5 space-y-1">
                          {node.children.map((child) => {
                            const isChildCurrent = pathname === child.href;

                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onNavigate}
                                  aria-current={
                                    isChildCurrent ? 'page' : undefined
                                  }
                                  className={`block py-1 px-2 text-[13px] rounded-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                    isChildCurrent
                                      ? 'text-primary font-semibold bg-surface-active/50'
                                      : 'text-ink hover:text-primary'
                                  }`}
                                >
                                  {child.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer Block */}
      <div className="mt-auto border-t border-line p-4 space-y-1.5 bg-surface">
        {siteConfig.repoUrl && (
          <a
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <CodeXml className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>GitHub Repo</span>
          </a>
        )}
        <a
          href={siteConfig.apiReferenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>API Reference</span>
        </a>
      </div>
    </aside>
  );
}
