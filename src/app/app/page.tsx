import React from "react";
import Experience from "../components/Experience";
import Services from "../components/Services";
import TechMarquee from "../components/TechMarquee";
import ClientsMarquee from "../components/ClientsMarquee";
import FAQ from "../components/FAQ";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import TextRotator from "../components/TextRotator";
import About from "../components/About";
import SelectedWorkStickyStack from "../components/SelectedWorkStickyStack";
import TopHeader from "../components/TopHeader";
import SidebarNav from "../components/SidebarNav";
import HeroSpline from "../components/HeroSpline";
import { Github, Linkedin, Facebook, Instagram, Mail, Youtube, Download } from "lucide-react";

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

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/wincel-crusit-284364305",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/WincelCrusit",
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/wnclasusual_",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@wnclasusual",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    name: "Email",
    href: "mailto:crusitwincel@gmail.com",
    icon: <Mail className="h-5 w-5" />,
  },
];

export default function HomePage() {
  return (
    <>
      <TopHeader />
      <SidebarNav />
      <main className="w-full px-4 pt-2 md:px-10">
      <section id="home" className="snap-start min-h-screen flex items-start pt-32">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-7 md:self-start md:mt-15 md:pl-8 text-center md:text-left">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs md:text-sm text-white/80">
              Personal Portfolio
            </p>
            <h1 className="text-2xl font-bold leading-tight text-white md:text-6xl">
              <span className="block">Hi, I am</span>
              <span className="block">Wincel Crusit,</span>
              <span className="block text-lg md:text-4xl">
                <TextRotator
                  texts={[
                    { prefix: "I am a ", title: "Web Designer" },
                    { prefix: "I am a  ", title: "Frontend Developer" },
                    { prefix: "I am a ", title: "Mobile App Developer" },
                    { prefix: "I am a ", title: "Web Developer" },
                    { prefix: "Soon to be ", title: "Machine Learning Engineer" },
                    { prefix: "Soon to be ", title: "Data Engineer" },
                    
                  ]}
                  titleClassName="text-[#C1FF72]"
                />
                .
              </span>
            </h1>
            <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-4">
              <a
                href="/resume.pdf"
                className="flex items-center gap-2 rounded-full bg-[#C1FF72] px-4 py-2 text-sm md:px-6 md:py-3 md:text-base font-semibold text-black transition hover:opacity-90"
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
                Download Resume
              </a>
              <div className="flex justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C1FF72] hover:bg-white/10 hover:text-[#C1FF72]"
                  >
                    <span className="h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:self-start mt-2 md:mt-0 flex items-center justify-center md:justify-end md:pr-8">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/0">
              <HeroSpline />
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="snap-none h-screen pt-6">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
          <h2 className="mb-4 shrink-0 text-2xl font-bold text-white md:text-4xl">Selected Work</h2>
          <SelectedWorkStickyStack projects={selectedWork} />
        </div>
      </section>

      <section id="about" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <About />
        </div>
      </section>

      <section id="experience" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <Experience />
        </div>
      </section>

      <section id="services" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <Services />
        </div>
      </section>

      <section id="tech" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <TechMarquee />
        </div>
      </section>

      <section id="clients" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <ClientsMarquee />
        </div>
      </section>

      <section id="faq" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <FAQ />
        </div>
      </section>

      <section id="contact" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <ContactForm />
        </div>
      </section>

      <section id="footer" className="snap-start min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl">
          <Footer />
        </div>
      </section>
      </main>
    </>
  );
}