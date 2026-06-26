"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"section"> & {
  id?: string;
  className?: string;
};

export default function AnimatedSection({
  children,
  className,
  id,
  ...props
}: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
