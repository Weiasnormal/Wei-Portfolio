import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb, PageHead } from "@/components/Page";
import { ProjectReel } from "@/components/ProjectReel";
import { Rich } from "@/components/Rich";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata(project.title, project.description, `/projects/${project.slug}`);
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <Crumb href="/projects">Projects</Crumb>
      <PageHead title={project.title} intro={project.intro} tight />
      <ProjectReel name={project.reelName} views={project.views} />

      <dl className="mt-7 mb-2 grid grid-cols-2 gap-4 border-y border-line py-[18px] md:grid-cols-4">
        {project.facts.map((f) => (
          <div key={f.label}>
            <dt className="text-[13px] text-muted">{f.label}</dt>
            <dd className="mt-1 text-[15px] leading-[1.4] font-[550]">
              <Rich text={f.value} />
            </dd>
          </div>
        ))}
      </dl>

      {project.sections.map((s) => (
        <section key={s.heading}>
          <h2 className="mt-10 mb-2.5 text-[22px] font-bold font-stretch-110%">{s.heading}</h2>
          <p className="max-w-[64ch] text-muted">
            <Rich text={s.body} />
          </p>
        </section>
      ))}

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {project.gallery.map((g, i) => (
          <div
            key={i}
            className={`grid max-w-full place-content-center rounded-md border border-line bg-sunk p-2 text-center text-[13px] text-muted ${
              g.wide ? "col-span-2 aspect-video md:col-span-3" : "aspect-[9/16]"
            }`}
          >
            {g.label}
          </div>
        ))}
      </div>

      <nav aria-label="More projects" className="mt-14 flex justify-between gap-4 border-t border-line pt-5">
        {project.footer.map((l) => (
          <Link key={l.href} className="link" href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
