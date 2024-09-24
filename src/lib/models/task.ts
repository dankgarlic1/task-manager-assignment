import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
