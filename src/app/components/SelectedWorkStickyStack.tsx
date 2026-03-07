'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type WorkProject = {
  category: string;
  title: string;
  date: string;
  image: string;
  hoverImage?: string;
};

type SelectedWorkStickyStackProps = {
  projects: WorkProject[];
};

function StickyProjectCard({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const topClass = ["top-14 md:top-20", "top-16 md:top-24", "top-20 md:top-28", "top-24 md:top-32"][index] ?? "top-14 md:top-20";

  const displayImage = isHovered && project.hoverImage ? project.hoverImage : project.image;

  return (
    <article
      className={`sticky ${topClass} mx-auto mb-[18vh] md:mb-[40vh] h-[35vh] md:h-[68vh] w-full max-w-5xl overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl`}
      style={{
        zIndex: index + 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${displayImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/85" />

      <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 flex items-end justify-between gap-2 md:gap-4 rounded-2xl md:rounded-[24px] border border-white/10 bg-black/55 p-2.5 md:p-6 backdrop-blur-xl">
        <div className="space-y-2 md:space-y-3">
          <p className="text-sm md:text-lg font-medium tracking-wide text-gray-300">
            {project.category}
          </p>
          <h3 className="text-xl md:text-5xl font-semibold leading-tight text-[#ff5b1a]">
            {project.title}
          </h3>
          <span className="inline-flex items-center rounded-full bg-white/12 px-2.5 py-1 md:px-5 md:py-2 text-xs md:text-3xl text-gray-200">
            {project.date}
          </span>
        </div>

        <button
          type="button"
          className="grid h-12 w-12 md:h-28 md:w-28 place-items-center rounded-2xl md:rounded-3xl border border-[#ff5b1a] text-[#ff5b1a] transition hover:bg-[#ff5b1a]/10"
          aria-label="View project"
          suppressHydrationWarning
        >
          <ArrowUpRight size={18} className="md:w-11 md:h-11" strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}

export default function SelectedWorkStickyStack({
  projects,
}: SelectedWorkStickyStackProps) {
  return (
    <div className="relative w-full">
      <div className="relative pb-28 pt-2">
        {projects.map((project, index) => (
          <StickyProjectCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
