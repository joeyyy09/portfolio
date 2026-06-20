import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
  doodles: string[];
};

export type Post = PostMeta & { contentHtml: string };

function asList(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

function ensureDir(): boolean {
  return fs.existsSync(POSTS_DIR);
}

function asDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v ? String(v) : "";
}

export function getAllPostMeta(): PostMeta[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: asDate(data.date),
        excerpt: (data.excerpt as string) ?? "",
        url: (data.url as string) ?? "",
        doodles: asList(data.doodles),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!ensureDir()) return null;
  const md = path.join(POSTS_DIR, `${slug}.md`);
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const file = fs.existsSync(md) ? md : fs.existsSync(mdx) ? mdx : null;
  if (!file) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const processed = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: asDate(data.date),
    excerpt: (data.excerpt as string) ?? "",
    url: (data.url as string) ?? "",
    doodles: asList(data.doodles),
    contentHtml: processed.toString(),
  };
}
