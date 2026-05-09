"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-200",
          scrolled && "border-b border-zinc-800/70 bg-[#1a1a1a]/85 backdrop-blur-md"
        )}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-sm font-semibold text-zinc-100 hover:text-white transition-colors tracking-tight">
            rishu.dev
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scroll(link.href)}
                className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-150 tracking-tight"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scroll("#contact"); }}
              className="hidden md:inline-flex items-center px-3.5 py-1.5 border border-zinc-700 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors duration-150 tracking-tight"
            >
              Hire me
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-200"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-zinc-800/60 md:hidden"
          >
            <nav className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scroll(link.href)}
                  className="text-left px-3 py-3 text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-colors duration-150"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 mt-1 border-t border-zinc-800/60">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scroll("#contact"); }}
                  className="block px-3 py-3 text-sm text-zinc-300 hover:text-white"
                >
                  Hire me →
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
