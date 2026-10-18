import type { MetadataRoute } from "next";
import {
  getDepartments,
  getSpecializationsByDepartment,
  getStudents,
} from "@/lib/directory";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [students, departments] = await Promise.all([
    getStudents(),
    getDepartments(),
  ]);

  // Static core routes (excluding "/" because it redirects to "/students")
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}${routes.students()}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}${routes.departments()}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}${routes.about()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}${routes.privacy()}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}${routes.terms()}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic department routes
  const departmentRoutes: MetadataRoute.Sitemap = departments.map((dept) => ({
    url: `${siteConfig.url}${routes.department(dept.slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic specialization routes
  const specializationRoutes: MetadataRoute.Sitemap = [];
  for (const dept of departments) {
    const specs = await getSpecializationsByDepartment(dept.slug);
    for (const spec of specs) {
      specializationRoutes.push({
        url: `${siteConfig.url}${routes.specialization(dept.slug, spec.slug)}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Dynamic student profile routes
  const studentRoutes: MetadataRoute.Sitemap = students.map((student) => ({
    url: `${siteConfig.url}${routes.student(student.id)}`,
    lastModified: new Date(student.lastValidated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...departmentRoutes,
    ...specializationRoutes,
    ...studentRoutes,
  ];
}
