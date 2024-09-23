import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token-manager"; // Import your token manager
import { COOKIE_NAME } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies; // Access cookies
  const path = request.nextUrl.pathname;

  console.log(`Path accessed: ${path}`); // Log the accessed path

  // Define routes that require token verification
  const protectedPaths = ["/api/tasks", "/api/tasks/*"];

  // If the path is protected, proceed with token verification
  if (protectedPaths.includes(path)) {
    console.log(`Protected path accessed: ${path}`);

    const token = cookieStore.get(COOKIE_NAME)?.value; // Get 'token' from cookies
    console.log(`Token found in cookies: ${token}`); // Log token from cookies

    if (!token) {
      // Token is missing
      console.log("Unauthorized: Token not found"); // Log missing token
      return NextResponse.json(
        { message: "Unauthorized: Token not found" },
        { status: 401 }
      );
    }

    try {
      // Verify the token
      const verifiedToken = await verifyToken(token);
      console.log(
        `Token successfully verified: ${JSON.stringify(verifiedToken)}`
      ); // Log successful verification

      // Token is valid; allow the request to proceed
      return NextResponse.next();
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
