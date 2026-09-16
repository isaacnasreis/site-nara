import { useCallback, useEffect, useRef, useState } from "react";

const SPEED_NORMAL = 1.2;
const SPEED_SLOW = 0.3;
const LERP_FACTOR = 0.04;

const Marquee = () => {
  const items = ["ilustradora", "✦", "designer editorial", "✦"];

  const [isInverted, setIsInverted] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const currentSpeedRef = useRef(SPEED_NORMAL);
  const targetSpeedRef = useRef(SPEED_NORMAL);
  const rafRef = useRef(null);
  const halfWidthRef = useRef(0);

  const measureTrack = useCallback(() => {
    if (!trackRef.current) return;
    const firstBlock = trackRef.current.children[0];
    if (firstBlock) {
      halfWidthRef.current = firstBlock.offsetWidth;
    }
  }, []);

  useEffect(() => {
    measureTrack();
    window.addEventListener("resize", measureTrack);

    const animate = () => {
      currentSpeedRef.current +=
        (targetSpeedRef.current - currentSpeedRef.current) * LERP_FACTOR;

      positionRef.current -= currentSpeedRef.current;

      if (
        halfWidthRef.current > 0 &&
        Math.abs(positionRef.current) >= halfWidthRef.current
      ) {
        positionRef.current += halfWidthRef.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measureTrack);
    };
  }, [measureTrack]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const pastThreshold = rect.top < viewportH * 0.65 && rect.bottom > 0;
      setIsInverted(pastThreshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("marquee-inversion", {
        detail: { inverted: isInverted },
      }),
    );
  }, [isInverted]);

  const onMouseEnter = () => {
    targetSpeedRef.current = SPEED_SLOW;
  };
  const onMouseLeave = () => {
    targetSpeedRef.current = SPEED_NORMAL;
  };

  return (
    <div
      ref={containerRef}
      className={[
        "relative w-full overflow-hidden py-5 select-none cursor-default transition-colors duration-700 ease-out",
        isInverted ? "bg-ink" : "bg-paper",
      ].join(" ")}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={trackRef}
        className={[
          "flex whitespace-nowrap w-max items-center will-change-transform",
          "transition-colors duration-700 ease-out",
          isInverted ? "text-paper" : "text-ink",
        ].join(" ")}
      >
        <div className="flex shrink-0 items-center">
          {items.map((item, i) => (
            <span
              key={`a-${i}`}
              className={[
                "font-display font-medium px-4 tracking-tighter lowercase",
                item === "✦"
                  ? isInverted
                    ? "text-3xl sm:text-5xl md:text-6xl text-accent"
                    : "text-3xl sm:text-5xl md:text-6xl text-bubbles"
                  : "text-6xl sm:text-8xl md:text-10xl",
              ].join(" ")}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={`b-${i}`}
              className={[
                "font-display font-medium px-4 tracking-tighter lowercase",
                item === "✦"
                  ? isInverted
                    ? "text-3xl sm:text-5xl md:text-6xl text-accent"
                    : "text-3xl sm:text-5xl md:text-6xl text-bubbles"
                  : "text-6xl sm:text-8xl md:text-10xl",
              ].join(" ")}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
