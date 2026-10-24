import { KINDS, type Kind } from "@/lib/content";

// Colored "what is it" chips: mobile, web, hardware…
export function Kinds({ kinds }: { kinds: Kind[] }) {
  return (
    <ul className="kinds" aria-label="Kind of project">
      {kinds.map((k) => (
        <li key={k} style={{ "--k": KINDS[k].color } as React.CSSProperties}>
          {KINDS[k].label}
        </li>
      ))}
    </ul>
  );
}

// Just the colors, for tight spots like the explorer tree.
export function KindDots({ kinds }: { kinds: Kind[] }) {
  return (
    <span className="kind-dots" aria-hidden="true">
      {kinds.map((k) => (
        <i key={k} style={{ background: KINDS[k].color }} />
      ))}
    </span>
  );
}
