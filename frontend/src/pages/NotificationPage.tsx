import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon, Logo, NotificationImg } from "../assets";
import { useAuth } from "../hooks/useAuth";
import { resolveToken, storeAuthToken } from "../utils/auth";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [searchParams] = useSearchParams();
  const token = resolveToken(searchParams);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken && queryToken !== "null") {
      storeAuthToken(queryToken);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        setFetchingUser(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          navigate("/");
          return;
        }

        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/");
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUser();
  }, [user, setUser, navigate]);

  if (fetchingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-black font-outfit font-semibold text-xl animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  const handleToggle = async () => {
    if (!notifications) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("ZenPlan", {
          body: "You will receive timely reminders for tasks and upcoming events.",
        });
        setNotifications(true);
      } else {
        alert(
          "Notification permission denied. You can enable it in your browser settings to stay updated with reminders.",
        );
      }
    } else {
      setNotifications(false);
      alert(
        "Notifications have been disabled. You will no longer receive reminders for tasks and upcoming events.",
      );
    }
  };

  const handleContinue = () => {
    const displayName = user?.name;
    const dashboardPath = displayName
      ? `/dashboard/${encodeURIComponent(displayName)}`
      : "/dashboard";

    navigate(`${dashboardPath}${token ? `?token=${token}` : ""}`);
  };

  return (
    <section className="bg-white w-full container max-w-7xl mx-auto py-5">
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-10"
      >
        {/* navbar */}
        <main className="flex items-center justify-between flex-row">
          <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
            Zen<span className="text-Purple">Plan</span>
          </h2>
          <div className="flex flex-row items-center justify-center text-center gap-4">
            <span className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal text-Grey">
              Step 3 of 3
            </span>
            <div></div>
          </div>
        </main>

        <main className="flex flex-col items-center gap-5">
          {/* Title */}
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <img src={Logo} alt="Logo" className="" />
            <div>
              <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
                Stay in the Loop
              </h2>
              <p className="font-outfit font-[400px] md:w-104.75 text-[16px] leading-[130%] tracking-normal text-Grey">
                Allow notifications to get timely reminders for task and
                upcoming events right on your desktop.
              </p>
            </div>
          </div>
          {/* Image */}
          <div className="flex flex-col gap-3">
            <img src={NotificationImg} alt="Notification" className="" />
            <label className="flex flex-row items-center text-center gap-3">
              <span
                onClick={handleToggle}
                className={`w-7.5 h-7.5 cursor-pointer rounded-[10px] flex items-center justify-center ${notifications ? "bg-LightGreen" : "bg-Grey"}`}
              >
                {notifications && (
                  <img src={Icon} alt="Check" className="w-6 h-6 py-0.75" />
                )}
              </span>
              <span className="font-outfit font-[400px] text-[16px] text-black leading-[130%] tracking-normal">
                Allow notification
              </span>
            </label>
          </div>
          {/* Button */}
          <>
            <button
              onClick={handleContinue}
              className="md:w-112.5 md:h-11.25 rounded-xl bg-LightBlue py-0.75 px-1.25 cursor-pointer"
            >
              <span className="font-outfit font-[400px] text-[16px] text-Grey leading-[130%] tracking-normal">
                Launch SyncFlow
              </span>
            </button>
          </>
        </main>
      </motion.main>
    </section>
  );
};

export default NotificationsPage;
