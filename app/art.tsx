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
      <g fill="var(--accent)">
        {rects.map((p) => {
          const [x, y] = p.split(",");
          return (
            <rect key={p} x={x} y={y} width={CW + 0.3} height={LH + 0.3} />
          );
        })}
      </g>
      <path
        d={d}
        stroke="var(--accent)"
        strokeWidth="1.1"
        opacity="0.5"
        fill="none"
      />
    </svg>
  );
}

// The hero robot: Rex, the hexapod butler from rexwalks.vercel.app, as
// isometric voxels. A bone helmet with a round face screen, a teal deck and
// six legs, built from little cubes and drawn as flat-shaded faces at build
// time, so it ships as plain SVG.

type Mat = keyof typeof SHADES;
type Part = "body" | "head";
type Glow = "eye" | "led" | undefined;

// top, front (+x) and side (+y) shades per material: Rex's own bone,
// charcoal, teal and orange, nudged toward Catppuccin Mocha.
const SHADES = {
  bone: ["#efe6d0", "#d3c9b0", "#b3a98f"],
  shade: ["#b5ac96", "#9c937d", "#857d68"],
  char: ["#45475a", "#36384a", "#2a2b3a"],
  teal: ["#3cc4b8", "#2a9d93", "#1f7a72"],
  orange: ["#fab387", "#e0955f", "#c07a48"],
  metal: ["#9399b2", "#7f849c", "#6c7086"],
  dark: ["#181825", "#11111b", "#0b0b12"],
  eye: ["#7df9ec", "#7df9ec", "#5fd8cc"],
  led: ["#fab387", "#fab387", "#e0955f"],
} as const;

function buildRex() {
  const v = new Map<string, [number, number, number, Mat, Part]>();
  const key = (x: number, y: number, z: number) => `${x},${y},${z}`;
  const put = (x: number, y: number, z: number, m: Mat, p: Part = "body") =>
    v.set(key(x, y, z), [x, y, z, m, p]);
  const cut = (x: number, y: number, z: number) => v.delete(key(x, y, z));
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

  // Chassis: a charcoal tub with clipped corners, a teal deck, and the
  // battery box slung under the nose. He faces +x. B is the belly height.
  const [X0, X1, Y0, Y1] = [6, 16, 9, 17];
  const B = 5;
  box([X0, X1], [Y0, Y1], [B, B + 1], "char");
  for (const x of [X0, X1])
    for (const y of [Y0, Y1]) for (const z of [B, B + 1]) cut(x, y, z);
  box([X0 + 1, X1 - 1], [Y0 + 1, Y1 - 1], [B + 2, B + 2], "teal");
  box([X1 + 1, X1 + 2], [Y0 + 2, Y1 - 2], [B - 1, B], "teal");
  for (const y of [Y0 + 3, Y1 - 3]) put(X1 + 2, y, B, "dark");
  put(X1 + 2, Y0 + 2, B - 1, "orange");

  // Six legs, three a side. Each is a hip servo, a femur that climbs to the
  // knee and a shin that drops to a pointed foot. `s` is the side (+1 near,
  // -1 far, drawn in shadow) and `dx` splays the front and rear pairs.
  const leg = (hx: number, s: 1 | -1, dx: -1 | 0 | 1) => {
    const hy = s > 0 ? Y1 : Y0;
    const at = (d: number) => [hx + Math.round(dx * d * 0.6), hy + s * d];
    const bone: Mat = s > 0 ? "bone" : "shade";
    // [distance from the hull, z from, z to, material]
    const cols: [number, number, number, Mat][] = [
      [1, B, B + 1, bone],
      [2, B + 1, B + 2, "char"],
      [3, B + 2, B + 3, "char"],
      [4, B + 3, B + 4, "char"],
      [5, B, B + 4, bone],
      [6, 2, B + 1, bone],
    ];
    for (const [d, z0, z1, m] of cols) {
      const [x, y] = at(d);
      box([x, x + 1], [y, y], [z0, z1], m);
    }
    // teal cap on the knee, orange band on the shin, a dark pointed foot
    const [kx, ky] = at(4);
    box([kx, kx + 1], [ky, ky], [B + 4, B + 4], "teal");
    const [sx, sy] = at(6);
    box([sx, sx + 1], [sy, sy], [B - 1, B - 1], "orange");
    const toe = sx + (dx < 0 ? 0 : 1);
    cut(2 * sx + 1 - toe, sy, 2);
    box([toe, toe], [sy, sy], [0, 1], "char");
  };
  for (const s of [1, -1] as const) {
    leg(X1 - 2, s, 1);
    leg(X0 + 5, s, 0);
    leg(X0 + 1, s, -1);
  }

  // Head: a bone helmet with the corners knocked off, and the round face
  // screen on the front with two tall eyes.
  const [hx0, hx1, hy0, hy1] = [8, 13, 10, 16];
  const H = B + 3;
  const top = H + 6;
  box([hx0, hx1], [hy0, hy1], [H, top], "bone", "head");
  const edge = (x: number, y: number) =>
    (x === hx0 || x === hx1 ? 1 : 0) + (y === hy0 || y === hy1 ? 1 : 0);
  for (let x = hx0; x <= hx1; x++)
    for (let y = hy0; y <= hy1; y++) {
      // vertical corners off all the way up, the rim off the top layer
      if (edge(x, y) === 2) for (let z = H; z <= top; z++) cut(x, y, z);
      if (edge(x, y) >= 1) cut(x, y, top);
      // teal collar where the helmet meets the deck
      if (v.has(key(x, y, H))) put(x, y, H, "teal", "head");
    }

  // The face: a teal ring around a dark screen, one voxel proud of the
  // helmet, with an eye either side of the centre line.
  const [cy, cz] = [(hy0 + hy1) / 2, H + 3];
  for (let y = hy0; y <= hy1; y++)
    for (let z = H; z <= top; z++) {
      const r = Math.hypot(y - cy, z - cz);
      if (r <= 3.3) put(hx1 + 1, y, z, r > 2.4 ? "teal" : "dark", "head");
    }
  for (const y of [cy - 1, cy + 1])
    for (const z of [cz - 1, cz, cz + 1]) put(hx1 + 1, y, z, "eye", "head");

  // Ear servo on the near cheek, antenna with a blinking tip.
  put(hx0 + 2, hy1 + 1, H + 3, "orange", "head");
  box(
    [hx0 + 1, hx0 + 1],
    [hy0 + 2, hy0 + 2],
    [top + 1, top + 2],
    "metal",
    "head",
  );
  put(hx0 + 1, hy0 + 2, top + 3, "led", "head");

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
        glow: m === "eye" ? "eye" : m === "led" ? "led" : undefined,
      });
  }
  const [x0, y0] = [Math.min(...xs) - 0.5, Math.min(...ys) - 0.5];
  const view = `${x0} ${y0} ${Math.max(...xs) + 0.5 - x0} ${Math.max(...ys) + 0.5 - y0}`;
  return { faces, view };
}

const REX = buildRex();

function Faces({ part }: { part: Part }) {
  return REX.faces
    .filter((f) => f.part === part)
    .map((f, i) => (
      <path
        key={i}
        d={f.d}
        fill={f.fill}
        stroke={f.fill}
        strokeWidth="0.1"
        strokeLinejoin="round"
        className={f.glow}
      />
    ));
}

export function Robot({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`robot ${className}`}
      viewBox={REX.view}
      role="img"
      aria-label="Rex, a six-legged robot drawn in isometric voxels: a bone-white helmet with a round face screen and two cyan eyes, on a teal and charcoal body"
    >
      <Faces part="body" />
      <g className="head">
        <Faces part="head" />
      </g>
    </svg>
  );
}
