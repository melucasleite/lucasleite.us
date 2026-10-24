<div align="center">

<a href="https://www.lucasleite.us"><img src="docs/hero.jpg" alt="lucasleite.us: a LUCAS LEITE block-letter banner and a pixel-art robot on a Catppuccin glass background" width="100%"></a>

# lucasleite.us

**My corner of the internet: robots, reef automation, a potato tycoon, and thirteen years of shipping.**
<br>Styled like my terminal. Built to be read.

[![Live](https://img.shields.io/badge/live-lucasleite.us-a6e3a1?style=for-the-badge&labelColor=1e1e2e)](https://www.lucasleite.us)

![Next.js 16](https://img.shields.io/badge/Next.js-16-cdd6f4?logo=nextdotjs&logoColor=cdd6f4&labelColor=1e1e2e)
![React 19](https://img.shields.io/badge/React-19-89b4fa?logo=react&logoColor=89b4fa&labelColor=1e1e2e)
![TypeScript](https://img.shields.io/badge/TypeScript-5-89b4fa?logo=typescript&logoColor=89b4fa&labelColor=1e1e2e)
![Vercel](https://img.shields.io/badge/deployed_on-Vercel-cdd6f4?logo=vercel&logoColor=cdd6f4&labelColor=1e1e2e)
![Catppuccin Mocha](https://img.shields.io/badge/theme-Catppuccin_Mocha-cba6f7?labelColor=1e1e2e)

</div>

```text
+--------------------------------------------------------------------+
| one page  ·  fully static  ·  no client components  ·  0 trackers  |
+--------------------------------------------------------------------+
```

## `❯ cat about.txt`

A single-page portfolio that borrows its look from my [Ghostty](https://ghostty.org) setup: **Catppuccin Mocha**,
**JetBrains Mono**, translucent glass with a heavy blur, and a slow-drifting wallpaper. The terminal is the
_accent_, not the interface. Headings, labels and art are monospace; body copy is set in Inter, so it stays
comfortable to read.

| Section         | What's in it                                                                    |
| --------------- | ------------------------------------------------------------------------------- |
| **hero**        | Block-letter banner, the pixel robot, a one-paragraph intro and four stats      |
| **01 shipping** | Live products with real screenshots: REEF64, Genesis 22 Studio, Age of Potatoes |
| **02 work**     | Career as a `git log`: roles and outcomes, no company names                     |
| **03 projects** | Open-source side quests on GitHub                                               |
| **04 lab**      | The hardware hall of fame: robots and machines, with photos                     |
| **05 writing**  | Build logs on Medium                                                            |
| **06 stack**    | `which --all`                                                                   |

<details>
<summary><b>See the whole page</b></summary>
<br>
<img src="docs/full.jpg" alt="Full-page screenshot of lucasleite.us" width="100%">
</details>

## `❯ ls -la`

```text
app/
├── layout.tsx      fonts (JetBrains Mono + Inter), metadata, viewport
├── page.tsx        every section, as server components
├── art.tsx         <Banner/> and <Robot/>: ASCII and pixel art drawn as SVG
├── globals.css     Catppuccin palette, glass, wallpaper, responsive layout
└── icon.svg        the ❯_ favicon
lib/
└── content.ts      all copy and data: stats, live sites, career, repos, lab, posts
public/
├── shots/          homepage screenshots of the live products
└── lab/            photos of the hardware builds
docs/               README images
```

## `❯ how does it work`

**Content is data.** Everything the page says lives in [`lib/content.ts`](lib/content.ts). Add a project, a
role or a post there, and the page picks it up. You don't need to touch JSX.

**The ASCII is vector, not text.** The `LUCAS LEITE` banner is figlet's _ANSI Shadow_ font. Google Fonts' latin
subsets don't ship the block (`█`) and box-drawing (`╗ ║ ═`) glyphs, so text rendering falls back to another
font with different widths and scrambles the letters. [`art.tsx`](app/art.tsx) reads the banner string at build
time and draws it instead: every `█` becomes a `<rect>`, and every box-drawing character becomes a pair of
strokes for the drop shadow. The gradient fill drifts with a little SMIL.

**The robot is mirrored pixel art.** Only the left half (16 columns × 36 rows) is hand-drawn as characters
(`@ # o :` for four shades). It's mirrored into a 32-wide sprite, a few asymmetric details are stamped on top,
and each cell becomes a `<rect>`. The eyes blink with a CSS keyframe. It's the same robot as on my
[GitHub profile](https://github.com/melucasleite).

**Readability first.** Mono at accent sizes only. Inter for paragraphs at 16.5px / 1.65, `max-width` in `ch`.
ASCII flourishes (`[tags]`, `+` bullets, `01 ---- title` rules) use plain latin characters, so they line up in
any monospace font. Motion turns off under `prefers-reduced-motion`.

**Phones are first-class.** Under 760px the hero stacks with a small robot, the cards go single-column, the
timeline collapses, and the nav scrolls sideways with a fade at the edge. Nothing scrolls horizontally.

**Static all the way down.** No `"use client"` anywhere. Every route prerenders at build time, and images go
through `next/image`.

## `❯ yarn dev`

```bash
yarn install
yarn dev        # http://localhost:3000
yarn lint
yarn build      # static prerender, same as Vercel
```

Requires Node 20+ and Yarn 1.

> [!NOTE]
> This is Next.js 16. APIs and conventions differ from older versions. Check `node_modules/next/dist/docs/`
> before reaching for memory (see [`AGENTS.md`](AGENTS.md)).

## `❯ git push`

Pushing to `main` deploys to production on Vercel. Other branches get preview URLs.

| Host                | DNS record (Squarespace)          |
| ------------------- | --------------------------------- |
| `lucasleite.us`     | `A     @    76.76.21.21`          |
| `www.lucasleite.us` | `CNAME www  cname.vercel-dns.com` |

Mail stays on Google Workspace. Leave the `MX` and `google-site-verification` `TXT` records alone.

## `❯ credits`

[Catppuccin](https://catppuccin.com) for the palette ·
[JetBrains Mono](https://www.jetbrains.com/lp/mono/) and [Inter](https://rsms.me/inter/) for type ·
figlet's ANSI Shadow for the banner ·
[Ghostty](https://ghostty.org) for the inspiration.

```text
+------------------------------------+
| thanks for reading the readme.     |
| the robot says hi.                 |
+------------------------------------+
```
