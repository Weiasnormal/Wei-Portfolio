import { Block, PageHead } from "@/components/Page";
import { Rows } from "@/components/Rows";
import { education, experience } from "@/content/experience";
import { pageMetadata } from "@/lib/site";

const intro = "No formal employment yet. This is my project, freelance and org work, and where I led it.";

export const metadata = pageMetadata("Experience", intro, "/experience");

export default function ExperiencePage() {
  return (
    <>
      <PageHead title="Experience" intro={intro} />
      <Rows items={experience.map((e) => ({ title: e.title, when: e.when, sub: e.detail, led: e.led }))} />
      <Block title="Education">
        <Rows items={education.map((e) => ({ title: e.title, when: e.when, sub: e.detail }))} />
      </Block>
    </>
  );
}
