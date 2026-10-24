// Everything the page says lives here. No company names, on purpose.

const MEDIUM = "https://lucasleite-us.medium.com/";
const GH = "https://github.com/melucasleite/";

export const SITE = {
  url: "https://www.lucasleite.us",
  name: "Lucas Leite",
  title: "Lucas Leite · Principal Software Engineer & Robotics Builder",
  jobTitle: "Principal Software Engineer",
  description:
    "Lucas Leite is a control & automation engineer turned principal software engineer in Orlando, FL. He builds robots, reef automation, games and AI tooling, plus the platforms underneath them.",
};

export const LINKS = {
  github: "https://github.com/melucasleite",
  medium: "https://lucasleite-us.medium.com",
  linkedin: "https://www.linkedin.com/in/lucas-leite",
  instagram: "https://www.instagram.com/melucasleite",
};

export const STATS = [
  ["13 yrs", "shipping software since 2013"],
  ["1st", "place worldwide, robotics engineering"],
  ["99.99%", "uptime on a global platform"],
  ["100k+", "users on a startup I owned"],
] as const;

// What kind of thing each project is, shown as colored chips.
export const KINDS = {
  web: { label: "web app", color: "var(--blue)" },
  mobile: { label: "mobile", color: "var(--teal)" },
  desktop: { label: "desktop", color: "var(--lavender)" },
  hardware: { label: "hardware", color: "var(--peach)" },
  ai: { label: "ai", color: "var(--mauve)" },
  game: { label: "game", color: "var(--pink)" },
  devtools: { label: "dev tools", color: "var(--green)" },
  maker: { label: "maker", color: "var(--yellow)" },
} as const;

export type Kind = keyof typeof KINDS;

export type Live = {
  name: string;
  kinds: Kind[];
  url: string;
  shot: string;
  blurb: string;
  tags: string[];
};

export const LIVE: Live[] = [
  {
    name: "Code Factory",
    kinds: ["desktop", "ai", "devtools"],
    url: "https://ultracodefactory.com",
    shot: "/shots/ultracodefactory.jpg",
    blurb:
      "A native macOS kanban board where every card is a markdown file and Claude Code agents are the crew. Describe an idea and an agent writes the card; hit Run Work and another picks it up. Open source.",
    tags: ["swiftui", "claude code", "macos", "open source"],
  },
  {
    name: "REEF64",
    kinds: ["ai", "hardware", "mobile", "web"],
    url: "https://www.reef64.com",
    shot: "/shots/reef64.jpg",
    blurb:
      "Reef intelligence + automation. An AI reads your reef tank from probes, a camera and your test results, works out what it needs, and the doser beside it delivers, in small steps around the clock.",
    tags: ["ai", "iot", "dosing hardware", "ios app"],
  },
  {
    name: "Genesis 22 Studio",
    kinds: ["web", "maker"],
    url: "https://g22.studio",
    shot: "/shots/g22.jpg",
    blurb:
      "A family-owned 3D print farm in Florida. A fleet of 12 printers taking parts from first prototype to 500+ unit batch runs, with instant quotes and live order tracking.",
    tags: ["3d printing", "manufacturing", "web platform"],
  },
  {
    name: "Age of Potatoes",
    kinds: ["game", "web"],
    url: "https://ageofpotatoes.com",
    shot: "/shots/potatoes.jpg",
    blurb:
      "A browser factory/farming tycoon: build a chips-and-soda empire from a weedy roadside lot. Deterministic simulation, pixel art, synthesized audio.",
    tags: ["typescript", "next.js", "pixijs", "supabase"],
  },
];

export const CAREER = [
  {
    when: "2023 – 2026",
    role: "Principal Software Engineer",
    short: "principal",
    where: "one of America's most iconic brands",
    from: 2023,
    to: 2026,
    story:
      "Promoted to principal and handed the keys to the brand's global marketing & sales planning platform. Set the roadmap and the architecture, held 99.99% uptime for teams around the world, and shipped agentic AI into production on top of it.",
    highlights: [
      "promoted to principal",
      "99.99% uptime",
      "global teams",
      "agentic AI in production",
    ],
    points: [
      "Owned roadmap, architecture and delivery, partnering directly with directors and PMs.",
      "Held 99.99% uptime for 150+ monthly active users across global teams.",
      "Designed a Phoenix LiveView component system that sped up the front end.",
      "Put agentic AI into production with the Claude Agent SDK, MCP and vector search.",
    ],
  },
  {
    when: "2020 – 2023",
    role: "Senior Full-stack Engineer",
    where: "one of America's most iconic brands",
    short: "senior",
    from: 2020,
    to: 2023,
    story:
      "Joined one of America's most iconic brands as a senior engineer and worked the whole stack: React and Django up top, Kubernetes, AWS and Terraform underneath, and a hardened CI that caught bugs before they shipped.",
    highlights: ["full stack", "react · django", "k8s · aws · terraform"],
    points: [
      "End-to-end product work across React, Python and Django.",
      "Kubernetes, AWS and Terraform; hardened CI so bugs got caught earlier.",
    ],
  },
  {
    when: "2020",
    role: "Senior Full-stack Engineer",
    where: "edtech",
    short: "edtech",
    from: 2020,
    to: 2020,
    story:
      "A stint at a public edtech company, building the tools that teach people to code: live chat for students, CRM sync and a productivity-suite migration.",
    highlights: ["public company", "e-learning"],
    points: [
      "E-learning tools that teach people to code, at a public edtech company.",
      "Live chat for students, CRM sync, and a productivity-suite migration.",
    ],
  },
  {
    when: "2014 – 2019",
    role: "Startup years",
    short: "startups",
    where: "builder and technical lead",
    from: 2014,
    to: 2019,
    story:
      "Six years of building from zero: a restaurant platform with digital menus in 100+ languages, ordering and payments; a feedback SaaS grown to thousands of daily users; and a fantasy-soccer app for a Brazilian Série A club.",
    highlights: [
      "100k+ users",
      "100+ languages",
      "0 → thousands daily",
      "Série A club",
    ],
    points: [
      "Restaurant platform with digital menus in 100+ languages, ordering and payments.",
      "Customer-feedback SaaS taken from zero to thousands of daily users.",
      "Fantasy-soccer app for a Brazilian Série A club.",
    ],
  },
  {
    when: "2013 – 2019",
    role: "Founder",
    short: "lab founder",
    where: "hardware + software lab",
    from: 2013,
    to: 2019,
    story:
      "Where it started: a hardware + software lab shipping for hundreds of business clients, while building a drone payload against yellow fever, malaria and chikungunya, and a park-cleaning robot that took 1st place in the world.",
    highlights: [
      "1st place worldwide",
      "$10k grand prize",
      "hundreds of clients",
      "drones · robots",
    ],
    points: [
      "Shipped software for hundreds of business clients.",
      "Drone payload that sprays mosquito nests to fight yellow fever, malaria and chikungunya.",
      "Park-cleaning robot that took 1st place worldwide in robotics engineering.",
    ],
  },
  {
    when: "2013 – 2019",
    role: "B.Eng.",
    short: "b.eng",
    where: "control & automation engineering",
    from: 2013,
    to: 2019,
    story:
      "The degree behind the robots: control & automation engineering, studied alongside the lab and the startups.",
    highlights: [],
    points: [],
  },
];

export type Repo = {
  name: string;
  kinds: Kind[];
  title?: string;
  url: string;
  blurb: string;
  tags: string[];
  site?: string;
  shot?: string;
  fresh?: boolean;
};

export const REPOS: Repo[] = [
  {
    name: "ultracodefactory",
    kinds: ["desktop", "ai", "devtools"],
    title: "Code Factory",
    url: GH + "ultracodefactory",
    site: "https://ultracodefactory.com",
    shot: "/shots/ultracodefactory.jpg",
    fresh: true,
    blurb:
      "Code Factory: a native macOS kanban board where every card is a markdown file and Claude Code agents are the crew. Drag a card to run it, watch the agent's terminal live, and answer its questions with real buttons.",
    tags: ["swift", "swiftui", "claude code", "tmux"],
  },
  {
    name: "mark85",
    kinds: ["hardware"],
    title: "MARK 85",
    url: GH + "mark85",
    blurb:
      "Iron Man suit firmware: four limb IMUs drive synthesized stereo servo whir and repulsor charge-up.",
    tags: ["c++", "esp32-s3"],
    shot: "/shots/mark85.jpg",
  },
  {
    name: "claude-tts",
    kinds: ["devtools", "ai"],
    title: "Claude TTS",
    url: GH + "claude-tts",
    blurb:
      "Claude Code narrates its work out loud with offline neural TTS. Piper + FFmpeg, driven by hooks.",
    tags: ["python", "macos"],
    shot: "/shots/claude-tts.jpg",
  },
  {
    name: "claude-usage-widget",
    kinds: ["desktop", "devtools"],
    title: "Claude Usage Widget",
    url: GH + "claude-usage-widget",
    blurb:
      "Your Claude Code limits as Apple-Watch-style activity rings, with a forecast of when you'll hit them.",
    tags: ["swift", "swiftui"],
    shot: "/shots/claude-usage-widget.jpg",
  },
  {
    name: "mini-kitchen",
    kinds: ["maker", "hardware"],
    title: "Mini Kitchen",
    url: GH + "mini-kitchen",
    blurb:
      "Toddler play kitchen with a sink that actually runs. CNC oak plywood, 12 V pump, Python-generated cut sheets.",
    tags: ["python", "openscad", "cnc"],
    shot: "/shots/mini-kitchen.jpg",
  },
  {
    name: "speedster",
    kinds: ["mobile"],
    title: "Speedster",
    url: GH + "speedster",
    blurb:
      "A focused, dark-mode Rubik's cube timer for iOS: scrambles, rolling averages and progress charts.",
    tags: ["swift", "core data"],
    shot: "/shots/speedster.jpg",
  },
  {
    name: "age-of-potatoes",
    kinds: ["game", "web"],
    title: "Age of Potatoes",
    url: GH + "age-of-potatoes",
    site: "https://ageofpotatoes.com",
    shot: "/shots/potatoes.jpg",
    blurb:
      "The source behind ageofpotatoes.com, golden-file tests for the deterministic sim included.",
    tags: ["typescript", "pixijs"],
  },
];

export type Build = {
  name: string;
  img: string;
  url: string;
  blurb: string;
  year?: string;
};

export const LAB: Build[] = [
  {
    name: "Amazon-e",
    img: "/lab/amazone.jpg",
    url:
      MEDIUM +
      "amazon-e-ia-powered-autonomous-park-cleaning-robot-6d99c95fba59",
    blurb:
      "AI-powered park-cleaning robot. C down low, Python up top. 1st place worldwide, $10k grand prize.",
    year: "2017",
  },
  {
    name: "Heimdall",
    img: "/lab/heimdall.jpg",
    url: MEDIUM + "heimdall-a-rescue-robot-e999a4e0d470",
    blurb:
      "Tracked rescue robot, designed in CAD and driven by a Raspberry Pi.",
  },
  {
    name: "Hexapod",
    img: "/lab/hexapod.jpg",
    url: MEDIUM + "hexapod-robot-with-18-servos-ef4fcbbd12e",
    blurb:
      "Six legs, 18 servos, aluminium chassis. Gait written in Python and streamed over serial.",
  },
  {
    name: "Hydroponics",
    img: "/lab/hydro.jpg",
    url: MEDIUM + "building-a-fully-automated-hydroponic-system-cea759412ef1",
    blurb:
      "Fully automated grow system: 3D-printed dosing modules, Arduino + Pi, a Next.js controller.",
  },
  {
    name: "Smart Ink Filler",
    img: "/lab/ink.jpg",
    url: MEDIUM + "smart-ink-filler-fffab733004b",
    blurb: "4-channel peristaltic dosing machine. Under 1 ml error at 12 ml/s.",
  },
  {
    name: "Leaf",
    img: "/lab/leaf.jpg",
    url:
      MEDIUM + "leaf-take-out-the-mystery-of-growing-your-plants-8d98d5e69178",
    blurb: "Home gardening assistant: soil sensor, water valve and an app.",
  },
];

export const POSTS = [
  [
    "2024",
    "Building a fully automated hydroponic system",
    MEDIUM + "building-a-fully-automated-hydroponic-system-cea759412ef1",
  ],
  [
    "2023",
    "Integrating Clerk with Django Rest Framework",
    MEDIUM + "integrating-clerk-with-django-rest-framework-e1e2f041dba2",
  ],
  [
    "2023",
    "Amazon-e: an AI-powered park-cleaning robot",
    MEDIUM + "amazon-e-ia-powered-autonomous-park-cleaning-robot-6d99c95fba59",
  ],
  [
    "2023",
    "Hexapod robot with 18 servos",
    MEDIUM + "hexapod-robot-with-18-servos-ef4fcbbd12e",
  ],
  [
    "2023",
    "Heimdall: a rescue robot",
    MEDIUM + "heimdall-a-rescue-robot-e999a4e0d470",
  ],
  ["2023", "Smart ink filler", MEDIUM + "smart-ink-filler-fffab733004b"],
  [
    "2023",
    "Leaf: take the mystery out of growing plants",
    MEDIUM + "leaf-take-out-the-mystery-of-growing-your-plants-8d98d5e69178",
  ],
] as const;

// The stack, drawn as one: from the metal up to the models, each layer with
// the tools and where they've shipped.
export const STACK = [
  {
    layer: "ai",
    color: "var(--mauve)",
    tools: ["Claude Agent SDK", "MCP", "agents", "vector search", "Bedrock"],
    proof: "agentic AI in production · REEF64 · Code Factory",
  },
  {
    layer: "interfaces",
    color: "var(--blue)",
    tools: ["React", "Next.js", "Phoenix LiveView", "SwiftUI", "PixiJS"],
    proof: "this site · Age of Potatoes · Speedster",
  },
  {
    layer: "backend",
    color: "var(--sky)",
    tools: ["Elixir", "TypeScript", "Python", "Django", "Flask", "Node"],
    proof: "a 99.99% uptime platform · startups to thousands of daily users",
  },
  {
    layer: "data",
    color: "var(--teal)",
    tools: ["Postgres", "Redis", "Supabase", "Snowflake"],
    proof: "a global planning platform · Age of Potatoes",
  },
  {
    layer: "infra",
    color: "var(--green)",
    tools: ["AWS", "GCP", "Terraform", "Kubernetes", "Docker", "Vercel"],
    proof: "99.99% uptime · CI that catches bugs early",
  },
  {
    layer: "firmware",
    color: "var(--yellow)",
    tools: ["C", "C++", "ESP32", "Arduino", "Raspberry Pi"],
    proof: "MARK 85 · Smart Ink Filler · Heimdall",
  },
  {
    layer: "hardware",
    color: "var(--peach)",
    tools: ["SolidWorks", "Onshape", "OpenSCAD", "CNC", "3D printing"],
    proof: "a 12-printer farm · Mini Kitchen · a world-title robot",
  },
] as const;
