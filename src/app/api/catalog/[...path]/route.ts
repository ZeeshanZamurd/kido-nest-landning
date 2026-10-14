import { NextRequest, NextResponse } from "next/server";

const UPSTREAM = process.env.KIDNEST_API_URL ?? "https://api.kido-nest.fun/api";

const ALLOWED =
  /^(categories|languages|(videos|channels)(\/[0-9a-f-]{36})?|playlists\/[0-9a-f-]{36}|channels\/[0-9a-f-]{36}\/playlists)$/;

let cachedToken: { value: string; expiresAt: number } | null = null;

async function parentToken() {
  const email = process.env.KIDNEST_ADMIN_EMAIL;
  const password = process.env.KIDNEST_ADMIN_PASSWORD;
  if (!email || !password) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const response = await fetch(`${UPSTREAM}/auth/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!response.ok) return null;
  const body = (await response.json()) as { accessToken?: string };
  if (!body.accessToken) return null;
  cachedToken = { value: body.accessToken, expiresAt: Date.now() + 10 * 60 * 1000 };
  return body.accessToken;
}

async function forward(url: string, token?: string) {
  return fetch(url, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const joined = path.join("/");
  if (!ALLOWED.test(joined)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const url = new URL(`${UPSTREAM}/${joined}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  let upstream = await forward(url.toString());
  if (upstream.status === 401 || upstream.status === 403) {
    const token = await parentToken();
    if (token) upstream = await forward(url.toString(), token);
  }

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
}
