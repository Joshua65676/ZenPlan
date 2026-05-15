import React from "react";

const Logout: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Log Out</h1>
        <p className="mt-2 text-sm text-slate-500">
          Use this view to confirm your sign-out flow and end your current
          session.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <p className="text-slate-700">
          Press the actual sign-out action in your navigation or account section
          to log out.
        </p>
      </div>
    </div>
  );
};

export default Logout;
