"use client";

import { Clock, Heart, Lock, Shield, type LucideIcon } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { features } from "@/constants/content";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  heart: Heart,
  lock: Lock,
  clock: Clock,
};

const iconColors = [
  "bg-kidnest-violet",
  "bg-kidnest-child-accent",
  "bg-kidnest-violet",
  "bg-kidnest-child-accent",
];

export default function FeaturesSection() {
  return (
    <AnimatedSection id="features" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-kidnest-slate-900 sm:text-4xl">
          Built for{" "}
          <span className="text-kidnest-violet">Parents</span>. Designed for{" "}
          <span className="text-kidnest-child-accent">Kids</span>.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <article
                key={feature.title}
                className="rounded-3xl bg-white p-6 text-center shadow-card transition-transform hover:-translate-y-1"
              >
                <div
                  className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${iconColors[index % iconColors.length]} shadow-sm`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-kidnest-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-kidnest-slate-600">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
