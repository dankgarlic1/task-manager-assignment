import { connectToDatabase } from "@/lib/db/connection";
import task from "@/lib/models/task";
import user from "@/lib/models/user";
import { verifyToken } from "@/lib/token-manager";
import { NextResponse } from "next/server";

//create task
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Get token from headers
    const decoded = await verifyToken(token!);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = decoded.payload.id;
    const { title, description, status, priority, dueDate } = await req.json();
    if (!title || !userId) {
      return NextResponse.json(
        { message: "Title and userId are required" },
        { status: 400 }
      );
    }
    const userExists = await user.findById(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const newTask = new task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: userId,
    });
    await newTask.save();
    userExists.tasks.push(newTask._id);
    await userExists.save();
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
//get tasks
export async function GET(req: Request) {
  await connectToDatabase();
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Get token from headers
    const decoded = await verifyToken(token!);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.payload.id;

    // Find tasks for the logged-in user
    const userTasks = await task.find({ user: userId });
    return NextResponse.json({ tasks: userTasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Error fetching tasks" },
      { status: 500 }
    );
  }
}

//update task
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Get token from headers
    const decoded = await verifyToken(token!);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { taskId, title, description, status, priority, dueDate } =
      await req.json();
    if (!taskId) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }
    const updatedTask = await task.findByIdAndUpdate(
      taskId,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate }),
      },
      { new: true }
    );
    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Task updated successfully", task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Error updating task" },
      { status: 500 }
    );
  }
}

//delete task
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Get token from headers
    const decoded = await verifyToken(token!);

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");
    if (!taskId) {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }
    // Find the task to delete
    const deletedTask = await task.findById(taskId);
    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    // Remove the task reference from the user's tasks array
    await user.findByIdAndUpdate(deletedTask.user, {
      $pull: { tasks: taskId },
    });

    // Delete the task
    await task.findByIdAndDelete(taskId);

    return NextResponse.json(
      { message: "Task deleted successfully", task: deletedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Error deleting task" },
      { status: 500 }
    );
  }
}
