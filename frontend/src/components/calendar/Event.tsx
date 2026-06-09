import React, { useState } from "react";
import WeekStrip from "./WeekStrip";
import { Bcalendar } from "../../assets";

const Event: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <section className="">
      <main className="">
        <div className="flex flex-col gap-8">
             {/* Calender */}
          <main className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-1">
              <img src={Bcalendar} alt="" />
              <span className="text-black text-[14px] font-outfit font-bold tracking-0 leading-[130%]">
                This week
              </span>
            </div>
            <div className="rounded-[20px] border border-BorderColor h-26 p-3">
              <WeekStrip
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
          </main>
          <div className="flex flex-row items-center gap-1">
            <img src={Bcalendar} alt="" />
            <span className="text-black text-[14px] font-outfit font-bold tracking-0 leading-[130%]">
                Upcoming events
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Event;
