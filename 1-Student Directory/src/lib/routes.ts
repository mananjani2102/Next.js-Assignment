export const routes = {
  home: () => "/",
  students: () => "/students",
  student: (id: string) => `/students/${id.toLowerCase()}`,
  departments: () => "/departments",
  department: (slug: string) => `/departments/${slug}`,
  specialization: (departmentSlug: string, specializationSlug: string) =>
    `/departments/${departmentSlug}/${specializationSlug}`,
  about: () => "/about",
  privacy: () => "/privacy-policy",
  terms: () => "/terms-and-conditions",
} as const;
