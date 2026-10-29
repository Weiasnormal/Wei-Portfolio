import { PageHead } from "@/components/Page";
import { Rich } from "@/components/Rich";
import { setup } from "@/content/me";
import { pageMetadata } from "@/lib/site";

const intro = "The PC I build, edit and record on. I review parts like these in my videos.";

export const metadata = pageMetadata("Setup", intro, "/setup");

export default function SetupPage() {
  return (
    <>
      <PageHead title="Setup" intro={intro} />
      <div className="frame-dash relative grid aspect-video max-w-full place-content-center gap-1 overflow-hidden rounded-md border border-line bg-sunk p-4 text-center text-sm text-faint">
        <b className="font-semibold text-muted">Desk photo</b>
        <span>One wide shot of the setup. A 3D model can replace this later.</span>
      </div>
      <dl className="mt-6 border-t border-line">
        {setup.map((s) => (
          <div
            key={s.label}
            className="grid grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-x-4 border-b border-line py-3.5 sm:grid-cols-[minmax(0,160px)_minmax(0,1fr)_auto]"
          >
            <dt className="text-[14.5px] text-muted">{s.label}</dt>
            <dd className="m-0">
              <Rich text={s.value} />
            </dd>
            {s.video && (
              <dd className="col-start-2 m-0 text-sm sm:col-start-3 sm:text-right">
                {typeof s.video === "string" ? (
                  <Rich text={s.video} />
                ) : (
                  <a className="link" href={s.video.href} target="_blank" rel="noopener noreferrer">
                    {s.video.label}
                  </a>
                )}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </>
  );
}
