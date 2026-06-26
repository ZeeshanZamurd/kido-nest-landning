"use client";

const clouds = [
  { top: "8%", left: "58%", size: "w-14 h-8", delay: 0 },
  { top: "18%", left: "78%", size: "w-20 h-10", delay: 0.5 },
  { top: "62%", left: "52%", size: "w-16 h-9", delay: 1 },
];

const stars = [
  { top: "12%", left: "68%", size: "text-lg", delay: 0.2 },
  { top: "28%", left: "88%", size: "text-sm", delay: 0.8 },
  { top: "72%", left: "82%", size: "text-base", delay: 1.2 },
  { top: "45%", left: "55%", size: "text-xs", delay: 0.6 },
];

const sparkles = [
  { top: "22%", left: "72%", delay: 0 },
  { top: "55%", left: "90%", delay: 0.4 },
  { top: "38%", left: "62%", delay: 0.9 },
];

export default function HeroDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {clouds.map((cloud, i) => (
        <div
          key={`cloud-${i}`}
          className={`kn-animate-cloud gpu-layer absolute ${cloud.size} rounded-full bg-white/70 shadow-sm`}
          style={{ top: cloud.top, left: cloud.left, animationDelay: `${cloud.delay}s` }}
        />
      ))}

      {stars.map((star, i) => (
        <span
          key={`star-${i}`}
          className={`kn-animate-star gpu-layer absolute ${star.size} text-kidnest-child-accent`}
          style={{ top: star.top, left: star.left, animationDelay: `${star.delay}s` }}
        >
          ✦
        </span>
      ))}

      {sparkles.map((s, i) => (
        <div
          key={`sparkle-${i}`}
          className="kn-animate-sparkle gpu-layer absolute h-2 w-2 rounded-full bg-kidnest-cyan/80"
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
        />
      ))}

      <div
        className="kn-glow-pulse gpu-layer absolute bottom-[18%] right-[8%] h-16 w-16 rounded-full bg-kidnest-pink/15 blur-lg"
        aria-hidden
      />
      <div
        className="kn-animate-cloud gpu-layer absolute top-[30%] right-[15%] h-10 w-10 rounded-2xl bg-kidnest-violet/10"
        style={{ animationDuration: "8s" }}
        aria-hidden
      />
    </div>
  );
}
