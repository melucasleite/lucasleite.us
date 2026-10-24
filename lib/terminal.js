// lucasleite.us — a fake zsh in a fake Ghostty. No framework, no build step.

const $ = (s, el = document) => el.querySelector(s);

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- art

const BANNER = `██╗     ██╗   ██╗ ██████╗ █████╗ ███████╗    ██╗     ███████╗██╗████████╗███████╗
██║     ██║   ██║██╔════╝██╔══██╗██╔════╝    ██║     ██╔════╝██║╚══██╔══╝██╔════╝
██║     ██║   ██║██║     ███████║███████╗    ██║     █████╗  ██║   ██║   █████╗
██║     ██║   ██║██║     ██╔══██║╚════██║    ██║     ██╔══╝  ██║   ██║   ██╔══╝
███████╗╚██████╔╝╚██████╗██║  ██║███████║    ███████╗███████╗██║   ██║   ███████╗
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚══════╝╚═╝   ╚═╝   ╚══════╝`;

// Same robot as the GitHub profile: left half authored, mirrored, then detailed.
const ROBOT_HALF = `               @
              @@
               @
               #
               #
          ######
        ##oooooo
       #oo:::::o
       #o::::::o
     ###o:@@@::o
     #:#o:@@@::o
     ###o::::::o
       #o:#:#:#o
       #o:#:#:#o
       #oo:::::o
        ##oooooo
          ######
           #oooo
     ###########
    #oo#ooooooooo
   #oo#:::::::::o
   #o# #:@@:::@@o
   #o# #::::::::o
   #o# #:ooooooo:
   #o# #:o:::::o:
   #o# #:ooooooo:
   #o# #::::::::o
  ##o## #oooooooo
  #: :#  #######
  #: :#   #oo# o
          #oo#
          ####
          #oo#
          #oo#
       #######
      ########`;

function robotSVG(cls = "") {
  const rows = ROBOT_HALF.split("\n").map((r) => {
    const h = r.padEnd(16).slice(0, 16);
    return (h + [...h].reverse().join("")).split("");
  });
  for (const [r, c, ch] of [
    [24, 13, "@"],
    [24, 18, "#"],
    [24, 19, "#"],
    [23, 16, "@"],
    [25, 16, "@"],
  ])
    rows[r][c] = ch;
  const fill = {
    "@": "var(--peach)",
    "#": "var(--lavender)",
    o: "var(--blue)",
    ":": "var(--surface1)",
  };
  let px = "";
  rows.forEach((row, y) =>
    row.forEach((ch, x) => {
      if (!fill[ch]) return;
      const eye = ch === "@" && (y === 9 || y === 10) ? ' class="eye"' : "";
      px += `<rect${eye} x="${x}" y="${y}" width="1.04" height="1.04" fill="${fill[ch]}"/>`;
    }),
  );
  return `<svg class="robot ${cls}" viewBox="0 0 32 ${rows.length}" role="img" aria-label="pixel-art robot">${px}</svg>`;
}

// ---------------------------------------------------------------- content

const LIVE = [
  {
    name: "reef64.com",
    url: "https://www.reef64.com",
    shot: "/shots/reef64.jpg",
    desc: "Reef intelligence + automation. An AI reads your reef tank and works out what it needs; the doser beside it delivers, around the clock.",
    tags: "ai · iot · dosing hardware · ios app",
  },
  {
    name: "g22.studio",
    url: "https://g22.studio",
    shot: "/shots/g22.jpg",
    desc: "Genesis 22 Studio: a family-owned 3D print farm in Florida. 12 printers, first prototypes to 500+ unit batch runs.",
    tags: "3d printing · manufacturing · instant quotes",
  },
  {
    name: "ageofpotatoes.com",
    url: "https://ageofpotatoes.com",
    shot: "/shots/potatoes.jpg",
    desc: "Browser factory/farming tycoon on a deterministic sim. Build a chips-and-soda empire from a weedy roadside lot.",
    tags: "typescript · next.js · pixijs · supabase",
  },
];

const PROJECTS = [
  {
    name: "claude-tts",
    repo: "https://github.com/melucasleite/claude-tts",
    desc: "Claude Code narrates its work out loud. Offline neural TTS via Piper + FFmpeg, driven by hooks.",
    tags: "python · piper · ffmpeg · macos",
    icon: "🔊",
  },
  {
    name: "claude-usage-widget",
    repo: "https://github.com/melucasleite/claude-usage-widget",
    desc: "Your Claude Code limits as Apple-Watch-style activity rings, with a forecast of when you'll hit them.",
    tags: "swift · swiftui · macos",
    icon: "⭕",
  },
  {
    name: "mark85",
    repo: "https://github.com/melucasleite/mark85",
    desc: "Iron Man suit firmware: four limb IMUs drive synthesized stereo servo whir and repulsor charge-up.",
    tags: "c++ · esp32-s3 · platformio",
    icon: "🦾",
  },
  {
    name: "mini-kitchen",
    repo: "https://github.com/melucasleite/mini-kitchen",
    desc: "Toddler play kitchen with a sink that actually runs. CNC oak plywood, 12 V pump, Python-generated cut sheets.",
    tags: "python · openscad · cnc",
    icon: "🍳",
  },
  {
    name: "speedster",
    repo: "https://github.com/melucasleite/speedster",
    desc: "A focused, dark-mode Rubik's cube timer for iOS: scrambles, rolling averages and progress charts.",
    tags: "swift · swiftui · core data",
    icon: "🧊",
  },
];

const LAB = [
  {
    name: "Amazon-e",
    img: "/lab/amazone.jpg",
    url: "https://lucasleite-us.medium.com/amazon-e-ia-powered-autonomous-park-cleaning-robot-6d99c95fba59",
    desc: "AI-powered autonomous park-cleaning robot. C down low, Python up top. 1st place worldwide, $10k grand prize.",
    tags: "2017 · robotics · c · python",
  },
  {
    name: "Heimdall",
    img: "/lab/heimdall.jpg",
    url: "https://lucasleite-us.medium.com/heimdall-a-rescue-robot-e999a4e0d470",
    desc: "Tracked rescue robot, designed in CAD and driven by a Raspberry Pi.",
    tags: "robotics · raspberry pi · python",
  },
  {
    name: "Hexapod",
    img: "/lab/hexapod.jpg",
    url: "https://lucasleite-us.medium.com/hexapod-robot-with-18-servos-ef4fcbbd12e",
    desc: "Six legs, 18 MG996R servos, aluminium chassis. Gait written in Python, streamed over serial.",
    tags: "robotics · servos · python",
  },
  {
    name: "Hydroponics",
    img: "/lab/hydro.jpg",
    url: "https://lucasleite-us.medium.com/building-a-fully-automated-hydroponic-system-cea759412ef1",
    desc: "Fully automated hydroponics for perfect tomatoes: 3D-printed PETG dosing modules, Arduino Mega + Pi, Next.js controller.",
    tags: "arduino · next.js · onshape · bambu x1c",
  },
  {
    name: "Leaf",
    img: "/lab/leaf.jpg",
    url: "https://lucasleite-us.medium.com/leaf-take-out-the-mystery-of-growing-your-plants-8d98d5e69178",
    desc: "Home gardening assistant: a soil sensor, a water valve and an app that takes the mystery out of plants.",
    tags: "iot · sensors · python",
  },
  {
    name: "Smart Ink Filler",
    img: "/lab/ink.jpg",
    url: "https://lucasleite-us.medium.com/smart-ink-filler-fffab733004b",
    desc: "Micro-controlled 4-channel peristaltic dosing machine. Under 1 ml error at 12 ml/s, with a dial and sound feedback.",
    tags: "arduino · pumps · production tool",
  },
];

const POSTS = [
  [
    "2024-05",
    "Building a fully automated hydroponic system",
    "https://lucasleite-us.medium.com/building-a-fully-automated-hydroponic-system-cea759412ef1",
  ],
  [
    "2023-08",
    "Smart Ink Filler",
    "https://lucasleite-us.medium.com/smart-ink-filler-fffab733004b",
  ],
  [
    "2023-08",
    "Hexapod Robot with 18 servos",
    "https://lucasleite-us.medium.com/hexapod-robot-with-18-servos-ef4fcbbd12e",
  ],
  [
    "2023-08",
    "Leaf: take the mystery out of growing your plants",
    "https://lucasleite-us.medium.com/leaf-take-out-the-mystery-of-growing-your-plants-8d98d5e69178",
  ],
  [
    "2023-08",
    "Heimdall: a rescue robot",
    "https://lucasleite-us.medium.com/heimdall-a-rescue-robot-e999a4e0d470",
  ],
  [
    "2023-08",
    "Amazon-e: AI-powered autonomous park-cleaning robot",
    "https://lucasleite-us.medium.com/amazon-e-ia-powered-autonomous-park-cleaning-robot-6d99c95fba59",
  ],
  [
    "2023-08",
    "Integrating Clerk with Django Rest Framework",
    "https://lucasleite-us.medium.com/integrating-clerk-with-django-rest-framework-e1e2f041dba2",
  ],
];

const CAREER = [
  [
    "2023 ── 2026",
    "principal software engineer",
    [
      "principal engineer on a global marketing & sales planning platform",
      "99.99% uptime · 150+ monthly active users across global teams",
      "owned roadmap + architecture with directors and PMs, mentored the team",
      "phoenix liveview component system → faster, more consistent front end",
      "agentic ai in prod: claude agent sdk · mcp · llm agents · vector search",
    ],
  ],
  [
    "2020 ── 2023",
    "senior full-stack engineer",
    [
      "end-to-end product work for an iconic american brand",
      "react · python · django · kubernetes · aws · terraform · snowflake",
    ],
  ],
  [
    "2020",
    "senior full-stack engineer · edtech",
    [
      "e-learning tools that teach people to code, at a public edtech company",
      "live chat for students, salesforce sync, g suite → o365 migration",
    ],
  ],
  [
    "2014 ── 2019",
    "startup years",
    [
      "restaurant platform: digital menus in 100+ languages, ordering, payments",
      "customer-feedback saas: zero → thousands of daily users",
      "fantasy-soccer app for a brazilian série a club",
    ],
  ],
  [
    "2013 ── 2019",
    "founder · hardware + software lab",
    [
      "shipped software for hundreds of business clients",
      "drone payload that sprays mosquito nests (yellow fever, malaria, chikungunya)",
      "park-cleaning robot in c + python → 1st place worldwide, robotics engineering",
    ],
  ],
  ["2013 ── 2019", "b.eng. control & automation engineering", []],
];

const FILES = {
  "about.txt": "about",
  "work.log": "work",
  "projects/": "projects",
  "live/": "projects",
  "lab/": "lab",
  "blog/": "blog",
  "stack.json": "stack",
  "robot.sh": "robot",
};

export function init() {
  const out = $("#out");
  const term = $("#term");
  const form = $("#line");
  const input = $("#cmd");
  const ghost = $("#ghost");
  const win = $("#win");
  const dock = $("#dock");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ac = new AbortController();
  const signal = ac.signal;
  const timers = [];

  // ---------------------------------------------------------------- commands

  const cmdlink = (c, label = c) =>
    `<button class="cmdlink" data-cmd="${esc(c)}">${esc(label)}</button>`;

  const COMMANDS = {
    help: {
      desc: "you are here",
      run: () =>
        `<div class="help">${Object.entries(COMMANDS)
          .filter(([, v]) => v.desc)
          .map(
            ([k, v]) =>
              `${cmdlink(k)}<span class="muted">${esc(v.desc)}</span>`,
          )
          .join(
            "",
          )}</div><div class="muted" style="margin-top:8px">tab completes · ↑↓ history · ctrl+l clears · there are a few secrets</div>`,
    },
    about: {
      desc: "who is this guy",
      run: () => `<p style="margin:0;max-width:72ch">
      <span class="c-mauve b">control &amp; automation engineer</span> who fell into software in 2013 and never climbed back out.
      started with <span class="c-peach">robots and drones</span>, scaled a startup to <span class="c-green">hundreds of thousands of users</span>,
      and ended up <span class="c-mauve b">principal engineer</span> on platforms for one of america's most iconic brands.</p>
      <p style="margin:10px 0 0;max-width:72ch">still builds robots. now also builds the things that build the things:
      <span class="c-teal">agents</span>, <span class="c-teal">dev tooling</span>, and the occasional <span class="c-red">iron man suit</span>.</p>
      <p class="muted" style="margin:10px 0 0">try ${cmdlink("work")} or ${cmdlink("projects")}</p>`,
    },
    work: {
      desc: "git log --career",
      run: () =>
        `<div class="log">${CAREER.map(
          ([when, role, lines]) =>
            `<div class="hunk">@@ ${esc(when)} @@ <span>${esc(role)}</span></div>${lines.map((l) => `<div class="add">${esc(l)}</div>`).join("")}`,
        ).join("")}</div>`,
    },
    projects: {
      desc: "what's shipping + side quests",
      run: () =>
        `<div class="section-h"><span class="c-green">●</span> ~/live <span class="muted">— shipping, go click</span></div>
      <div class="live">${LIVE.map(
        (p) => `<a class="site" href="${p.url}" target="_blank" rel="noopener">
          <div class="shot"><div class="bar"><i></i><i></i><i></i><span>${esc(p.url.replace(/^https?:\/\/(www\.)?/, ""))}</span></div>
          <img src="${p.shot}" alt="${esc(p.name)} homepage" loading="lazy" decoding="async"></div>
          <div class="name">${esc(p.name)} <span class="c-green">↗</span></div>
          <div class="desc">${esc(p.desc)}</div><div class="tags">${esc(p.tags)}</div></a>`,
      ).join("")}</div>
      <div class="section-h"><span class="c-mauve">●</span> ~/side-quests <span class="muted">— on github</span></div>
      <div class="projects">${PROJECTS.map(
        (
          p,
        ) => `<a class="proj" href="${p.url || p.repo}" target="_blank" rel="noopener">
          <div class="name">${p.icon} ${esc(p.name)}${p.url ? ' <span class="c-green" style="font-weight:400">· play ↗</span>' : ""}</div>
          <div class="desc">${esc(p.desc)}</div><div class="tags">${esc(p.tags)}</div></a>`,
      ).join("")}</div>`,
    },
    lab: {
      desc: "robots i built before it was cool",
      run: () =>
        `<div class="section-h"><span class="c-peach">●</span> ~/lab <span class="muted">— hardware hall of fame</span></div>
        <div class="live">${LAB.map(
          (
            p,
          ) => `<a class="site lab" href="${p.url}" target="_blank" rel="noopener">
            <div class="shot"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy" decoding="async"></div>
            <div class="name">${esc(p.name)} <span class="muted" style="font-weight:400">↗</span></div>
            <div class="desc">${esc(p.desc)}</div><div class="tags">${esc(p.tags)}</div></a>`,
        ).join("")}</div>
        <div class="muted" style="margin-top:10px">build logs live on the ${cmdlink("blog")}</div>`,
    },
    blog: {
      desc: "build logs on medium",
      run: () =>
        `<div class="stack">${POSTS.map(
          ([d, t, u]) =>
            `<span class="muted">${d}</span><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`,
        ).join("")}</div>`,
    },
    stack: {
      desc: "which --all",
      run: () =>
        `<div class="stack">${[
          ["langs", "elixir · typescript · python · c++ · c · swift"],
          ["web", "phoenix liveview · react · next.js · django · flask · node"],
          ["data", "postgres · redis · supabase · snowflake · vector search"],
          ["infra", "aws · gcp · terraform · kubernetes · docker · vercel"],
          ["ai", "claude agent sdk · mcp · agents · bedrock"],
          [
            "metal",
            "esp32 · embedded c · eagle · solidworks · cnc · 3d printing",
          ],
        ]
          .map(([k, v]) => `<span class="k">${k}</span><span>${v}</span>`)
          .join("")}</div>`,
    },
    neofetch: {
      desc: "system info, but it's me",
      run: () => `<div class="fetch">${robotSVG()}<dl>
      <div class="title"><span class="c-mauve">lucas</span>@<span class="c-mauve">leite</span></div>
      <div class="rule">───────────</div>
      ${[
        ["os", "control &amp; automation engineer → software"],
        ["uptime", "13 years shipping (since 2013)"],
        ["role", "principal software engineer"],
        ["shell", "zsh + starship + claude code"],
        ["term", "ghostty · catppuccin mocha · jetbrains mono"],
        ["langs", "elixir · typescript · python · c++ · swift"],
        ["award", "1st place worldwide, robotics engineering"],
        ["status", "building robots, games &amp; ai tooling"],
      ]
        .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
        .join("")}
      <div class="swatches">${[
        "red",
        "peach",
        "yellow",
        "green",
        "teal",
        "blue",
        "mauve",
        "pink",
      ]
        .map((c) => `<i style="background:var(--${c})"></i>`)
        .join("")}</div></dl></div>`,
    },
    robot: {
      desc: "say hi to the robot",
      run: () =>
        `${robotSVG("robot-big")}<div class="muted">beep boop. the robot says hi. it also won a world championship once (a cousin of it did).</div>`,
    },
    fallout: {
      desc: "boot the termlink (matches the github profile)",
      run: () => {
        const on = document.body.classList.toggle("fallout");
        setTab(on ? "fallout" : "neofetch");
        return on
          ? `<div>LEITE INDUSTRIES (TM) TERMLINK PROTOCOL</div><div class="termlink-hdr">WELCOME, OVERSEER.</div>
           <div class="muted" style="margin-top:6px">type ${cmdlink("fallout")} again to return to the surface</div>`
          : `<div class="muted">returning to the surface… the sky is purple now. that's normal.</div>`;
      },
    },
    contact: {
      desc: "say hi",
      run: () => `<div class="stack">
      <span class="k">github</span><a href="https://github.com/melucasleite" target="_blank" rel="noopener">github.com/melucasleite</a>
      <span class="k">blog</span><a href="https://lucasleite-us.medium.com" target="_blank" rel="noopener">lucasleite-us.medium.com</a>
      </div>`,
    },
    banner: {
      run: () => `<div class="banner" aria-label="LUCAS LEITE">${BANNER}</div>`,
    },
    figlet: { run: () => COMMANDS.banner.run() },
    clear: {
      desc: "wipe the screen",
      run: () => {
        out.innerHTML = "";
        return null;
      },
    },
    ls: {
      run: () =>
        Object.keys(FILES)
          .map((f) => cmdlink(`cat ${f}`, f))
          .join("&nbsp;&nbsp;&nbsp;"),
    },
    cat: {
      run: (args) => {
        const f = args[0];
        if (!f)
          return `<span class="muted">cat: which file? try ${cmdlink("ls")}</span>`;
        if (FILES[f] || FILES[f + "/"])
          return COMMANDS[FILES[f] || FILES[f + "/"]].run([]);
        return `<span class="c-red">cat: ${esc(f)}: No such file or directory</span>`;
      },
    },
    cd: {
      run: () =>
        `<span class="muted">there's nowhere else to go. this is the whole website.</span>`,
    },
    pwd: { run: () => "/Users/visitor/lucasleite.us" },
    whoami: {
      run: () =>
        `visitor. <span class="muted">lucas is the guy in the banner.</span>`,
    },
    date: { run: () => esc(new Date().toString()) },
    echo: { run: (args) => esc(args.join(" ")) },
    history: {
      run: () =>
        hist
          .map(
            (h, i) =>
              `<div><span class="muted">${String(i + 1).padStart(4)}</span>  ${esc(h)}</div>`,
          )
          .join(""),
    },
    sudo: {
      run: () =>
        `<span class="c-red">visitor is not in the sudoers file. this incident will be reported.</span> 👀`,
    },
    rm: { run: () => `<span class="c-red">rm: absolutely not.</span>` },
    vim: {
      run: () =>
        `<span class="muted">you are now trapped in vim. type</span> ${cmdlink(":q")} <span class="muted">to escape.</span>`,
    },
    nvim: { run: () => COMMANDS.vim.run() },
    ":q": {
      run: () =>
        `<span class="c-green">you escaped vim. most people never do. 🏆</span>`,
    },
    potato: {
      run: () =>
        `🥔 <a href="https://ageofpotatoes.com" target="_blank" rel="noopener">ageofpotatoes.com</a> <span class="muted">— go build a chip empire.</span>`,
    },
    coffee: {
      run: () =>
        `<span class="c-peach">418 I'm a teapot.</span> <span class="muted">(but lucas will take a flat white)</span>`,
    },
    exit: {
      run: () => {
        setTimeout(closeWin, 250);
        return `<span class="muted">logout</span>`;
      },
    },
  };

  const NAMES = Object.keys(COMMANDS);

  function closest(word) {
    const d = (a, b) => {
      const m = Array.from({ length: a.length + 1 }, (_, i) => [
        i,
        ...Array(b.length).fill(0),
      ]);
      for (let j = 1; j <= b.length; j++) m[0][j] = j;
      for (let i = 1; i <= a.length; i++)
        for (let j = 1; j <= b.length; j++)
          m[i][j] = Math.min(
            m[i - 1][j] + 1,
            m[i][j - 1] + 1,
            m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
          );
      return m[a.length][b.length];
    };
    const best = NAMES.filter((n) => COMMANDS[n].desc).sort(
      (a, b) => d(word, a) - d(word, b),
    )[0];
    return d(word, best) <= 3 ? best : null;
  }

  // ---------------------------------------------------------------- prompt + output

  const hist = [];
  let hIdx = 0;

  function ps1() {
    const t = new Date().toTimeString().slice(0, 5);
    return `<div class="ps1"><span class="dir">~/lucasleite.us</span><span class="on">on</span><span class="git">⎇ main</span><span class="via">via</span><span class="lang">⬢ v24</span><span class="time">${t}</span></div>`;
  }

  function echoBlock(cmd, ok = true) {
    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = `${ps1()}<div><span class="arrow${ok ? "" : " err"}">❯</span><span class="echo">${esc(cmd)}</span></div>`;
    out.append(block);
    return block;
  }

  function scrollDown() {
    term.scrollTo({
      top: term.scrollHeight,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  function run(raw) {
    const line = raw.trim();
    if (!line) {
      echoBlock("");
      return scrollDown();
    }
    hist.push(line);
    hIdx = hist.length;
    const [name, ...args] = line.split(/\s+/);
    const cmd = COMMANDS[name.toLowerCase()];
    const block = echoBlock(line, !!cmd);
    let html;
    if (cmd) html = cmd.run(args);
    else {
      const s = closest(name.toLowerCase());
      html = `<span class="c-red">zsh: command not found: ${esc(name)}</span>${s ? ` <span class="muted">— did you mean</span> ${cmdlink(s)}<span class="muted">?</span>` : ` <span class="muted">— try</span> ${cmdlink("help")}`}`;
    }
    if (html === null) return block.remove();
    const res = document.createElement("div");
    res.style.marginTop = "6px";
    res.innerHTML = html;
    block.append(res);
    scrollDown();
  }

  async function typeAndRun(cmd, speed = 55) {
    if (reduced) return run(cmd);
    input.value = "";
    for (const ch of cmd) {
      if (signal.aborted) return;
      input.value += ch;
      paintGhost();
      await sleep(speed + Math.random() * 40);
    }
    await sleep(180);
    if (signal.aborted) return;
    input.value = "";
    paintGhost();
    run(cmd);
  }

  // ---------------------------------------------------------------- input line

  function buildPrompt() {
    $(".prompt").innerHTML = ps1();
  }

  function suggestion() {
    const v = input.value;
    if (!v || input.selectionStart !== v.length) return "";
    const m = NAMES.filter((n) => COMMANDS[n].desc).find(
      (n) => n.startsWith(v.toLowerCase()) && n !== v.toLowerCase(),
    );
    return m ? m.slice(v.length) : "";
  }

  function paintGhost() {
    const v = input.value;
    const pos = input.selectionStart ?? v.length;
    const under = v[pos] ?? " ";
    ghost.innerHTML = `<span class="typed">${esc(v.slice(0, pos))}</span><span class="cursor"></span>${
      pos === v.length ? esc(suggestion()) : ""
    }`;
    // block cursor sits over the char under the caret
    const c = $(".cursor", ghost);
    c.textContent = under === " " ? " " : under;
    c.style.color = "var(--base)";
  }

  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const v = input.value;
      input.value = "";
      paintGhost();
      run(v);
      buildPrompt();
    },
    { signal },
  );

  input.addEventListener(
    "keydown",
    (e) => {
      if (
        e.key === "Tab" ||
        (e.key === "ArrowRight" && input.selectionStart === input.value.length)
      ) {
        const s = suggestion();
        if (s) {
          e.preventDefault();
          input.value += s;
        } else if (e.key === "Tab") e.preventDefault();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hIdx > 0) input.value = hist[--hIdx];
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        hIdx = Math.min(hist.length, hIdx + 1);
        input.value = hist[hIdx] ?? "";
      } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        out.innerHTML = "";
      } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        echoBlock(input.value + "^C", false);
        input.value = "";
        scrollDown();
      }
      requestAnimationFrame(paintGhost);
    },
    { signal },
  );
  ["input", "click", "keyup", "focus", "blur"].forEach((ev) =>
    input.addEventListener(ev, () => requestAnimationFrame(paintGhost), {
      signal,
    }),
  );

  term.addEventListener(
    "click",
    () => {
      if (!getSelection().toString()) input.focus({ preventScroll: true });
    },
    { signal },
  );

  // anything with data-cmd runs that command (help list, chips, tabs, ls output)
  document.addEventListener(
    "click",
    (e) => {
      const b = e.target.closest("[data-cmd]");
      if (!b) return;
      if (win.classList.contains("gone")) openWin();
      const c = b.dataset.cmd;
      if (b.classList.contains("tab")) {
        const isFallout = document.body.classList.contains("fallout");
        if ((c === "fallout") === isFallout) return setTab(c);
        if (c !== "fallout" && isFallout) run("fallout");
      }
      if (b.classList.contains("tab") && c !== "fallout") setTab(c);
      run(c);
      buildPrompt();
      input.focus({ preventScroll: true });
    },
    { signal },
  );

  function setTab(c) {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.toggle("active", t.dataset.cmd === c));
  }

  // ---------------------------------------------------------------- window chrome

  function closeWin() {
    win.classList.add("gone");
    dock.hidden = false;
  }
  function openWin() {
    win.classList.remove("gone");
    dock.hidden = true;
    input.focus({ preventScroll: true });
  }
  document.querySelectorAll(".light").forEach((l) =>
    l.addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
        const a = l.dataset.action;
        if (a === "max") win.classList.toggle("max");
        else closeWin();
      },
      { signal },
    ),
  );
  dock.addEventListener("click", openWin, { signal });

  // konami code → termlink
  const KONAMI =
    "ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a";
  let keys = [];
  addEventListener(
    "keydown",
    (e) => {
      keys = [...keys, e.key].slice(-10);
      if (keys.join(" ") === KONAMI) run("fallout");
    },
    { signal },
  );

  // ---------------------------------------------------------------- boot

  (async function boot() {
    out.innerHTML = "";
    buildPrompt();
    paintGhost();
    timers.push(setInterval(buildPrompt, 30_000));
    await sleep(500);
    if (signal.aborted) return;
    await typeAndRun("figlet lucas leite", 45);
    await sleep(250);
    if (signal.aborted) return;
    await typeAndRun("neofetch", 60);
    if (signal.aborted) return;
    const hint = document.createElement("div");
    hint.className = "block muted";
    hint.innerHTML = `type ${cmdlink("help")}, or just click things. ${cmdlink("projects")} and ${cmdlink("lab")} are where the fun is.`;
    out.append(hint);
    scrollDown();
    if (matchMedia("(pointer: fine)").matches)
      input.focus({ preventScroll: true });
  })();

  return () => {
    ac.abort();
    timers.forEach(clearInterval);
    out.innerHTML = "";
    document.body.classList.remove("fallout");
  };
}
