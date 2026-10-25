import { KINDS, type Kind } from "@/lib/content";

// "What is it" chips: mobile, web, hardware…
export function Kinds({ kinds }: { kinds: Kind[] }) {
  return (
    <ul className="kinds" aria-label="Kind of project">
      {kinds.map((k) => (
        <li key={k}>{KINDS[k]}</li>
      ))}
    </ul>
  );
}
