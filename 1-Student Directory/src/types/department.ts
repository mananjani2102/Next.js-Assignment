export type BadgeTone = "primary" | "neutral";

export type DepartmentIconKey = "terminal" | "design" | "trend";

export interface Department {
  slug: string;
  name: string;
  code: string;
  description: string;
  icon: DepartmentIconKey;
  badgeTone: BadgeTone;
  head: string;
  building: string;
  totalEnrollment: number;
}

export interface Specialization {
  slug: string;
  departmentSlug: string;
  name: string;
  code: string;
  description: string;
  academicLead: string;
  coreLab: string;
  curriculumCycle: string;
}

export interface DirectoryMeta {
  curriculumYear: string;
}
