import { useRef, useState, useEffect, type ReactNode } from "react";

interface Props {
  children: ReactNode[];
  /** Width of each card on mobile (default: 280) */
  cardWidth?: number;
  /** Gap between cards (default: 16) */
  gap?: number;
  className?: string;
}

/**
 * Horizontal snap-scroll carousel visible only on small screens.
 * On lg+ breakpoints it renders nothing (use alongside a desktop grid).
 */
export function MobileCarousel({ children, cardWidth = 280, gap = 16, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = children.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActive(Math.min(idx, total - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [cardWidth, gap, total]);

  return (
    <div className={className}>
      <div
        ref={ref}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        style={{ gap: `${gap}px` }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="shrink-0 snap-start"
            style={{ width: `${cardWidth}px` }}
          >
            {child}
          </div>
        ))}
        {/* Spacer so last card can center */}
        <div className="shrink-0" style={{ width: "1px" }} />
      </div>

      {/* Dots indicator */}
      {total > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-white/40" : "w-1.5 bg-white/15"
              }`}
              onClick={() => {
                ref.current?.scrollTo({ left: i * (cardWidth + gap), behavior: "smooth" });
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
