import type { Post } from "../types";

// Post bodies live next to this file as <slug>.mdx.
export const posts: Post[] = [
  {
    slug: "resqline-batang-techno",
    title: "Leading ResQLine to the Batang Techno finals",
    date: "2026-04",
    dateLabel: "Apr 2026",
    summary: "Four people, one deadline, and a mobile app plus a dashboard to ship.",
    readTime: "[x] min read",
    project: { label: "See the project", href: "/projects/resqline" },
  },
  {
    slug: "driveminded-isite",
    title: "How DriveMinded placed First Runner-Up at iSITE",
    date: "2026-04",
    dateLabel: "Apr 2026",
    summary: "Designing an AI workflow a car seller can approve with one tap.",
    readTime: "[x] min read",
  },
];

export const upcoming = {
  title: "AI experiments and technical notes",
  when: "Coming",
  summary: "Agent workflows, n8n setups and things that broke.",
};

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
