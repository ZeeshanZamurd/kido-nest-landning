"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BRAND_IMAGE, PLAY_STORE_URL } from "@/constants/branding";

function StoreButton({
  store,
  href,
}: {
  store: "google" | "apple";
  href?: string;
}) {
  const className =
    "flex w-full max-w-[200px] items-center gap-3 rounded-xl bg-kidnest-slate-900 px-4 py-2.5 text-left transition-opacity hover:opacity-90";
  const content =
    store === "google" ? (
      <>
        <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
          <path fill="#EA4335" d="M3.9 12c0-1.6.5-3.1 1.4-4.3L1.5 5.3C.6 6.9 0 9.4 0 12s.6 5.1 1.5 6.7l3.8-2.5C3.4 15.1 3.9 13.6 3.9 12z" />
          <path fill="#FBBC05" d="M12 4.8c1.8 0 3.4.6 4.7 1.7l3.5-3.5C17.9 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.5 6.7l3.8 2.5C6.1 6.1 8.9 4.8 12 4.8z" />
          <path fill="#34A853" d="M12 19.2c-3.1 0-5.8-1.3-7.7-3.3l-3.8 2.5C2.7 21.3 6.8 24 12 24c3.2 0 6.2-1.1 8.5-3.1l-3.5-3.5c-1.3 1-2.9 1.6-4.7 1.6z" />
          <path fill="#4285F4" d="M23.5 12c0-.8-.1-1.6-.3-2.3H12v4.4h6.5c-.3 1.4-1.1 2.6-2.3 3.4l3.5 3.5c2.1-1.9 3.3-4.7 3.3-8z" />
        </svg>
        <div>
          <p className="text-[9px] uppercase leading-none text-white/70">Get it on</p>
          <p className="text-sm font-semibold text-white">Google Play</p>
        </div>
      </>
    ) : (
      <>
        <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-white" aria-hidden>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div>
          <p className="text-[9px] uppercase leading-none text-white/70">Download on the</p>
          <p className="text-sm font-semibold text-white">App Store</p>
        </div>
      </>
    );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={`${className} cursor-default opacity-70`} aria-disabled="true">
      {content}
    </div>
  );
}

export default function ComingSoonSection() {
  return (
    <AnimatedSection id="download" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 rounded-[2rem] bg-[#f3eeff] px-6 py-10 sm:px-10 lg:flex-row lg:justify-between lg:gap-6 lg:py-12">
          <div className="flex shrink-0 items-center justify-center">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-kidnest-violet/20 blur-lg"
                aria-hidden
              />
              <Image
                src={BRAND_IMAGE}
                alt="KidoNest — baby in a protective shield"
                width={220}
                height={220}
                quality={85}
                className="relative h-auto w-[180px] object-contain drop-shadow-[0_16px_40px_rgba(123,77,255,0.25)] sm:w-[220px]"
              />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-kidnest-violet/15 px-4 py-1 text-xs font-bold text-kidnest-violet">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-kidnest-violet" />
              We&apos;re Online
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-kidnest-violet sm:text-4xl">
              Now on Google Play
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-kidnest-slate-600 sm:text-base lg:max-w-sm">
              KidoNest is live on Android. Download the app and give your kids a
              safe, parent-controlled place to watch. iOS is coming soon.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <StoreButton store="google" href={PLAY_STORE_URL} />
            <div className="flex flex-col items-center gap-1.5 lg:items-stretch">
              <StoreButton store="apple" />
              <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-kidnest-slate-500">
                App Store coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
