export type AccountDeletionRequestResponse = {
  email: string;
  alreadyRequested: boolean;
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

export async function requestAccountDeletion(
  email: string,
  reason?: string,
): Promise<AccountDeletionRequestResponse> {
  const res = await fetch(`${API_BASE}/account-deletion/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim(),
      reason: reason?.trim() || undefined,
    }),
  });

  const body: unknown = await res.json().catch(() => null);

  if (res.status === 429) {
    throw new Error("Too many requests. Please try again in a minute.");
  }

  if (!res.ok) {
    throw new Error(
      parseErrorMessage(body, "Could not submit your request. Please try again."),
    );
  }

  return body as AccountDeletionRequestResponse;
}
