import type { SearchEntry } from '@/types';

/**
 * Searches and scores search entries based on query:
 * 1. Title starts with query (score 3)
 * 2. Title contains query (score 2)
 * 3. Description contains query (score 1)
 */
export function scoreSearchEntries(
  entries: SearchEntry[],
  query: string,
  limit = 6
): SearchEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed === '') {
    return [];
  }

  return entries
    .map((entry) => {
      const titleLower = entry.title.toLowerCase();
      const descLower = entry.description.toLowerCase();
      let score = 0;

      if (titleLower.startsWith(trimmed)) {
        score = 3;
      } else if (titleLower.includes(trimmed)) {
        score = 2;
      } else if (descLower.includes(trimmed)) {
        score = 1;
      }

      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.entry);
}
