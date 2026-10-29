import type { Community } from "./types";

export const community: Community = {
  name: "[Community name]",
  intro:
    "A group for people who build things together. It started with the teams I already lead, and it's open to anyone looking for project partners.",
  offers: [
    { title: "Find collaborators", body: "Meet people with the skill your project is missing." },
    { title: "Build in small teams", body: "Project-based teams with a clear goal and a lead." },
    { title: "Get hired by members", body: "Members post freelance work and hackathon slots for each other." },
    { title: "Learn the tools", body: "Automation, AI workflows and content, shared as we learn them." },
  ],
  roles: ["Development", "Automation", "Content creation", "Design", "Project lead"],
};
