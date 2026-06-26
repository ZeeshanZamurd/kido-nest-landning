"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <AnimatedSection id="contact" className="bg-white pb-14 pt-4 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-2xl bg-[#fff8e1] px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-6">
          <div className="flex items-center gap-3 sm:min-w-0 sm:flex-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-kidnest-child-accent/30">
              <Mail className="h-5 w-5 text-kidnest-slate-800" />
            </div>
            <p className="text-sm font-semibold text-kidnest-slate-800 sm:text-base">
              Stay Updated — Subscribe to get notified when we launch.
            </p>
          </div>

          {submitted ? (
            <p className="text-sm font-semibold text-kidnest-violet sm:shrink-0">
              Thanks! We&apos;ll notify {email}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-kidnest-slate-900 shadow-sm placeholder:text-kidnest-slate-400 focus:outline-none focus:ring-2 focus:ring-kidnest-violet/30 sm:min-w-[220px]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-kidnest-violet px-6 py-3 text-sm font-bold text-white shadow-brand transition-transform hover:scale-[1.02]"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
