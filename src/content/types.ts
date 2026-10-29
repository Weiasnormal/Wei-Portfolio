// Any text field may contain [bracketed placeholders]. <Rich> renders those
// segments as visible placeholders, so unfinished copy is never mistaken for real copy.
// [label](https://…) is rendered as a link instead.

export type Link = { label: string; href: string };

export type ReelView = {
  id: string;
  label: string;
  /** Shown in the frame until a video exists. */
  placeholder: string;
  src?: string;
  poster?: string;
};

export type Fact = { label: string; value: string };

export type Section = { heading: string; body: string };

export type Project = {
  slug: string;
  title: string;
  badge: string;
  summary: string;
  /** Your role, shown on the home card. */
  role: string;
  /** Platforms, shown on the projects page card. */
  platforms: string;
  intro: string;
  description: string;
  reelName: string;
  /** Card thumbnail; the dashed placeholder frame shows while it's undefined. */
  cover?: string;
  views: ReelView[];
  facts: Fact[];
  sections: Section[];
  gallery: { label: string; wide?: boolean; src?: string }[];
  footer: [Link, Link];
};

export type AlsoBuilt = {
  title: string;
  year: string;
  description: string;
  href?: string;
  external?: boolean;
};

export type Honor = { title: string; detail: string };

export type Experience = {
  title: string;
  when: string;
  led?: boolean;
  /** Short line for the home preview. Falls back to `detail`. */
  summary?: string;
  detail: string;
};

export type Education = { title: string; when: string; detail: string };

export type Certification = {
  title: string;
  issuer: string;
  /** Shorter issuer name for the home preview. */
  issuerShort?: string;
  date: string;
  /** Shows a "Verify" link when filled. */
  verifyUrl?: string;
};

export type StackGroup = { name: string; items: string[] };

export type Social = { label: string; href: string };

export type Community = {
  name: string;
  intro: string;
  offers: { title: string; body: string }[];
  roles: string[];
  /** Discord, Messenger group or similar. The join button stays disabled until it's set. */
  joinUrl?: string;
};

export type OutsideTile = {
  title: string;
  body: string;
  shot: string;
  src?: string;
  lead?: boolean;
};

export type Spec = { label: string; value: string; video?: Link | string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  summary: string;
  readTime: string;
  project?: Link;
};
