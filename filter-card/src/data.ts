export type Experience = "1-2 years" | "3-5 years" | "6-8 years" | "9+ years";

export type Target = "Freelancer" | "Agency";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: Experience;
  target: Target;
};

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend React Developer",
    company: "Pixel Labs",
    location: "London",
    experience: "3-5 years",
    target: "Agency",
  },
  {
    id: 2,
    title: "Senior React Engineer",
    company: "Northstar Digital",
    location: "London",
    experience: "6-8 years",
    target: "Agency",
  },
  {
    id: 3,
    title: "React Developer",
    company: "Freelance Studio",
    location: "Manchester",
    experience: "1-2 years",
    target: "Freelancer",
  },
  {
    id: 4,
    title: "UI Engineer",
    company: "Bright Pixel",
    location: "New York",
    experience: "3-5 years",
    target: "Agency",
  },
  {
    id: 5,
    title: "Frontend Specialist",
    company: "Independent",
    location: "Nairobi",
    experience: "6-8 years",
    target: "Freelancer",
  },
  {
    id: 6,
    title: "Lead Frontend Developer",
    company: "TechWorks",
    location: "Nairobi",
    experience: "9+ years",
    target: "Agency",
  },
  {
    id: 7,
    title: "React UI Developer",
    company: "Creative Code",
    location: "Berlin",
    experience: "1-2 years",
    target: "Freelancer",
  },
  {
    id: 8,
    title: "Senior UI Engineer",
    company: "Orbit Systems",
    location: "Berlin",
    experience: "9+ years",
    target: "Agency",
  },
];

export const experienceOptions: Experience[] = [
  "1-2 years",
  "3-5 years",
  "6-8 years",
  "9+ years",
];

export const targetOptions: Target[] = ["Freelancer", "Agency"];
