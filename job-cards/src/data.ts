import {
  Brush,
  Code2,
  GraduationCap,
  Settings,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

export type Department = {
  name: string;
  positions: number;
  icon: React.ElementType;
  iconClass: string;
  jobs: string[];
};

export const departments: Department[] = [
  {
    name: "Design",
    positions: 4,
    icon: Brush,
    iconClass: "department-icon-design",
    jobs: [
      "Product Designer",
      "UX Designer",
      "UI Designer",
      "Senior Product Designer",
    ],
  },
  {
    name: "Engineering",
    positions: 8,
    icon: Code2,
    iconClass: "department-icon-engineering",
    jobs: [
      "Frontend Engineer",
      "Backend Engineer",
      "Full Stack Engineer",
      "Senior Software Engineer",
      "DevOps Engineer",
      "QA Engineer",
      "Mobile Engineer",
      "Engineering Manager",
    ],
  },
  {
    name: "Operations",
    positions: 2,
    icon: Settings,
    iconClass: "department-icon-operations",
    jobs: ["Operations Manager", "Operations Coordinator"],
  },
  {
    name: "People",
    positions: 6,
    icon: Users,
    iconClass: "department-icon-people",
    jobs: [
      "People Partner",
      "Talent Acquisition Specialist",
      "People Operations Manager",
      "HR Coordinator",
      "Recruiter",
      "Learning & Development Specialist",
    ],
  },
  {
    name: "Sales",
    positions: 7,
    icon: BriefcaseBusiness,
    iconClass: "department-icon-sales",
    jobs: [
      "Account Executive",
      "Sales Development Representative",
      "Sales Manager",
      "Enterprise Account Executive",
      "Sales Operations Specialist",
      "Customer Growth Manager",
      "Sales Enablement Specialist",
    ],
  },
  {
    name: "University",
    positions: 8,
    icon: GraduationCap,
    iconClass: "department-icon-university",
    jobs: [
      "University Program Coordinator",
      "Graduate Software Engineer",
      "University Recruiter",
      "Graduate Product Designer",
      "Research Assistant",
      "Campus Ambassador",
      "Graduate Sales Associate",
      "Internship Coordinator",
    ],
  },
];
