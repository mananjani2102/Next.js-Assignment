import type { Metadata } from 'next';
import { termsAndConditionsDocument } from '@/data/legal';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: termsAndConditionsDocument.description,
  alternates: {
    canonical: '/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return <LegalPage document={termsAndConditionsDocument} />;
}
