import type { DocItem } from '@/types';
import { gettingStartedDocs } from './getting-started';
import { coreConceptsDocs } from './core-concepts';
import { referenceDocs } from './reference';
import { guidesDocs } from './guides';

export const allDocs: DocItem[] = [
  ...gettingStartedDocs,
  ...coreConceptsDocs,
  ...referenceDocs,
  ...guidesDocs,
];

export { gettingStartedDocs, coreConceptsDocs, referenceDocs, guidesDocs };
