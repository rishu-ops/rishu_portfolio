"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  gradient?: string;
  borderGradient?: string;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  gradient = "from-violet-600/20 to-indigo-600/20",
  borderGradient = "from-violet-500 to-indigo-500",
}: BentoGridItemProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "row-span-1 rounded-2xl group/bento relative overflow-hidden",
        "border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-sm",
        "hover:border-zinc-700 transition-all duration-300",
        "p-6 flex flex-col justify-between",
        className
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500",
          gradient
        )}
      />
      {/* Animated border glow */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r p-[1px]",
          borderGradient
        )}
        style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
      />
      <div className="relative z-10">
        {header}
      </div>
      <div className="relative z-10 mt-4">
        <div className="flex items-center gap-2 mb-2">
          {icon && <div className="text-2xl">{icon}</div>}
          <div className="font-bold text-zinc-100 group-hover/bento:translate-x-1 transition duration-200">
            {title}
          </div>
        </div>
        <div className="text-sm text-zinc-400 leading-relaxed">{description}</div>
      </div>
    </motion.div>
  );
}
