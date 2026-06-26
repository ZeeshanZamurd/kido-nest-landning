"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroDecorations from "./HeroDecorations";
import HeroFloatingCard from "./HeroFloatingCard";
import { HERO_ILLUSTRATION } from "@/constants/branding";
import { useHeroParallax } from "@/lib/hooks/useHeroParallax";

export default function HeroIllustrationStage() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    enabled: parallaxEnabled,
    rotateX,
    rotateY,
    translateX,
    translateY,
    onMouseMove,
    onMouseLeave,
  } = useHeroParallax(ref);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[320px] w-full items-center justify-center sm:min-h-[400px] lg:min-h-[520px]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[10%] top-[5%] h-[85%] w-[90%] rounded-full bg-[radial-gradient(circle,rgba(123,77,255,0.22)_0%,rgba(255,77,184,0.08)_45%,transparent_70%)] blur-xl" />
        <div className="absolute right-0 top-[15%] h-[70%] w-[75%] rounded-[45%] bg-[radial-gradient(ellipse,rgba(168,143,255,0.35)_0%,transparent_65%)]" />
        <div className="absolute bottom-[5%] left-[20%] h-[50%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(95,233,255,0.12)_0%,transparent_60%)] blur-lg" />
      </div>

      <HeroDecorations />

      <HeroFloatingCard
        icon="✓"
        label="Parent Approved"
        className="left-0 top-[8%] hidden sm:block sm:left-[2%]"
        delay={0.3}
      />
      <HeroFloatingCard
        icon="🛡"
        label="Safe Content"
        className="bottom-[28%] left-[-2%] hidden md:block sm:left-0"
        delay={0.6}
      />
      <HeroFloatingCard
        icon="⭐"
        label="Learning Videos"
        className="bottom-[12%] right-[0%] hidden sm:block sm:right-[2%]"
        delay={0.9}
      />
      <HeroFloatingCard
        icon="⏰"
        label="Screen Time Control"
        className="right-0 top-[12%] hidden md:block sm:right-[2%]"
        delay={1.2}
      />

      <div
        className="relative z-[5] w-full max-w-[640px] lg:max-w-none"
        style={parallaxEnabled ? { perspective: 1200 } : undefined}
      >
        <motion.div
          style={
            parallaxEnabled
              ? {
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  willChange: "transform",
                }
              : undefined
          }
          className="gpu-layer relative w-full"
        >
          <div className="kn-hero-float gpu-layer relative w-full">
            <Image
              src={HERO_ILLUSTRATION}
              alt="Child safely watching parent-approved videos on KidoNest"
              width={1536}
              height={1024}
              priority
              quality={82}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full select-none object-contain drop-shadow-[0_32px_64px_rgba(123,77,255,0.18)]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
