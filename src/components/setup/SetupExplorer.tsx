"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { pcParts, shops, type PcPart } from "@/content/pcSetup";
import type { SetupScene } from "./setupScene";

const byId = Object.fromEntries(pcParts.map((p) => [p.id, p])) as Record<string, PcPart>;
const groups = ["System unit", "Desk"] as const;
const order = groups.flatMap((g) => pcParts.filter((p) => p.group === g).map((p) => p.id));
const CARD_W = 300; // matches sm:w-[300px] below
// /setup/* is served with a one-year immutable cache (next.config.ts): bump this whenever the model, video or
// posters in public/setup change, or returning visitors keep the old files.
const V = "?v=2";
const ASSETS = {
  model: `/setup/pc-setup.glb${V}`,
  lcd: `/setup/pump-lcd.mp4${V}`,
  poster: `/setup/poster-wide.webp${V}`, // 16:9 frame (sm and up)
  posterNarrow: `/setup/poster-narrow.webp${V}`, // 4:3 frame on phones
};

/** Resolves when the browser is idle (or after `timeout` ms), so the 3D work starts after the page has painted. */
const idle = (timeout = 1500) =>
  new Promise<void>((done) => ("requestIdleCallback" in window ? requestIdleCallback(() => done(), { timeout }) : setTimeout(done, 200)));

function ShopLinks({ part, compact }: { part: PcPart; compact?: boolean }) {
  return (
    <div className={compact ? "flex gap-1" : "grid grid-cols-3 gap-2"}>
      {shops.map(({ key, label, color }) =>
        part.links[key] ? (
          <a
            key={key}
            href={part.links[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Find ${part.name} on ${label}`}
            title={label}
            style={{ "--brand": color } as React.CSSProperties}
            className={
              compact
                ? "press grid size-9 place-items-center rounded-sm text-muted transition-colors hover:bg-raised hover:text-(--brand)"
                : "press grid min-h-11 place-items-center rounded-sm border border-line text-fg transition-colors hover:border-(--brand) hover:text-(--brand)"
            }
          >
            <Logo file={key} className={compact ? "size-[18px]" : "size-[22px]"} />
          </a>
        ) : null,
      )}
    </div>
  );
}

export function SetupExplorer() {
  const frame = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const poster = useRef<HTMLImageElement>(null);
  const scene = useRef<SetupScene | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [wide, setWide] = useState(true);
  const part = selected ? byId[selected] : null;

  // Build the three.js scene once, client side only: when the frame is near the viewport and the browser is idle.
  // Until then (and while the model loads) a still of the same view stands in.
  useEffect(() => {
    let alive = true;
    const deep = decodeURIComponent(location.hash.slice(1)); // /setup#gpu opens on that part
    if (byId[deep]) setSelected(deep);
    let done = () => {};
    const near = new Promise<void>((r) => (done = r));
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); done(); } }, { rootMargin: "400px" });
    if (frame.current) io.observe(frame.current);
    // Let the poster reach the screen first: the 3D setup's long tasks would otherwise hold back its paint.
    const posterShown = () =>
      (poster.current?.decode() ?? Promise.resolve())
        .catch(() => {})
        .then(() => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))));
    near.then(posterShown).then(() => idle()).then(() => import("./setupScene")).then(({ createSetupScene }) => {
      if (!alive || !host.current) return;
      scene.current = createSetupScene(host.current, {
        model: ASSETS.model,
        lcdVideo: ASSETS.lcd,
        focusOf: Object.fromEntries(pcParts.map((p) => [p.id, p.focus])),
        onSelect: (id) => setSelected(id && byId[id] ? id : null),
        onHover: (id, x, y) => {
          setHovered(id && byId[id] ? id : null);
          if (tip.current) tip.current.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
        },
        onReady: () => setStatus("ready"),
        onError: () => setStatus("error"),
      });
    }).catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
      io.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  // The card sits over the model on wide frames and below it on narrow ones.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWide(el.clientWidth >= 640));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const firstSync = useRef(true);
  useEffect(() => {
    scene.current?.select(selected);
    scene.current?.setInset(selected && wide ? CARD_W + 24 : 0);
    if (firstSync.current) { firstSync.current = false; return; } // keep an incoming #part until it's read
    const url = location.pathname + location.search + (selected ? `#${selected}` : "");
    history.replaceState(history.state, "", url);
  }, [selected, wide, status]);

  const step = useCallback(
    (n: number) => setSelected((s) => order[(order.indexOf(s ?? order[0]) + n + order.length) % order.length]),
    [],
  );

  // Esc goes back to the full view; arrow keys step through the parts (not while typing anywhere).
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]")) return;
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [selected, step]);

  const showFromList = (id: string) => {
    setSelected(id);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    frame.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <>
      <div ref={frame}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-[#050608] sm:aspect-video">
          <div ref={host} className="absolute inset-0" />

          {/* Still of the home view: paints first (it's the page's largest image), then fades out over the live model. */}
          <picture
            aria-hidden
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out ${status === "ready" ? "opacity-0" : "opacity-100"}`}
          >
            <source media="(min-width: 640px)" srcSet={ASSETS.poster} />
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP; next/image can't art-direct by breakpoint */}
            <img ref={poster} src={ASSETS.posterNarrow} alt="" fetchPriority="high" className="size-full object-cover" />
          </picture>

          {status === "loading" && (
            <p className="pointer-events-none absolute bottom-3 left-3 m-0 rounded-sm bg-black/45 px-2 py-1 font-mono text-[11px] tracking-[0.06em] text-[#c9ced8] backdrop-blur-sm">
              Loading 3D…
            </p>
          )}
          {status === "error" && (
            <div className="absolute inset-0 grid place-content-center gap-1 bg-[#050608]/70 text-center text-sm text-[#9aa2b0]">
              The 3D model couldn&apos;t load. The full parts list is below.
            </div>
          )}

          <p className="pointer-events-none absolute top-3 left-3 m-0 rounded-sm bg-black/45 px-2 py-1 font-mono text-[11px] tracking-[0.06em] text-[#c9ced8] backdrop-blur-sm">
            <span className="hidden [@media(hover:hover)]:inline">Click a part to zoom in · drag to orbit · ctrl + scroll to zoom</span>
            <span className="[@media(hover:hover)]:hidden">Tap a part · 2 fingers to orbit</span>
          </p>

          <div
            ref={tip}
            aria-hidden
            className={`pointer-events-none absolute top-0 left-0 rounded-sm border border-white/10 bg-black/70 px-2 py-1 text-xs whitespace-nowrap text-[#e9ecf1] backdrop-blur-sm transition-opacity duration-100 ${
              hovered && hovered !== selected ? "opacity-100" : "opacity-0"
            }`}
          >
            {hovered && `${byId[hovered].label} · ${byId[hovered].name}`}
          </div>

          {part && wide && <Card part={part} onClose={() => setSelected(null)} onStep={step} overlay />}
        </div>
        {part && !wide && <Card part={part} onClose={() => setSelected(null)} onStep={step} />}
      </div>

      <div className="mt-8">
        {groups.map((g) => (
          <section key={g} className="mt-6 first:mt-0">
            <h2 className="micro !font-mono mb-2">{g}</h2>
            <dl className="m-0 border-t border-line">
              {pcParts
                .filter((p) => p.group === g)
                .map((p) => (
                  <div
                    key={p.id}
                    className={`grid grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-line py-3.5 transition-colors sm:grid-cols-[minmax(0,160px)_minmax(0,1fr)_auto] ${
                      selected === p.id ? "bg-raised" : ""
                    }`}
                  >
                    <dt className="text-[14.5px] text-muted">{p.label}</dt>
                    <dd className="m-0 min-w-0">
                      <button
                        type="button"
                        onClick={() => showFromList(p.id)}
                        aria-current={selected === p.id}
                        className="cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-fg underline decoration-transparent underline-offset-[3px] transition-colors hover:decoration-accent"
                      >
                        {p.name}
                      </button>
                      <p className="m-0 mt-0.5 text-sm text-muted">{p.blurb}</p>
                    </dd>
                    <dd className="col-start-2 m-0 sm:col-start-3 sm:self-center">
                      <ShopLinks part={p} compact />
                    </dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}

function Card({
  part,
  onClose,
  onStep,
  overlay,
}: {
  part: PcPart;
  onClose: () => void;
  onStep: (n: number) => void;
  overlay?: boolean;
}) {
  return (
    <aside
      aria-live="polite"
      className={`setup-card rounded-lg border border-line bg-raised/92 p-4 backdrop-blur-md ${
        overlay ? "absolute top-3 right-3 w-[300px] shadow-[0_12px_40px_rgba(0,0,0,.45)]" : "relative mt-3"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Back to the full setup"
        className="press absolute top-2.5 right-2.5 z-10 grid size-8 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-lg leading-none text-muted transition-colors hover:text-fg"
      >
        ×
      </button>
      <p className="micro m-0 text-accent">{part.label}</p>
      <h2 className="m-0 mt-1 mr-6 text-xl leading-tight font-semibold">{part.name}</h2>
      <p className="m-0 mt-2 mb-4 text-sm text-muted">{part.blurb}</p>
      <ShopLinks part={part} />
      <div className="mt-3 flex justify-between font-mono text-xs">
        <button type="button" onClick={() => onStep(-1)} className="cursor-pointer border-0 bg-transparent p-1 text-muted transition-colors hover:text-fg">
          ← Previous
        </button>
        <button type="button" onClick={() => onStep(1)} className="cursor-pointer border-0 bg-transparent p-1 text-muted transition-colors hover:text-fg">
          Next →
        </button>
      </div>
    </aside>
  );
}
