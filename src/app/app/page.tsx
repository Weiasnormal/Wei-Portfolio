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
import { Github, Linkedin, Facebook, Instagram, Mail, Youtube } from "lucide-react";

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
    <main className="w-full px-4 pt-2 md:px-10">
      <section id="home" className="snap-start min-h-screen flex items-start pt-12">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/15 px-4 py-1 text-sm text-white/80">
              Personal Portfolio
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              <span className="block">Hi, I am Wincel Crusit,</span>
              <span className="block text-2xl md:text-4xl">
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
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/resume.pdf"
                className="rounded-full bg-[#C1FF72] px-6 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Download Resume
              </a>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C1FF72] hover:bg-white/10 hover:text-[#C1FF72]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative md:col-span-5 mt-15">
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
        </div>
      </section>

      <section id="works" className="snap-none h-screen pt-6">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
          <h2 className="mb-4 shrink-0 text-3xl font-bold text-white md:text-4xl">Selected Work</h2>
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
  );
}