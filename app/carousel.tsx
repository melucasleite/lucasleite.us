import { Children } from "react";
import { CarouselNav } from "./carousel-nav";

// A scroll-snap track: swipe, trackpad and keyboard work with no JS, and the
// small client nav adds arrows, dots and a counter. `per` is how many slides
// show at once on wide screens; phones always show one with a peek.
export function Carousel({
  id,
  label,
  per = 1,
  children,
}: {
  id: string;
  label: string;
  per?: number;
  children: React.ReactNode;
}) {
  const slides = Children.toArray(children);
  return (
    <div
      className="carousel"
      style={{ "--per": per } as React.CSSProperties}
      data-per={per}
    >
      <ul id={id} className="track" aria-label={label} tabIndex={0}>
        {slides.map((s, i) => (
          <li
            key={i}
            className="slide"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {s}
          </li>
        ))}
      </ul>
      <CarouselNav track={id} count={slides.length} label={label} />
    </div>
  );
}
