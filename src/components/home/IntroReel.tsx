"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { timecode } from "@/lib/timecode";
import { Icon } from "../Icon";

type Props = { photo: string; video?: string; name: string };

/**
 * The portrait slot. With a video set, a small button swaps in the clip; it plays with sound,
 * can be paused, and the photo comes back when it ends. The file loads only after the click.
 */
export function IntroReel({ photo, video, name }: Props) {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ left: 30, progress: 0 });
  const ref = useRef<HTMLVideoElement>(null);

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
    <div className="relative aspect-[4/5] w-[140px] max-w-full overflow-hidden rounded-md border border-line bg-sunk sm:w-[168px]">
      <Image
        src={photo}
        alt={`Portrait of ${name}`}
        fill
        priority
        sizes="168px"
        className="object-cover grayscale"
      />
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
          <span className={`tc absolute top-2 right-2 text-[11px] ${active ? "text-fg" : "text-muted"}`}>
            {timecode(time.left)}
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-label={label}
            className="press absolute bottom-2 left-2 inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full border-0 bg-fg py-0 pr-2.5 pl-2 text-[12.5px] font-semibold text-bg transition-transform duration-150 ease-out"
          >
            <Icon name={playing ? "pause" : "play"} className="size-3" />
            <span>{!active ? "30-sec intro" : playing ? "Pause" : "Resume"}</span>
          </button>
          <div className="absolute inset-x-0 bottom-0 h-0.5" aria-hidden="true">
            <i className="block h-full origin-left bg-accent" style={{ transform: `scaleX(${time.progress})` }} />
          </div>
        </>
      )}
    </div>
  );
}
