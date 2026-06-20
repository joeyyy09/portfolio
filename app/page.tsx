import Link from "next/link";
import Doodle, { type DoodleName } from "@/components/Doodle";
import DoodleField from "@/components/DoodleField";
import SectionDoodles from "@/components/SectionDoodles";
import { hero, intro, introWhisper, sections, outro } from "@/content/bio";
import { getAllPostMeta } from "@/lib/posts";

export default function Home() {
  const posts = getAllPostMeta().slice(0, 4);
  return (
    <div className="page">
      <DoodleField />
      <main className="wrap">
        <div className="topbar">
          <p className="eyebrow">＿ scroll ＿</p>
          <Link className="nav-link" href="/blog/">
            read my blogs ↗
          </Link>
        </div>

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
            {s.doodles && <SectionDoodles names={s.doodles as DoodleName[]} />}
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
            <SectionDoodles names={["book", "note", "bulb", "sparkle"]} />
            <hr className="rule" />
            <p className="section-label">the writing desk</p>
            <p className="section-tag">things i think about, written down — tap any post to read</p>
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
            <p className="more-link">
              <Link href="/blog/">read all posts →</Link>
            </p>
          </section>
        )}

        <hr className="rule" />
        <section className="section">
          <SectionDoodles names={["heart", "sparkle", "star", "chat"]} />
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
          coded in bengaluru, between ferrari race weekends, ukulele chords &amp; far too much biryani
        </p>
      </main>
    </div>
  );
}
