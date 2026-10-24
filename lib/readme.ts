import { cacheLife } from "next/cache";

const OWNER = "melucasleite";

// A repo's README as HTML. GitHub renders and sanitizes it; we only fix the
// relative links, swap the permalink icons for bare anchors and shift
// headings down a level so the project page keeps a single h1. Returns null
// if GitHub is unreachable, so a page still renders from its blurb.
export async function getReadme(repo: string): Promise<string | null> {
  "use cache";
  cacheLife("days");

  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${repo}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.html+json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  ).catch(() => null);
  if (!res?.ok) return null;

  const html = await res.text();
  const body = html.match(/<article[^>]*>([\s\S]*)<\/article>/)?.[1];
  if (!body) return null;

  const raw = `https://raw.githubusercontent.com/${OWNER}/${repo}/HEAD/`;
  const blob = `https://github.com/${OWNER}/${repo}/blob/HEAD/`;
  const relative = /^(?![a-z][a-z0-9+.-]*:|\/\/|#|\/)/i;

  return body
    .replace(
      /<a [^>]*?id="([^"]+)"[^>]*class="anchor"[^>]*>[\s\S]*?<\/a>/g,
      '<span id="$1"></span>',
    )
    .replace(/\b(src|href)="([^"]*)"/g, (_, attr: string, url: string) => {
      if (url.startsWith("#")) return `${attr}="#user-content-${url.slice(1)}"`;
      if (!relative.test(url)) return `${attr}="${url}"`;
      return `${attr}="${attr === "src" ? raw : blob}${url.replace(/^\.\//, "")}"`;
    })
    .replace(
      /<(\/?)h([1-5])\b/g,
      (_, slash: string, n: string) => `<${slash}h${Number(n) + 1}`,
    );
}
