// Fired before jumping to a section so every DeferredRender mounts its real
// content first; otherwise the placeholders resize after the jump and the
// scroll lands short of the target.
export const RENDER_ALL_SECTIONS_EVENT = "deferred-render:all";

export function scrollToSection(hash: string, behavior: ScrollBehavior = "smooth"): boolean {
  const id = hash.replace(/^#/, "");
  if (!document.getElementById(id)) return false;

  window.dispatchEvent(new Event(RENDER_ALL_SECTIONS_EVENT));

  // Wait two frames so React has committed the newly rendered sections
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
    })
  );
  return true;
}
