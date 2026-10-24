// Everything the page says lives here. No company names, on purpose.

const MEDIUM = "https://lucasleite-us.medium.com/";
const GH = "https://github.com/melucasleite/";

export const LINKS = {
  github: "https://github.com/melucasleite",
  medium: "https://lucasleite-us.medium.com",
};

export const STATS = [
  ["13 yrs", "shipping software since 2013"],
  ["1st", "place worldwide, robotics engineering"],
  ["99.99%", "uptime on a global platform"],
  ["100k+", "users on a startup I owned"],
] as const;

export type Live = {
  name: string;
  url: string;
  shot: string;
  blurb: string;
  tags: string[];
};

export const LIVE: Live[] = [
  {
    name: "REEF64",
    url: "https://www.reef64.com",
    shot: "/shots/reef64.jpg",
    blurb:
      "Reef intelligence + automation. An AI reads your reef tank from probes, a camera and your test results, works out what it needs, and the doser beside it delivers, in small steps around the clock.",
    tags: ["ai", "iot", "dosing hardware", "ios app"],
  },
  {
    name: "Genesis 22 Studio",
    url: "https://g22.studio",
    shot: "/shots/g22.jpg",
    blurb:
      "A family-owned 3D print farm in Florida. A fleet of 12 printers taking parts from first prototype to 500+ unit batch runs, with instant quotes and live order tracking.",
    tags: ["3d printing", "manufacturing", "web platform"],
  },
  {
    name: "Age of Potatoes",
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
    where: "global marketing & sales planning platform",
    points: [
      "Owned roadmap, architecture and delivery alongside directors and PMs.",
      "Held 99.99% uptime for 150+ monthly active users across global teams.",
      "Built a Phoenix LiveView component system that sped up the front end.",
      "Shipped agentic AI in production: Claude Agent SDK, MCP, vector search.",
    ],
  },
  {
    when: "2020 – 2023",
    role: "Senior Full-stack Engineer",
    where: "one of America's most iconic brands",
    points: [
      "End-to-end product work across React, Python and Django.",
      "Kubernetes, AWS and Terraform; hardened CI so bugs got caught earlier.",
    ],
  },
  {
    when: "2020",
    role: "Senior Full-stack Engineer",
    where: "edtech",
    points: [
      "E-learning tools that teach people to code, at a public edtech company.",
      "Live chat for students, CRM sync, and a productivity-suite migration.",
    ],
  },
  {
    when: "2014 – 2019",
    role: "Startup years",
    where: "builder and technical lead",
    points: [
      "Restaurant platform with digital menus in 100+ languages, ordering and payments.",
      "Customer-feedback SaaS taken from zero to thousands of daily users.",
      "Fantasy-soccer app for a Brazilian Série A club.",
    ],
  },
  {
    when: "2013 – 2019",
    role: "Founder",
    where: "hardware + software lab",
    points: [
      "Shipped software for hundreds of business clients.",
      "Drone payload that sprays mosquito nests to fight yellow fever, malaria and chikungunya.",
      "Park-cleaning robot that took 1st place worldwide in robotics engineering.",
    ],
  },
];

export type Repo = { name: string; url: string; blurb: string; tags: string[] };

export const REPOS: Repo[] = [
  {
    name: "mark85",
    url: GH + "mark85",
    blurb:
      "Iron Man suit firmware: four limb IMUs drive synthesized stereo servo whir and repulsor charge-up.",
    tags: ["c++", "esp32-s3"],
  },
  {
    name: "claude-tts",
    url: GH + "claude-tts",
    blurb:
      "Claude Code narrates its work out loud with offline neural TTS. Piper + FFmpeg, driven by hooks.",
    tags: ["python", "macos"],
  },
  {
    name: "claude-usage-widget",
    url: GH + "claude-usage-widget",
    blurb:
      "Your Claude Code limits as Apple-Watch-style activity rings, with a forecast of when you'll hit them.",
    tags: ["swift", "swiftui"],
  },
  {
    name: "mini-kitchen",
    url: GH + "mini-kitchen",
    blurb:
      "Toddler play kitchen with a sink that actually runs. CNC oak plywood, 12 V pump, Python-generated cut sheets.",
    tags: ["python", "openscad", "cnc"],
  },
  {
    name: "speedster",
    url: GH + "speedster",
    blurb:
      "A focused, dark-mode Rubik's cube timer for iOS: scrambles, rolling averages and progress charts.",
    tags: ["swift", "core data"],
  },
  {
    name: "age-of-potatoes",
    url: GH + "age-of-potatoes",
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

export const STACK = [
  ["languages", "Elixir, TypeScript, Python, C++, C, Swift"],
  ["web", "Phoenix LiveView, React, Next.js, Django, Flask, Node"],
  ["data", "Postgres, Redis, Supabase, Snowflake, vector search"],
  ["infra", "AWS, GCP, Terraform, Kubernetes, Docker, Vercel"],
  ["ai", "Claude Agent SDK, MCP, agents, Bedrock"],
  ["hardware", "ESP32, embedded C, SolidWorks, Onshape, CNC, 3D printing"],
] as const;
