"use client";

import { useEffect, useRef } from "react";
import { colorFor, type Peer } from "@/lib/live";

const IDLE_AFTER = 30_000;

type Track = { x: number; y: number; targetX: number; targetY: number; movedAt: number };

export function CursorArrow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="live-arrow" aria-hidden="true">
      <path d="M4 3l6.6 17 2.5-7 7-2.5z" fill={color} stroke="var(--bg)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/** Other visitors on this page. Positions are drawn straight to the DOM, so React never re-renders per frame. */
export function VisitorCursors({ peers }: { peers: Peer[] }) {
  const nodes = useRef(new Map<string, HTMLDivElement>());
  const tracks = useRef(new Map<string, Track>());
  const active = peers.length > 0;

  useEffect(() => {
    const now = performance.now();
    const seen = new Set<string>();
    for (const { uid, cursor } of peers) {
      if (!cursor) continue;
      seen.add(uid);
      const track = tracks.current.get(uid);
      if (!track) {
        tracks.current.set(uid, { x: cursor.x, y: cursor.y, targetX: cursor.x, targetY: cursor.y, movedAt: now });
      } else if (track.targetX !== cursor.x || track.targetY !== cursor.y) {
        track.targetX = cursor.x;
        track.targetY = cursor.y;
        track.movedAt = now;
      }
    }
    for (const uid of tracks.current.keys()) if (!seen.has(uid)) tracks.current.delete(uid);
  }, [peers]);

  useEffect(() => {
    if (!active) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      // Updates arrive about ten times a second; easing toward them hides the steps.
      const ease = calm.matches ? 1 : 1 - Math.exp(-dt / 80);
      const main = document.getElementById("main")?.getBoundingClientRect();
      const height = document.documentElement.scrollHeight;

      for (const [uid, track] of tracks.current) {
        const node = nodes.current.get(uid);
        if (!node || !main) continue;
        track.x += (track.targetX - track.x) * ease;
        track.y += (track.targetY - track.y) * ease;
        const rawX = main.left + track.x * main.width;
        const rawY = track.y * height - window.scrollY;
        // Someone reading another part of the page stays pinned to the edge nearest them.
        const x = Math.min(Math.max(rawX, 6), window.innerWidth - 110);
        const y = Math.min(Math.max(rawY, 6), window.innerHeight - 34);
        node.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
        node.classList.toggle("is-off", x !== rawX || y !== rawY);
        node.classList.toggle("is-idle", now - track.movedAt > IDLE_AFTER);
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[35] overflow-hidden">
      {peers
        .filter((peer) => peer.cursor)
        .map((peer) => {
          const color = colorFor(peer.uid);
          return (
            <div
              key={peer.uid}
              ref={(node) => {
                if (node) nodes.current.set(peer.uid, node);
                else nodes.current.delete(peer.uid);
              }}
              className="live-cursor"
            >
              <CursorArrow color={color} />
              <span className="live-tag" style={{ background: color }}>
                {peer.name}
                <span className="live-zz"> zz</span>
              </span>
            </div>
          );
        })}
    </div>
  );
}
