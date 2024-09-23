import { connectToDatabase } from "@/lib/db/connection";
import user from "@/lib/models/user";
import bycrypt from "bcrypt";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await user.findOne({
      email,
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json({ message: "Error signing up" }, { status: 500 });
  }
}
