export interface SegmentMetaItem {
  label: string;
  description: string;
}

export const segmentMeta: Record<string, SegmentMetaItem> = {
  'getting-started': {
    label: 'Getting Started',
    description: 'Setup guides, prerequisites, and initial project configuration for Next.js.',
  },
  'core-concepts': {
    label: 'Core Concepts',
    description: 'Fundamental App Router architecture, nested layouts, routing patterns, and data loading.',
  },
  reference: {
    label: 'Reference',
    description: 'Technical specifications, configuration schemas, flags, and CLI commands.',
  },
  guides: {
    label: 'Guides',
    description: 'Step-by-step implementation tutorials and advanced application design patterns.',
  },
  nextjs: {
    label: 'Next.js',
    description: 'Architecture and ecosystem standards for the Next.js React framework.',
  },
  'app-router': {
    label: 'App Router',
    description: 'File-system based conventions, special files, and routing mechanics.',
  },
};
