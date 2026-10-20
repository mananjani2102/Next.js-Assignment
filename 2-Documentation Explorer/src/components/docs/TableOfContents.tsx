'use client';

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { siteConfig } from '@/data/site';
import type { TocItem } from '@/types';

interface TableOfContentsProps {
  items: TocItem[];
  editUrl?: string;
}

export function TableOfContents({ items, editUrl }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [items]);

  const targetEditUrl =
    editUrl ??
    (siteConfig.repoUrl ? `${siteConfig.repoUrl}/tree/main/src/data/docs` : '');

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
    >
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted font-semibold mb-3 px-3">
        ON THIS PAGE
      </div>

      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`block px-3 py-1.5 text-[13px] rounded-xs border-l-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isActive
                    ? 'bg-surface-active border-primary text-primary font-medium'
                    : 'border-transparent text-muted hover:text-ink hover:bg-surface/60'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>

      {targetEditUrl && (
        <>
          <hr className="border-line my-4 mx-3" />
          <a
            href={targetEditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1 text-[13px] text-muted hover:text-primary transition-colors rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Pencil className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Edit this page on GitHub</span>
          </a>
        </>
      )}
    </nav>
  );
}
