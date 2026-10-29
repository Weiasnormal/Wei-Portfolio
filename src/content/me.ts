import type { OutsideTile, Spec } from "./types";

export const outside: OutsideTile[] = [
  {
    title: "Making videos",
    body: "Affiliate and PC content on [TikTok](https://www.tiktok.com/@wiwotech) and [YouTube](https://youtube.com/@wnclasusual), scripted, shot and edited myself.",
    shot: "Short clip or still from your channels",
    lead: true,
  },
  { title: "Training", body: "[A line about your routine or current goal]", shot: "Gym photo" },
  {
    title: "Photography",
    body: "Shot events for campus orgs, and made my school's official promo video.",
    shot: "One of your event photos",
  },
];

export const setup: Spec[] = [
  { label: "CPU", value: "[model]", video: "[video link]" },
  { label: "GPU", value: "[model]", video: "[video link]" },
  { label: "Memory", value: "[size and speed]" },
  { label: "Storage", value: "[drives]" },
  { label: "Display", value: "[model]" },
  { label: "Camera and mic", value: "[models]" },
];
