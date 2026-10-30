const FPS = 24;

function p2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Seconds to an HH:MM:SS:FF video timecode at 24fps. */
export function timecode(seconds: number) {
  const s = Math.max(0, seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const f = Math.floor((s % 1) * FPS);
  return `${p2(h)}:${p2(m)}:${p2(sec)}:${p2(f)}`;
}
