"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GradientBorderCard({ children, className }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("group relative rounded-2xl p-[1px]", className)}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-kidnest-violet/40 via-kidnest-pink/30 to-kidnest-cyan/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl bg-white p-6 shadow-card transition-shadow duration-300 group-hover:shadow-glow sm:p-8">
        {children}
      </div>
    </motion.div>
  );
}
