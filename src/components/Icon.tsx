// Stroke icons from the prototype, drawn on a 24px grid.
const paths = {
  home: <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />,
  projects: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M10 9.5v5l4-2.5z" />
    </>
  ),
  experience: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5h6v2" />
    </>
  ),
  certifications: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L8 21l4-2 4 2-1-7.5" />
    </>
  ),
  writing: (
    <>
      <path d="M5 4h10l4 4v12H5z" />
      <path d="M9 12h6M9 16h6" />
    </>
  ),
  outside: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 14.5c1 1 2.1 1.5 3.5 1.5s2.5-.5 3.5-1.5M9 10h.01M15 10h.01" />
    </>
  ),
  setup: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5M15 15c2.3 0 4 1.2 5 3.5" />
    </>
  ),
  guestbook: <path d="M5 5h14v10H9l-4 4z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </>
  ),
  system: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M9 20h6" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
};

const filled = {
  play: <path d="M7 4.5v15l13-7.5z" />,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />,
};

export type IconName = keyof typeof paths | keyof typeof filled;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  if (name in filled)
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        {filled[name as keyof typeof filled]}
      </svg>
    );
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name as keyof typeof paths]}
    </svg>
  );
}
