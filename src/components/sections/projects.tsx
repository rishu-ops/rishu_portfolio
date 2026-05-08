"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32 max-w-5xl mx-auto px-4 sm:px-8">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl sm:text-4xl font-bold text-white mb-3"
      >
        Projects
      </motion.h2>
      <motion.p
        {...fadeUp(0.05)}
        className="text-zinc-500 mb-14 max-w-md"
      >
        Things I&apos;ve built and shipped in production.
      </motion.p>

      <div className="space-y-0">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            {...fadeUp(idx * 0.08)}
            className={cn(
              "group relative py-10 border-t border-zinc-800/60 last:border-b last:border-zinc-800/60",
              "grid sm:grid-cols-[1fr_auto] gap-6 items-start"
            )}
          >
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium uppercase tracking-wide">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-2xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: links */}
            <div className="flex items-center gap-3 pt-0.5 sm:flex-col sm:items-end">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                Live
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
              >
                <FaGithub className="w-3.5 h-3.5" />
                Code
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
