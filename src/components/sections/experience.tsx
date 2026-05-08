"use client";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 max-w-5xl mx-auto px-4 sm:px-8">
      <motion.h2
        {...fadeUp(0)}
        className="text-3xl sm:text-4xl font-bold text-white mb-14"
      >
        Work experience
      </motion.h2>

      <div className="space-y-0">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            {...fadeUp(idx * 0.08)}
            className="group relative grid sm:grid-cols-[180px_1fr] gap-x-10 gap-y-2 py-10 border-t border-zinc-800/60 last:border-b last:border-zinc-800/60"
          >
            {/* Left: date + company */}
            <div className="pt-0.5">
              <p className="text-sm text-zinc-500 leading-relaxed">{exp.period}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{exp.location}</p>
            </div>

            {/* Right: content */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-3">
                <h3 className="text-base font-semibold text-zinc-100">{exp.title}</h3>
                <span className="text-zinc-500 text-sm hidden sm:block">·</span>
                <span className="text-sm text-zinc-400">{exp.company}</span>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-2xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
