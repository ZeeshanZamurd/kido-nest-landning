export type WaitlistSource = "hero" | "newsletter";

export type WaitlistJoinResponse = {
  email: string;
  alreadySubscribed: boolean;
  message: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.kido-nest.fun/api";

function parseErrorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "message" in body) {
    const message = (body as { message: unknown }).message;
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(", ");
  }
  return fallback;
}

export async function joinWaitlist(
  email: string,
  source: WaitlistSource,
): Promise<WaitlistJoinResponse> {
  const res = await fetch(`${API_BASE}/waitlist/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim(), source }),
  });

  const body: unknown = await res.json().catch(() => null);

  if (res.status === 429) {
    throw new Error("Too many signups from this device. Please try again in a minute.");
  }

  if (!res.ok) {
    throw new Error(parseErrorMessage(body, "Could not join the waitlist. Please try again."));
  }

  return body as WaitlistJoinResponse;
}
