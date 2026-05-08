"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  gradientColors?: string;
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  animate = true,
  gradientColors = "from-violet-600 via-cyan-500 to-violet-600",
}: AnimatedGradientBorderProps) {
  return (
    <div className={cn("relative rounded-2xl p-[1px] overflow-hidden group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity duration-500",
          gradientColors,
          animate && "animate-gradient-x"
        )}
      />
      <div
        className={cn(
          "relative rounded-2xl bg-zinc-950 z-10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function GlowingCard({
  children,
  className,
  glowColor = "rgba(139, 92, 246, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden group",
        className
      )}
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.05)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
