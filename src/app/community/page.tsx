import { Block, PageHead } from "@/components/Page";
import { Ph, Rich } from "@/components/Rich";
import { community } from "@/content/community";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Community", community.intro, "/community");

export default function CommunityPage() {
  return (
    <>
      <PageHead title={<Rich text={community.name} />} intro={community.intro} />
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
        {community.offers.map((o) => (
          <li key={o.title} className="rounded-lg border border-line bg-raised p-[18px]">
            <b className="block font-[650]">{o.title}</b>
            <span className="text-[15px] text-muted">{o.body}</span>
          </li>
        ))}
      </ul>
      <Block title="Roles you can join as" className="!mt-10">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {community.roles.map((r) => (
            <li key={r}>
              <span className="chip">{r}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {community.joinUrl ? (
            <a className="btn btn-primary" href={community.joinUrl} target="_blank" rel="noopener noreferrer">
              Ask to join
            </a>
          ) : (
            <>
              <button type="button" className="btn btn-primary" disabled aria-describedby="join-note">
                Ask to join
              </button>
              <p id="join-note" className="mt-3.5 text-sm">
                <Ph>[Community link: Discord, Messenger group or similar]</Ph>
              </p>
            </>
          )}
        </div>
      </Block>
    </>
  );
}
