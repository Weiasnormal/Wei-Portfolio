import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";

export function ProjectCard({ project, meta }: { project: Project; meta: string }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card flex flex-col overflow-hidden rounded-lg border border-line bg-raised no-underline transition-colors duration-200"
    >
      <div className="frame-dash relative grid aspect-video max-w-full place-content-center border-b border-line bg-sunk p-2 text-center text-[13px] text-muted">
        {project.cover ? (
          <Image src={project.cover} alt="" fill sizes="(min-width: 768px) 373px, 100vw" className="object-cover" />
        ) : (
          <span>{project.title} cover frame</span>
        )}
      </div>
      <div className="grid gap-1 px-3.5 py-3">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
          <h3 className="text-sm font-semibold">{project.title}</h3>
          <span className="rounded-full border border-accent/40 bg-accent/16 px-2 py-0.5 text-xs whitespace-nowrap">
            {project.badge}
          </span>
        </div>
        <p className="text-[13px] leading-snug text-muted">{project.summary}</p>
        <span className="text-xs text-faint">{meta}</span>
      </div>
    </Link>
  );
}
