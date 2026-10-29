import { PageHead } from "@/components/Page";
import { Rows } from "@/components/Rows";
import { posts, upcoming } from "@/content/writing";
import { pageMetadata } from "@/lib/site";

const intro = "What happened on the projects I led: the problems, the build, and what I'd do differently.";

export const metadata = pageMetadata("Writing", intro, "/writing");

export default function WritingPage() {
  return (
    <>
      <PageHead title="Writing" intro={intro} />
      <Rows
        items={[
          ...posts.map((p) => ({ title: p.title, when: p.dateLabel, sub: p.summary, href: `/writing/${p.slug}` })),
          { title: upcoming.title, when: upcoming.when, sub: upcoming.summary, muted: true },
        ]}
      />
    </>
  );
}
