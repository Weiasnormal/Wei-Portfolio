import Image from "next/image";
import { PageHead } from "@/components/Page";
import { Rich } from "@/components/Rich";
import { outside } from "@/content/me";
import { pageMetadata } from "@/lib/site";

const intro = "What I do when I'm not writing code.";

export const metadata = pageMetadata("Outside the IDE", intro, "/outside");

export default function OutsidePage() {
  return (
    <>
      <PageHead title="Outside the IDE" intro={intro} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {outside.map((t) => (
          <div key={t.title} className={`flex min-w-0 flex-col gap-2.5 ${t.lead ? "md:row-span-2" : ""}`}>
            <div
              className={`relative grid max-w-full place-content-center overflow-hidden rounded-md border border-line bg-sunk p-3 text-center text-[13.5px] text-muted ${
                t.lead ? "aspect-[16/10] md:aspect-auto md:min-h-[260px] md:flex-1" : "aspect-[4/3]"
              }`}
            >
              {t.src ? (
                <Image src={t.src} alt="" fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
              ) : (
                t.shot
              )}
            </div>
            <h2 className="text-[17px] font-bold">{t.title}</h2>
            <p className="text-[14.5px] text-muted">
              <Rich text={t.body} />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
