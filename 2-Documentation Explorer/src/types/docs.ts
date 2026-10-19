export type DocContext = 'docs' | 'guides';

export type IconName =
  | 'arrow-right-to-line'
  | 'download'
  | 'folder'
  | 'git-fork'
  | 'panels-top-left'
  | 'refresh-cw'
  | 'settings'
  | 'square-terminal'
  | 'terminal'
  | 'book-open'
  | 'file-text'
  | 'code-xml'
  | 'info'
  | 'triangle-alert';

// Inline markup allowed in every string field named text, items or cells: `code`, **bold**, [label](/internal-or-https-href)
export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface HeadingBlock {
  type: 'heading';
  level: 2 | 3;
  id: string;
  text: string;
  step?: number;
}

export interface CalloutBlock {
  type: 'callout';
  variant: 'info' | 'warning';
  title: string;
  text: string;
}

export interface CodeBlockData {
  type: 'code';
  variant: 'file' | 'terminal';
  title: string;
  language: 'tsx' | 'ts' | 'js' | 'bash' | 'json' | 'text';
  code: string;
  icon?: 'marker' | 'folder' | 'code';
}

export type TableColumnStyle = 'text' | 'mono' | 'mono-muted' | 'mono-accent' | 'mono-chip';

export interface TableBlock {
  type: 'table';
  headers: string[];
  columnStyles: TableColumnStyle[];
  rows: string[][];
}

export interface ListBlock {
  type: 'list';
  ordered: boolean;
  items: string[];
}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | CalloutBlock
  | CodeBlockData
  | TableBlock
  | ListBlock;

export interface DocItem {
  slug: string[];
  title: string;
  navTitle?: string;
  description: string;
  context: DocContext;
  badge?: 'Guide';
  blocks: ContentBlock[];
}

export interface NavEntryDef {
  slug: string[];
  icon?: IconName;
  children?: { slug: string[] }[];
}

export interface DocSection {
  id: string;
  title: string;
  entries: NavEntryDef[];
}
