import type { MetadataRoute } from 'next';
import { getStaticSlugParams, slugToHref } from '@/lib/docs';
import { siteConfig } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  // 18 Documentation pages & section indexes
  const docRoutes = getStaticSlugParams().map(({ slug }) => ({
    url: `${baseUrl}${slugToHref(slug)}`,
    lastModified: new Date('2026-10-21'),
    changeFrequency: 'weekly' as const,
    priority: slug.length === 0 ? 1.0 : 0.8,
  }));

  // 3 Site routes
  const siteRoutes = [
    '/about',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2026-10-21'),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...docRoutes, ...siteRoutes];
}
