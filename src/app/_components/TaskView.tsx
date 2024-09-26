"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";
import toast from "react-hot-toast";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progresss" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

const TaskView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const fetchAllTasks = async () => {
    try {
      const response = await GlobalApi.GetTasks();
      const fetchedTasks = response.data.tasks;
      console.log(`Response :${response.data}`);
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
      toast.success("Tasks fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error("Tasks could not be fetched");
      throw error;
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filtered = tasks.filter((task) => {
      task.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return <div>TaskView</div>;
};
export default TaskView;
