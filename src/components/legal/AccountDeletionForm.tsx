"use client";

import { useState } from "react";
import { requestAccountDeletion } from "@/lib/api/account-deletion";

export default function AccountDeletionForm() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const result = await requestAccountDeletion(email, reason);
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (message) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="deletion-email"
          className="mb-1.5 block text-sm font-semibold text-kidnest-slate-800"
        >
          Account email
        </label>
        <input
          id="deletion-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-kidnest-slate-200 px-4 py-3 text-sm text-kidnest-slate-900 outline-none ring-kidnest-violet/30 transition focus:border-kidnest-violet focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="deletion-reason"
          className="mb-1.5 block text-sm font-semibold text-kidnest-slate-800"
        >
          Additional details (optional)
        </label>
        <textarea
          id="deletion-reason"
          rows={4}
          placeholder="Tell us if you need child profiles removed or have billing questions."
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className="w-full resize-y rounded-xl border border-kidnest-slate-200 px-4 py-3 text-sm text-kidnest-slate-900 outline-none ring-kidnest-violet/30 transition focus:border-kidnest-violet focus:ring-2"
        />
      </div>

      {error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-kidnest-violet to-[#a88bff] px-6 py-3 text-sm font-bold text-white shadow-brand transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Submitting..." : "Request account deletion"}
      </button>
    </form>
  );
}
