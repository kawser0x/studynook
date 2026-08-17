const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/add-room", "/my-booking", "/rooms/:path"],
};
