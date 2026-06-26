"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  icon: string;
  className?: string;
  delay?: number;
};

export default function HeroFloatingCard({
  label,
  icon,
  className = "",
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-20 ${className}`}
    >
      <div
        className="kn-card-float gpu-layer flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-[0_8px_32px_rgba(123,77,255,0.12)] transition-transform duration-300 hover:scale-105"
        style={{ animationDelay: `${delay}s`, animationDuration: `${5.5 + delay}s` }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-kidnest-violet/20 to-kidnest-pink/20 text-base">
          {icon}
        </span>
        <span className="whitespace-nowrap text-xs font-bold text-kidnest-slate-800 sm:text-sm">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
