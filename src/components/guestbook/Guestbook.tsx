"use client";

import { useState } from "react";

// Posting is off until the Supabase backend in docs/guestbook.md exists.
// The form is shown so visitors know what's coming; nothing is sent anywhere.

const examples = [
  { name: "Example visitor", text: "Clean layout. The project pages are easy to scan.", react: "Nice design" },
  { name: "Example classmate", text: "Saw the ResQLine pitch. Good luck on your OJT!", react: "Good luck on OJT" },
  { name: "Example dev", text: "Would join a project team for the next hackathon.", react: "Let's collab" },
];

const reactions = ["Nice design", "Let's collab", "Good luck on OJT"];

export function Guestbook() {
  const [react, setReact] = useState("");

  return (
    <div className="mt-7 flex min-w-0 flex-col rounded-lg border border-line bg-raised">
      <div className="flex items-baseline justify-between gap-2 border-b border-line px-5 py-4">
        <h2 className="text-base font-bold">Messages</h2>
        <span className="text-[13px] text-muted">Shown after review</span>
      </div>
      <ul className="m-0 flex max-h-[380px] list-none flex-col gap-3.5 overflow-y-auto px-5 py-4">
        {examples.map((m) => (
          <li key={m.name} className="grid grid-cols-[32px_minmax(0,1fr)] gap-2.5">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-full border border-line bg-sunk text-[13px] font-[650] text-muted"
            >
              {m.name.charAt(0)}
            </span>
            <div>
              <span className="text-sm font-semibold">
                {m.name}
                <span className="ml-1.5 inline-block rounded-full border border-line px-[7px] py-px text-[11.5px] font-medium text-muted">
                  Example
                </span>
                <small className="ml-1.5 font-normal text-faint">{m.react}</small>
              </span>
              <p className="text-[15px] break-words">{m.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <form
        className="grid gap-2.5 border-t border-line px-5 py-4"
        aria-describedby="gb-note"
        onSubmit={(e) => e.preventDefault()}
      >
        <div role="group" aria-label="Add a reaction" className="flex flex-wrap gap-1.5">
          {reactions.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={react === r}
              onClick={() => setReact(react === r ? "" : r)}
              className="chip !min-h-[34px] !text-[13px]"
            >
              {r}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_auto]">
          <label className="sr-only" htmlFor="gb-name">
            Name
          </label>
          <input
            id="gb-name"
            maxLength={32}
            placeholder="Name (optional)"
            autoComplete="off"
            className="min-h-11 w-full min-w-0 rounded-sm border border-line bg-bg px-3 text-base text-fg focus:border-accent sm:text-[15px]"
          />
          <label className="sr-only" htmlFor="gb-msg">
            Message
          </label>
          <input
            id="gb-msg"
            maxLength={200}
            placeholder="Leave a short message"
            autoComplete="off"
            className="min-h-11 w-full min-w-0 rounded-sm border border-line bg-bg px-3 text-base text-fg focus:border-accent sm:text-[15px]"
          />
          <button className="btn btn-primary" type="submit" disabled>
            Post
          </button>
        </div>
        <p id="gb-note" className="min-h-[1.4em] text-[13px] text-muted">
          Coming soon. Posting opens once moderation is set up.
        </p>
      </form>
    </div>
  );
}
