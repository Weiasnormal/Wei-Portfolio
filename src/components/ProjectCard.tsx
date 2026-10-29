import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";

export function ProjectCard({ project, meta }: { project: Project; meta: string }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card flex flex-col overflow-hidden rounded-lg border border-line bg-raised no-underline transition-colors duration-200"
    >
      <div className="frame-dash relative grid aspect-[2.39/1] max-w-full place-content-center border-b border-line bg-sunk p-2 text-center text-[13px] text-faint">
        {project.cover ? (
          <Image src={project.cover} alt="" fill sizes="(min-width: 768px) 380px, 100vw" className="object-cover" />
        ) : (
          <span>{project.title} cover frame</span>
        )}
      </div>
      <div className="grid gap-1.5 px-[18px] pt-4 pb-[18px]">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5">
          <h3 className="text-[21px] font-[750] font-stretch-118%">{project.title}</h3>
          <span className="rounded-full border border-accent/40 bg-accent/16 px-2.5 py-0.5 text-[12.5px] whitespace-nowrap">
            {project.badge}
          </span>
        </div>
        <p className="text-[14.5px] text-muted">{project.summary}</p>
        <span className="text-[13.5px] text-faint">{meta}</span>
      </div>
    </Link>
  );
}
