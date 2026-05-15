import React from "react";

const Event: React.FC = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <h3 className="text-2xl font-semibold text-slate-900">Events</h3>
      <p className="mt-3 text-sm text-slate-600">
        This is the Events component. Click the Events button above to show this
        content.
      </p>
    </section>
  );
};

export default Event;
