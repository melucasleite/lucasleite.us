import Boot from "./boot";

const TABS = [
  ["neofetch", "~/lucas"],
  ["projects", "projects"],
  ["lab", "lab"],
  ["work", "work.log"],
  ["fallout", "termlink"],
] as const;

const CHIPS = [
  "help",
  "about",
  "projects",
  "lab",
  "work",
  "robot",
  "fallout",
  "contact",
];

export default function Home() {
  return (
    <>
      <div className="wallpaper" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="grain" />
      </div>
      <div className="crt" aria-hidden="true" />

      <main className="window" id="win">
        <header className="titlebar">
          <div className="lights">
            <button
              className="light red"
              data-action="close"
              aria-label="Close window"
            />
            <button
              className="light yellow"
              data-action="min"
              aria-label="Minimize window"
            />
            <button
              className="light green"
              data-action="max"
              aria-label="Maximize window"
            />
          </div>
          <nav className="tabs" aria-label="Quick commands">
            {TABS.map(([cmd, label], i) => (
              <button
                key={cmd}
                className={`tab${i === 0 ? " active" : ""}`}
                data-cmd={cmd}
              >
                <span className="dot" />
                {label}
              </button>
            ))}
          </nav>
        </header>

        <section className="term" id="term">
          <div id="out" role="log" aria-live="polite">
            {/* server-rendered fallback; replaced by the boot sequence */}
            <noscript>
              Lucas Leite: control &amp; automation engineer turned principal
              software engineer.{" "}
              <a href="https://github.com/melucasleite">
                github.com/melucasleite
              </a>
            </noscript>
          </div>
          <form id="line" autoComplete="off">
            <label htmlFor="cmd" className="prompt" />
            <div className="row">
              <span className="arrow">❯</span>
              <div className="input-wrap">
                <input
                  id="cmd"
                  name="cmd"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  enterKeyHint="go"
                  aria-label="Type a command"
                />
                <span className="ghost" id="ghost" />
              </div>
            </div>
          </form>
        </section>
      </main>

      <button className="dock" id="dock" aria-label="Reopen terminal" hidden>
        <span>❯_</span>
      </button>

      <nav className="chips" aria-label="Commands">
        {CHIPS.map((c) => (
          <button key={c} data-cmd={c}>
            {c}
          </button>
        ))}
      </nav>

      <Boot />
    </>
  );
}
