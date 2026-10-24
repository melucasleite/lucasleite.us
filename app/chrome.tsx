import { LINKS } from "@/lib/content";

export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const NAV = [
  ["shipping", "#shipping"],
  ["work", "#work"],
  ["projects", "#projects"],
  ["lab", "#lab"],
  ["writing", "#writing"],
] as const;

// Wallpaper and sticky nav, shared by every page. Off the homepage the
// section links point back to it.
export function Chrome({ home = false }: { home?: boolean }) {
  const base = home ? "" : "/";
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
          <a href={home ? "#top" : "/"} className="brand">
            <span className="c-green">❯</span> lucas
            <span className="muted">@</span>leite
          </a>
          <nav aria-label="Sections">
            {NAV.map(([label, href]) => (
              <a key={href} href={base + href}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

// A plain-ASCII box: only latin glyphs, so it lines up in any monospace font.
function asciiBox(lines: string[]) {
  const w = Math.max(...lines.map((l) => l.length)) + 4;
  const bar = "+" + "-".repeat(w - 2) + "+";
  return [bar, ...lines.map((l) => "| " + l.padEnd(w - 4) + " |"), bar].join(
    "\n",
  );
}

export function Footer() {
  return (
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
        <a href={LINKS.github} {...ext} rel="me noopener noreferrer">
          github.com/melucasleite
        </a>
        <a href={LINKS.linkedin} {...ext} rel="me noopener noreferrer">
          linkedin
        </a>
        <a href={LINKS.instagram} {...ext} rel="me noopener noreferrer">
          instagram
        </a>
        <a href={LINKS.medium} {...ext} rel="me noopener noreferrer">
          medium
        </a>
      </div>
      <p className="muted small">
        Next.js on Vercel. Catppuccin Mocha + JetBrains Mono, borrowed from my
        terminal.
      </p>
    </footer>
  );
}
