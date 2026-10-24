"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const INAPP = "nav:inapp";
const PICK = "explorer:pick";
const scrollKey = (path: string) => `nav:scroll:${path}`;

function store(key: string, value?: string) {
  try {
    if (value === undefined) return sessionStorage.getItem(key);
    sessionStorage.setItem(key, value);
  } catch {}
  return null;
}

// Back/forward: once the page we're returning to is the one showing, put it
// back where the visitor left it. Registered once at load, ahead of Next's
// router, which swaps pages (keeping old ones mounted but hidden) while
// handling the same event, so a per-page listener or mount effect never fires.
function restoreScroll() {
  const path = location.pathname;
  const y = Number(store(scrollKey(path)));
  if (!y) return;
  let tries = 0;
  const tick = () => {
    const main = document.querySelector(
      `main[data-path="${CSS.escape(path)}"]`,
    );
    if (main?.getClientRects().length) {
      scrollTo({ top: y, behavior: "instant" });
    } else if (tries++ < 60) setTimeout(tick, 16);
  };
  tick();
}
if (typeof window !== "undefined") addEventListener("popstate", restoreScroll);

// The same for a full page load from back/forward (Next falls back to one
// when a client navigation can't finish), once per document.
let landed = false;

// Remembers, for this tab: that the visitor has clicked around inside the
// site (so "back" can really go back), where they were scrolled on each page,
// and which project they had open in the explorer, so going back lands them
// exactly where they left.
export function NavMemory() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]");
      if (a && (a as HTMLAnchorElement).origin === location.origin) {
        store(INAPP, "1");
        store(scrollKey(location.pathname), String(scrollY));
      }
    };
    const onChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      if (input.name === "project") store(PICK, input.value);
    };
    if (!landed) {
      landed = true;
      const nav = performance.getEntriesByType("navigation")[0] as
        PerformanceNavigationTiming | undefined;
      if (nav?.type === "back_forward") restoreScroll();
    }
    const picked = store(PICK);
    if (picked) {
      const input = document.querySelector<HTMLInputElement>(
        `.explorer input[name="project"][value="${CSS.escape(picked)}"]`,
      );
      if (input) input.checked = true;
    }
    document.addEventListener("click", onClick);
    document.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("change", onChange);
    };
  }, []);
  return null;
}

// "← back": the browser's back when we got here from inside the site, so the
// visitor lands where they were; otherwise a plain link to the projects.
export function BackLink() {
  const router = useRouter();
  return (
    <Link
      href="/#projects"
      className="back"
      onClick={(e) => {
        if (store(INAPP) !== "1" || e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        router.back();
      }}
    >
      ← back
    </Link>
  );
}
