import { useEffect, useState } from "react";
import Header from "./header";
import All from "./All";
import Active from "./Active";
import Inactive from "./Inactive";
import { ReminderList } from "../../constants";
import { useReminder } from "../../hooks/useReminder";
import AddReminder from "./AddReminder";

const STORAGE_KEY = "zenplan-active-calendar-link";

const Reminder: React.FC = () => {
  const {
    reminders,
    loading,
    error,
    fetchReminders,
    createReminder,
    deleteReminder,
    updateReminderStatus,
  } = useReminder();
  const [activeLink, setActiveLink] = useState<number>(() => {
    if (typeof window === "undefined") return ReminderList[0]?.id ?? 1;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : (ReminderList[0]?.id ?? 1);
  });
  const [showAddReminder, setShowAddReminder] = useState(false);

  useEffect(() => {
    void fetchReminders();
  }, [fetchReminders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(activeLink));
  }, [activeLink]);

  const activeReminders = reminders.filter((reminder) => reminder.is_active);
  const inactiveReminders = reminders.filter((reminder) => !reminder.is_active);
  const reminderCounts = {
    all: reminders.length,
    active: activeReminders.length,
    inactive: inactiveReminders.length,
  };

  const renderActiveComponent = () => {
    switch (activeLink) {
      case 1:
        return (
          <All
            reminders={reminders}
            deleteReminder={deleteReminder}
            updateReminderStatus={updateReminderStatus}
            loading={loading}
          />
        );
      case 2:
        return (
          <Active
            reminders={activeReminders}
            deleteReminder={deleteReminder}
            updateReminderStatus={updateReminderStatus}
            loading={loading}
          />
        );
      case 3:
        return (
          <Inactive
            reminders={inactiveReminders}
            deleteReminder={deleteReminder}
            updateReminderStatus={updateReminderStatus}
            loading={loading}
          />
        );
      default:
        return (
          <All
            reminders={reminders}
            deleteReminder={deleteReminder}
            updateReminderStatus={updateReminderStatus}
            loading={loading}
          />
        );
    }
  };

  return (
    <section className="max-w-7xl mx-auto container w-full">
      <main>
        <Header
          activeLink={activeLink}
          onChangeActiveLink={setActiveLink}
          onAddReminder={() => setShowAddReminder(true)}
          counts={reminderCounts}
        />
        <div className="mt-6">{renderActiveComponent()}</div>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {showAddReminder && <div className="hidden" aria-hidden="true" />}
        {showAddReminder && (
          <AddReminder
            onClose={() => setShowAddReminder(false)}
            onSubmit={async (data) => {
              await createReminder(data);
              setShowAddReminder(false);
            }}
          />
        )}
      </main>
    </section>
  );
};

export default Reminder;
