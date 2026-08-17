import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function GET(request, context) {
  try {
    return await handler.GET(request, context);
  } catch (error) {
    console.error("Auth API GET Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal Auth Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request, context) {
  try {
    return await handler.POST(request, context);
  } catch (error) {
    console.error("Auth API POST Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal Auth Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

