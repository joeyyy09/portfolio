import Link from "next/link";
import Doodle from "@/components/Doodle";
import DoodleField from "@/components/DoodleField";
import { hero, intro, introWhisper, sections, outro } from "@/content/bio";
import { getAllPostMeta } from "@/lib/posts";

export default function Home() {
  const posts = getAllPostMeta().slice(0, 4);
  return (
    <div className="page">
      <DoodleField />
      <main className="wrap">
        <p className="eyebrow">＿ scroll ＿</p>

        <h1>{hero.title}</h1>
        <p className="tagline">{hero.tagline}</p>

        <div className="measure">
          {intro.map((p, i) => (
            <p key={i} className="lead">
              {p}
            </p>
          ))}
        </div>

        <p className="whisper">{introWhisper}</p>

        {sections.map((s) => (
          <section key={s.id} className="section" id={s.id}>
            <hr className="rule" />
            <p className="section-label">{s.label}</p>
            {s.tag && <p className="section-tag">{s.tag}</p>}
            {s.lead && <p className="section-lead measure">{s.lead}</p>}
            {s.entries.map((e, i) => (
              <div key={i} className="entry measure">
                <div className="entry-head">
                  <span className="entry-title">{e.title}</span>
                  {e.meta && <span className="entry-meta">{e.meta}</span>}
                </div>
                <p className="entry-body">{e.body}</p>
              </div>
            ))}
            {s.whisper && <p className="whisper">{s.whisper}</p>}
          </section>
        ))}

        {posts.length > 0 && (
          <section className="section" id="writing">
            <hr className="rule" />
            <p className="section-label">the writing desk</p>
            <p className="section-tag">things i think about, written down</p>
            <ul className="blog-list measure">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link className="post-link" href={`/blog/${p.slug}/`}>
                    {p.title}
                  </Link>
                  <span className="post-date">{p.date}</span>
                  {p.excerpt && <p className="post-excerpt">{p.excerpt}</p>}
                </li>
              ))}
            </ul>
            <p className="more-link">
              <Link href="/blog/">all writing →</Link>
            </p>
          </section>
        )}

        <hr className="rule" />
        <section className="section">
          <p className="section-label">{outro.label}</p>
          {outro.tag && <p className="section-tag">{outro.tag}</p>}
          <p className="section-lead measure">{outro.body}</p>
          <div className="contact-links">
            {outro.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                <span className="k">{l.label}</span>
                {l.value}
              </a>
            ))}
          </div>
          {outro.whisper && <p className="whisper">{outro.whisper}</p>}
        </section>

        <p className="foot">
          © {new Date().getFullYear()} harshith mente
          <span className="foot-heart" aria-label="love">
            <Doodle name="heart" />
          </span>
          built with code &amp; caffeine in bengaluru
        </p>
      </main>
    </div>
  );
}
