"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReelView } from "@/content/types";
import { timecode } from "@/lib/timecode";
import { Icon } from "./Icon";

/** 2.39:1 reel with view tabs. A view's video mounts (and downloads) only when played. */
export function ProjectReel({ name, views }: { name: string; views: ReelView[] }) {
  const [viewId, setViewId] = useState(views[0].id);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ at: 0, progress: 0 });
  const ref = useRef<HTMLVideoElement>(null);
  const view = views.find((v) => v.id === viewId) ?? views[0];

  useEffect(() => {
    if (started) ref.current?.play().catch(() => setPlaying(false));
  }, [started, viewId]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = ref.current;
      if (v && v.duration) setTime({ at: v.currentTime, progress: v.currentTime / v.duration });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  function pick(id: string) {
    if (id === viewId) return;
    setViewId(id);
    setStarted(false);
    setPlaying(false);
    setTime({ at: 0, progress: 0 });
  }

  function toggle() {
    if (!view.src) return;
    if (!started) return setStarted(true);
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  return (
    <div>
      <div className="frame-dash relative aspect-[2.39/1] max-w-full overflow-hidden rounded-md border border-line bg-sunk">
        {view.poster && !started && (
          <Image src={view.poster} alt="" fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
        )}
        {started && view.src && (
          <video
            key={view.id}
            ref={ref}
            src={view.src}
            playsInline
            className="absolute inset-0 size-full object-cover transition-opacity duration-200 ease-out starting:opacity-0"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
        )}
        {!view.poster && !view.src && (
          <div className="absolute inset-0 grid place-content-center gap-1 p-4 text-center text-sm text-muted">
            <b className="font-semibold text-fg">{name}</b>
            <span>{view.placeholder}</span>
          </div>
        )}
        <div className="absolute inset-x-3.5 bottom-3 z-[2] flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            disabled={!view.src}
            aria-label={!view.src ? `${view.label} video coming soon` : playing ? "Pause video" : "Play video"}
            className="press grid size-10 flex-none cursor-pointer place-items-center rounded-full border-0 bg-fg text-bg transition-transform duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name={playing ? "pause" : "play"} className="size-3.5" />
          </button>
          <div className="h-0.5 flex-1 overflow-hidden rounded-sm bg-fg/18">
            <i className="block h-full origin-left bg-accent" style={{ transform: `scaleX(${time.progress})` }} />
          </div>
          <span className="tc text-fg">{timecode(time.at)}</span>
        </div>
      </div>
      <div role="group" aria-label="View" className="mt-3 flex flex-wrap gap-1.5">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={v.id === viewId}
            onClick={() => pick(v.id)}
            className="press min-h-9 cursor-pointer rounded-sm border border-line bg-transparent px-3 text-[13.5px] text-muted transition-[color,border-color,transform] duration-150 ease-out hover:text-fg aria-pressed:border-line-strong aria-pressed:bg-raised aria-pressed:text-fg"
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
