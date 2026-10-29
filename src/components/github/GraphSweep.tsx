"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const HINT = "Hover a day to see its count.";

/** Scrolls the graph to the latest week, runs the column sweep once in view, and shows the hovered day. */
export function GraphSweep({ children }: { children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(HINT);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    const svg = el.querySelector("svg");
    if (!svg || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          svg.classList.add("sweep");
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  function onOver(e: React.MouseEvent) {
    const t = e.target as SVGElement;
    const n = t.dataset?.n;
    if (n === undefined) return;
    setHover(`${n === "0" ? "No" : n} contribution${n === "1" ? "" : "s"} on ${t.dataset.d}`);
  }

  return (
    <div className="min-w-0">
      <div
        ref={scroller}
        className="overflow-x-auto pb-1.5 [scrollbar-width:thin]"
        onMouseOver={onOver}
        onMouseLeave={() => setHover(HINT)}
      >
        {children}
      </div>
      <div className="mt-2.5 flex flex-wrap justify-between gap-2 text-[13px] text-muted">
        <span aria-live="off">{hover}</span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          Less
          <svg width="62" height="10">
            {[0, 1, 2, 3, 4].map((l) => (
              <rect key={l} className="c" data-l={l} x={l * 13} width="10" height="10" rx="2" />
            ))}
          </svg>
          More
        </span>
      </div>
    </div>
  );
}
