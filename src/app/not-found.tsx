import Link from "next/link";
import { PageHead } from "@/components/Page";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <>
      <PageHead title="Nothing here" intro="That page doesn't exist, or it moved when the site was rebuilt." />
      <div className="flex flex-wrap gap-2.5">
        <Link className="btn btn-primary" href="/">
          Go home
        </Link>
        <Link className="btn" href="/projects">
          See projects
        </Link>
      </div>
    </>
  );
}
