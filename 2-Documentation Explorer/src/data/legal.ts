import { siteConfig } from './site';

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  lastUpdated: string;
  displayDate: string;
  sections: LegalSection[];
}

const operatorName = siteConfig.legalName || 'the operator of this site';

export const privacyPolicyDocument: LegalDocument = {
  title: 'Privacy Policy',
  description:
    'Information on data handling, browser storage, and hosting practices for Orbit Docs.',
  lastUpdated: '2026-10-21',
  displayDate: 'October 21, 2026',
  sections: [
    {
      id: 'overview',
      heading: 'Overview and Data Collection',
      paragraphs: [
        `This documentation website is operated by ${operatorName}. Orbit Docs does not require user accounts, does not provide registration forms, and does not collect personal names, passwords, or profile information.`,
        'We do not set tracking cookies, session cookies, or advertising identifiers. No analytics trackers, behavioral measurement scripts, or advertising pixels are loaded by this site.',
      ],
    },
    {
      id: 'search-and-client-state',
      heading: 'Client-Side Search and Feedback',
      paragraphs: [
        'Search queries typed into the search box are evaluated entirely in your browser memory against static data bundled at build time. No search terms, keystrokes, or query strings are transmitted to any backend search server or third-party service.',
        'The feedback rating buttons on guide articles are client interface elements only. Submitting feedback toggles a local interface message and does not store, transmit, or record responses over the network.',
      ],
    },
    {
      id: 'assets-and-hosting',
      heading: 'Fonts and Server Logs',
      paragraphs: [
        'All typography and fonts (including Inter and JetBrains Mono) are downloaded and bundled at build time via next/font. Browsers loading this site do not make runtime network requests to Google Fonts or third-party font distribution networks.',
        'When you visit Orbit Docs, the hosting infrastructure provider automatically records standard web server access logs (including your IP address, browser user-agent string, requested path, and access timestamp) to maintain network security and deliver HTTP traffic under its operational policies.',
      ],
    },
    {
      id: 'external-links',
      heading: 'External Links and Children Privacy',
      paragraphs: [
        'Orbit Docs includes external links to third-party websites, including official documentation on nextjs.org and repositories on GitHub. Once you navigate away from this domain, your interactions are governed by the privacy statements of those respective third-party platforms.',
        'This site provides technical documentation for developers and is not directed at children under 13 years of age.',
      ],
    },
    {
      id: 'updates',
      heading: 'Policy Updates',
      paragraphs: [
        'Any updates to this Privacy Policy will be published directly on this page with an updated Last Updated date above.',
      ],
    },
    ...(siteConfig.contactEmail
      ? [
          {
            id: 'contact',
            heading: 'Contact',
            paragraphs: [
              `If you have questions about privacy practices on this site, contact ${operatorName} at [${siteConfig.contactEmail}](mailto:${siteConfig.contactEmail}).`,
            ],
          },
        ]
      : []),
  ],
};

export const termsAndConditionsDocument: LegalDocument = {
  title: 'Terms and Conditions',
  description:
    'Terms of use, intellectual property disclosures, and disclaimers for Orbit Docs.',
  lastUpdated: '2026-10-21',
  displayDate: 'October 21, 2026',
  sections: [
    {
      id: 'use-of-documentation',
      heading: 'Use of Documentation',
      paragraphs: [
        'Orbit Docs provides architectural references and technical summaries for the Next.js App Router for educational and informational purposes only.',
        'All technical content is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. Software frameworks change over time; always test code samples and verify production architecture requirements against official documentation at https://nextjs.org/docs before deployment.',
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable Use',
      paragraphs: [
        'You may browse, read, and reference this documentation for personal, educational, or internal commercial software development. You agree not to perform automated denial-of-service attempts or take actions intended to impair the availability of the website.',
      ],
    },
    {
      id: 'trademarks-and-ip',
      heading: 'Trademarks and Intellectual Property',
      paragraphs: [
        'Next.js is a trademark of Vercel, Inc. Orbit Docs is an independent educational reference and is not affiliated with, endorsed by, or sponsored by Vercel, Inc. or the Next.js core team.',
        'Code samples, configuration examples, and documentation prose created specifically for Orbit Docs are shared for reference purposes. Third-party package names, trademarks, and logos remain the property of their respective owners.',
      ],
    },
    {
      id: 'external-links',
      heading: 'Third-Party Links and Limitation of Liability',
      paragraphs: [
        'Orbit Docs contains links to external websites and resources. We do not endorse and assume no responsibility for the content, privacy practices, or accuracy of third-party platforms.',
        'To the maximum extent permitted by applicable law, the operators and contributors of Orbit Docs shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your access to, use of, or inability to use this documentation.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to Terms',
      paragraphs: [
        'We reserve the right to revise these Terms and Conditions at any time. Changes become effective immediately upon posting to this page with an updated Last Updated date.',
      ],
    },
    ...(siteConfig.contactEmail
      ? [
          {
            id: 'contact',
            heading: 'Contact',
            paragraphs: [
              `Inquiries regarding these terms should be sent to [${siteConfig.contactEmail}](mailto:${siteConfig.contactEmail}).`,
            ],
          },
        ]
      : []),
  ],
};
