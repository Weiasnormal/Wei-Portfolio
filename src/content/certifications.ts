import type { Certification } from "./types";

// Add verifyUrl to any credential that has a public verification page.
export const certifications: Certification[] = [
  { title: "Introduction to Modern AI", issuer: "Cisco Networking Academy", date: "Nov 2025" },
  {
    title: "Planning a Machine Learning Project",
    issuer: "AWS Training and Certification",
    issuerShort: "AWS",
    date: "Aug 2025",
  },
  { title: "Developing Designs for UI and UX", issuer: "TESDA", date: "Apr 2025" },
  { title: "Project Management and Technical Design Explorer", issuer: "IBM SkillsBuild", date: "2025" },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "Oct 2024" },
  { title: "JavaScript Essentials 1", issuer: "Cisco Networking Academy", date: "Sep 2024" },
];
