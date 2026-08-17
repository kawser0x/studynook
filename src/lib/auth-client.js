import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.BETTER_AUTH_URL ||
    (typeof window !== "undefined" ? window.location.origin : ""),
  plugins: [jwtClient()],
});

export async function getAuthToken() {
  try {
    const res = await fetch("/api/auth/token", {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return data?.token || null;
    }
  } catch (e) {
    console.error("Failed to fetch auth token:", e);
  }
  return null;
}


