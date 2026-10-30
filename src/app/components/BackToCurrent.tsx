// Plain <a> on purpose: next/link would prefix basePath and point at /v1/ instead of the new site.
export default function BackToCurrent() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- must leave the /v1 basePath
    <a
      href="/"
      className="fixed bottom-4 left-4 z-[10000] inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 text-sm font-medium text-white backdrop-blur transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span aria-hidden="true">←</span>
      Back to current portfolio
    </a>
  );
}
