"use client";

import { useRef } from "react";
import type { MiniProject } from "@/content/types";
import { useHoverPreview } from "./useHoverPreview";

/**
 * Demo video, summary and live link for a small shipped tool. The video downloads only when
 * played; hovering the card plays it muted until the viewer starts it with sound.
 */
export function MiniProjectCard({ project }: { project: MiniProject }) {
  const host = new URL(project.href).host;
  const ref = useRef<HTMLVideoElement>(null);
  const { cardProps, videoProps } = useHoverPreview(ref);

  return (
    <article {...cardProps} className="flex flex-col overflow-hidden rounded-lg border border-line bg-raised">
      <video
        ref={ref}
        {...videoProps}
        controls
        playsInline
        preload="none"
        poster={project.video.poster}
        aria-label={`${project.title} demo video`}
        className="aspect-video w-full border-b border-line bg-sunk object-cover"
      >
        <source src={project.video.src} type="video/mp4" />
        {project.video.captions && (
          <track kind="captions" src={project.video.captions} srcLang="en" label="English" />
        )}
      </video>
      <div className="flex flex-1 flex-col gap-2 px-3.5 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-semibold">{project.title}</h3>
          <span className="font-mono text-xs text-faint tabular-nums">{project.year}</span>
        </div>
        <p className="text-[13px] leading-snug text-muted">{project.summary}</p>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {project.stack.map((t) => (
            <li key={t} className="rounded-full border border-line px-2 py-0.5 text-xs whitespace-nowrap text-muted">
              {t}
            </li>
          ))}
        </ul>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-auto self-start pt-1 font-mono text-xs"
        >
          {host} ↗
        </a>
      </div>
    </article>
  );
}
