//
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token-manager"; // Import your token manager
import { COOKIE_NAME } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies; // Access cookies
  const path = request.nextUrl.pathname;

  console.log(`Path accessed: ${path}`);

  // Define protected routes
  const protectedPaths = ["/api/tasks", "/api/tasks/*"];

  // Check if the accessed path is protected
  const isProtected = protectedPaths.some((protectedPath) =>
    path.startsWith(protectedPath)
  );

  if (isProtected) {
    console.log(`Protected path accessed: ${path}`);

    const token = cookieStore.get(COOKIE_NAME)?.value; // Get 'token' from cookies
    console.log(`Token found in cookies: ${token}`); // Log token from cookies

    if (!token) {
      // Token is missing
      console.log("Unauthorized: Token not found");
      return NextResponse.json(
        { message: "Unauthorized: Token not found" },
        { status: 401 }
      );
    }

    try {
      // Verify the token
      const verifiedToken = await verifyToken(token); // Await the result of verifyToken
      console.log(`Verified token ${verifiedToken.token}`);
      console.log(`Token from cookie store ${token}`);

      if (verifiedToken.token === token) {
        console.log(
          `Token successfully verified: ${JSON.stringify(verifiedToken)}`
        );

        return NextResponse.next();
      } else {
        return NextResponse.json(
          { message: "Unauthorized: Wrong/corrupted token" },
          { status: 401 }
        );
      }
    } catch (error) {
      // Token verification failed
      console.error(`Token verification failed: ${error}`); // Log error
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  // If not a protected route, allow the request
  console.log(`Non-protected path accessed: ${path}`);
  return NextResponse.next();
}

// Specify the routes where the middleware should apply
export const config = {
  matcher: ["/api/tasks/:path*", "/dashboard", "/api/protected-route"],
};
