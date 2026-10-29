"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { site } from "@/lib/site";
import { Icon } from "../Icon";
import { CopyEmail } from "./CopyEmail";
import { isActive, navGroups } from "./nav";
import { ThemeToggle } from "./ThemeToggle";
import { V1Link } from "./V1Link";

const MOBILE = "(max-width: 1023px)";

function useIsMobile() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(MOBILE);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(MOBILE).matches,
    () => false,
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const side = useRef<HTMLElement>(null);
  const main = useRef<HTMLElement>(null);
  const drawerOpen = open && isMobile;
  // Where focus goes once the drawer has closed. It can't move earlier: the target is still inert.
  const focusAfterClose = useRef<"menu" | "main" | null>(null);

  const close = useCallback((target: "menu" | "main") => {
    focusAfterClose.current = target;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!drawerOpen) {
      const target = focusAfterClose.current;
      focusAfterClose.current = null;
      if (target === "menu") menuBtn.current?.focus();
      else if (target === "main") main.current?.focus({ preventScroll: true });
      return;
    }
    side.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close("menu");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen, close]);

  // Picking a page closes the drawer and moves focus to the new content, not the hidden drawer.
  function onNavigate() {
    if (drawerOpen) close("main");
  }

  return (
    <>
      <a
        href="#main"
        inert={drawerOpen}
        className="fixed top-2 left-2 z-[70] -translate-y-20 rounded-sm bg-accent px-3 py-2 text-sm font-semibold text-on-accent focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        inert={drawerOpen}
        className="sticky top-[env(safe-area-inset-top,0px)] z-30 flex h-[60px] items-center justify-between gap-3 border-b border-line bg-bg/88 pr-[max(16px,env(safe-area-inset-right))] pl-[max(16px,env(safe-area-inset-left))] backdrop-blur-md lg:hidden"
      >
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="wlogo h-7 w-[30px]" aria-hidden="true" />
          <b className="text-base leading-tight font-bold font-stretch-112%">{site.name}</b>
        </Link>
        <button
          ref={menuBtn}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={drawerOpen}
          aria-controls="side"
          aria-label="Open menu"
          className="press inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-line bg-transparent text-fg transition-transform duration-150 ease-out"
        >
          <Icon name="menu" className="size-[18px]" />
        </button>
      </header>

      <div
        aria-hidden="true"
        onClick={() => close("menu")}
        className={`fixed inset-0 z-[39] bg-[rgba(4,5,7,.55)] transition-opacity duration-300 lg:hidden ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={side}
        id="side"
        aria-label="Site"
        inert={isMobile && !open}
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(300px,86vw)] flex-col gap-6 overflow-y-auto border-r border-line bg-bg pt-[calc(env(safe-area-inset-top,0px)+28px)] pr-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] pl-[max(20px,calc(env(safe-area-inset-left,0px)+12px))] transition-[transform,box-shadow] duration-[380ms] ease-drawer lg:w-(--side) lg:translate-x-0 lg:shadow-none ${
          drawerOpen ? "translate-x-0 shadow-[20px_0_60px_-20px_rgba(0,0,0,.6)]" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => close("menu")}
          aria-label="Close menu"
          className="press absolute top-[calc(env(safe-area-inset-top,0px)+20px)] right-3.5 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-line bg-transparent text-fg lg:hidden"
        >
          <Icon name="close" className="size-[18px]" />
        </button>

        <Link href="/" onClick={onNavigate} className="flex items-center gap-3 no-underline">
          <span className="wlogo h-7 w-[30px]" aria-hidden="true" />
          <span className="block">
            <b className="block text-base leading-tight font-bold font-stretch-112%">{site.name}</b>
            <span className="flex items-center gap-1.5 text-[13px] text-muted">
              <i className="dot" aria-hidden="true" />
              {site.status}
            </span>
          </span>
        </Link>

        {navGroups.map((g) => (
          <nav key={g.title} aria-labelledby={`ng-${g.title}`} className="grid gap-0.5">
            <h2 id={`ng-${g.title}`} className="mb-1 ml-2.5 text-[12.5px] font-medium tracking-normal text-faint">
              {g.title}
            </h2>
            {g.items.map((item) => {
              const on = isActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={on ? "page" : undefined}
                  className={`flex min-h-[38px] items-center gap-2.5 rounded-sm px-2.5 text-[15px] no-underline transition-colors duration-150 hover:bg-raised hover:text-fg ${
                    on ? "bg-raised text-fg" : "text-muted"
                  }`}
                >
                  <Icon name={item.icon} className="size-[17px] flex-none opacity-80" />
                  {item.label}
                  {on && <span className="ml-auto size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>
        ))}

        <div className="mt-auto grid gap-3 border-t border-line pt-4">
          <ThemeToggle />
          <CopyEmail />
          <V1Link />
        </div>
      </aside>

      <main ref={main} id="main" tabIndex={-1} inert={drawerOpen} className="min-h-screen outline-none lg:ml-(--side)">
        <div
          key={pathname}
          className="page-in mx-auto max-w-[800px] pt-8 pr-[max(16px,env(safe-area-inset-right))] pb-20 pl-[max(16px,env(safe-area-inset-left))] lg:pt-14 lg:pr-[max(20px,env(safe-area-inset-right))] lg:pb-24 lg:pl-[max(20px,env(safe-area-inset-left))]"
        >
          {children}
        </div>
      </main>
    </>
  );
}
