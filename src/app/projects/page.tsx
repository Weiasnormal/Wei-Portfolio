import { Block, PageHead } from "@/components/Page";
import { ProjectCard } from "@/components/ProjectCard";
import { Rows } from "@/components/Rows";
import { alsoBuilt, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/site";

const intro = "Two projects I led from idea to working build, and the other things I've made along the way.";

export const metadata = pageMetadata("Projects", intro, "/projects");

export default function ProjectsPage() {
  return (
    <>
      <PageHead title="Projects" intro={intro} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} meta={p.platforms} />
        ))}
      </div>
      <Block title="Also built" className="!mt-12">
        <Rows
          items={alsoBuilt.map((a) => ({
            title: a.title,
            when: a.year,
            sub: a.description,
            href: a.href,
            external: a.external,
          }))}
        />
      </Block>
    </>
  );
}
