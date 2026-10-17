import type { StudyYear } from "@/types";

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0]?.charAt(0) ?? "";
  if (parts.length === 1) return first.toUpperCase();
  const last = parts[parts.length - 1]?.charAt(0) ?? "";
  return (first + last).toUpperCase();
}

export function ordinalYear(year: StudyYear | number): string {
  switch (year) {
    case 1:
      return "1st Year";
    case 2:
      return "2nd Year";
    case 3:
      return "3rd Year";
    case 4:
      return "4th Year";
    default:
      return `${year}th Year`;
  }
}

export function classStanding(year: StudyYear | number): string {
  switch (year) {
    case 1:
      return "1st Year (Freshman)";
    case 2:
      return "2nd Year (Sophomore)";
    case 3:
      return "3rd Year (Junior)";
    case 4:
      return "4th Year (Senior)";
    default:
      return ordinalYear(year);
  }
}

export function academicStanding(year: StudyYear | number): string {
  return `${ordinalYear(year)} Undergraduate`;
}

export function shortYear(year: StudyYear | number): string {
  return `Year ${year}`;
}

export function formatCredits(credits: number): string {
  const formatted = credits.toFixed(1);
  return `${formatted} ${credits === 1 ? "Credit" : "Credits"}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  return formatter.format(date);
}

export function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
