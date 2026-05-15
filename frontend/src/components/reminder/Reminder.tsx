import React from "react";

const Reminder: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Reminder</h1>
        <p className="mt-2 text-sm text-slate-500">
          See your alerts, reminders, and upcoming notifications in one place.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <p className="text-slate-700">
          This reminder panel shows any notifications or alarms you want to
          review or update.
        </p>
      </div>
    </div>
  );
};

export default Reminder;
