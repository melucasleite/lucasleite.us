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
  // TODO(owner): the public address you want people to write to.
  email: "mailto:TODO-owner@lucasleite.us",
};

// The one action the page asks for, said the same way every time.
export const CTA = {
  primary: "See what I've shipped",
  contact: "Email me",
};

// What kind of thing each project is, shown as chips.
export const KINDS = {
  web: "web app",
  mobile: "mobile",
  desktop: "desktop",
  hardware: "hardware",
  ai: "ai",
  game: "game",
  devtools: "dev tools",
  maker: "maker",
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
    shot: "/shots/code-factory-board.jpg",
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
    where: "global marketing & sales planning",
    story:
      "At one of America's most iconic brands, I was promoted to principal and handed its global marketing & sales planning platform. I owned the roadmap and the architecture, held 99.99% uptime for 150+ monthly users across global teams, and put agentic AI into production with the Claude Agent SDK and MCP.",
  },
  {
    when: "2020 – 2023",
    role: "Senior Full-stack Engineer",
    where: "same brand, before the promotion",
    story:
      "I worked the whole stack: React and Django up top, Kubernetes, AWS and Terraform underneath, and a CI I hardened so bugs got caught before they shipped.",
  },
  {
    when: "2014 – 2019",
    role: "Startup years",
    where: "builder and technical lead",
    story:
      "Six years building from zero: a restaurant platform with digital menus in 100+ languages, a feedback SaaS I grew to thousands of daily users, and a fantasy-soccer app for a Brazilian Série A club. 100k+ users on a startup I owned.",
  },
  {
    when: "2013 – 2019",
    role: "Founder",
    where: "hardware + software lab",
    story:
      "Where it started: a lab I founded that shipped for hundreds of business clients. I built a mosquito-spraying drone payload against yellow fever, malaria and chikungunya, and a park-cleaning robot that took 1st place worldwide and a $10k grand prize, while earning my B.Eng. in control & automation engineering.",
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
    shot: "/shots/code-factory-board.jpg",
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

// What I work with, from the metal up to the models. Only the JSON-LD reads
// this now; the work and the projects already show it shipping.
export const STACK = [
  "Claude Agent SDK",
  "MCP",
  "vector search",
  "Bedrock",
  "React",
  "Next.js",
  "Phoenix LiveView",
  "SwiftUI",
  "PixiJS",
  "Elixir",
  "TypeScript",
  "Python",
  "Django",
  "Flask",
  "Node",
  "Postgres",
  "Redis",
  "Supabase",
  "Snowflake",
  "AWS",
  "GCP",
  "Terraform",
  "Kubernetes",
  "Docker",
  "Vercel",
  "C",
  "C++",
  "ESP32",
  "Arduino",
  "Raspberry Pi",
  "SolidWorks",
  "Onshape",
  "OpenSCAD",
  "CNC",
  "3D printing",
];
