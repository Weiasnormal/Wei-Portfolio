import Link from "next/link";
import type { ReactNode } from "react";

export function PageHead({ title, intro, tight }: { title: ReactNode; intro?: ReactNode; tight?: boolean }) {
  return (
    <div className={tight ? "mb-6" : "mb-9"}>
      <h1 className="text-[clamp(34px,5vw,48px)] leading-[1.05] font-[750] font-stretch-120%">{title}</h1>
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
      <span aria-hidden="true">←</span> {children}
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
    <section className={`mt-16 ${className}`}>
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
    <div className="mb-[18px] flex items-baseline justify-between gap-4">
      <H className={H === "h2" ? "text-[22px] font-bold font-stretch-112%" : "text-base font-bold"}>{title}</H>
      {all &&
        (all.external ? (
          <a
            href={all.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm whitespace-nowrap text-muted no-underline transition-colors hover:text-fg"
          >
            {all.label}
          </a>
        ) : (
          <Link href={all.href} className="text-sm whitespace-nowrap text-muted no-underline transition-colors hover:text-fg">
            {all.label}
          </Link>
        ))}
    </div>
  );
}
