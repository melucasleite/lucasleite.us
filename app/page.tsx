import Image from "next/image";
import { Banner, Robot } from "./art";
import {
  CAREER,
  LAB,
  LINKS,
  LIVE,
  POSTS,
  REPOS,
  STACK,
  STATS,
} from "@/lib/content";

const NAV = [
  ["shipping", "#shipping"],
  ["work", "#work"],
  ["projects", "#projects"],
  ["lab", "#lab"],
  ["writing", "#writing"],
] as const;

function Section({
  id,
  n,
  title,
  note,
  children,
}: {
  id: string;
  n: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <h2 className="sh">
        <span className="n">{n}</span>
        <span className="t">{title}</span>
        <span className="rule" aria-hidden="true" />
        {note && <span className="note">{note}</span>}
      </h2>
      {children}
    </section>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// A plain-ASCII box: only latin glyphs, so it lines up in any monospace font.
function asciiBox(lines: string[]) {
  const w = Math.max(...lines.map((l) => l.length)) + 4;
  const bar = "+" + "-".repeat(w - 2) + "+";
  return [bar, ...lines.map((l) => "| " + l.padEnd(w - 4) + " |"), bar].join(
    "\n",
  );
}

export default function Home() {
  return (
    <>
      <div className="wallpaper" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="grain" />
      </div>

      <header className="nav">
        <div className="container nav-in">
          <a href="#top" className="brand">
            <span className="c-green">❯</span> lucas
            <span className="muted">@</span>leite
          </a>
          <nav aria-label="Sections">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="container">
        <section className="hero">
          <div className="hero-text">
            <p className="kicker">
              <span className="c-green">$</span> whoami
            </p>
            <Banner />
            <h1>
              Control &amp; automation engineer turned{" "}
              <em>principal software engineer</em>.
            </h1>
            <p className="sub">
              I build robots, games, reef automation and AI tooling, plus the
              platforms underneath them. Thirteen years of shipping, from a
              world-championship robot to systems that hold 99.99% uptime. Based
              in Orlando, FL.
            </p>
            <div className="cta">
              <a className="btn primary" href="#shipping">
                see what&apos;s shipping ↓
              </a>
              <a className="btn" href={LINKS.github} {...ext}>
                github ↗
              </a>
              <a className="btn" href={LINKS.medium} {...ext}>
                build logs ↗
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <Robot />
            <pre className="caption">
              {"// beep boop.\n// it won a world title once."}
            </pre>
          </div>
        </section>

        <ul className="stats">
          {STATS.map(([big, small]) => (
            <li key={big} className="glass">
              <strong>{big}</strong>
              <span>{small}</span>
            </li>
          ))}
        </ul>

        <Section id="shipping" n="01" title="shipping" note="live, go click">
          <div className="live">
            {LIVE.map((p, i) => (
              <article
                key={p.name}
                className={`live-card glass${i % 2 ? " flip" : ""}`}
              >
                <a
                  className="shot"
                  href={p.url}
                  {...ext}
                  aria-label={`Open ${p.name}`}
                >
                  <div className="bar">
                    <i />
                    <i />
                    <i />
                    <span>{p.url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                  </div>
                  <Image
                    src={p.shot}
                    alt={`${p.name} homepage`}
                    width={1200}
                    height={750}
                    sizes="(max-width: 760px) 100vw, 560px"
                    priority={i === 0}
                  />
                </a>
                <div className="live-body">
                  <h3>
                    <a href={p.url} {...ext}>
                      {p.name} <span className="arrow">↗</span>
                    </a>
                  </h3>
                  <p>{p.blurb}</p>
                  <ul className="tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="work" n="02" title="work" note="git log --career">
          <ol className="timeline">
            {CAREER.map((c) => (
              <li key={c.when + c.role}>
                <div className="when">{c.when}</div>
                <div className="what">
                  <h3>
                    {c.role} <span className="where">· {c.where}</span>
                  </h3>
                  <ul>
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li>
              <div className="when">2013 – 2019</div>
              <div className="what">
                <h3>
                  B.Eng.{" "}
                  <span className="where">
                    · control &amp; automation engineering
                  </span>
                </h3>
              </div>
            </li>
          </ol>
        </Section>

        <Section id="projects" n="03" title="side projects" note="open source">
          <div className="repos">
            {REPOS.map((r) => (
              <a key={r.name} className="repo glass" href={r.url} {...ext}>
                <h3>
                  <span className="muted">~/</span>
                  {r.name}
                </h3>
                <p>{r.blurb}</p>
                <ul className="tags">
                  {r.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </Section>

        <Section id="lab" n="04" title="the lab" note="robots and machines">
          <div className="lab">
            {LAB.map((b) => (
              <a key={b.name} className="build glass" href={b.url} {...ext}>
                <div className="photo">
                  <Image
                    src={b.img}
                    alt={b.name}
                    fill
                    sizes="(max-width: 760px) 100vw, 340px"
                  />
                  {b.year && <span className="badge">🏆 {b.year}</span>}
                </div>
                <h3>{b.name}</h3>
                <p>{b.blurb}</p>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="writing"
          n="05"
          title="writing"
          note="build logs on medium"
        >
          <ul className="posts glass">
            {POSTS.map(([year, title, url]) => (
              <li key={url}>
                <a href={url} {...ext}>
                  <span className="year">{year}</span>
                  <span className="title">{title}</span>
                  <span className="arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="stack" n="06" title="stack" note="which --all">
          <dl className="stack glass">
            {STACK.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <footer className="footer">
          <pre className="box" aria-hidden="true">
            {asciiBox([
              "thanks for scrolling.",
              "the robot says hi.",
              "",
              "say hi back on github.",
            ])}
          </pre>
          <div className="foot-links">
            <a href={LINKS.github} {...ext}>
              github.com/melucasleite
            </a>
            <a href={LINKS.medium} {...ext}>
              medium
            </a>
          </div>
          <p className="muted small">
            Next.js on Vercel. Catppuccin Mocha + JetBrains Mono, borrowed from
            my terminal.
          </p>
        </footer>
      </main>
    </>
  );
}
