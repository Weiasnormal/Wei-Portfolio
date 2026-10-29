import type { MDXComponents } from "mdx/types";
import { Ph } from "@/components/Rich";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-9 mb-2.5 text-[21px] font-bold" {...props} />,
  p: (props) => <p className="text-muted [&+p]:mt-3" {...props} />,
  a: (props) => <a className="link" {...props} />,
  Ph,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
