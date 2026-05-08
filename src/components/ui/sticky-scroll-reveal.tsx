"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

export function StickyScroll({ content, contentClassName }: StickyScrollProps) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / cardLength;
    const idx = Math.min(Math.floor(latest / step), cardLength - 1);
    setActiveCard(idx < 0 ? 0 : idx);
  });

  const gradients = [
    "linear-gradient(to bottom right, #7c3aed, #2563eb)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  return (
    <div className="relative flex gap-10" ref={ref}>
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === idx ? 1 : 0.3 }}
                className="text-2xl font-bold text-zinc-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === idx ? 1 : 0.3 }}
                className="mt-4 max-w-sm text-zinc-400 text-sm leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-xl lg:block",
          contentClassName
        )}
        style={{ background: gradients[activeCard % gradients.length] }}
      >
        {content[activeCard]?.content ?? (
          <div className="flex items-center justify-center h-full">
            <span className="text-white/30 text-sm">Preview</span>
          </div>
        )}
      </div>
    </div>
  );
}
