import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import sanitizeHtml from "sanitize-html";
import { cacheLife, cacheTag } from "next/cache";

export const OWNER = "melucasleite";

export const readmeTag = (repo: string) => `readme:${repo}`;

// GitHub-style heading ids, so a README's own "#quick-start" links still work.
const marked = new Marked({ gfm: true }, gfmHeadingId());

// A repo's README as HTML. The markdown comes from raw.githubusercontent.com,
// which needs no token and has no API rate limit; we render and sanitize it
// here, fix relative links and shift headings down a level so the project
// page keeps a single h1. Returns null if GitHub is unreachable, so a page
// still renders from its blurb.
export async function getReadme(repo: string): Promise<string | null> {
  "use cache";
  cacheLife("days");
  // Refreshed early by the GitHub push webhook, see app/api/revalidate.
  cacheTag(readmeTag(repo));

  const raw = `https://raw.githubusercontent.com/${OWNER}/${repo}/HEAD/`;
  const res = await fetch(raw + "README.md").catch(() => null);
  if (!res?.ok) return null;

  const html = sanitizeHtml(await marked.parse(await res.text()), {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "picture",
      "source",
      "details",
      "summary",
      "del",
      "input",
    ],
    allowedAttributes: {
      "*": ["id", "align", "title"],
      a: ["href", "name"],
      img: ["src", "srcset", "alt", "width", "height"],
      source: ["srcset", "media", "type"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      input: ["type", "checked", "disabled"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  const blob = `https://github.com/${OWNER}/${repo}/blob/HEAD/`;
  const relative = /^(?![a-z][a-z0-9+.-]*:|\/\/|#|\/)/i;

  return html
    .replace(/\b(src|href)="([^"]*)"/g, (_, attr: string, url: string) => {
      if (!relative.test(url)) return `${attr}="${url}"`;
      return `${attr}="${attr === "src" ? raw : blob}${url.replace(/^\.\//, "")}"`;
    })
    .replace(
      /<(\/?)h([1-5])\b/g,
      (_, slash: string, n: string) => `<${slash}h${Number(n) + 1}`,
    );
}
