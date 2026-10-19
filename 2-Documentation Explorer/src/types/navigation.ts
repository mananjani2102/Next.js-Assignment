import type { DocItem, IconName } from './docs';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavNode {
  title: string;
  href: string;
  icon?: IconName;
  children?: NavNode[];
}

export interface NavSectionView {
  id: string;
  title: string;
  nodes: NavNode[];
}

export interface PaginationLink {
  title: string;
  href: string;
}

export interface TocItem {
  id: string;
  text: string;
}

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  group: string;
}

export interface IndexChild {
  title: string;
  description: string;
  href: string;
  kind: 'page' | 'index';
}

export type ResolvedDoc =
  | { kind: 'home' }
  | { kind: 'page'; item: DocItem }
  | { kind: 'index'; slug: string[]; label: string; description: string; children: IndexChild[] };
