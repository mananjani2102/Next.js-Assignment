import type { Student } from "@/types";

export const students: Student[] = [
  {
    id: "STU-1042",
    name: "Aarav Mehta",
    email: "aarav.mehta@campus.edu",
    departmentSlug: "computer-science",
    specializationSlug: "web-development",
    focusArea: "Full-Stack Architecture",
    year: 3,
    enrolledTerm: "Fall 2022",
    status: "active",
    about:
      "Aarav is an undergraduate researcher focusing on distributed systems and cloud architecture. When not coding in Rust or Go, he mentors first-year engineering students in algorithm fundamentals.",
    subjects: [
      {
        code: "CS-301",
        title: "Distributed Systems & Microservices",
        credits: 4.0,
      },
      {
        code: "CS-340",
        title: "Web Application Architecture",
        credits: 4.0,
      },
      {
        code: "CS-280",
        title: "Algorithms & Complexity",
        credits: 3.5,
      },
    ],
    recordId: "0948-CS-AM",
    lastValidated: "2024-10-24",
    avatar: {
      background: "#e2ede5",
      foreground: "#184e38",
    },
  },
  {
    id: "STU-1089",
    name: "Elena Rostova",
    email: "elena.rostova@campus.edu",
    departmentSlug: "design",
    specializationSlug: "interaction-design",
    focusArea: "Interaction Prototyping",
    year: 2,
    enrolledTerm: "Fall 2023",
    status: "active",
    about:
      "Elena studies interaction design with a focus on accessible interface patterns. She runs a weekly critique session for the design studio and is prototyping a wayfinding tool for the campus library.",
    subjects: [
      {
        code: "DES-210",
        title: "Interaction Design Studio",
        credits: 4.0,
      },
      {
        code: "DES-225",
        title: "Typography and Layout",
        credits: 3.0,
      },
      {
        code: "DES-240",
        title: "Human-Centered Research Methods",
        credits: 3.5,
      },
    ],
    recordId: "0951-DS-ER",
    lastValidated: "2024-10-22",
    avatar: {
      background: "#f6ebd6",
      foreground: "#78350f",
    },
  },
  {
    id: "STU-1120",
    name: "Marcus Chen",
    email: "marcus.chen@campus.edu",
    departmentSlug: "business",
    specializationSlug: "strategic-management",
    focusArea: "Operations Strategy",
    year: 4,
    enrolledTerm: "Fall 2021",
    status: "active",
    about:
      "Marcus is a senior completing a capstone on supply chain resilience for regional manufacturers. He has served as treasurer of the Business Society for two terms.",
    subjects: [
      {
        code: "BUS-410",
        title: "Strategic Management Capstone",
        credits: 4.0,
      },
      {
        code: "BUS-385",
        title: "Operations and Supply Chain",
        credits: 3.5,
      },
      {
        code: "BUS-362",
        title: "Managerial Accounting",
        credits: 3.0,
      },
    ],
    recordId: "0955-BU-MC",
    lastValidated: "2024-10-21",
    avatar: {
      background: "#fae7dc",
      foreground: "#7c2d12",
    },
  },
  {
    id: "STU-1155",
    name: "Priya Sharma",
    email: "priya.sharma@campus.edu",
    departmentSlug: "computer-science",
    specializationSlug: "web-development",
    focusArea: "Reactive UI Design",
    year: 1,
    enrolledTerm: "Fall 2024",
    status: "active",
    about:
      "Priya is a first-year student who started programming through the introductory web course. She is building a course schedule planner as her first independent project.",
    subjects: [
      {
        code: "CS-101",
        title: "Introduction to Programming",
        credits: 4.0,
      },
      {
        code: "CS-120",
        title: "Web Fundamentals",
        credits: 3.5,
      },
      {
        code: "MAT-110",
        title: "Discrete Mathematics",
        credits: 3.0,
      },
    ],
    recordId: "0962-CS-PS",
    lastValidated: "2024-10-23",
    avatar: {
      background: "#ece7dc",
      foreground: "#443928",
    },
  },
  {
    id: "STU-1201",
    name: "Lucas Dubois",
    email: "lucas.dubois@campus.edu",
    departmentSlug: "design",
    specializationSlug: "ux-research",
    focusArea: "Usability Testing",
    year: 3,
    enrolledTerm: "Fall 2022",
    status: "active",
    about:
      "Lucas runs usability studies on public transit interfaces and is completing a research placement with the campus accessibility office. He also teaches a lab section on paper prototyping.",
    subjects: [
      {
        code: "DES-320",
        title: "Usability Testing Methods",
        credits: 4.0,
      },
      {
        code: "DES-335",
        title: "Information Architecture",
        credits: 3.5,
      },
      {
        code: "DES-318",
        title: "Design Ethics and Policy",
        credits: 3.0,
      },
    ],
    recordId: "0970-DS-LD",
    lastValidated: "2024-10-22",
    avatar: {
      background: "#fbe6e3",
      foreground: "#7f1d1d",
    },
  },
  {
    id: "STU-1244",
    name: "Maya Lin",
    email: "maya.lin@campus.edu",
    departmentSlug: "business",
    specializationSlug: "financial-technology",
    focusArea: "Payments and Risk",
    year: 2,
    enrolledTerm: "Fall 2023",
    status: "active",
    about:
      "Maya studies financial technology with an interest in payment systems and consumer credit risk. She is a member of the investment club and tutors introductory statistics.",
    subjects: [
      {
        code: "BUS-230",
        title: "Financial Accounting",
        credits: 3.5,
      },
      {
        code: "BUS-245",
        title: "Introduction to Financial Technology",
        credits: 4.0,
      },
      {
        code: "STA-201",
        title: "Applied Statistics",
        credits: 3.0,
      },
    ],
    recordId: "0978-BU-ML",
    lastValidated: "2024-10-23",
    avatar: {
      background: "#eaece0",
      foreground: "#3f4722",
    },
  },
  {
    id: "STU-1310",
    name: "Tariq Al-Mansoor",
    email: "tariq.almansoor@campus.edu",
    departmentSlug: "computer-science",
    specializationSlug: "web-development",
    focusArea: "Distributed Web Systems",
    year: 4,
    enrolledTerm: "Fall 2021",
    status: "active",
    about:
      "Tariq is a senior writing an honours thesis on caching strategies for geographically distributed web applications. He contributes to the department's open source tooling group.",
    subjects: [
      {
        code: "CS-450",
        title: "Distributed Web Systems",
        credits: 4.0,
      },
      {
        code: "CS-462",
        title: "Computer Networks",
        credits: 4.0,
      },
      {
        code: "CS-490",
        title: "Senior Thesis",
        credits: 3.0,
      },
    ],
    recordId: "0985-CS-TA",
    lastValidated: "2024-10-24",
    avatar: {
      background: "#dfeedb",
      foreground: "#164e2d",
    },
  },
  {
    id: "STU-1388",
    name: "Sophia Müller",
    email: "sophia.muller@campus.edu",
    departmentSlug: "computer-science",
    specializationSlug: "web-development",
    focusArea: "Progressive Web Apps",
    year: 2,
    enrolledTerm: "Fall 2023",
    status: "active",
    about:
      "Sophia is a second-year student focusing on offline-first web applications and browser performance. She volunteers as a teaching assistant for the introductory programming lab.",
    subjects: [
      {
        code: "CS-210",
        title: "Data Structures",
        credits: 4.0,
      },
      {
        code: "CS-232",
        title: "Frontend Engineering",
        credits: 3.5,
      },
      {
        code: "CS-240",
        title: "Computer Organization",
        credits: 3.5,
      },
    ],
    recordId: "0992-CS-SM",
    lastValidated: "2024-10-21",
    avatar: {
      background: "#eae7df",
      foreground: "#262b27",
    },
  },
];
