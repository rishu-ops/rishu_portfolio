"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import dynamic from "next/dynamic";

function SceneSkeleton() {
  return (
    <div className="w-full h-full bg-[#0d0906] flex flex-col justify-between p-5 overflow-hidden">
      {/* Neon sign skeleton */}
      <div className="flex justify-start">
        <div className="h-5 w-36 bg-zinc-800/60 animate-pulse" />
      </div>

      {/* Mid row: lanterns + monitor */}
      <div className="flex items-end justify-between gap-4 px-2">
        {/* Lanterns */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-8 bg-zinc-800/50 animate-pulse" style={{ animationDelay: "0.1s" }} />
          <div className="w-5 h-8 bg-zinc-800/50 animate-pulse" style={{ animationDelay: "0.25s" }} />
        </div>

        {/* Monitor */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-40 h-24 bg-zinc-800/60 animate-pulse flex flex-col justify-center gap-1.5 px-3" style={{ animationDelay: "0.15s" }}>
            <div className="h-1.5 w-24 bg-zinc-700/70 animate-pulse" />
            <div className="h-1.5 w-16 bg-zinc-700/70 animate-pulse" />
            <div className="h-1.5 w-20 bg-zinc-700/70 animate-pulse" />
            <div className="h-1.5 w-12 bg-zinc-700/70 animate-pulse" />
          </div>
          <div className="w-3 h-3 bg-zinc-800/50 animate-pulse" />
          <div className="w-14 h-1 bg-zinc-800/50 animate-pulse" />
        </div>

        {/* Ramen bowl */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-zinc-800/40 animate-pulse rounded-full" style={{ animationDelay: "0.2s" }} />
          <div className="w-12 h-5 bg-zinc-800/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>

      {/* Character skeleton */}
      <div className="flex justify-center mb-2">
        <div className="flex flex-col items-center gap-1">
          {/* Head */}
          <div className="w-8 h-8 bg-zinc-800/50 animate-pulse" style={{ animationDelay: "0.05s" }} />
          {/* Torso */}
          <div className="w-12 h-14 bg-zinc-800/50 animate-pulse" style={{ animationDelay: "0.1s" }} />
          {/* Arms row */}
          <div className="flex gap-8 -mt-10">
            <div className="w-3 h-10 bg-zinc-800/40 animate-pulse" style={{ animationDelay: "0.15s" }} />
            <div className="w-3 h-10 bg-zinc-800/40 animate-pulse" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      </div>

      {/* Status line */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-3 h-3 border border-zinc-700 border-t-orange-600/60 animate-spin" style={{ borderRadius: 0 }} />
        <span className="text-[10px] text-zinc-700 tracking-widest font-mono">loading scene…</span>
      </div>
    </div>
  );
}

// Dynamically import 3D scene — avoids SSR issues with WebGL
const RamenScene = dynamic(
  () => import("@/components/3d/ramen-scene").then((m) => m.RamenScene),
  { ssr: false, loading: () => <SceneSkeleton /> }
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      {/* Top-left ambient glow */}
      <div
        className="absolute top-0 left-0 w-[420px] h-[360px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 grid lg:grid-cols-[1fr_420px] gap-10 items-center pt-20 lg:pt-0">

        {/* ── Left: Text Content ──────────────────────────────────────── */}
        <div className="py-16 lg:py-0">
          {/* Status */}
          <motion.div {...fadeUp(0.05)} className="flex items-center gap-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-zinc-500 tracking-tight">
              Open to full-time roles — Chandigarh / Remote
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.12)}
            className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.04] mb-5"
          >
            Rishu Rana
          </motion.h1>

          {/* Role / tagline */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-md leading-relaxed"
          >
            Fullstack developer — I build React frontends and Node.js
            backends that are fast, clean, and maintainable.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.28)} className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors duration-150"
            >
              See my work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
            </a>

            <a
              href="/rishu_updated.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-800 text-zinc-300 text-sm font-medium hover:border-zinc-600 hover:text-white transition-colors duration-150"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.35)} className="flex items-center gap-5">
            <a
              href="https://github.com/rishu-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-300 transition-colors duration-150"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/rishu-rana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-300 transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:rishurana639@gmail.com"
              className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors duration-150"
            >
              rishurana639@gmail.com
            </a>
          </motion.div>
        </div>

        {/* ── Right: 3D Scene ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative hidden lg:block"
          style={{ height: "480px" }}
        >
          <RamenScene />
          {/* Corner label */}
          <div className="absolute bottom-2 right-2 text-[10px] text-zinc-700 tracking-widest uppercase select-none pointer-events-none">
            lo-fi coder
          </div>
        </motion.div>

      </div>
    </section>
  );
}
