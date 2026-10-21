import type { Metadata } from 'next';
import { privacyPolicyDocument } from '@/data/legal';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: privacyPolicyDocument.description,
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicyDocument} />;
}
