"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { connectLive, liveEnabled, randomName, type ChatMessage, type LiveHandle, type Peer } from "@/lib/live";
import { Icon } from "../Icon";
import { VisitorChat } from "./VisitorChat";
import { VisitorCursors } from "./VisitorCursors";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const SEND_EVERY = 100;
// Traffic grows with the square of the crowd, so a busy page falls back to the count alone.
const MAX_CURSOR_PEERS = 12;

const NAME_KEY = "visitor-name";
const CURSORS_KEY = "visitor-cursors";

function load(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
}

function useFinePointer() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(FINE_POINTER);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

/** Live count, shared cursors and visitor chat. Renders nothing until connected, or at all without Firebase config. */
export function Live({ hidden }: { hidden: boolean }) {
  const pathname = usePathname();
  const finePointer = useFinePointer();
  const [live, setLive] = useState<LiveHandle | null>(null);
  const [peers, setPeers] = useState<Peer[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [seenAt, setSeenAt] = useState<number | null>(null);
  const [name, setName] = useState(() => (typeof window === "undefined" ? "" : load(NAME_KEY) || randomName()));
  const [named, setNamed] = useState(() => typeof window !== "undefined" && Boolean(load(NAME_KEY)));
  const [cursorsOn, setCursorsOn] = useState(() => typeof window === "undefined" || load(CURSORS_KEY) !== "off");
  const toggle = useRef<HTMLButtonElement>(null);
  const start = useRef({ name, pathname });

  useEffect(() => {
    if (!liveEnabled) return;
    let cancelled = false;
    let handle: LiveHandle | undefined;

    const connect = () => {
      connectLive({
        ...start.current,
        path: start.current.pathname,
        onPeers: (next) => {
          if (!cancelled) setPeers(next);
        },
        onMessages: (next) => {
          if (cancelled) return;
          setMessages(next);
          // What's already there on arrival isn't "new" to this visitor.
          setSeenAt((at) => at ?? next.at(-1)?.at ?? 0);
        },
      })
        .then((connected) => {
          if (cancelled) connected.close();
          else {
            handle = connected;
            setLive(connected);
          }
        })
        .catch((error) => console.warn("Live visitors unavailable:", error));
    };

    // The page comes first. Firebase waits until the browser has a free moment.
    const idle = window.requestIdleCallback?.(connect, { timeout: 2500 });
    const timer = idle === undefined ? window.setTimeout(connect, 1200) : undefined;
    return () => {
      cancelled = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
      handle?.close();
    };
  }, []);

  useEffect(() => {
    live?.setPresence({ name, path: pathname });
  }, [live, name, pathname]);

  const uid = live?.uid;
  const count = Math.max(peers.length, 1);
  const here = peers.filter((p) => p.uid !== uid && p.path === pathname);
  const shareCursor = Boolean(live) && cursorsOn && finePointer && here.length > 0 && here.length <= MAX_CURSOR_PEERS;
  const latest = messages.at(-1)?.at ?? 0;
  const unread = open || seenAt === null ? 0 : messages.filter((m) => m.at > seenAt && m.uid !== uid).length;

  // Nothing is written while alone: there is nobody to see it, and it keeps the free tier free.
  useEffect(() => {
    if (!live || !shareCursor) return;
    let pointer: { x: number; y: number } | null = null;
    let timer: number | undefined;
    let sentAt = 0;

    const flush = () => {
      timer = undefined;
      sentAt = performance.now();
      const main = document.getElementById("main")?.getBoundingClientRect();
      if (!pointer || !main || document.hidden) return live.setCursor(null);
      live.setCursor({
        x: Math.min(Math.max((pointer.x - main.left) / main.width, -1), 2),
        y: Math.min(Math.max((pointer.y + window.scrollY) / document.documentElement.scrollHeight, 0), 1),
      });
    };
    const queue = () => {
      if (timer === undefined) timer = window.setTimeout(flush, Math.max(0, SEND_EVERY - (performance.now() - sentAt)));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      queue();
    };
    const onLeave = () => {
      pointer = null;
      queue();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", queue);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", queue);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", queue);
      window.clearTimeout(timer);
      live.setCursor(null);
    };
  }, [live, shareCursor]);

  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!live) return null;

  return (
    <div inert={hidden}>
      {cursorsOn && here.length <= MAX_CURSOR_PEERS && <VisitorCursors peers={here} />}

      {open && (
        <VisitorChat
          id="live-chat"
          me={live.uid}
          count={count}
          messages={messages}
          name={name}
          named={named}
          onName={(next) => {
            setName(next);
            setNamed(true);
            save(NAME_KEY, next);
          }}
          onSend={(text) => live.send(name, text)}
          onClose={close}
        />
      )}

      <div className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] z-[36] flex items-center gap-2">
        {finePointer && (
          <button
            type="button"
            aria-pressed={cursorsOn}
            aria-label="Show visitor cursors"
            title={cursorsOn ? "Hide visitor cursors" : "Show visitor cursors"}
            onClick={() => {
              save(CURSORS_KEY, cursorsOn ? "off" : "on");
              setCursorsOn(!cursorsOn);
            }}
            className={`live-dock press grid size-11 cursor-pointer place-items-center rounded-full ${cursorsOn ? "text-accent" : "text-faint"}`}
          >
            <Icon name="pointer" className="size-[18px]" />
          </button>
        )}
        <button
          ref={toggle}
          type="button"
          data-guide="chat"
          aria-expanded={open}
          aria-controls="live-chat"
          aria-label={`Visitor chat, ${count} ${count === 1 ? "person" : "people"} here${unread ? `, ${unread} new` : ""}`}
          onClick={() => {
            setSeenAt(latest);
            if (open) close();
            else setOpen(true);
          }}
          className="live-dock press inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-[13.5px] font-medium text-fg"
        >
          <i className="dot" aria-hidden="true" />
          <span className="tabular-nums">
            {count} {count === 1 ? "person" : "people"} here
          </span>
          {unread > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[12px] font-bold text-on-accent tabular-nums">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
