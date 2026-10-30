import Link from "next/link";
import type { ReactNode } from "react";
import { Rich } from "./Rich";

export type RowItem = {
  title: string;
  when: string;
  sub: string;
  href?: string;
  external?: boolean;
  led?: boolean;
  muted?: boolean;
  extra?: ReactNode;
};

const rowClass =
  "-mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 rounded-sm px-3 py-4 no-underline";

function RowBody({ item }: { item: RowItem }) {
  return (
    <>
      <b className="font-[650]">
        {item.title}
        {item.led && (
          <span className="ml-2 inline-block rounded-full border border-accent/45 px-2 py-px align-[2px] text-xs font-medium">
            Led
          </span>
        )}
      </b>
      <span className="text-sm whitespace-nowrap text-faint tabular-nums">{item.when}</span>
      <span className="col-span-full text-[14.5px] text-muted">
        <Rich text={item.sub} />
        {item.extra}
      </span>
    </>
  );
}

export function Rows({ items }: { items: RowItem[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {items.map((item) => (
        <li key={item.title} className="border-t border-line last:border-b" style={item.muted ? { opacity: 0.7 } : undefined}>
          {item.href ? (
            item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rowClass} transition-colors hover:bg-raised`}
              >
                <RowBody item={item} />
              </a>
            ) : (
              <Link href={item.href} className={`${rowClass} transition-colors hover:bg-raised`}>
                <RowBody item={item} />
              </Link>
            )
          ) : (
            <div className={rowClass}>
              <RowBody item={item} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
