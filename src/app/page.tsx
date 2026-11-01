import Link from "next/link";
import { GitHubGraph } from "@/components/github/GitHubGraph";
import { IntroReel } from "@/components/home/IntroReel";
import { Logo } from "@/components/Logo";
import { Block, BlockHead } from "@/components/Page";
import { ProjectCard } from "@/components/ProjectCard";
import { Rows } from "@/components/Rows";
import { certifications } from "@/content/certifications";
import { experience } from "@/content/experience";
import { honors, projects } from "@/content/projects";
import { socials } from "@/content/socials";
import { stack, stackLogos } from "@/content/stack";
import { posts } from "@/content/writing";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata(null, site.description, "/");

const credits = [
  {
    role: "Team lead",
    what: "AVERA, ResQLine, DriveMinded",
    note: "Splitting work across design, ML and backend, and keeping it moving",
  },
  {
    role: "Developer",
    what: "React Native, Next.js, Python",
    note: "Mobile apps, web dashboards, ML models, Shopify stores",
  },
  {
    role: "Building toward",
    what: "AI orchestration",
    note: "n8n workflows, agents and APIs that shorten idea to product",
  },
];

const startHere = [
  { href: "/projects", label: "I'm reviewing for OJT" },
  { href: "/community", label: "I want to build together" },
  { href: "/outside", label: "Just looking around" },
];

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 items-center justify-items-center gap-7 text-center md:grid-cols-[auto_minmax(0,1fr)] md:justify-items-start md:gap-10 md:text-left">
        <IntroReel
          photo={site.photo}
          video={site.introVideo}
          name={site.name}
          handle={site.githubUser}
          status={site.availability}
        />
        <div>
          <p className="micro mb-2">{site.statusLong}</p>
          <h1 data-guide="name" className="text-4xl font-bold tracking-[-0.025em] md:text-6xl md:leading-none">
            {site.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 md:mx-0">
            I build web and mobile apps with React Native, Next.js and Python, and train ML models with PyTorch and TensorFlow.{" "}
            <span className="text-muted">I&apos;ve led teams on signature verification, emergency response and AI content workflows.</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-xs md:justify-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm opacity-70 transition-opacity hover:opacity-100"
              >
                <Logo file={s.label.toLowerCase()} className="size-3.5" />
                {s.label.toLowerCase()} ↗
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 md:justify-start">
            <Link data-guide="projects-cta" className="btn btn-primary !min-h-8 !rounded-full !px-3.5 !text-[13px] !font-medium" href="/projects">
              See projects
            </Link>
            <a data-guide="cv" className="btn !min-h-8 !rounded-full !px-3.5 !text-[13px] !font-medium" href={site.cv} target="_blank" rel="noopener noreferrer">
              CV (PDF)
            </a>
          </div>
        </div>
      </div>

      <dl
        aria-label="Roles at a glance"
        className="mt-10 grid grid-cols-1 overflow-hidden rounded-lg border border-line bg-raised sm:grid-cols-3"
      >
        {credits.map((c, i) => (
          <div
            key={c.role}
            className="roll border-line px-5 py-[18px] not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <dt className="micro">{c.role}</dt>
            <dd className="mt-1.5 text-sm leading-snug font-semibold">
              {c.what}
              <small className="mt-1 block text-[13px] leading-snug font-normal text-muted">{c.note}</small>
            </dd>
          </div>
        ))}
      </dl>

      <nav aria-label="Start here" className="mt-5 flex flex-wrap items-center gap-2">
        <p className="micro mr-1">Start here</p>
        {startHere.map((s) => (
          <Link key={s.href} className="chip !min-h-9 !text-[13px]" href={s.href}>
            {s.label}
          </Link>
        ))}
      </nav>

      <Block title="Projects" all={{ href: "/projects", label: "All projects" }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} meta={p.role} />
          ))}
        </div>
        <ul className="mt-5 grid list-none grid-cols-1 p-0 sm:grid-cols-3">
          {honors.map((h) => (
            <li
              key={h.title}
              className="border-line py-2.5 not-first:border-t sm:py-1 sm:pr-[18px] sm:not-first:border-t-0 sm:not-first:border-l sm:not-first:pl-[18px]"
            >
              <b className="block text-sm font-semibold">{h.title}</b>
              <span className="text-[13px] leading-snug text-muted">{h.detail}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Writing" all={{ href: "/writing", label: "All posts" }}>
        <Rows
          items={posts.slice(0, 2).map((p) => ({
            title: p.title,
            when: p.dateLabel,
            sub: p.summary,
            href: `/writing/${p.slug}`,
          }))}
        />
      </Block>

      <Block title="Experience" all={{ href: "/experience", label: "Full history" }}>
        <Rows
          items={experience.slice(0, 4).map((e) => ({
            title: e.title,
            when: e.when,
            sub: e.summary ?? e.detail,
            led: e.led,
          }))}
        />
      </Block>

      <section aria-label="Skills and certifications" className="mt-10 grid grid-cols-1 gap-4 border-t border-line pt-10 md:grid-cols-2">
        <div className="panel">
          <h2 className="micro mb-3.5 !font-mono">What I build with</h2>
          {stack.map((g) => (
            <div key={g.name} className="not-first:mt-3.5">
              <h3 className="mb-2 text-[13px] font-medium text-muted">{g.name}</h3>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {g.items.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[13px] whitespace-nowrap">
                    {stackLogos[t] && <Logo file={stackLogos[t].file} color={stackLogos[t].color} className="size-3.5" />}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="panel">
          <BlockHead
            as="h2"
            title="Certifications"
            all={{ href: "/certifications", label: `All ${certifications.length}` }}
          />
          <ul className="m-0 -mt-1 list-none p-0">
            {certifications.slice(0, 6).map((c) => (
              <li key={c.title} className="border-line py-[11px] first:pt-0 not-first:border-t">
                <b className="block text-sm leading-snug font-semibold">
                  {c.verifyUrl ? (
                    <a className="link" href={c.verifyUrl} target="_blank" rel="noopener noreferrer">
                      {c.title}
                    </a>
                  ) : (
                    c.title
                  )}
                </b>
                <span className="text-[13px] text-muted">
                  {c.issuerShort ?? c.issuer}, {c.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GitHubGraph />
    </>
  );
}
