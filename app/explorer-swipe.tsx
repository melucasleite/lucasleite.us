"use client";

import { useEffect, useRef } from "react";

// On phones the explorer's panes sit side by side in a scroll-snap row, so
// you can swipe between projects. This keeps the tab row and the panes in
// step both ways: swipe and the matching tab lights up and scrolls into
// view; tap a tab and the panes slide to it. On wider screens the panes
// don't scroll sideways and this does nothing.
export function ExplorerSwipe() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = marker.current?.closest(".explorer");
    const panes = root?.querySelector<HTMLElement>(".ex-panes");
    const tree = root?.querySelector<HTMLElement>(".ex-tree");
    if (!root || !panes || !tree) return;
    const inputs = [
      ...root.querySelectorAll<HTMLInputElement>('input[name="project"]'),
    ];
    const swiping = () => panes.scrollWidth > panes.clientWidth + 1;
    const checked = () => inputs.findIndex((i) => i.checked);

    const motion = (): ScrollBehavior =>
      matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
    const showTab = (i: number) => {
      const label = inputs[i]?.closest("label");
      if (!label) return;
      const gap =
        label.getBoundingClientRect().left - tree.getBoundingClientRect().left;
      tree.scrollBy({ left: gap - 12, behavior: motion() });
    };
    const slideTo = (i: number, behavior: ScrollBehavior) =>
      panes.scrollTo({ left: i * panes.clientWidth, behavior });

    // Swiped: once the scroll settles, select the pane that's showing.
    let settle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        if (!swiping()) return;
        const i = Math.round(panes.scrollLeft / panes.clientWidth);
        if (!inputs[i] || inputs[i].checked) return;
        inputs[i].checked = true;
        inputs[i].dispatchEvent(new Event("change", { bubbles: true }));
        showTab(i);
      }, 90);
    };

    // Tapped a tab: slide the panes to it.
    const onChange = (e: Event) => {
      const i = inputs.indexOf(e.target as HTMLInputElement);
      if (i < 0 || !swiping()) return;
      if (Math.round(panes.scrollLeft / panes.clientWidth) !== i)
        slideTo(i, motion());
      showTab(i);
    };

    // Coming back to the page: start on the project that's selected.
    if (swiping() && checked() > 0) {
      slideTo(checked(), "auto");
      showTab(checked());
    }

    panes.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("change", onChange);
    return () => {
      clearTimeout(settle);
      panes.removeEventListener("scroll", onScroll);
      root.removeEventListener("change", onChange);
    };
  }, []);

  return <span ref={marker} hidden />;
}
