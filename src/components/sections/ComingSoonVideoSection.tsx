"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { COMING_SOON_VIDEO, COMING_SOON_VIDEO_POSTER } from "@/constants/branding";

export default function ComingSoonVideoSection() {
  return (
    <AnimatedSection id="preview" className="bg-[#f3eeff] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-kidnest-violet/20 bg-white/80 px-4 py-1.5 text-xs font-bold text-kidnest-violet shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-kidnest-violet" />
            We&apos;re Online
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-kidnest-slate-900 sm:text-4xl">
            Watch the{" "}
            <span className="text-kidnest-violet">KidoNest</span> teaser
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-kidnest-slate-600 sm:text-lg">
            A look at the safe, parent-controlled video experience families can
            download on Google Play.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl">
          <div
            className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-kidnest-violet/25 via-kidnest-pink/15 to-kidnest-cyan/20 blur-2xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-kidnest-slate-900 shadow-[0_24px_80px_rgba(123,77,255,0.22)]">
            <video
              controls
              playsInline
              preload="metadata"
              poster={COMING_SOON_VIDEO_POSTER}
              className="aspect-video w-full bg-kidnest-slate-900 object-cover"
            >
              <source src={COMING_SOON_VIDEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
