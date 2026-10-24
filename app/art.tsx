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

const FILL: Record<string, string> = {
  "@": "var(--peach)",
  "#": "var(--lavender)",
  o: "var(--blue)",
  ":": "var(--surface1)",
};

export function Robot({ className = "" }: { className?: string }) {
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
  ] as const)
    rows[r][c] = ch;
  return (
    <svg
      className={`robot ${className}`}
      viewBox={`0 0 32 ${rows.length}`}
      role="img"
      aria-label="Pixel-art robot"
    >
      {rows.flatMap((row, y) =>
        row.map((ch, x) =>
          FILL[ch] ? (
            <rect
              key={`${x}-${y}`}
              className={
                ch === "@" && (y === 9 || y === 10) ? "eye" : undefined
              }
              x={x}
              y={y}
              width="1.04"
              height="1.04"
              fill={FILL[ch]}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
