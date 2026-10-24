// Pixel and ASCII art, drawn as SVG. Web-font subsets don't ship block or
// box-drawing glyphs, so rendering these as text would scramble them.

const BANNER = `██╗     ██╗   ██╗ ██████╗ █████╗ ███████╗    ██╗     ███████╗██╗████████╗███████╗
██║     ██║   ██║██╔════╝██╔══██╗██╔════╝    ██║     ██╔════╝██║╚══██╔══╝██╔════╝
██║     ██║   ██║██║     ███████║███████╗    ██║     █████╗  ██║   ██║   █████╗
██║     ██║   ██║██║     ██╔══██║╚════██║    ██║     ██╔══╝  ██║   ██║   ██╔══╝
███████╗╚██████╔╝╚██████╗██║  ██║███████║    ███████╗███████╗██║   ██║   ███████╗
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚══════╝╚═╝   ╚═╝   ╚══════╝`;

const SHADOW: Record<string, [string, string][]> = {
  "═": [["w", "e"]],
  "║": [["n", "s"]],
  "╗": [
    ["w", "c"],
    ["c", "s"],
  ],
  "╝": [
    ["w", "c"],
    ["c", "n"],
  ],
  "╔": [
    ["e", "c"],
    ["c", "s"],
  ],
  "╚": [
    ["e", "c"],
    ["c", "n"],
  ],
};

export function Banner() {
  const CW = 9;
  const LH = 19;
  const rows = BANNER.split("\n");
  const W = Math.max(...rows.map((r) => r.length)) * CW;
  const H = rows.length * LH;
  const rects: string[] = [];
  let d = "";
  rows.forEach((row, r) =>
    [...row].forEach((ch, c) => {
      const x = c * CW;
      const y = r * LH;
      if (ch === "█") rects.push(`${x},${y}`);
      else if (SHADOW[ch]) {
        const cx = x + CW / 2;
        const cy = y + LH / 2;
        const pt: Record<string, [number, number]> = {
          w: [x, cy],
          e: [x + CW, cy],
          n: [cx, y],
          s: [cx, y + LH],
          c: [cx, cy],
        };
        for (const [a, b] of SHADOW[ch])
          for (const off of [-1.6, 1.6]) {
            const [ax, ay] = pt[a];
            const [bx, by] = pt[b];
            const [dx, dy] = ay === by ? [0, off] : [off, 0];
            d += `M${ax + dx} ${ay + dy}L${bx + dx} ${by + dy}`;
          }
      }
    }),
  );
  return (
    <svg
      className="banner"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Lucas Leite"
    >
      <defs>
        <linearGradient
          id="bgrad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={W}
          y2="0"
          spreadMethod="reflect"
        >
          <stop offset="0" stopColor="#cba6f7" />
          <stop offset="0.35" stopColor="#89b4fa" />
          <stop offset="0.7" stopColor="#94e2d5" />
          <stop offset="1" stopColor="#f5c2e7" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values={`0 0;${W} 0`}
            dur="10s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <g fill="url(#bgrad)">
        {rects.map((p) => {
          const [x, y] = p.split(",");
          return (
            <rect key={p} x={x} y={y} width={CW + 0.3} height={LH + 0.3} />
          );
        })}
      </g>
      <path
        d={d}
        stroke="url(#bgrad)"
        strokeWidth="1.1"
        opacity="0.5"
        fill="none"
      />
    </svg>
  );
}

// The hero robot: an isometric voxel rescue rover in the spirit of the lab's
// Heimdall and Amazon-e. Twin tracks, armored deck, a camera mast and a
// gripper, built from little cubes and drawn as flat-shaded faces at build
// time, so it ships as plain SVG.

type Mat = keyof typeof SHADES;
type Part = "body" | "head";
type Glow = "eye" | "led" | "beacon" | undefined;

// top, front (+x) and side (+y) shades per material, from Catppuccin Mocha.
const SHADES = {
  body: ["#b4befe", "#8f99d8", "#6f78b0"],
  panel: ["#89b4fa", "#6d93d0", "#5574a8"],
  track: ["#45475a", "#36384a", "#2a2b3a"],
  tread: ["#585b70", "#45475a", "#36384a"],
  hub: ["#fab387", "#e0955f", "#c07a48"],
  metal: ["#9399b2", "#7f849c", "#6c7086"],
  dark: ["#181825", "#11111b", "#0b0b12"],
  lens: ["#fab387", "#fab387", "#e0955f"],
  haz: ["#f9e2af", "#e5c890", "#c8ad72"],
  led: ["#a6e3a1", "#a6e3a1", "#86c381"],
} as const;

function buildRover() {
  const v = new Map<string, [number, number, number, Mat, Part]>();
  const key = (x: number, y: number, z: number) => `${x},${y},${z}`;
  const put = (x: number, y: number, z: number, m: Mat, p: Part = "body") =>
    v.set(key(x, y, z), [x, y, z, m, p]);
  const box = (
    [x0, x1]: [number, number],
    [y0, y1]: [number, number],
    [z0, z1]: [number, number],
    m: Mat,
    p: Part = "body",
  ) => {
    for (let x = x0; x <= x1; x++)
      for (let y = y0; y <= y1; y++)
        for (let z = z0; z <= z1; z++) put(x, y, z, m, p);
  };
  const L = 14;

  // T is the deck height; the tracks run the full height of the hull.
  const T = 8;

  // Tracks wrap the whole side, Heimdall style: a belt around chamfered
  // corners with cleats over the top and both ends.
  for (const y0 of [0, 10]) {
    box([0, L], [y0, y0 + 1], [0, T], "track");
    for (const y of [y0, y0 + 1]) {
      for (const [x, z] of [
        [0, 0],
        [1, 0],
        [0, 1],
        [0, T],
        [1, T],
        [0, T - 1],
        [L, 0],
        [L - 1, 0],
        [L, 1],
        [L, T],
        [L - 1, T],
        [L, T - 1],
      ])
        v.delete(key(x, y, z));
      for (let x = 2; x < L - 1; x += 2) put(x, y, T, "tread");
      for (let z = 2; z < T - 1; z += 2) {
        put(0, y, z, "tread");
        put(L, y, z, "tread");
      }
    }
  }
  // Inside the near track's loop: a side plate with drive sprockets at both
  // ends and road wheels between them.
  box([2, L - 2], [12, 12], [2, T - 2], "metal");
  for (const cx of [3, L - 5]) {
    box([cx, cx + 2], [13, 13], [2, 4], "dark");
    put(cx + 1, 14, 3, "hub");
  }
  for (const cx of [7, 8]) put(cx, 13, 2, "dark");

  // Armored hull between the tracks.
  box([1, L - 1], [2, 9], [1, T], "body");
  // Deck: blue inset, a hatch up front, vents at the back.
  box([3, L - 3], [3, 8], [T, T], "panel");
  for (let i = 0; i < 4; i++) {
    put(7 + i, 4, T, "dark");
    put(7 + i, 7, T, "dark");
    put(7, 4 + i, T, "dark");
    put(10, 4 + i, T, "dark");
  }
  for (const y of [3, 5, 7]) put(2, y, T, "dark");

  // Front: hazard stripe, camera window with a lens, and a low gripper.
  for (let y = 2; y <= 9; y++) put(L - 1, y, T, y % 2 ? "dark" : "haz");
  box([L - 1, L - 1], [4, 7], [4, 6], "dark");
  box([L, L], [5, 6], [5, 5], "lens");
  box([L, L + 2], [5, 6], [1, 1], "metal");
  for (const y of [4, 7]) {
    put(L + 3, y, 1, "metal");
    put(L + 3, y, 2, "hub");
  }

  // Warning beacon on the back corner.
  box([2, 2], [9, 9], [T + 1, T + 2], "haz");
  const beacon = new Set([key(2, 9, T + 1), key(2, 9, T + 2)]);

  // Mast, tilt yoke, camera head with a visor and two lenses, antenna.
  const M = T + 1;
  box([4, 4], [5, 6], [M, M + 3], "metal", "head");
  box([3, 6], [4, 7], [M + 4, M + 4], "metal", "head");
  box([3, 7], [3, 8], [M + 5, M + 7], "body", "head");
  box([3, 7], [3, 8], [M + 7, M + 7], "panel", "head");
  box([7, 7], [3, 8], [M + 5, M + 6], "dark", "head");
  put(8, 4, M + 6, "lens", "head");
  put(8, 7, M + 6, "lens", "head");
  box([3, 3], [8, 8], [M + 8, M + 10], "metal", "head");
  put(3, 8, M + 11, "led", "head");

  // Isometric 2:1 projection; draw back to front, and only faces that
  // aren't buried against a neighbor.
  const xs: number[] = [];
  const ys: number[] = [];
  const iso = (x: number, y: number, z: number) => {
    xs.push(x - y);
    ys.push((x + y) / 2 - z);
    return `${x - y},${(x + y) / 2 - z}`;
  };
  const faces: { part: Part; fill: string; d: string; glow: Glow }[] = [];
  const sorted = [...v.values()].sort(
    (a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2],
  );
  for (const [x, y, z, m, part] of sorted) {
    const quads: [number, string[]][] = [];
    if (!v.has(key(x, y, z + 1)))
      quads.push([
        0,
        [
          iso(x, y, z + 1),
          iso(x + 1, y, z + 1),
          iso(x + 1, y + 1, z + 1),
          iso(x, y + 1, z + 1),
        ],
      ]);
    if (!v.has(key(x + 1, y, z)))
      quads.push([
        1,
        [
          iso(x + 1, y, z + 1),
          iso(x + 1, y + 1, z + 1),
          iso(x + 1, y + 1, z),
          iso(x + 1, y, z),
        ],
      ]);
    if (!v.has(key(x, y + 1, z)))
      quads.push([
        2,
        [
          iso(x, y + 1, z + 1),
          iso(x + 1, y + 1, z + 1),
          iso(x + 1, y + 1, z),
          iso(x, y + 1, z),
        ],
      ]);
    for (const [shade, pts] of quads)
      faces.push({
        part,
        fill: SHADES[m][shade],
        d: `M${pts.join("L")}Z`,
        glow:
          m === "lens"
            ? "eye"
            : m === "led"
              ? "led"
              : beacon.has(key(x, y, z))
                ? "beacon"
                : undefined,
      });
  }
  const [x0, y0] = [Math.min(...xs) - 0.5, Math.min(...ys) - 0.5];
  const view = `${x0} ${y0} ${Math.max(...xs) + 0.5 - x0} ${Math.max(...ys) + 0.5 - y0}`;
  return { faces, view };
}

const ROVER = buildRover();

function Faces({ part }: { part: Part }) {
  return ROVER.faces
    .filter((f) => f.part === part)
    .map((f, i) => (
      <path
        key={i}
        d={f.d}
        fill={f.fill}
        stroke={f.fill}
        strokeWidth="0.04"
        strokeLinejoin="round"
        className={f.glow}
      />
    ));
}

export function Robot({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`robot ${className}`}
      viewBox={ROVER.view}
      role="img"
      aria-label="Isometric voxel rescue robot on twin tracks, with a camera mast and a gripper"
    >
      <Faces part="body" />
      <g className="head">
        <Faces part="head" />
      </g>
    </svg>
  );
}
