import React from "react";
import {
  DeleteIcon,
  NotFoundIcon,
  RepeatPIcon,
  Gcalendar,
  Gclock,
} from "../../assets";
import type { Reminder } from "../../hooks/useReminder";

export type ReminderListProps = {
  reminders: Reminder[];
  deleteReminder: (id: number) => Promise<boolean>;
  updateReminderStatus: (id: number, isActive: boolean) => Promise<Reminder>;
  loading?: boolean;
};

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (time: string) =>
  new Date(`1970-01-01T${time}`).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

export const ReminderListView: React.FC<ReminderListProps> = ({
  reminders,
  deleteReminder,
  updateReminderStatus,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">Loading reminders...</div>
    );
  }

  if (!reminders.length) {
    return (
      <div className="rounded-[10px] h-84.75 flex items-center justify-center border-[0.5px] border-Grey bg-white text-center">
        <div className="flex flex-col items-center gap-2">
          <img src={NotFoundIcon} alt="" />
          <h2 className="font-outfit font-semibold text-[20px] text-PurpleNormal">
            No reminders found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      {reminders.map((reminder) => (
        <article
          key={reminder.id}
          className="flex flex-col gap-4 items-center justify-center rounded-[10px] border border-BorderColor bg-white p-5 shadow-sm shadow-boxShadow-custom sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="flex flex-col gap-2.5 h-18">
            <div className="flex items-center gap-3 flex-row">
              <h3
                className={`text-[14px] font-outfit leading-[130%] tracking-0 font-bold ${
                  reminder.is_active ? "text-black" : "text-Gray"
                }`}
              >
                {reminder.title}
              </h3>
              <div className="rounded-[5px] bg-ReminderBg px-1.25 py-1 h-4.5 flex flex-row gap-1 items-center justify-center text-center">
                <img src={RepeatPIcon} alt="" />
                <span className="font-outfit font-[400px] text-[12px] leading-[130%] tracking-[0%] text-PurpleNormal">
                  {reminder.reminder}
                </span>
              </div>
            </div>
            {reminder.notes && (
              <p className="font-outfit font-[400px] text-[12px] leading-[130%] tracking-0 text-Grey">
                {reminder.notes}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-row items-center gap-1">
                <img src={Gcalendar} alt="" />
                <span className="font-outfit font-[400px] text-[12px] leading-[130%] teacking-[0%] text-Grey">{formatDate(reminder.reminder_date)}</span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <img src={Gclock} alt="" />
                <span className="font-outfit font-[400px] text-[12px] leading-[130%] teacking-[0%] text-Grey">{formatTime(reminder.reminder_time)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center mt-5">
            <button
              type="button"
              title={
                reminder.is_active ? "Deactivate reminder" : "Activate reminder"
              }
              aria-label={
                reminder.is_active ? "Deactivate reminder" : "Activate reminder"
              }
              aria-pressed={Boolean(reminder.is_active)}
              onClick={() =>
                void updateReminderStatus(reminder.id, !reminder.is_active)
              }
              className={`relative h-6 w-10 rounded-full transition-all duration-300 cursor-pointer ${
                reminder.is_active ? "bg-Purple" : "bg-LightWhite"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                  reminder.is_active ? "left-5" : "left-1"
                }`}
              />
            </button>
            <button
              type="button"
              aria-label={`Delete ${reminder.title}`}
              onClick={() => void deleteReminder(reminder.id)}
              className="inline-flex items-center justify-center"
            >
              <img src={DeleteIcon} alt="" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
