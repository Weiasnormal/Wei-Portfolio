import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function PageHead({ title, intro, tight }: { title: ReactNode; intro?: ReactNode; tight?: boolean }) {
  return (
    <div className={tight ? "mb-6" : "mb-9"}>
      <h1 className="text-4xl font-bold tracking-[-0.025em] md:text-5xl">{title}</h1>
      {intro && <p className="mt-3 max-w-[56ch] text-muted">{intro}</p>}
    </div>
  );
}

export function Crumb({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted no-underline transition-colors hover:text-fg"
    >
      <Icon name="back" className="size-3.5" />
      {children}
    </Link>
  );
}

export function Block({
  title,
  all,
  children,
  className = "",
}: {
  title: ReactNode;
  all?: { href: string; label: string; external?: boolean };
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-10 border-t border-line pt-10 ${className}`}>
      <BlockHead title={title} all={all} />
      {children}
    </section>
  );
}

export function BlockHead({
  title,
  all,
  as: H = "h2",
}: {
  title: ReactNode;
  all?: { href: string; label: string; external?: boolean };
  as?: "h2" | "h3";
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <H className="micro !font-mono">{title}</H>
      {all &&
        (all.external ? (
          <a
            href={all.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs whitespace-nowrap text-muted no-underline transition-colors hover:text-fg"
          >
            {all.label}
          </a>
        ) : (
          <Link href={all.href} className="font-mono text-xs whitespace-nowrap text-muted no-underline transition-colors hover:text-fg">
            {all.label}
          </Link>
        ))}
    </div>
  );
}
