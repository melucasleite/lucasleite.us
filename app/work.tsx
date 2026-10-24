import { CAREER } from "@/lib/content";

const START = 2013;
const END = 2026;
const COLORS = [
  "var(--mauve)",
  "var(--blue)",
  "var(--teal)",
  "var(--green)",
  "var(--peach)",
  "var(--yellow)",
];
const slug = (i: number) => `ch-${CAREER.length - i}`;

// The career as a story: one line, a 2013–2026 strip showing how the eras
// overlap, then a chapter per role with the details one click away.
export function Work() {
  // Oldest first for the strip, so it reads left to right, top to bottom.
  const bars = CAREER.map((c, i) => ({ ...c, i })).sort(
    (a, b) => a.from - b.from || a.to - b.to,
  );
  const years = Array.from({ length: END - START + 1 }, (_, i) => START + i);

  return (
    <div className="work">
      <p className="work-lede">
        From a robotics lab in 2013 to{" "}
        <em>principal engineer at one of America&apos;s most iconic brands</em>,
        by way of six years of startups.
      </p>

      <div className="strip glass" aria-hidden="true">
        <div
          className="strip-grid"
          style={{ "--years": years.length } as React.CSSProperties}
        >
          {bars.map((c) => (
            <a
              key={c.i}
              href={`#${slug(c.i)}`}
              tabIndex={-1}
              className="strip-bar"
              style={
                {
                  gridColumn: `${c.from - START + 1} / ${c.to - START + 2}`,
                  "--c": COLORS[c.i % COLORS.length],
                } as React.CSSProperties
              }
            >
              {c.short}
            </a>
          ))}
        </div>
        <div
          className="strip-grid strip-axis"
          style={{ "--years": years.length } as React.CSSProperties}
        >
          {years.map((y, i) => (
            <span key={y} className="strip-year" style={{ gridColumn: i + 1 }}>
              {i % 2 === 0 || y === END ? `'${String(y).slice(2)}` : ""}
            </span>
          ))}
        </div>
      </div>

      <ol className="chapters">
        {CAREER.map((c, i) => (
          <li
            key={c.when + c.role}
            id={slug(i)}
            style={{ "--c": COLORS[i % COLORS.length] } as React.CSSProperties}
          >
            <div className="ch-meta">
              <span className="ch-n">
                ch.{String(CAREER.length - i).padStart(2, "0")}
              </span>
              <span className="when">{c.when}</span>
            </div>
            <div className="what">
              <h3>
                {c.role} <span className="where">· {c.where}</span>
              </h3>
              <p className="story">{c.story}</p>
              {c.highlights.length > 0 && (
                <ul className="wins">
                  {c.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {c.points.length > 0 && (
                <details>
                  <summary>git show --stat</summary>
                  <ul>
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
