"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Arrows, dots and a counter for a Carousel track. Positions are counted
// from what's visible, so a three-up lab has fewer stops than slides.
export function CarouselNav({
  track,
  count,
  label,
}: {
  track: string;
  count: number;
  label: string;
}) {
  const [at, setAt] = useState(0);
  const [stops, setStops] = useState(count);
  // Where the last click asked to go. While a smooth scroll is on its way the
  // counter shows the destination and repeat clicks keep advancing; a swipe
  // mid-scroll takes over again after a second.
  const target = useRef<number | null>(null);
  const release = useRef<ReturnType<typeof setTimeout>>(undefined);

  const measure = useCallback(() => {
    const el = document.getElementById(track);
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return null;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap);
    return { el, step };
  }, [track]);

  useEffect(() => {
    const m = measure();
    if (!m) return;
    const update = () => {
      const { el, step } = measure()!;
      const visible = Math.max(1, Math.round((el.clientWidth + 1) / step));
      const n = Math.max(1, count - visible + 1);
      setStops(n);
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const now = end
        ? n - 1
        : Math.min(n - 1, Math.round(el.scrollLeft / step));
      if (target.current === null) setAt(now);
      else if (now === target.current) target.current = null;
    };
    update();
    m.el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      m.el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [measure, count]);

  const go = (i: number) => {
    const m = measure();
    if (!m) return;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const to = Math.max(0, Math.min(stops - 1, i));
    target.current = to;
    setAt(to);
    clearTimeout(release.current);
    release.current = setTimeout(() => (target.current = null), 1000);
    m.el.scrollTo({ left: to * m.step, behavior: smooth ? "smooth" : "auto" });
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="carousel-nav">
      <span className="count" aria-live="polite">
        {pad(at + 1)} / {pad(stops)}
      </span>
      <div className="dots">
        {Array.from({ length: stops }, (_, i) => (
          <button
            key={i}
            type="button"
            className={i === at ? "on" : undefined}
            aria-label={`${label}: go to ${i + 1}`}
            aria-current={i === at}
            onClick={() => go(i)}
          />
        ))}
      </div>
      <div className="arrows">
        <button
          type="button"
          className="btn"
          aria-label={`${label}: previous`}
          disabled={at === 0}
          onClick={() => go((target.current ?? at) - 1)}
        >
          ←
        </button>
        <button
          type="button"
          className="btn"
          aria-label={`${label}: next`}
          disabled={at >= stops - 1}
          onClick={() => go((target.current ?? at) + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
