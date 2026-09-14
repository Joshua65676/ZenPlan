import React, { useState } from "react";
import { DeleteIcon, NotFoundIcon } from "../../assets";

type Task = {
  id: number;
  title: string;
  tags: string[];
  priority: "low" | "medium" | "high";
  category: string;
  created_at: string;
  status?: "pending" | "completed" | "overdue";
};

type TaskListProps = {
  tasks: Task[];
  deleteTask: (id: number) => Promise<boolean>;
  updateTask: (id: number, status: Task["status"]) => Promise<boolean>;
  loading?: boolean;
};

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  if (Number.isNaN(date.getTime())) {
    return { date: "", time: "" };
  }
  return {
    date: date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const getPriorityClasses = (priority: Task["priority"]) => {
  switch (priority) {
    case "low":
      return "bg-emerald-100 text-emerald-800";
    case "medium":
      return "bg-amber-100 text-amber-900";
    case "high":
      return "bg-rose-100 text-rose-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const Overdue: React.FC<TaskListProps> = ({
  tasks,
  deleteTask,
  updateTask,
  loading = false,
}) => {
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);
  const filteredTasks = tasks.filter((task) => task.status === "overdue");

  const toggleSelected = async (task: Task) => {
    setUpdatingIds((prev) => [...prev, task.id]);
    try {
      await updateTask(task.id, "completed");
    } catch (error) {
      console.error("Failed to mark overdue task completed", error);
    } finally {
      setUpdatingIds((prev) => prev.filter((id) => id !== task.id));
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        Loading overdue tasks...
      </div>
    );
  }

  if (!filteredTasks.length) {
    return (
      <div className="rounded-[10px] h-84.75 flex items-center justify-center border-[0.5px] border-Grey bg-white text-center">
        <div className="flex flex-col gap-2">
          <div className="flxe flex-col gap-2">
            <img src={NotFoundIcon} alt="" />
            <h2 className="font-outfit font-semibold text-[20px] leading-[130%] tracking-0 text-PurpleNormal">
              No task found
            </h2>
          </div>
          <span className="font-outfit font-normal text-[16px] leading-[130%] tracking-0 text-Grey">
            No overdue tasks found.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => {
        const { date, time } = formatDateTime(task.created_at);
        const isChecked = task.status === "completed";
        const titleClasses = `text-lg font-semibold ${
          isChecked ? "text-slate-500 line-through" : "text-slate-900"
        }`;

        return (
          <article
            key={task.id}
            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex flex-1 items-start gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  aria-label="Select task"
                  checked={isChecked}
                  disabled={updatingIds.includes(task.id)}
                  onChange={() => toggleSelected(task)}
                  className="h-5 w-5 rounded border-slate-300 accent-sky-600 focus:ring-sky-500 cursor-pointer disabled:cursor-not-allowed"
                />
              </label>
              <div className="min-w-0">
                <h3 className={titleClasses}>{task.title}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <span>{date}</span>
                  <span>•</span>
                  <span>{time}</span>
                  <span>•</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase tracking-wide text-slate-700">
                    {task.category}
                  </span>
                </div>
                {task.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getPriorityClasses(
                  task.priority,
                )}`}
              >
                {task.priority}
              </span>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await deleteTask(task.id);
                  } catch (error) {
                    console.error("Failed to delete task", error);
                  }
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100"
              >
                <img src={DeleteIcon} alt="Delete" className="h-5 w-5" />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Overdue;
