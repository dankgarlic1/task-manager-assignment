// types.ts
export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface TaskData {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: Date;
}

export interface UpdateTaskData extends TaskData {
  taskId: string;
}

export interface DeleteTaskData {
  taskId: string;
}
