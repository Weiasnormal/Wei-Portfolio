import { PageHead } from "@/components/Page";
import { SetupExplorer } from "@/components/setup/SetupExplorer";
import { pageMetadata } from "@/lib/site";

const intro = "The PC I build, edit and record on, modelled in 3D. Click any part to see what it is and where to get it.";

export const metadata = pageMetadata("Setup", intro, "/setup");

export default function SetupPage() {
  return (
    <>
      <PageHead title="Setup" intro={intro} />
      <SetupExplorer />
    </>
  );
}
