import type { MDXComponents } from "mdx/types";
import { Ph } from "@/components/Rich";
import { Shot } from "@/components/Shot";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-9 mb-2.5 text-[21px] font-bold" {...props} />,
  p: (props) => <p className="text-muted [&+p]:mt-3" {...props} />,
  a: (props) => <a className="link" {...props} />,
  ul: (props) => <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted" {...props} />,
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  Ph,
  Shot,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
