import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("zenplan_user");
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl text-violet-700">
            ⏻
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-500">
              Account
            </p>
            <h2 className="mt-1 text-3xl font-semibold text-slate-900">
              Log out
            </h2>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Signed in as</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {user?.name ?? "ZenPlan user"}
          </p>
          <p className="mt-1 text-sm text-slate-500">{user?.email ?? ""}</p>
        </div>

        <p className="mt-6 text-base leading-7 text-slate-600">
          You’ll need to sign in again to access your calendar, tasks,
          reminders, and saved settings.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/" +
                  encodeURIComponent(user?.username ?? "dashboard"),
              )
            }
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Logout;
