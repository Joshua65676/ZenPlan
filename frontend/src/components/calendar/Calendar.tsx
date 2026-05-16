import React, { useEffect, useState } from "react";
import Header from "./header";
import AddEvent from "./AddEvent";
import Event from "./Event";
import BookingLinks from "./BookingLinks";
import Availability from "./Availability";
import { CalendarList } from "../../constants";
import { useEvents } from "../../hooks/useEvents";

const STORAGE_KEY = "zenplan-active-calendar-link";

const Calendar: React.FC = () => {
  const { createEvent } = useEvents();
  const [activeLink, setActiveLink] = useState<number>(() => {
    if (typeof window === "undefined") return CalendarList[0]?.id ?? 1;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : (CalendarList[0]?.id ?? 1);
  });
  const [showAddEvent, setShowAddEvent] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(activeLink));
  }, [activeLink]);

  const renderActiveComponent = () => {
    switch (activeLink) {
      case 1:
        return <Event />;
      case 2:
        return <BookingLinks />;
      case 3:
        return <Availability />;
      default:
        return <Event />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto container w-full p-3.75">
      <main>
        <Header
          activeLink={activeLink}
          onChangeActiveLink={setActiveLink}
          onAddEvent={() => setShowAddEvent(true)}
        />
        <div className="mt-6">{renderActiveComponent()}</div>
        {showAddEvent && (
          <AddEvent
            onClose={() => setShowAddEvent(false)}
            onSubmit={async (data) => {
              await createEvent(data);
              setShowAddEvent(false);
            }}
          />
        )}
      </main>
    </section>
  );
};

export default Calendar;
