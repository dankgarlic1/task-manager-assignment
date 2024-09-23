import { connectToDatabase } from "@/lib/db/connection";
import user from "@/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createToken } from "@/lib/token-manager";
import cookie from "cookie";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPassswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPassswordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const token = createToken(existingUser.id, existingUser.email, "1h");
    const cookieOptions: cookie.CookieSerializeOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
      sameSite: "lax",
    };
    const serializedCookies = cookie.serialize(
      COOKIE_NAME,
      token,
      cookieOptions
    );
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: existingUser.id, email: existingUser.email },
        token,
      },
      { status: 200 }
    );
    // localStorage.setItem("token", token);

    response.headers.append("Set-Cookie", serializedCookies);
    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ message: "Error signing in" }, { status: 500 });
  }
}
