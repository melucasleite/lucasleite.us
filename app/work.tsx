import { CAREER } from "@/lib/content";

const slug = (i: number) => `ch-${CAREER.length - i}`;

// The career as a story: a chapter per role, newest first.
export function Work() {
  return (
    <div className="work">
      <ol className="chapters">
        {CAREER.map((c, i) => (
          <li key={c.when + c.role} id={slug(i)}>
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
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
