import Link from "next/link";
import { notFound } from "next/navigation";
import ScatterDoodles from "@/components/ScatterDoodles";
import type { DoodleName } from "@/components/Doodle";
import { getAllPostMeta, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return { title: "not found · harshith mente" };
  const url = `https://harshithmente.vercel.app/blog/${post.slug}/`;
  return {
    title: `${post.title} · harshith mente`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="page">
      <ScatterDoodles names={post.doodles as DoodleName[]} />
      <main className="wrap">
        <Link className="back" href="/blog/">
          ← writing
        </Link>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-date">{post.date}</p>
        <article
          className="post-body measure"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <hr className="rule" />
        {post.url && (
          <p className="whisper">
            originally published on{" "}
            <a href={post.url} target="_blank" rel="noreferrer">
              medium
            </a>
          </p>
        )}
        <p className="foot">
          <Link href="/blog/">← all writing</Link>
          <span className="foot-sep">·</span>
          <Link href="/">home</Link>
        </p>
      </main>
    </div>
  );
}
