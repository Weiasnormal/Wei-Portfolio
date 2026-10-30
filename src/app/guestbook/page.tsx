import { Guestbook } from "@/components/guestbook/Guestbook";
import { PageHead } from "@/components/Page";
import { CopyEmail } from "@/components/shell/CopyEmail";
import { socials } from "@/content/socials";
import { pageMetadata } from "@/lib/site";

const intro = "Leave a note, some feedback, or a reaction. For OJT or project offers, email me directly.";

export const metadata = pageMetadata("Guestbook", intro, "/guestbook");

export default function GuestbookPage() {
  return (
    <>
      <PageHead title="Guestbook" intro={intro} />
      <CopyEmail variant="button" />
      <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-[18px] gap-y-2 p-0 text-[15px]">
        {socials.map((s) => (
          <li key={s.label}>
            <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <Guestbook />
    </>
  );
}
