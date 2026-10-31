"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { colorFor, MAX_MESSAGE, MAX_NAME, messageProblem, nameProblem, type ChatMessage } from "@/lib/live";
import { Icon } from "../Icon";

const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
const dateFormat = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });

function when(at: number) {
  const date = new Date(at);
  const today = date.toDateString() === new Date().toDateString();
  return today ? timeFormat.format(date) : `${dateFormat.format(date)}, ${timeFormat.format(date)}`;
}

export function VisitorChat({
  id,
  me,
  count,
  messages,
  name,
  named,
  onName,
  onSend,
  onClose,
}: {
  id: string;
  me: string;
  count: number;
  messages: ChatMessage[];
  name: string;
  named: boolean;
  onName: (name: string) => void;
  onSend: (text: string) => Promise<void>;
  onClose: () => void;
}) {
  const [editing, setEditing] = useState(!named);
  const [draftName, setDraftName] = useState(name);
  const [text, setText] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const list = useRef<HTMLUListElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const pinned = useRef(true);

  useEffect(() => {
    field.current?.focus();
  }, [editing]);

  useEffect(() => {
    const el = list.current;
    if (el && pinned.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function saveName(e: FormEvent) {
    e.preventDefault();
    const problem = nameProblem(draftName);
    setNote(problem ?? "");
    if (problem) return;
    onName(draftName.trim());
    setEditing(false);
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean || sending) return;
    const problem = messageProblem(clean);
    setNote(problem ?? "");
    if (problem) return;
    setSending(true);
    try {
      await onSend(clean);
      setText("");
      pinned.current = true;
    } catch {
      // The rules refuse a message sent within two seconds of the last one; the draft stays.
      setNote("That didn't send. Wait a moment and try again.");
    } finally {
      setSending(false);
      field.current?.focus();
    }
  }

  return (
    <div
      id={id}
      role="dialog"
      aria-label="Visitor chat"
      className="live-panel fixed right-[max(16px,env(safe-area-inset-right))] bottom-[calc(env(safe-area-inset-bottom,0px)+76px)] z-[36] flex h-[min(480px,calc(100dvh-156px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-lg border border-line-strong bg-raised shadow-[0_24px_60px_-20px_rgba(0,0,0,.6)]"
    >
      <div className="flex items-center gap-2 border-b border-line py-2 pr-2 pl-4">
        <h2 className="text-[15px] font-bold">Visitor chat</h2>
        <span className="tc inline-flex items-center gap-1.5 text-muted">
          <i className="dot !size-1.5" aria-hidden="true" />
          {count} here
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="press ml-auto grid size-9 cursor-pointer place-items-center rounded-sm border-0 bg-transparent text-muted hover:text-fg"
        >
          <Icon name="close" className="size-4" />
        </button>
      </div>

      <ul
        ref={list}
        role="log"
        aria-label="Messages"
        tabIndex={0}
        onScroll={(e) => {
          const el = e.currentTarget;
          pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
        }}
        className="m-0 flex min-h-0 flex-1 list-none flex-col gap-3 overflow-y-auto px-4 py-3"
      >
        {messages.length === 0 && <li className="m-auto text-sm text-muted">No messages yet. Say hi.</li>}
        {messages.map((m) => (
          <li key={m.id} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2.5">
            <span
              aria-hidden="true"
              style={{ background: colorFor(m.uid) }}
              className="grid size-7 place-items-center rounded-full text-[12px] font-bold text-[#0b0d11]"
            >
              {m.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <span className="text-[13.5px] font-semibold break-words">
                {m.name}
                {m.uid === me && <span className="font-normal text-muted"> (you)</span>}
                <small className="tc ml-1.5 font-normal text-faint">{when(m.at)}</small>
              </span>
              <p className="text-[14.5px] leading-snug break-words">{m.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {editing ? (
        <form onSubmit={saveName} className="grid gap-2 border-t border-line p-3">
          <label htmlFor="live-name" className="text-[13px] text-muted">
            What should people call you?
          </label>
          <div className="flex gap-2">
            <input
              ref={field}
              id="live-name"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              maxLength={MAX_NAME}
              autoComplete="off"
              className="min-h-11 w-full min-w-0 rounded-sm border border-line bg-bg px-3 text-base text-fg focus:border-accent sm:text-[15px]"
            />
            <button className="btn btn-primary" type="submit">
              Join
            </button>
          </div>
          <p aria-live="polite" className="min-h-[1.4em] text-[12.5px] text-muted">
            {note || "Your name and messages are visible to everyone here."}
          </p>
        </form>
      ) : (
        <form onSubmit={send} className="grid gap-2 border-t border-line p-3">
          <div className="flex gap-2">
            <label htmlFor="live-message" className="sr-only">
              Message
            </label>
            <input
              ref={field}
              id="live-message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX_MESSAGE}
              placeholder="Say hi"
              autoComplete="off"
              className="min-h-11 w-full min-w-0 rounded-sm border border-line bg-bg px-3 text-base text-fg placeholder:text-faint focus:border-accent sm:text-[15px]"
            />
            <button className="btn btn-primary" type="submit" disabled={sending || !text.trim()}>
              Send
            </button>
          </div>
          <p aria-live="polite" className="flex min-h-[1.4em] items-baseline justify-between gap-2 text-[12.5px] text-muted">
            <span>{note || "Messages are public."}</span>
            <button
              type="button"
              onClick={() => {
                setNote("");
                setDraftName(name);
                setEditing(true);
              }}
              className="link flex-none cursor-pointer border-0 bg-transparent p-0 text-[12.5px]"
            >
              Chatting as {name}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
