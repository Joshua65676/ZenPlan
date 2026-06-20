import { useState, useCallback } from "react";
import { loadAuthToken, resolveToken, storeAuthToken } from "../utils/auth";

type Task = {
  id: number;
  user_id: number;
  title: string;
  priority: "low" | "medium" | "high";
  category:
    | "personal"
    | "work"
    | "health"
    | "finance"
    | "education"
    | "home"
    | "travel"
    | "shopping";
  tags: string[];
  status?: "pending" | "completed" | "overdue";
  created_at: string;
  updated_at: string;
};

type TaskPayload = {
  title: string;
  priority: "low" | "medium" | "high";
  category:
    | "personal"
    | "work"
    | "health"
    | "finance"
    | "education"
    | "home"
    | "travel"
    | "shopping";
  tags: string[];
};

const API = "http://localhost:8080";

const getToken = (): string | null => {
  const savedToken = loadAuthToken();
  if (typeof window === "undefined") {
    return savedToken;
  }

  const urlToken = resolveToken(new URLSearchParams(window.location.search));
  if (urlToken && !savedToken) {
    storeAuthToken(urlToken);
  }

  return savedToken || urlToken;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const token = getToken();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const url = token ? `${API}/tasks?token=${token}` : `${API}/tasks`;
      const res = await fetch(url, {
        credentials: "include",
      });
      const data = (await res.json()) as {
        success: boolean;
        tasks?: Task[];
        error?: string;
      };
      if (data.success && data.tasks) setTasks(data.tasks);
      else throw new Error(data.error ?? "Failed to fetch tasks");
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createTask = async (payload: TaskPayload) => {
    const url = token ? `${API}/tasks?token=${token}` : `${API}/tasks`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as {
      success: boolean;
      task?: Task;
      error?: string;
    };
    if (data.success && data.task) {
      const task = data.task;
      setTasks((prev) => [...prev, task]);
      return task;
    }
    throw new Error(data.error || "Failed to create task");
  };

  const deleteTask = async (id: number) => {
    const url = token
      ? `${API}/tasks/${id}?token=${token}`
      : `${API}/tasks/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      return true;
    }
    throw new Error(data.error || "Failed to delete task");
  };

  return { tasks, loading, fetchTasks, createTask, deleteTask };
};
