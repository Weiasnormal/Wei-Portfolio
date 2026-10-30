import { Fragment, type ReactNode } from "react";

/** A visible placeholder for copy that hasn't been written yet. Brackets stay in. */
export function Ph({ children }: { children: ReactNode }) {
  return <span className="ph">{children}</span>;
}

const TOKEN = /(\[[^\]]+\]\(https?:\/\/[^)\s]+\)|\[[^\]]+\])/g;
const LINK = /^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/;

/** Renders a content string, turning [placeholders] into <Ph> and [label](url) into links. */
export function Rich({ text }: { text: string }) {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    const link = part.match(LINK);
    if (link)
      return (
        <a key={i} className="link" href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    if (part.startsWith("[") && part.endsWith("]")) return <Ph key={i}>{part}</Ph>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function isPlaceholder(text: string) {
  return /^\[[^\]]+\]$/.test(text.trim());
}
