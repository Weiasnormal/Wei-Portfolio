"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { timecode } from "@/lib/timecode";
import { Icon } from "../Icon";

type Props = { photo: string; video?: string; name: string; handle: string; status: string };

/**
 * The portrait card: a cutout photo layered over a dark backdrop, tilting toward the mouse.
 * With a video set, a small button swaps in the clip; it plays with sound, can be paused,
 * and the photo comes back when it ends. The file loads only after the click.
 */
export function IntroReel({ photo, video, name, handle, status }: Props) {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ left: 30, progress: 0 });
  const ref = useRef<HTMLVideoElement>(null);
  const card = useRef<HTMLDivElement>(null);

  // Written straight to CSS variables, so following the mouse never re-renders React.
  function tilt(e: PointerEvent<HTMLDivElement>) {
    const el = card.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--tilt-x", ((e.clientX - box.left) / box.width - 0.5).toFixed(3));
    el.style.setProperty("--tilt-y", ((e.clientY - box.top) / box.height - 0.5).toFixed(3));
  }

  function untilt() {
    card.current?.style.setProperty("--tilt-x", "0");
    card.current?.style.setProperty("--tilt-y", "0");
  }

  useEffect(() => {
    if (active) ref.current?.play().catch(() => setPlaying(false));
  }, [active]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = ref.current;
      if (v && v.duration) setTime({ left: v.duration - v.currentTime, progress: v.currentTime / v.duration });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  function toggle() {
    if (!active) return setActive(true);
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }

  function end() {
    setActive(false);
    setPlaying(false);
    setTime({ left: 30, progress: 0 });
  }

  const label = !active ? "Play 30-second intro" : playing ? "Pause intro" : "Resume intro";

  return (
    <div
      onPointerMove={tilt}
      onPointerLeave={untilt}
      className="w-64 [perspective:900px] md:w-72"
    >
      <div ref={card} className="portrait-card relative aspect-[4/5] overflow-hidden rounded-lg">
        <div aria-hidden="true" className="portrait-layer portrait-back absolute inset-0">
          <span className="portrait-code top-[14%] left-[9%]">&lt;/&gt;</span>
          <span className="portrait-code top-[9%] right-[8%]">&lt;/&gt;</span>
        </div>
        <div className="portrait-layer portrait-person absolute inset-0">
          <Image src={photo} alt={`Portrait of ${name}`} fill priority sizes="(min-width: 768px) 288px, 256px" className="object-cover object-bottom" />
        </div>
        <div aria-hidden="true" className="portrait-fade absolute inset-x-0 bottom-0 h-[42%]" />
        <div aria-hidden="true" className="portrait-shine absolute inset-0" />
        {!active && (
          <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 portrait-bar rounded-md px-3 py-2 backdrop-blur-sm">
            <span className="min-w-0 text-left text-[13px] leading-tight">
              <b className="block truncate font-semibold text-(--pc-bar-fg)">@{handle}</b>
              <span className="block truncate text-(--pc-bar-muted)">{status}</span>
            </span>
          </div>
        )}
        {active && video && (
          <video
            ref={ref}
            src={video}
            playsInline
            preload="auto"
            className="absolute inset-0 size-full object-cover transition-opacity duration-200 ease-out starting:opacity-0"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={end}
          />
        )}
        {video && (
          <>
            <span className="tc absolute top-2 right-2 text-[11px] text-[#e9ecf1]">{timecode(time.left)}</span>
            <button
              type="button"
              onClick={toggle}
              aria-label={label}
              className="press absolute top-2 left-2 inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#e9ecf1] py-0 pr-2.5 pl-2 text-[12.5px] font-semibold text-[#0b0d11] transition-transform duration-150 ease-out"
            >
              <Icon name={playing ? "pause" : "play"} className="size-3" />
              <span>{!active ? "30-sec intro" : playing ? "Pause" : "Resume"}</span>
            </button>
            <div className="absolute inset-x-0 bottom-0 h-0.5" aria-hidden="true">
              <i className="block h-full origin-left bg-[#7aa2ff]" style={{ transform: `scaleX(${time.progress})` }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
