"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandWordmark from "@/components/brand/BrandWordmark";
import { PLAY_STORE_URL } from "@/constants/branding";
import { navLinks } from "@/constants/content";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-kidnest-slate-100 bg-white/[0.98] supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home">
          <BrandWordmark size={38} priority />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold text-kidnest-slate-600 transition-colors hover:text-kidnest-violet"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gradient-to-r from-kidnest-violet to-[#a88bff] px-5 py-2.5 text-sm font-bold text-white shadow-brand transition-transform hover:scale-[1.02] md:inline-block"
        >
          We&apos;re Online
        </a>

        <button
          type="button"
          className="rounded-lg p-2 text-kidnest-violet md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-kidnest-slate-100 bg-white md:hidden"
          >
            <ul className="space-y-1 px-4 py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-kidnest-violet"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-kidnest-slate-100 px-4 py-3">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-kidnest-violet py-3 text-center text-sm font-bold text-white"
              >
                We&apos;re Online
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
