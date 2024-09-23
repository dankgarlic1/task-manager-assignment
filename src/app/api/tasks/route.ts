import { connectToDatabase } from "@/lib/db/connection";
import task from "@/lib/models/task";
import { verifyToken } from "@/lib/token-manager";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { title, description, status, priority, dueDate, userId } =
      await req.json();
    if (!title || !userId) {
      return NextResponse.json(
        { message: "Title and userId are required" },
        { status: 400 }
      );
    }
    const newTask = new task({
      title,
      description,
      status,
      priority,
      dueDate,
      userId,
    });
    await newTask.save();
    return NextResponse.json(
      { message: "Task created successfully", task: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Error creating task" },
      { status: 500 }
    );
  }
}
