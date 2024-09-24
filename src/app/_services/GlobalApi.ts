import axios from "axios";
import {
  SignupData,
  SigninData,
  TaskData,
  UpdateTaskData,
  DeleteTaskData,
} from "@/lib/types";
const Signup = async (data: SignupData) => {
  return axios.post("/api/auth/signup", data);
};
const Signin = async (data: SigninData) => {
  return axios.post("/api/auth/signin", data);
};
const CreateTask = async (data: TaskData) => {
  return axios.post("/api/tasks", data);
};
const GetTasks = async () => {
  return axios.get("/api/tasks");
};
const UpdateTask = async (data: UpdateTaskData) => {
  return axios.put("/api/tasks", data);
};
const DeleteTask = async (taskId: DeleteTaskData) => {
  return axios.delete("/api/tasks?taskId=" + taskId);
};
export default {
  Signup,
  Signin,
  CreateTask,
  GetTasks,
  UpdateTask,
  DeleteTask,
};
