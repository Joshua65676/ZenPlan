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
        <aside className="fixed inset-x-0 bottom-0 z-20 h-16 bg-black md:inset-y-0 md:right-auto md:h-auto md:w-64 md:min-h-screen lg:w-80">
          <SideBar activeItem={activeItem} onChangeActiveItem={setActiveItem} />
        </aside>
        <main className="min-h-screen min-w-0 w-full flex-1 rounded-t-[20px] bg-white px-4 pt-5 pb-24 sm:px-6 md:ml-64 md:rounded-[20px] md:px-8 md:py-8 lg:ml-80 lg:p-10">
          {renderContent()}
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
