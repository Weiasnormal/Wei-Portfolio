import SelectedWorkStickyStack from "../components/SelectedWorkStickyStack";

const selectedWork = [
  {
    category: "Mobile App Design",
    title: "X-direct Mobile",
    date: "May 2025",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1920&auto=format&fit=crop",
  },
  {
    category: "SaaS Dashboard",
    title: "TeamPulse Analytics",
    date: "Aug 2025",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop",
  },
  {
    category: "Web Platform",
    title: "Creative Studio Portfolio",
    date: "Nov 2025",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1920&auto=format&fit=crop",
  },
  {
    category: "E-commerce App",
    title: "Moda Cart Redesign",
    date: "Jan 2026",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function SelectedWorks() {
  return (
    <section id="works" className="snap-start py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <h2 className="mb-4 shrink-0 text-2xl font-bold text-white md:text-4xl">Selected Work</h2>
        <SelectedWorkStickyStack projects={selectedWork} />
      </div>
    </section>
  );
}
