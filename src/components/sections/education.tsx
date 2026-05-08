"use client";
import { motion } from "framer-motion";
import { education } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function Education() {
  return (
    <section id="education" className="py-24 lg:py-28 max-w-5xl mx-auto px-4 sm:px-8">
      <motion.h2 {...fadeUp(0)} className="text-3xl sm:text-4xl font-bold text-white mb-14">
        Education
      </motion.h2>

      <div className="space-y-0">
        {education.map((edu, idx) => (
          <motion.div
            key={edu.institution}
            {...fadeUp(idx * 0.08)}
            className="grid sm:grid-cols-[180px_1fr] gap-x-10 gap-y-1 py-8 border-t border-zinc-800/60 last:border-b last:border-zinc-800/60"
          >
            <div className="pt-0.5">
              <p className="text-sm text-zinc-500">{edu.period}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{edu.grade}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-zinc-100 mb-0.5">{edu.degree}</h3>
              <p className="text-sm text-zinc-400">{edu.institution}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
