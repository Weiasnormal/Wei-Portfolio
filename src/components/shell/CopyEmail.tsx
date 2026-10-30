"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

/** Copies the address; if the clipboard is blocked, selects the text so it can be copied by hand. */
export function CopyEmail({ variant = "inline" }: { variant?: "inline" | "button" }) {
  const [state, setState] = useState<"idle" | "copied" | "select">("idle");
  const textRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function done(next: "copied" | "select") {
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  function selectFallback() {
    const el = textRef.current;
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    done("select");
  }

  function copy() {
    try {
      navigator.clipboard.writeText(site.email).then(() => done("copied"), selectFallback);
    } catch {
      selectFallback();
    }
  }

  const status = state === "copied" ? "Copied" : state === "select" ? "Select and copy" : "";

  if (variant === "button")
    return (
      <div className="flex flex-wrap items-center gap-2.5">
        <code
          ref={textRef}
          className="rounded-sm border border-line bg-raised px-3.5 py-2.5 font-mono text-[15px] break-all select-all"
        >
          {site.email}
        </code>
        <button type="button" className="btn" onClick={copy}>
          {status || "Copy email"}
        </button>
      </div>
    );

  return (
    <div className="text-[13.5px] text-muted">
      Reach me at
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${site.email}`}
        className="mt-0.5 block cursor-pointer border-0 bg-transparent py-1 text-left text-sm break-all text-fg"
      >
        <span ref={textRef}>{site.email}</span>
      </button>
      <span aria-live="polite" className="block min-h-[1.2em] text-xs text-faint">
        {status}
      </span>
    </div>
  );
}
