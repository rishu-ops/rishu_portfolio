"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type Status = "idle" | "loading" | "success" | "error";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 max-w-5xl mx-auto px-4 sm:px-8">
      <motion.h2 {...fadeUp(0)} className="text-3xl sm:text-4xl font-bold text-white mb-3">
        Get in touch
      </motion.h2>
      <motion.p {...fadeUp(0.05)} className="text-zinc-500 mb-14 max-w-md">
        I&apos;m actively looking for my next role. If you have something in mind or just want to talk, reach out.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Info */}
        <motion.div {...fadeUp(0.1)} className="space-y-6">
          {[
            { icon: <Mail className="w-4 h-4" />, label: "rishurana639@gmail.com", href: "mailto:rishurana639@gmail.com" },
            { icon: <Phone className="w-4 h-4" />, label: "+91 6398301762", href: "tel:+916398301762" },
            { icon: <MapPin className="w-4 h-4" />, label: "India", href: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-150 group"
            >
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}

          <div className="pt-4 flex items-center gap-5 border-t border-zinc-800/60">
            <a
              href="https://github.com/rishu-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/rishu-rana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div {...fadeUp(0.15)}>
          {status === "success" ? (
            <div className="flex flex-col items-start gap-3 py-8">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <p className="text-zinc-200 font-medium">Message sent.</p>
              <p className="text-zinc-500 text-sm">I&apos;ll get back to you shortly.</p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors mt-1"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 transition-colors duration-150"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 transition-colors duration-150"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-600 transition-colors duration-150 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Email me directly at rishurana639@gmail.com
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
