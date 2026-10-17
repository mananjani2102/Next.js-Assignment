import type { Department } from "@/types";

export const departments: Department[] = [
  {
    slug: "computer-science",
    name: "Computer Science",
    code: "CS",
    description:
      "Software engineering, artificial intelligence, algorithms, and systems infrastructure.",
    icon: "terminal",
    badgeTone: "primary",
    head: "Prof. Daniel Okafor",
    building: "Turing Hall",
    totalEnrollment: 320,
  },
  {
    slug: "design",
    name: "Design",
    code: "DES",
    description:
      "User experience research, visual communication, interaction design, and product prototyping.",
    icon: "design",
    badgeTone: "neutral",
    head: "Prof. Ingrid Larsen",
    building: "Hartley Studio Building",
    totalEnrollment: 185,
  },
  {
    slug: "business",
    name: "Business",
    code: "BUS",
    description:
      "Strategic management, financial technology, international entrepreneurship, and analytics.",
    icon: "trend",
    badgeTone: "neutral",
    head: "Prof. Naomi Fischer",
    building: "Whitmore Hall",
    totalEnrollment: 240,
  },
];
