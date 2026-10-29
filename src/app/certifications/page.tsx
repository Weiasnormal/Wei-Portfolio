import { PageHead } from "@/components/Page";
import { Ph } from "@/components/Rich";
import { Rows } from "@/components/Rows";
import { certifications } from "@/content/certifications";
import { pageMetadata } from "@/lib/site";

const intro = "Courses and credentials in AI, machine learning, UI/UX and project management.";

export const metadata = pageMetadata("Certifications", intro, "/certifications");

export default function CertificationsPage() {
  const anyVerify = certifications.some((c) => c.verifyUrl);
  return (
    <>
      <PageHead title="Certifications" intro={intro} />
      <Rows
        items={certifications.map((c) => ({
          title: c.title,
          when: c.date,
          sub: c.issuer,
          extra: c.verifyUrl ? (
            <>
              {" · "}
              <a className="link" href={c.verifyUrl} target="_blank" rel="noopener noreferrer">
                Verify<span className="sr-only"> {c.title}</span>
              </a>
            </>
          ) : null,
        }))}
      />
      {!anyVerify && (
        <p className="mt-3.5 text-sm">
          <Ph>[Add a &quot;Verify&quot; link to each one that has a credential URL]</Ph>
        </p>
      )}
    </>
  );
}
