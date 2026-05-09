"use client";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 max-w-5xl mx-auto px-4 sm:px-8">
      <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
        {/* Left: prose */}
        <div className="space-y-6">
          <motion.h2
            {...fadeUp(0)}
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            About me
          </motion.h2>

          <motion.p {...fadeUp(0.05)} className="text-zinc-400 text-lg leading-relaxed">
            I&apos;m a fullstack developer based in India with about a year and
            a half of professional experience. Most of my work has been at early-stage
            startups where I&apos;ve had to own features end-to-end — from writing the
            API to shipping the UI.
          </motion.p>

          <motion.p {...fadeUp(0.1)} className="text-zinc-400 leading-relaxed">
            My main focus is React and Next.js on the frontend, but I&apos;m comfortable
            across the stack — Node.js backends, PostgreSQL and MongoDB databases, REST
            APIs, and third-party integrations like Razorpay or Socket.IO. I care a lot
            about writing code that&apos;s easy to maintain, not just code that works.
          </motion.p>

          <motion.p {...fadeUp(0.2)} className="text-zinc-400 leading-relaxed">
            Outside of work I&apos;m finishing my BCA at Uttaranchal University (8.5 GPA
            so far). When I&apos;m not coding I&apos;m usually reading about system
            design or messing around with new tools.
          </motion.p>
        </div>

        {/* Right: quick facts */}
        <motion.div
          {...fadeUp(0.1)}
          className="space-y-0"
        >
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
            Quick facts
          </h3>
          {[
            { label: "Experience", value: "~1.5 years" },
            { label: "Location", value: "India" },
            { label: "Status", value: "Open to work" },
            { label: "Education", value: "BCA, Uttaranchal Univ." },
            { label: "Primary stack", value: "React, Next.js, Node.js" },
            { label: "Databases", value: "PostgreSQL, MongoDB" },
            { label: "Looking for", value: "Full-time / Contract" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-baseline py-3 border-b border-zinc-800/70 last:border-b-0"
            >
              <span className="text-sm text-zinc-500">{label}</span>
              <span className="text-sm text-zinc-200 font-medium text-right max-w-45">
                {value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
