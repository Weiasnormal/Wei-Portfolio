"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Link, ReelView } from "@/content/types";
import { timecode } from "@/lib/timecode";
import { Icon } from "./Icon";

/**
 * Reel with view tabs. A view's video mounts (and downloads) only when played.
 * The frame takes the ratio of the project's video (the first view that sets `ratio`), and keeps it on every tab
 * so the page doesn't jump when switching; without one it is 2.39:1.
 * Captions are drawn by us rather than the browser, so they sit above the controls.
 */
export function ProjectReel({ name, views, links }: { name: string; views: ReelView[]; links?: Link[] }) {
  const ratio = views.find((v) => v.ratio)?.ratio ?? "2.39/1";
  const [viewId, setViewId] = useState(views[0].id);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ at: 0, progress: 0 });
  const [cc, setCc] = useState(false);
  const [cue, setCue] = useState("");
  const ref = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);
  const view = views.find((v) => v.id === viewId) ?? views[0];

  useEffect(() => {
    if (started) ref.current?.play().catch(() => setPlaying(false));
  }, [started, viewId]);

  useEffect(() => {
    const track = trackRef.current?.track;
    if (!started || !track) return;
    track.mode = "hidden"; // loads the cues without the browser drawing them
    const show = () =>
      setCue(
        Array.from(track.activeCues ?? [])
          .map((c) => (c as VTTCue).getCueAsHTML().textContent ?? "")
          .join("\n"),
      );
    track.addEventListener("cuechange", show);
    return () => track.removeEventListener("cuechange", show);
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
    setCue("");
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
      <div
        className="frame-dash relative max-w-full overflow-hidden rounded-md border border-line bg-sunk"
        style={{ aspectRatio: ratio }}
      >
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
          >
            {view.captions && <track ref={trackRef} kind="captions" src={view.captions} srcLang="en" label="English" />}
          </video>
        )}
        {cc && started && cue && (
          <div className="pointer-events-none absolute inset-x-0 bottom-16 z-[2] flex justify-center px-4">
            <span className="rounded-sm bg-black/75 px-2.5 py-1 text-center text-[13px] leading-snug whitespace-pre-line text-white md:text-[15px]">
              {cue}
            </span>
          </div>
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
          {view.captions && (
            <button
              type="button"
              onClick={() => setCc((on) => !on)}
              aria-pressed={cc}
              aria-label="Captions"
              className="press grid h-7 min-w-9 flex-none cursor-pointer place-items-center rounded-sm border border-fg/40 bg-transparent px-1.5 font-mono text-[11px] font-semibold text-fg transition-[background-color,color,transform] duration-150 ease-out aria-pressed:bg-fg aria-pressed:text-bg"
            >
              CC
            </button>
          )}
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
        {links && links.length > 0 && (
          <div className="ml-auto flex items-center gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link font-mono text-xs">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
