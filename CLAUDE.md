@AGENTS.md

# lucasleite.us

Lucas's portfolio: Next.js 16 (App Router, `cacheComponents: true`) on Vercel,
fully static apart from one webhook route. Catppuccin Mocha + glass, mono as an
accent. See README.md for the tour.

## Map

- `lib/content.ts`: every word and link on the site (`SITE`, `LINKS`, `LIVE`,
  `REPOS`, `LAB`, `POSTS`, `STACK`). Change copy here, not in components.
- `app/page.tsx`: the homepage sections + its JSON-LD graph.
- `app/chrome.tsx`: wallpaper, nav and footer shared by every page.
- `app/explorer.tsx`: the projects explorer (CSS-only, see below).
- `app/projects/`: `/projects` index and `/projects/[slug]` pages, each
  rendering the repo's README.
- `lib/readme.ts`: fetches + renders + sanitizes a README, tagged per repo.
- `app/api/revalidate/route.ts` + `lib/github-hooks.ts`: the README webhook.
- `app/layout.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`,
  `opengraph-image.*`: SEO plumbing.

## Workflow

- Use `yarn`. Run `npx prettier@3 --write` on what you changed, then
  `yarn lint` and `yarn build`.
- Don't start `next dev`; Lucas runs his own on :3000. To check something in a
  browser, `yarn build` then `yarn next start -p 3123` and open that.
- Check phones at 375px: `document.documentElement.scrollWidth` must equal the
  viewport width. Overflow has bitten us twice (footer links, hidden radios).
- One branch per change, cut from a fresh `origin/main`, then a PR.
- **Before pushing to any branch, confirm its PR is still open**
  (`gh pr view <n> --json state`). Lucas merges fast; a push to a merged
  branch silently never ships. If it's merged, branch again from main.
- Vercel only deploys `main` (`vercel.json`: `"**": false, "main": true`).
  There are no preview deployments, so verify locally before merging.
- Never paste, store or set credentials (tokens, secrets, env values) on
  Lucas's behalf. Prefer designs that need none; the README loader and the
  webhook were both built that way on purpose.

## Next 16 gotchas we hit

Read `node_modules/next/dist/docs/` before using an API; it differs from older
versions.

- With `cacheComponents`, `dynamicParams` doesn't exist. `generateStaticParams`
  must return at least one param; call `notFound()` for unknown slugs.
- Cached data: `'use cache'` + `cacheLife(...)` + `cacheTag(...)` inside the
  function. Always set a `cacheLife`.
- `revalidateTag(tag, profile)` takes two arguments; the one-argument form is
  deprecated. `updateTag` only works in Server Actions, not Route Handlers.
- Setting `openGraph` in a page's metadata drops the inherited
  `opengraph-image` file. Add an `opengraph-image.tsx` next to the page instead.
- Internal links must use `next/link` (lint error otherwise).

## Other gotchas

- `tsconfig` targets ES2017: no BigInt literals (`0n`); use `BigInt(0)`.
- `ImageResponse`'s default font lacks `❯` and box-drawing glyphs (they render
  as tofu). The site draws its ASCII art as SVG for the same reason.
- A visually hidden `position: absolute` input escapes a scrolling row and
  widens the page; anchor it to a `position: relative` parent.
- `<style>` emitted from a server component renders in place, which is how the
  explorer pairs radio N with pane N.

## Projects explorer

`app/explorer.tsx` is a native radio group; `:has(... input:checked)` shows
the matching pane. No JS, keyboard arrows work, and every pane stays in the
HTML for crawlers. Without `:has()` all panes show stacked. On phones the tree
becomes a swipeable tab row.

## Adding a project

1. Add it to `REPOS` in `lib/content.ts` (`name` = GitHub repo name, plus
   `title`, `blurb`, `tags`, optional `site`, `shot`, `fresh`).
2. Optional screenshot: 1200×750 JPEG in `public/shots/`.
3. Add the webhook below to the new repo.

The project page, share card, sitemap entry and JSON-LD come for free.

## SEO

- Metadata lives in `app/layout.tsx` (site) and `generateMetadata` (project
  pages): title template, canonical, OG/Twitter, `max-image-preview: large`.
- JSON-LD: `Person` + `ProfilePage` + `WebSite` + `SoftwareSourceCode` on the
  homepage; `SoftwareSourceCode` (+ `SoftwareApplication` when it has a site)
  - `BreadcrumbList` per project; `CollectionPage` on `/projects`. Escape `<`
    as `<` when serializing.
- `sitemap.ts` lists every page and image.
- Don't mass-produce thin pages; Google treats them as doorway pages. Every
  indexable page should carry real content (project pages carry the README).

## README webhook

Project pages render each repo's README, fetched from
`raw.githubusercontent.com/melucasleite/<repo>/HEAD/README.md` (no token, no
API rate limit), rendered with `marked` + GitHub-style heading ids, sanitized
with `sanitize-html`, and cached for a day under the tag `readme:<repo>`.

To show edits immediately, each project repo has a GitHub **push** webhook to
`https://www.lucasleite.us/api/revalidate`. The route:

1. Rejects requests whose `x-vercel-forwarded-for` IP isn't in GitHub's
   webhook ranges (`api.github.com/meta` → `hooks`, cached daily, fallback
   list in `lib/github-hooks.ts`). Vercel sets that header and overwrites
   whatever the caller sends, so it can't be spoofed. That's the whole auth
   story: no shared secret.
2. Answers `ping` with 200 and ignores other non-push events.
3. Only acts on repos owned by `melucasleite`, listed in `REPOS`, pushed to
   their default branch.
4. Calls `revalidateTag("readme:<repo>", { expire: 0 })`. The next visit to
   that project page re-renders with the fresh README; other pages keep their
   cache.

Add the webhook to a new repo (no secret, push only):

```bash
gh api -X POST repos/melucasleite/<repo>/hooks -f name=web -F active=true -f 'events[]=push' -f 'config[url]=https://www.lucasleite.us/api/revalidate' -f 'config[content_type]=json'
```

Quote the `config[...]` args or zsh treats them as globs.

Check it:

```bash
gh api repos/melucasleite/<repo>/hooks --jq '.[] | "\(.id) \(.config.url)"'
gh api repos/melucasleite/<repo>/hooks/<id>/deliveries --jq '.[] | "\(.event) \(.status_code)"'
```

Expect `ping 200` / `push 200`. A 404 means production doesn't have the route
yet (not deployed); a 403 means the IP check failed. To resend the latest
delivery, use `gh api -X POST repos/melucasleite/<repo>/hooks/<id>/deliveries/<delivery-id>/attempts`.

Test locally against `next start` by faking a GitHub IP (only works locally,
where nothing overwrites the header):

```bash
curl -X POST localhost:3123/api/revalidate -H 'x-forwarded-for: 140.82.115.10' -H 'x-github-event: push' -H 'content-type: application/json' -d '{"ref":"refs/heads/main","repository":{"name":"mark85","default_branch":"main","owner":{"login":"melucasleite"}}}'
```

Without the webhook a project page still refreshes on its own within a day.
