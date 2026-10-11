"use client";

import { Mail } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useWaitlistForm } from "@/lib/hooks/useWaitlistForm";

export default function NewsletterSection() {
  const { email, setEmail, submitted, loading, error, message, handleSubmit } =
    useWaitlistForm("newsletter");

  return (
    <AnimatedSection id="contact" className="bg-white pb-14 pt-4 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-2xl bg-[#fff8e1] px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-6">
          <div className="flex items-center gap-3 sm:min-w-0 sm:flex-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-kidnest-child-accent/30">
              <Mail className="h-5 w-5 text-kidnest-slate-800" />
            </div>
            <p className="text-sm font-semibold text-kidnest-slate-800 sm:text-base">
              Stay Updated — News, tips, and the iOS launch.
            </p>
          </div>

          {submitted ? (
            <p className="text-sm font-semibold text-kidnest-violet sm:shrink-0">
              {message || `Thanks! We'll notify ${email}`}
            </p>
          ) : (
            <div className="w-full sm:w-auto">
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
              >
                <input
                  type="email"
                  required
                  disabled={loading}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-kidnest-slate-900 shadow-sm placeholder:text-kidnest-slate-400 focus:outline-none focus:ring-2 focus:ring-kidnest-violet/30 disabled:opacity-70 sm:min-w-[220px]"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 rounded-full bg-kidnest-violet px-6 py-3 text-sm font-bold text-white shadow-brand transition-transform hover:scale-[1.02] disabled:opacity-70"
                >
                  {loading ? "Saving…" : "Notify Me"}
                </button>
              </form>
              {error ? (
                <p className="mt-2 text-sm font-medium text-red-600" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
