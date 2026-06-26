"use client";

import { useWaitlistForm } from "@/lib/hooks/useWaitlistForm";

type Props = {
  variant?: "hero" | "overlay";
};

export default function HeroWaitlistForm({ variant = "hero" }: Props) {
  const { email, setEmail, submitted, loading, error, message, handleSubmit } =
    useWaitlistForm("hero");

  const isOverlay = variant === "overlay";

  if (submitted) {
    return (
      <p
        className={
          isOverlay
            ? "rounded-2xl border border-white/25 bg-white/15 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm sm:text-base"
            : "rounded-2xl border border-kidnest-violet/15 bg-white px-5 py-4 text-sm font-semibold text-kidnest-slate-800 shadow-sm sm:text-base"
        }
      >
        {message || (
          <>
            You&apos;re on the list! We&apos;ll notify{" "}
            <span className={isOverlay ? "text-kidnest-child-accent" : "text-kidnest-violet"}>
              {email}
            </span>{" "}
            at launch.
          </>
        )}
      </p>
    );
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="hero-waitlist-email" className="sr-only">
          Email for waitlist
        </label>
        <input
          id="hero-waitlist-email"
          type="email"
          required
          disabled={loading}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            isOverlay
              ? "w-full flex-1 rounded-full border border-white/30 bg-white/95 px-5 py-3.5 text-sm text-kidnest-slate-900 shadow-lg placeholder:text-kidnest-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 sm:py-4 sm:text-base"
              : "w-full flex-1 rounded-full border border-kidnest-slate-200 bg-white px-5 py-3.5 text-sm text-kidnest-slate-900 shadow-sm placeholder:text-kidnest-slate-400 focus:outline-none focus:ring-2 focus:ring-kidnest-violet/30 disabled:opacity-70 sm:py-4 sm:text-base"
          }
        />
        <button
          type="submit"
          disabled={loading}
          className={
            isOverlay
              ? "shrink-0 rounded-full bg-white px-8 py-3.5 text-sm font-extrabold text-kidnest-violet shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 sm:py-4 sm:text-base"
              : "shrink-0 rounded-full bg-gradient-to-r from-kidnest-violet to-[#a88bff] px-8 py-3.5 text-sm font-extrabold text-white shadow-brand transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 sm:py-4 sm:text-base"
          }
        >
          {loading ? "Joining…" : "Join Waitlist"}
        </button>
      </form>
      {error ? (
        <p
          className={`mt-2 text-sm font-medium ${isOverlay ? "text-red-200" : "text-red-600"}`}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
