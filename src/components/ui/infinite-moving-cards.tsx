"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Item {
  title: string;
  icon?: React.ReactNode;
}

interface InfiniteMovingCardsProps {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      Array.from(scrollerRef.current.children).forEach((item) => {
        scrollerRef.current?.appendChild(item.cloneNode(true));
      });
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "60s"
      );
      setStart(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-2.5 py-1 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.title}-${idx}`}
            className="flex-shrink-0 px-4 py-2 border border-zinc-800 bg-zinc-900/80 text-sm text-zinc-400 select-none flex items-center gap-2"
          >
            {item.icon && <span className="text-zinc-300">{item.icon}</span>}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
