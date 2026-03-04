import React from "react";

const selectedWork = [
  {
    category: "Mobile App Design",
    title: "FinFlow Banking Experience",
    date: "Jan 2026",
  },
  {
    category: "Web Platform",
    title: "Creative Studio Portfolio",
    date: "Nov 2025",
  },
  {
    category: "SaaS Dashboard",
    title: "TeamPulse Analytics",
    date: "Aug 2025",
  },
  {
    category: "E-commerce UI",
    title: "Moda Cart Redesign",
    date: "May 2025",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
      <section id="home" className="grid gap-10 pb-16 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <p className="mb-4 inline-flex items-center rounded-full border border-white/15 px-4 py-1 text-sm text-white/80">
            Personal Portfolio
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Hi, I’m Jayden Jones, Working as Web-designer and Developer.
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#works"
              className="rounded-full bg-[#C1FF72] px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Get Started
            </a>
            <a
              href="#works"
              className="rounded-full border border-[#C1FF72] px-6 py-3 font-semibold text-[#C1FF72] transition hover:bg-[#C1FF72] hover:text-black"
            >
              View My Work
            </a>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#C1FF72]/30 bg-black/70 px-4 py-2 text-sm text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C1FF72] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C1FF72]" />
            </span>
            Available for projects
          </div>

          <div className="flex aspect-[4/5] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8">
            <svg
              viewBox="0 0 400 460"
              role="img"
              aria-label="Developer illustration placeholder"
              className="h-full w-full"
            >
              <rect x="0" y="0" width="400" height="460" rx="24" fill="#101010" />
              <circle cx="200" cy="145" r="62" fill="#1d1d1d" stroke="#C1FF72" strokeWidth="3" />
              <rect x="125" y="220" width="150" height="140" rx="22" fill="#1a1a1a" stroke="#2a2a2a" />
              <rect x="70" y="265" width="260" height="24" rx="12" fill="#171717" />
              <rect x="92" y="302" width="220" height="14" rx="7" fill="#262626" />
              <rect x="92" y="328" width="180" height="14" rx="7" fill="#262626" />
            </svg>
          </div>
        </div>
      </section>

      <section id="works" className="pb-16">
        <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">Selected Work</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {selectedWork.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[16/10] bg-gradient-to-br from-[#1b1b1b] via-[#131313] to-[#0f0f0f] transition duration-300 group-hover:scale-105" />
                <span className="absolute right-4 top-4 translate-y-1 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-[#C1FF72]">
                  ↗ view project
                </span>
              </div>
              <div className="space-y-2 p-5">
                <p className="text-xs uppercase tracking-wide text-[#C1FF72]">{project.category}</p>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-white/60">{project.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="pb-14">
        <h2 className="text-2xl font-semibold text-white">Services</h2>
      </section>

      <section id="about" className="pb-14">
        <h2 className="text-2xl font-semibold text-white">About</h2>
      </section>

      <section id="pricing" className="pb-14">
        <h2 className="text-2xl font-semibold text-white">Pricing</h2>
      </section>

      <section id="contact" className="pb-8">
        <h2 className="text-2xl font-semibold text-white">Contact</h2>
      </section>
        <section id="home" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
          <p className="text-gray-600 mt-4">This is the main portfolio page.</p>
        </section>
        <section id="about" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-4">Short introduction and background.</p>
        </section>
        <section id="projects" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
          <p className="text-gray-600 mt-4">Project highlights will appear here.</p>
        </section>
        <section id="contact">
          <h2 className="text-3xl font-bold text-gray-800">Contact Me</h2>
          <p className="text-gray-600 mt-4">Contact details and links.</p>
        </section>
      </main>
    </div>
       ));
}