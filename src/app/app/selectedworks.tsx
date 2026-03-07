import SelectedWorkStickyStack from "../components/SelectedWorkStickyStack";

const selectedWork = [
  {
    category: "Mobile App Platform (React + Expo)",
    title: "ResqLine",
    date: "Dec 2025",
    image: "/Works/ResqLine.svg",
  },
  {
    category: "Mobile App Platform (React + Expo)",
    title: "Statera",
    date: "Feb 2026",
    image:
      "/Works/Statera.svg",
  },
  {
    category: "Web Platform",
    title: "Sona Music",
    date: "June 2025",
    image:
      "/Works/SonaB.svg",
    hoverImage: "/Works/SonaW.svg",
  },
  {
    category: "Web Design",
    title: "OCTA Organization",
    date: "Nov 2025",
    image:
      "/Works/octaB.svg",
    hoverImage: "/Works/octaW.svg",
  },
  {
    category: "Collaboration Platform",
    title: "WorkHive",
    date: "June 2024",
    image: "/Works/WorkHive.svg",
  },
  {
    category: "Learning Platform",
    title: "LEARN",
    date: "Jan 2026",
    image: "/Works/LEARN.svg",
  },
];

export default function SelectedWorks() {
  return (
    <section id="works" className="snap-start py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-0">
        <h2 className="mb-4 shrink-0 text-center md:text-left text-2xl font-bold text-white md:text-4xl">Selected Work</h2>
        <SelectedWorkStickyStack projects={selectedWork} />
      </div>
    </section>
  );
}
