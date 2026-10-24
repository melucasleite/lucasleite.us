import { cacheLife } from "next/cache";

// GitHub's published webhook source ranges, used when /meta can't be reached.
const FALLBACK = [
  "192.30.252.0/22",
  "185.199.108.0/22",
  "140.82.112.0/20",
  "143.55.64.0/20",
  "2a0a:a440::/29",
  "2606:50c0::/32",
];

async function hookRanges(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const res = await fetch("https://api.github.com/meta").catch(() => null);
  const meta = res?.ok ? await res.json().catch(() => null) : null;
  return Array.isArray(meta?.hooks) ? meta.hooks : FALLBACK;
}

// An IP as a number plus its width in bits; IPv4-mapped IPv6 counts as IPv4.
function parse(ip: string): [bigint, number] | null {
  ip = ip.trim().replace(/^::ffff:(?=\d+\.)/i, "");
  if (/^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
    const parts = ip.split(".").map(Number);
    if (parts.some((n) => n > 255)) return null;
    return [
      parts.reduce((a, n) => (a << BigInt(8)) | BigInt(n), BigInt(0)),
      32,
    ];
  }
  if (!ip.includes(":")) return null;
  const [head, tail = ""] = ip.split("::");
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  const fill = ip.includes("::") ? 8 - h.length - t.length : 0;
  const groups = [...h, ...Array(fill).fill("0"), ...t];
  if (groups.length !== 8 || groups.some((g) => !/^[0-9a-f]{1,4}$/i.test(g)))
    return null;
  return [
    groups.reduce((a, g) => (a << BigInt(16)) | BigInt(`0x${g}`), BigInt(0)),
    128,
  ];
}

function inRange(ip: string, cidr: string) {
  const [base, bits] = cidr.split("/");
  const a = parse(ip);
  const b = parse(base);
  if (!a || !b || a[1] !== b[1]) return false;
  const shift = BigInt(a[1] - Number(bits));
  return a[0] >> shift === b[0] >> shift;
}

// True when the request came from GitHub's webhook servers. On Vercel the
// forwarded-for headers are set by the platform, so a caller can't fake them.
export async function fromGitHubHooks(req: Request) {
  const ip = (
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-forwarded-for") ??
    ""
  ).split(",")[0];
  if (!ip) return false;
  return (await hookRanges()).some((cidr) => inRange(ip, cidr));
}
