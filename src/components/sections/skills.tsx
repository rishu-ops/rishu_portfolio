"use client";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { skills } from "@/lib/data";

const row1 = skills.slice(0, 10);
const row2 = skills.slice(10);

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="text-zinc-500 text-base max-w-md"
        >
          The tools I use day-to-day. Strongest in React ecosystem, comfortable across the stack.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-3"
      >
        <InfiniteMovingCards items={row1} direction="left" speed="slow" />
        <InfiniteMovingCards items={row2} direction="right" speed="slow" />
      </motion.div>
    </section>
  );
}
