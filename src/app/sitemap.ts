import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { posts } from "@/content/writing";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/projects",
    ...projects.map((p) => `/projects/${p.slug}`),
    "/experience",
    "/certifications",
    "/writing",
    ...posts.map((p) => `/writing/${p.slug}`),
    "/outside",
    "/setup",
    "/community",
    "/guestbook",
  ];
  return paths.map((p) => ({ url: new URL(p, siteUrl).toString() }));
}
