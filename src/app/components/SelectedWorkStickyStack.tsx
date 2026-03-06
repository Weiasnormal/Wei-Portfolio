'use client';

import { ArrowUpRight } from 'lucide-react';

type WorkProject = {
  category: string;
  title: string;
  date: string;
  image: string;
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
  return (
    <div className="relative h-[150vh]">
      <article
        className="sticky mx-auto h-[68vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10"
        style={{
          top: '80px',
          zIndex: index,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/85" />

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 md:gap-4 rounded-[24px] border border-white/10 bg-black/55 p-3 md:p-6 backdrop-blur-xl">
          <div className="space-y-3">
            <p className="text-sm md:text-lg font-medium tracking-wide text-gray-300">
              {project.category}
            </p>
            <h3 className="text-2xl md:text-5xl font-semibold leading-tight text-[#ff5b1a]">
              {project.title}
            </h3>
            <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 md:px-5 md:py-2 text-sm md:text-3xl text-gray-200">
              {project.date}
            </span>
          </div>

          <button
            type="button"
            className="grid h-16 w-16 md:h-28 md:w-28 place-items-center rounded-3xl border border-[#ff5b1a] text-[#ff5b1a] transition hover:bg-[#ff5b1a]/10"
            aria-label="View project"
          >
            <ArrowUpRight size={24} className="md:w-11 md:h-11" strokeWidth={1.8} />
          </button>
        </div>
      </article>
    </div>
  );
}

export default function SelectedWorkStickyStack({
  projects,
}: SelectedWorkStickyStackProps) {
  return (
    <div className="relative h-full w-full overflow-y-auto">
      <div className="relative pb-40 pt-2">
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
