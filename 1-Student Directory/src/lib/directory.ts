import { departments } from "@/data/departments";
import { directoryMeta } from "@/data/directory-meta";
import { specializations } from "@/data/specializations";
import { students } from "@/data/students";
import type {
  Department,
  DirectoryMeta,
  Specialization,
  Student,
} from "@/types";

async function simulateLatency(): Promise<void> {
  const raw = process.env.SIMULATE_LATENCY_MS;
  if (!raw) return;
  const ms = Number(raw);
  if (!Number.isNaN(ms) && ms > 0) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export async function getStudents(): Promise<Student[]> {
  await simulateLatency();
  return students;
}

export async function getStudentBySlug(
  slug: string
): Promise<Student | undefined> {
  await simulateLatency();
  const normalized = slug.toLowerCase();
  return students.find((s) => s.id.toLowerCase() === normalized);
}

export async function getDepartments(): Promise<Department[]> {
  await simulateLatency();
  return departments;
}

export async function getDepartmentBySlug(
  slug: string
): Promise<Department | undefined> {
  await simulateLatency();
  const normalized = slug.toLowerCase();
  return departments.find((d) => d.slug.toLowerCase() === normalized);
}

export async function getSpecializationsByDepartment(
  departmentSlug: string
): Promise<Specialization[]> {
  await simulateLatency();
  const normalized = departmentSlug.toLowerCase();
  return specializations.filter((s) => s.departmentSlug.toLowerCase() === normalized);
}

export async function getSpecialization(
  departmentSlug: string,
  specializationSlug: string
): Promise<Specialization | undefined> {
  await simulateLatency();
  const normDept = departmentSlug.toLowerCase();
  const normSpec = specializationSlug.toLowerCase();
  return specializations.find(
    (s) =>
      s.departmentSlug.toLowerCase() === normDept &&
      s.slug.toLowerCase() === normSpec
  );
}

export async function getStudentsByDepartment(slug: string): Promise<Student[]> {
  await simulateLatency();
  const normalized = slug.toLowerCase();
  return students.filter((s) => s.departmentSlug.toLowerCase() === normalized);
}

export async function getStudentsBySpecialization(
  departmentSlug: string,
  specializationSlug: string
): Promise<Student[]> {
  await simulateLatency();
  const normDept = departmentSlug.toLowerCase();
  const normSpec = specializationSlug.toLowerCase();
  return students.filter(
    (s) =>
      s.departmentSlug.toLowerCase() === normDept &&
      s.specializationSlug.toLowerCase() === normSpec
  );
}

export async function getDirectoryMeta(): Promise<DirectoryMeta> {
  await simulateLatency();
  return directoryMeta;
}

export async function getStudentParams(): Promise<{ studentId: string }[]> {
  await simulateLatency();
  return students.map((s) => ({ studentId: s.id.toLowerCase() }));
}

export async function getDepartmentParams(): Promise<{ departmentSlug: string }[]> {
  await simulateLatency();
  return departments.map((d) => ({ departmentSlug: d.slug }));
}

export async function getSpecializationParams(): Promise<
  { departmentSlug: string; specializationSlug: string }[]
> {
  await simulateLatency();
  return specializations.map((s) => ({
    departmentSlug: s.departmentSlug,
    specializationSlug: s.slug,
  }));
}
