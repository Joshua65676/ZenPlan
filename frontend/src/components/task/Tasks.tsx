import React from "react";

const Tasks: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your tasks, to-dos, and progress from one central dashboard.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <p className="text-slate-700">
          This is your task workspace. Display task lists, completion status,
          and quick actions here.
        </p>
      </div>
    </div>
  );
};

export default Tasks;
