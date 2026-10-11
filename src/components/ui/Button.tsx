"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { scaleOnHover } from "@/lib/animations";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-kidnest-violet to-kidnest-pink text-white shadow-brand hover:shadow-glow",
  secondary:
    "bg-white/80 text-kidnest-slate-900 border border-kidnest-slate-200 backdrop-blur-sm hover:border-kidnest-violet/30 hover:bg-white",
  ghost: "text-kidnest-slate-600 hover:text-kidnest-violet bg-transparent",
};

export default function Button({
  children,
  variant = "primary",
  className,
  href,
  external = false,
  type = "button",
  onClick,
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...scaleOnHover}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      {...scaleOnHover}
    >
      {children}
    </motion.button>
  );
}
