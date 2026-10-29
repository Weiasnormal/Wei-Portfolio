import Link from "next/link";
import { GitHubGraph } from "@/components/github/GitHubGraph";
import { IntroReel } from "@/components/home/IntroReel";
import { Block, BlockHead } from "@/components/Page";
import { ProjectCard } from "@/components/ProjectCard";
import { Rows } from "@/components/Rows";
import { certifications } from "@/content/certifications";
import { experience } from "@/content/experience";
import { honors, projects } from "@/content/projects";
import { stack } from "@/content/stack";
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
      <div className="grid grid-cols-1 items-center gap-7 sm:grid-cols-[auto_minmax(0,1fr)]">
        <IntroReel photo={site.photo} video={site.introVideo} name={site.name} />
        <div>
          <p className="mb-3.5 inline-flex items-center gap-2 text-sm text-muted">
            <span className="dot" aria-hidden="true" />
            {site.statusLong}
          </p>
          <h1 className="text-[clamp(42px,6.4vw,64px)] leading-[.95] font-extrabold tracking-[-0.03em] font-stretch-125%">
            {site.name}
          </h1>
          <p className="mt-4 max-w-[40ch] text-lg leading-normal">
            I lead small teams that build web and mobile apps.{" "}
            <span className="text-muted">Right now I&apos;m learning to build faster with AI workflows and automation.</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link className="btn btn-primary" href="/projects">
              See projects
            </Link>
            <a className="btn" href={site.resume} target="_blank" rel="noopener noreferrer">
              Resume (PDF)
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
            <dt className="text-[13.5px] text-muted">{c.role}</dt>
            <dd className="mt-1 leading-[1.35] font-[650]">
              {c.what}
              <small className="mt-1.5 block text-sm leading-[1.45] font-normal text-muted">{c.note}</small>
            </dd>
          </div>
        ))}
      </dl>

      <nav aria-label="Start here" className="mt-5 flex flex-wrap items-center gap-2">
        <p className="mr-1 text-sm text-muted">Start here:</p>
        {startHere.map((s) => (
          <Link key={s.href} className="chip" href={s.href}>
            {s.label}
          </Link>
        ))}
      </nav>

      <Block title="Projects" all={{ href: "/projects", label: "All projects" }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <b className="block text-base font-stretch-110%">{h.title}</b>
              <span className="text-[13.5px] text-muted">{h.detail}</span>
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
          items={experience.slice(0, 3).map((e) => ({
            title: e.title,
            when: e.when,
            sub: e.summary ?? e.detail,
            led: e.led,
          }))}
        />
      </Block>

      <section aria-label="Skills and certifications" className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="panel">
          <h2 className="mb-3.5 text-base font-bold">What I build with</h2>
          {stack.map((g) => (
            <div key={g.name} className="not-first:mt-3.5">
              <h3 className="mb-2 text-[13px] font-medium text-muted">{g.name}</h3>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {g.items.map((t) => (
                  <li key={t} className="rounded-full border border-line px-2.5 py-1 text-[13px] whitespace-nowrap">
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
            title={<span className="text-base">Certifications</span>}
            all={{ href: "/certifications", label: `All ${certifications.length}` }}
          />
          <ul className="m-0 -mt-1 list-none p-0">
            {certifications.slice(0, 3).map((c) => (
              <li key={c.title} className="border-line py-[11px] first:pt-0 not-first:border-t">
                <b className="block text-[15px] leading-[1.35] font-semibold">{c.title}</b>
                <span className="text-[13.5px] text-muted">
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
