// src/app/api/auth/check-auth/route.ts
import { NextRequest, NextResponse } from "next/server"; // Import Next.js server utilities

// Export a GET handler for the /api/auth/check-auth route
export async function GET(request: NextRequest) {
  // Grab the 'user' cookie from the incoming request
  const user = request.cookies.get("user")?.value; // Undefined if no cookie, so optional chaining

  // If no user cookie exists, return a 401 Unauthorized response
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // JSON response with error message
  }

  // If user cookie exists, return it in a 200 OK response
  return NextResponse.json({ user }); // Sends { user: "username" } back to client
}