import React, { useState } from "react";

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState(false);

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

  return (
    <section className="flex flex-col gap-4">
      <>
       <h2 className="font-outfit font-medium text-[18px] leading-[130%] teacking-[0%] text-black">Notification</h2>
      </>
      <main className="flex items-center justify-between flex-row">
        <div className="flex flex-col gap-1">
          <span className="font-outfit text-[14px] font-[400px] leading-[130%] tracking-normal text-black">
            Notifications
          </span>
          <span className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal text-Grey">
            Allow notifications
          </span>
        </div>

        <button
          type="button"
          aria-label="Toggle notifications"
          onClick={handleToggle}
          className={`relative h-7 w-12 rounded-full transition-all duration-200 cursor-pointer ${
            notifications ? "bg-Purple" : "bg-LightWhite"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 ${
              notifications ? "left-6" : "left-1"
            }`}
          />
        </button>
      </main>

      <>
       <div className="border-[0.5px] text-BorderColor"></div>
      </>
    </section>
  );
};

export default NotificationSettings;
