import SelectedWorkStickyStack from "../components/SelectedWorkStickyStack";

const selectedWork = [
  {
    category: "Mobile App Platform (React + Expo)",
    title: "ResqLine",
    date: "Dec 2025",
    image: "/Works/ResqLine.svg",
    link: "https://github.com/Weiasnormal/ResqLine_Frontend.git",
  },
  {
    category: "Mobile App Platform (React + Expo)",
    title: "Statera",
    date: "Feb 2026",
    image:
      "/Works/Statera.svg",
    link: "https://github.com/Weiasnormal/Statera_App.git",
  },
  {
    category: "Web Platform",
    title: "Sona Music",
    date: "June 2025",
    image:
      "/Works/SonaB.svg",
    hoverImage: "/Works/SonaW.svg",
    link: "https://sona-ten.vercel.app/mbti-selection",
  },
  {
    category: "Web Design",
    title: "OCTA Organization",
    date: "Nov 2025",
    image:
      "/Works/octaB.svg",
    hoverImage: "/Works/octaW.svg",
    link: "https://ccs-octa.com/home",
  },
  {
    category: "WinForms Desktop App (C#)",
    title: "WorkHive",
    date: "June 2024",
    image: "/Works/WorkHive.svg",
    link: "https://github.com/recca383/WorkHive.git",
  },
  {
    category: "WinForms Desktop App (JAVA)",
    title: "LEARN",
    date: "Jan 2026",
    image: "/Works/LEARN.svg",
    link: "https://github.com/Joko2005/L.E.A.R.N.-An-Interactive-Java-Based-Learning-System.git",
  },
];

export default function SelectedWorks() {
  return (
    <section id="works" className="snap-start py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-0">
        <h2 className="mb-4 shrink-0 text-center md:text-left text-2xl font-bold text-white md:text-4xl">Selected Works</h2>
        <SelectedWorkStickyStack projects={selectedWork} />
      </div>
    </section>
  );
}
