import Link from "next/link";
import ScatterDoodles from "@/components/ScatterDoodles";
import { getAllPostMeta } from "@/lib/posts";

export const metadata = { title: "writing — harshith mente" };

export default function Blog() {
  const posts = getAllPostMeta();
  return (
    <div className="page">
      <ScatterDoodles names={["book", "bulb", "code", "note", "compass", "sparkle"]} />
      <main className="wrap">
        <Link className="back" href="/">
          ← home
        </Link>
        <p className="section-label">the writing desk</p>
        <p className="section-tag">things i think about, written down — tap any post to read</p>
        {posts.length === 0 ? (
          <p className="measure">nothing here yet. drafts brewing. check back soon.</p>
        ) : (
          <ul className="blog-list measure">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link className="post-card" href={`/blog/${p.slug}/`}>
                  <span className="post-card-title">{p.title}</span>
                  <span className="post-date">{p.date}</span>
                  {p.excerpt && (
                    <span className="post-excerpt">{p.excerpt}</span>
                  )}
                  <span className="post-read">read →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
