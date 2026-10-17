export interface SiteConfig {
  name: string;
  shortDescription: string;
  description: string;
  url: string;
  organization: string;
  contactEmail: string;
  legalLastUpdated: string;
}

export const siteConfig: SiteConfig = {
  name: "Campus Directory",
  shortDescription: "Browse students, departments and specializations.",
  description:
    "A student directory with profiles, departments and specializations, built as a Next.js App Router practice project. All records are fictional sample data.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  organization: "Academic Informatics Core",
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@campus-directory.example",
  legalLastUpdated: "October 21, 2026",
};
