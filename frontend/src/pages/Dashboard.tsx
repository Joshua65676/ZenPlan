import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Calendar from "../components/calendar/Calendar";
import Tasks from "../components/task/Tasks";
import Reminder from "../components/reminder/Reminder";
import Settings from "../components/settings/Settings";
import Logout from "../components/logout/Logout";

const STORAGE_KEY = "zenplan-active-menu";

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState(() => {
    if (typeof window === "undefined") return "menu1-1";
    return localStorage.getItem(STORAGE_KEY) ?? "menu1-1";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeItem);
  }, [activeItem]);

  const renderContent = () => {
    switch (activeItem) {
      case "menu1-1":
        return <Calendar />;
      case "menu1-2":
        return <Tasks />;
      case "menu1-3":
        return <Reminder />;
      case "menu2-1":
        return <Settings />;
      case "menu2-2":
        return <Logout />;
      default:
        return <Calendar />;
    }
  };

  return (
    <section className="min-h-screen bg-black">
      <div className="flex min-h-screen">
        <aside className="fixed left-0 top-0 z-10 w-80 min-h-screen bg-black">
          <SideBar activeItem={activeItem} onChangeActiveItem={setActiveItem} />
        </aside>
        <main className="ml-80 flex-1 min-h-screen bg-white p-10 rounded-[20px]">
          {renderContent()}
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
