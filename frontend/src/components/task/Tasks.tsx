import React, { useEffect, useState } from "react";
import Header from "./header";
import All from "./All";
import Pending from "./Pending";
import Completed from "./Completed";
import Overdue from "./Overdue";
import { TaskList } from "../../constants";
import { useTasks } from "../../hooks/useTasks";
import AddTask from "./AddTask";

const STORAGE_KEY = "zenplan-active-calendar-link";

type TaskCounts = {
  all: number;
  pending: number;
  completed: number;
  overdue: number;
};

const Calendar: React.FC = () => {
  const { tasks, fetchTasks, createTask } = useTasks();
  const [activeLink, setActiveLink] = useState<number>(() => {
    if (typeof window === "undefined") return TaskList[0]?.id ?? 1;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : (TaskList[0]?.id ?? 1);
  });
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(activeLink));
  }, [activeLink]);

  const taskCounts: TaskCounts = {
    all: tasks.length,
    pending: tasks.some((task) => typeof task.status !== "undefined")
      ? tasks.filter((task) => task.status === "pending").length
      : tasks.length,
    completed: tasks.filter((task) => task.status === "completed").length,
    overdue: tasks.filter((task) => task.status === "overdue").length,
  };

  const renderActiveComponent = () => {
    switch (activeLink) {
      case 1:
        return <All />;
      case 2:
        return <Pending />;
      case 3:
        return <Completed />;
      case 4:
        return <Overdue />;
      default:
        return <All />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto container w-full">
      <main>
        <Header
          activeLink={activeLink}
          onChangeActiveLink={setActiveLink}
          onAddTask={() => setShowAddTask(true)}
          counts={taskCounts}
        />
        <div className="mt-6">{renderActiveComponent()}</div>
        {showAddTask && (
          <AddTask
            onClose={() => setShowAddTask(false)}
            onSubmit={async (data) => {
              await createTask(data);
              setShowAddTask(false);
              window.location.reload();
            }}
          />
        )}
      </main>
    </section>
  );
};

export default Calendar;
