"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "../Icon";

type Theme = "light" | "system" | "dark";
const EVENT = "themechange";

function read(): Theme {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : "system";
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

function setTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", t);
  try {
    if (t === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", t);
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}

const options: { value: Theme; label: string; icon: "sun" | "system" | "moon" }[] = [
  { value: "light", label: "Light theme", icon: "sun" },
  { value: "system", label: "Match system", icon: "system" },
  { value: "dark", label: "Dark theme", icon: "moon" },
];

export function ThemeToggle() {
  const current = useSyncExternalStore(subscribe, read, () => "system" as Theme);
  return (
    <div role="group" aria-label="Theme" className="flex w-max gap-1 rounded-full border border-line p-[3px]">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-label={o.label}
          aria-pressed={current === o.value}
          onClick={() => setTheme(o.value)}
          className="press grid h-[30px] w-9 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-muted transition-[background-color,color,transform] duration-150 ease-out hover:text-fg aria-pressed:bg-raised aria-pressed:text-fg"
        >
          <Icon name={o.icon} className="size-4" />
        </button>
      ))}
    </div>
  );
}
