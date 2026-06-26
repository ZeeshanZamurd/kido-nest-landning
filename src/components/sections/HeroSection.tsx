"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroIllustrationStage from "@/components/hero/HeroIllustrationStage";
import { heroBullets } from "@/constants/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function FeatureCheckIcon() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kidnest-violet to-kidnest-pink shadow-[0_4px_14px_rgba(123,77,255,0.35)]">
      <Check className="h-4 w-4 text-white" strokeWidth={3} />
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] overflow-hidden bg-[#fafbff]"
    >
      {/* Page-wide ambient gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-kidnest-violet/8 blur-2xl" />
        <div className="absolute -right-32 top-20 h-[600px] w-[600px] rounded-full bg-kidnest-pink/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-kidnest-cyan/8 blur-xl" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left — content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 space-y-8 lg:space-y-10"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-kidnest-violet/15 bg-white/70 px-5 py-2 text-xs font-bold tracking-wide text-kidnest-violet shadow-sm backdrop-blur-sm sm:text-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-kidnest-violet" />
              A Safe Digital World for Your Child
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-kidnest-slate-900 sm:text-6xl lg:text-7xl xl:text-[4.5rem]"
            >
              You Control.
              <br />
              <span className="bg-gradient-to-r from-kidnest-violet via-kidnest-pink to-kidnest-cyan bg-clip-text text-transparent">
                They Explore.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-lg text-lg font-medium leading-[1.75] text-kidnest-slate-600 sm:text-xl sm:leading-8"
            >
              Kido Nest gives parents the power to approve videos, manage
              interests, and create a safe screen time experience for kids.
            </motion.p>

            <motion.ul variants={fadeInUp} className="space-y-4">
              {heroBullets.map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <FeatureCheckIcon />
                  <span className="text-base font-semibold text-kidnest-slate-800 sm:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center"
            >
              <Button href="#coming-soon" className="px-8 py-3.5 text-base">
                Coming Soon
              </Button>
              <Button href="#features" variant="secondary" className="px-8 py-3.5 text-base">
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — immersive illustration stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full"
          >
            <HeroIllustrationStage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
