import Image from "next/image";
import Link from "next/link";
import type { Repo } from "@/lib/content";
import { ext } from "./chrome";
import { ExplorerSwipe } from "./explorer-swipe";
import { KindDots, Kinds } from "./kinds";

// An editor-style explorer: a file tree on the left, the open project on the
// right. Picking a project is a native radio group, so it works with no JS
// and every pane stays in the HTML for crawlers. On phones the panes also
// swipe sideways (see explorer-swipe.tsx).
export function Explorer({ repos }: { repos: Repo[] }) {
  // Pair the nth radio with the nth pane. Generated so the list can grow.
  const show = repos
    .map(
      (_, i) =>
        `.explorer:has(.ex-tree li:nth-child(${i + 1}) input:checked) .ex-pane:nth-child(${i + 1})`,
    )
    .join(",");

  return (
    <div className="explorer glass">
      <style>{`@supports selector(:has(a)){.ex-pane{display:none}${show}{display:flex}}`}</style>
      <ExplorerSwipe />
      <div className="ex-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>~/projects</span>
      </div>
      <div className="ex-body">
        <div className="ex-side">
          <p className="ex-root" aria-hidden="true">
            <span className="c-green">❯</span> tree ~/projects
          </p>
          <ul className="ex-tree" role="radiogroup" aria-label="Projects">
            {repos.map((r, i) => (
              <li key={r.name}>
                <label>
                  <input
                    type="radio"
                    name="project"
                    value={r.name}
                    defaultChecked={i === 0}
                  />
                  <span className="branch" aria-hidden="true">
                    {i === repos.length - 1 ? "└── " : "├── "}
                  </span>
                  <span className="name">{r.name}</span>
                  {r.fresh && <span className="fresh">new</span>}
                  <KindDots kinds={r.kinds} />
                </label>
              </li>
            ))}
          </ul>
          <p className="ex-count" aria-hidden="true">
            {repos.length} directories, 0 regrets
          </p>
        </div>

        <div className="ex-panes">
          {repos.map((r, i) => (
            <article key={r.name} className="ex-pane">
              <p className="ex-path" aria-hidden="true">
                ~/projects/{r.name}/README.md
              </p>
              <h3>
                <span className="muted">~/</span>
                {r.name}
              </h3>
              <p className="ex-blurb">{r.blurb}</p>
              <Kinds kinds={r.kinds} />
              <ul className="tags">
                {r.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {r.shot && (
                <a
                  className="shot"
                  href={r.site ?? r.url}
                  {...ext}
                  aria-label={`Open ${r.name}`}
                >
                  <Image
                    src={r.shot}
                    alt={`Screenshot of ${r.name}`}
                    width={1200}
                    height={750}
                    sizes="(max-width: 760px) 100vw, 640px"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </a>
              )}
              <div className="cta">
                {r.site && (
                  <a className="btn primary" href={r.site} {...ext}>
                    {r.site.replace(/^https?:\/\/(www\.)?/, "")} ↗
                  </a>
                )}
                <Link className="btn" href={`/projects/${r.name}`}>
                  cat README.md →
                </Link>
                <a className="btn" href={r.url} {...ext}>
                  source ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
