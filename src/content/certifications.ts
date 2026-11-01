import type { Certification } from "./types";

const credly = (id: string) => `https://www.credly.com/badges/${id}/public_url`;

// Newest first. Add verifyUrl to any credential that has a public verification page.
export const certifications: Certification[] = [
  {
    title: "User Experience Design Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "May 2026",
    verifyUrl: credly("40aa5338-1fb2-4daf-b6c8-498f2030d870"),
  },
  {
    title: "Data Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "May 2026",
    verifyUrl: credly("879d80f6-b6bb-4401-a78d-69a22d5377bb"),
  },
  {
    title: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    date: "Apr 2026",
    verifyUrl: credly("5daa3c09-5d73-4d24-9e91-35a2115f55b4"),
  },
  {
    title: "Project Management Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Nov 2025",
    verifyUrl: credly("041217e8-50a1-4137-abc7-7f551abc0245"),
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "Nov 2025",
    verifyUrl: credly("7e3f3519-f147-4b13-b26c-de704d282872"),
  },
  {
    title: "Agile Explorer",
    issuer: "IBM SkillsBuild",
    date: "Oct 2025",
    verifyUrl: credly("ae7c46ba-fd53-4b31-afe3-69600fd335b9"),
  },
  {
    title: "Planning a Machine Learning Project",
    issuer: "AWS Training and Certification",
    issuerShort: "AWS",
    date: "Aug 2025",
  },
  { title: "Developing Designs for User Interface", issuer: "TESDA", date: "Apr 2025" },
  { title: "Developing Designs for Product Packaging", issuer: "TESDA", date: "Apr 2025" },
  { title: "Designing Booth and Product/Window Display", issuer: "TESDA", date: "Apr 2025" },
  { title: "Developing Designs for User Experience", issuer: "TESDA", date: "Apr 2025" },
  { title: "Developing Designs for Print Media", issuer: "TESDA", date: "Apr 2025" },
  { title: "Introduction to Visual Graphic Design", issuer: "TESDA", date: "Apr 2025" },
  { title: "Developing Designs for a Logo", issuer: "TESDA", date: "Apr 2025" },
  { title: "Project Management and Technical Design Explorer", issuer: "IBM SkillsBuild", date: "2025" },
  {
    title: "AI Fundamentals with IBM SkillsBuild",
    issuer: "Cisco Networking Academy",
    date: "Nov 2024",
    verifyUrl: credly("50e7a81b-a439-4402-b9e7-0a92f6b7964e"),
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Oct 2024",
    verifyUrl: credly("1ddf4a4d-e832-4841-a3fa-43262d16ecb8"),
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Sep 2024",
    verifyUrl: credly("67311e91-9cd9-4556-8cac-63e5d2cd3ee5"),
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Sep 2024",
    verifyUrl: credly("f5a1c25b-0ab5-47cd-8ab1-bddb6b44d21a"),
  },
  {
    title: "Fundamentals of Sustainability and Technology",
    issuer: "IBM",
    date: "Sep 2024",
    verifyUrl: credly("2f859174-201f-4e44-980d-a35da45dbf8f"),
  },
];
