import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/Page";
import { Rich } from "@/components/Rich";
import { getPost, posts } from "@/content/writing";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  const meta = pageMetadata(post.title, post.summary, `/writing/${post.slug}`);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article" } };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { default: Body } = await import(`@/content/writing/${post.slug}.mdx`);

  return (
    <article>
      <Crumb href="/writing">Writing</Crumb>
      <h1 className="text-[clamp(30px,4.6vw,42px)] leading-[1.1] font-bold font-stretch-115%">{post.title}</h1>
      <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
        <time dateTime={post.date}>{post.dateLabel}</time>
        <span>
          <Rich text={post.readTime} />
        </span>
        {post.project && (
          <Link className="link" href={post.project.href}>
            {post.project.label}
          </Link>
        )}
      </div>
      <div className="max-w-[64ch]">
        <Body />
      </div>
    </article>
  );
}
