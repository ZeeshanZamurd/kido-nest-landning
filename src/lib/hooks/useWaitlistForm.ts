"use client";

import { useState } from "react";
import { joinWaitlist, type WaitlistSource } from "@/lib/api/waitlist";

export function useWaitlistForm(source: WaitlistSource) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const result = await joinWaitlist(email, source);
      setMessage(result.message);
      setSubmitted(true);
    } catch (err) {
      setSubmitted(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    submitted,
    loading,
    error,
    message,
    handleSubmit,
  };
}
