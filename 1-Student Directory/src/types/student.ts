export type StudyYear = 1 | 2 | 3 | 4;

export type StudentStatus = "active" | "on-leave" | "alumni";

export interface AvatarColors {
  background: string;
  foreground: string;
}

export interface EnrolledSubject {
  code: string;
  title: string;
  credits: number;
}

export interface Student {
  id: string; // "STU-1042"; the URL slug is id.toLowerCase()
  name: string;
  email: string;
  departmentSlug: string;
  specializationSlug: string;
  focusArea: string; // shown on the specialization student card
  year: StudyYear;
  enrolledTerm: string; // "Fall 2022"
  status: StudentStatus;
  about: string;
  subjects: EnrolledSubject[];
  recordId: string; // "0948-CS-AM"
  lastValidated: string; // ISO date "2024-10-24"
  avatar: AvatarColors;
}
