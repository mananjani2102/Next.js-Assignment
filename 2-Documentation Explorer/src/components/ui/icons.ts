import type { FC } from 'react';
import type { LucideProps } from 'lucide-react';
import {
  ArrowRightToLine,
  Download,
  Folder,
  GitFork,
  PanelsTopLeft,
  RefreshCw,
  Settings,
  SquareTerminal,
  Terminal,
  BookOpen,
  FileText,
  CodeXml,
  Info,
  TriangleAlert,
} from 'lucide-react';
import type { IconName } from '@/types';

export const iconMap: Record<IconName, FC<LucideProps>> = {
  'arrow-right-to-line': ArrowRightToLine,
  download: Download,
  folder: Folder,
  'git-fork': GitFork,
  'panels-top-left': PanelsTopLeft,
  'refresh-cw': RefreshCw,
  settings: Settings,
  'square-terminal': SquareTerminal,
  terminal: Terminal,
  'book-open': BookOpen,
  'file-text': FileText,
  'code-xml': CodeXml,
  info: Info,
  'triangle-alert': TriangleAlert,
};
