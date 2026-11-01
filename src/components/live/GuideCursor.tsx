"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/lib/site";
import { Icon } from "../Icon";
import { CursorArrow } from "./VisitorCursors";

// The tour needs room and a mouse, and it is pure motion, so it respects reduced motion by not running.
const CAPABLE = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const SEEN_KEY = "guide-seen";
const HIDDEN_KEY = "guide-hidden";
const ownerName = site.name.split(" ")[0];

type Point = { x: number; y: number };
type Anchor = "right" | "below" | "above";
type Step = { target?: string; at?: Anchor; text: string };

// In order. A step is skipped when its target isn't on screen, so scrolling never sends the guide off the page.
const steps: Step[] = [
  { target: "name", at: "above", text: `Hi, I'm ${ownerName}. Welcome to my portfolio!` },
  { target: "projects-cta", at: "below", text: "Start here to see what my teams have built." },
  { target: "cv", at: "below", text: "My CV, if you're reviewing me for OJT." },
  { target: "nav-/writing", text: "Write-ups on how those projects actually went." },
  { target: "nav-/outside", text: "And who I am away from the IDE." },
  { target: "chat", at: "above", text: "This one's live. It shows who's here right now, and you can say hi to them." },
  { target: "email", text: "The quickest way to reach me." },
  { text: "That's the tour. Enjoy looking around!" },
];

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked: the tour just greets them again next visit.
  }
}

function useCapable() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(CAPABLE);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(CAPABLE).matches,
    () => false,
  );
}

const between = (min: number, max: number) => min + Math.random() * (max - min);

function runTour(
  parts: { root: HTMLElement; bubble: HTMLElement; typed: HTMLElement; rest: HTMLElement },
  signal: AbortSignal,
) {
  const { root, bubble, typed, rest } = parts;
  // `goal` is where the hand is heading; `shown` follows it on a spring, so nothing ever snaps.
  const goal: Point = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.5 };
  const shown = { ...goal, vx: 0, vy: 0 };
  const STIFFNESS = 170;
  const DAMPING = 2 * Math.sqrt(STIFFNESS) * 0.85;
  let clock = 0;
  let last = performance.now();
  let frame = 0;
  let stroke: { from: Point; to: () => Point; bow: number; at: number; length: number; done: () => void } | null = null;
  let resting: (() => Point) | null = null;
  let timers: { at: number; done: () => void }[] = [];

  const tick = (now: number) => {
    const dt = Math.min(now - last, 50);
    last = now;
    clock += dt;

    if (stroke) {
      const p = Math.min((clock - stroke.at) / stroke.length, 1);
      const eased = p * p * p * (p * (p * 6 - 15) + 10); // minimum jerk, the curve of a real hand reaching
      const to = stroke.to();
      const dx = to.x - stroke.from.x;
      const dy = to.y - stroke.from.y;
      const size = Math.hypot(dx, dy) || 1;
      const arc = Math.sin(Math.PI * eased) * stroke.bow;
      goal.x = stroke.from.x + dx * eased - (dy / size) * arc;
      goal.y = stroke.from.y + dy * eased + (dx / size) * arc;
      if (p === 1) {
        const { done, to: settle } = stroke;
        resting = settle;
        stroke = null;
        done();
      }
    } else if (resting) {
      Object.assign(goal, resting()); // follows the target if the page scrolls mid-sentence
    }

    const seconds = dt / 1000;
    shown.vx += (STIFFNESS * (goal.x - shown.x) - DAMPING * shown.vx) * seconds;
    shown.vy += (STIFFNESS * (goal.y - shown.y) - DAMPING * shown.vy) * seconds;
    shown.x += shown.vx * seconds;
    shown.y += shown.vy * seconds;
    const driftX = Math.sin(clock / 760) * 1.3;
    const driftY = Math.cos(clock / 940) * 1.1;
    root.style.transform = `translate3d(${(shown.x + driftX).toFixed(1)}px,${(shown.y + driftY).toFixed(1)}px,0)`;

    timers = timers.filter((t) => {
      if (t.at > clock) return true;
      t.done();
      return false;
    });
    frame = requestAnimationFrame(tick);
  };

  // Runs on the frame clock, so a backgrounded tab pauses the tour instead of skipping ahead.
  const sleep = (ms: number) => new Promise<void>((done) => timers.push({ at: clock + ms, done }));
  const reach = (to: () => Point) =>
    new Promise<void>((done) => {
      const target = to();
      const distance = Math.hypot(target.x - goal.x, target.y - goal.y);
      stroke = {
        from: { ...goal },
        to,
        bow: Math.min(distance * between(0.06, 0.2), 54) * (Math.random() < 0.5 ? -1 : 1),
        at: clock,
        length: Math.min(Math.max(240 + Math.sqrt(distance) * 24, 340), 1050),
        done,
      };
    });

  const anchorOf = (el: Element, at: Anchor = "right") => () => {
    const r = el.getBoundingClientRect();
    if (at === "above") return { x: r.left + Math.min(r.width / 2, 40), y: r.top - 30 };
    if (at === "below") return { x: r.left + r.width / 2, y: r.bottom + 3 };
    return { x: r.right + 6, y: r.top + r.height / 2 };
  };

  async function say(text: string) {
    const letters = Array.from(text);
    typed.textContent = "";
    rest.textContent = text; // reserves the final size, so words never jump lines while typing
    bubble.classList.add("is-open");
    placeBubble();
    for (let i = 0; i < letters.length; i++) {
      if (signal.aborted) return;
      typed.textContent = letters.slice(0, i + 1).join("");
      rest.textContent = letters.slice(i + 1).join("");
      await sleep(/[.,!?]/.test(letters[i]) ? between(120, 220) : between(18, 42));
    }
    await sleep(1000 + letters.length * 16);
    bubble.classList.remove("is-open");
  }

  // Flip the bubble back toward the page when it would run off the viewport.
  function placeBubble() {
    const box = bubble.getBoundingClientRect();
    bubble.classList.toggle("flip-x", goal.x + box.width + 30 > window.innerWidth);
    bubble.classList.toggle("flip-y", goal.y + box.height + 40 > window.innerHeight);
  }

  const onScreen = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.top >= 0 && r.bottom <= window.innerHeight;
  };

  const finished = (async () => {
    root.style.transform = `translate3d(${shown.x}px,${shown.y}px,0)`;
    await sleep(120);
    root.classList.add("is-on");
    let lit: Element | null = null;
    for (const step of steps) {
      if (signal.aborted) break;
      const el = step.target ? document.querySelector(`[data-guide="${step.target}"]`) : null;
      if (step.target && (!el || !onScreen(el))) continue;
      lit?.removeAttribute("data-guide-on");
      lit = null;
      if (el) {
        await reach(anchorOf(el, step.at));
        el.setAttribute("data-guide-on", "");
        lit = el;
      } else {
        const side = document.getElementById("side")?.getBoundingClientRect().right ?? 0;
        const open = { x: side + (window.innerWidth - side) * 0.45, y: window.innerHeight * 0.4 };
        await reach(() => open);
      }
      if (signal.aborted) break;
      await sleep(between(90, 180));
      await say(step.text);
    }
    lit?.removeAttribute("data-guide-on");
    root.classList.remove("is-on");
    await sleep(260);
  })();

  frame = requestAnimationFrame(tick);
  signal.addEventListener("abort", () => {
    // Release anything still waiting so the sequence above can unwind and clean up.
    stroke?.done();
    stroke = null;
    timers.forEach((t) => t.done());
    timers = [];
    document.querySelector("[data-guide-on]")?.removeAttribute("data-guide-on");
    bubble.classList.remove("is-open");
    root.classList.remove("is-on");
  });
  // After an abort the tick keeps resolving the last short sleeps; it stops once they're done.
  return finished.finally(() => cancelAnimationFrame(frame));
}

/** A scripted cursor that walks first-time visitors through the home page, typing as it goes. */
export function GuideCursor() {
  const pathname = usePathname();
  const capable = useCapable();
  const home = pathname === "/";
  const able = capable && home;
  const [running, setRunning] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [autoChecked, setAutoChecked] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const typed = useRef<HTMLSpanElement>(null);
  const rest = useRef<HTMLSpanElement>(null);

  // Greet once, a beat after the page settles. Returning visitors get the replay button instead.
  useEffect(() => {
    if (!able || autoChecked) return;
    const timer = window.setTimeout(() => {
      setAutoChecked(true);
      setHidden(read(HIDDEN_KEY) === "1");
      if (read(SEEN_KEY) || read(HIDDEN_KEY) === "1") return;
      write(SEEN_KEY, "1");
      setRunning(true);
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [able, autoChecked]);

  useEffect(() => {
    if (!running || !able) return;
    if (!root.current || !bubble.current || !typed.current || !rest.current) return;
    const stop = new AbortController();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRunning(false);
    };
    document.addEventListener("keydown", onKey);
    runTour({ root: root.current, bubble: bubble.current, typed: typed.current, rest: rest.current }, stop.signal).then(
      () => {
        if (!stop.signal.aborted) setRunning(false);
      },
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      stop.abort();
    };
  }, [running, able]);

  const showPrompt = able && autoChecked && !hidden;

  return (
    <>
      {able && (
        <div ref={root} aria-hidden="true" className="guide-cursor">
          <CursorArrow color="var(--accent)" />
          <div ref={bubble} className="guide-bubble">
            <b>{ownerName}</b>
            <span>
              <span ref={typed} />
              <span ref={rest} className="invisible" />
            </span>
          </div>
        </div>
      )}
      {showPrompt && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] left-[calc(var(--side)+20px)] z-[36] flex items-center gap-1">
          {running ? (
            <button type="button" className="live-dock press min-h-9 cursor-pointer rounded-full px-3.5 text-[13px] text-muted hover:text-fg" onClick={() => setRunning(false)}>
              Skip tour <span className="tc ml-1 text-faint">Esc</span>
            </button>
          ) : (
            <>
              <button type="button" className="live-dock press min-h-9 cursor-pointer rounded-full px-3.5 text-[13px] text-muted hover:text-fg" onClick={() => setRunning(true)}>
                Take the tour again
              </button>
              <button
                type="button"
                aria-label="Hide the tour button"
                className="press grid size-9 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-faint hover:text-fg"
                onClick={() => {
                  write(HIDDEN_KEY, "1");
                  setHidden(true);
                }}
              >
                <Icon name="close" className="size-3.5" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
