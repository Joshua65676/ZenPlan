import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Bcalendar, Close } from "../../assets";

interface Props {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    meeting_type: string;
    event_date: string;
    event_time: string;
    notes: string;
    guest_email: string;
  }) => Promise<void>;
}

const AddEvent = ({ onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [meetingType, setMeetingType] = useState<"group" | "1-on-1">("group");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [notes, setNotes] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !eventDate || !eventTime) {
      setError("Title, date and time are required");
      return;
    }
    if (meetingType === "1-on-1" && !guestEmail) {
      setError("Guest email is required for 1-on-1 meetings");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit({
        title,
        meeting_type: meetingType,
        event_date: eventDate,
        event_time: eventTime,
        notes,
        guest_email: guestEmail,
      });
      onClose();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.main
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-[10px] p-6 w-full h-157 max-w-85 shadow-custom flex flex-col gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex flex-row items-center justify-between text-center">
            <div className="flex flex-row items-center justify-center gap-2 text-center">
              <img src={Bcalendar} alt="" />
              <h2 className="font-outfit font-medium text-[18px] text-black leading-[130%] tracking-normal">
                Create Event
              </h2>
            </div>
            <button onClick={onClose} className="">
              <img src={Close} alt="Close Icon" />
            </button>
          </div>
          {/* Form */}
          <main className="flex flex-col gap-5 items-start justify-start">
            {/* Title */}
            <div className="flex flex-col gap-2 items-start justify-start">
              <label
                htmlFor="title"
                className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal"
              >
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event title"
                className="w-76 h-8.5 rounded-xl border pl-3 py-0.5 px-[2.5px] bg-LightWhite text-Grey font-outfit font-[400px] leading-[130%] tracking-normal text-[14px]"
              />
            </div>
            {/* Meeting type */}
            <div className="flex flex-col gap-2 items-start justify-start">
              <label
                htmlFor="meetingType"
                className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal"
              >
                Meeting type
              </label>
              <select
                title="Select meeting type"
                value={meetingType}
                onChange={(e) =>
                  setMeetingType(e.target.value as "group" | "1-on-1")
                }
                className="w-76 h-8.5 rounded-xl border pl-3 py-0.5 px-[2.5px] bg-LightWhite text-black cursor-pointer font-outfit font-[400px] leading-[130%] tracking-normal text-[14px]"
              >
                <div className="flex flex-col gap-2">
                  <option value="group">Group</option>
                  <option value="1-on-1">1-on-1</option>
                </div>
              </select>
            </div>
            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                  Date
                </label>
                <input
                  title="date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-35.75 pl-2 h-8.5 rounded-xl border py-0.5 px-[2.5px] bg-LightWhite font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal cursor-pointer"
                />
              </div>
              <div>
                <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                  Time
                </label>
                <input
                  title="time"
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
         className="w-35.75 pl-2 h-8.5 rounded-xl border py-0.5 px-[2.5px] bg-LightWhite font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal cursor-pointer"
                />
              </div>
            </div>
            {/* Guest Email only for 1-on-1 */}
            <AnimatePresence>
              {meetingType === "1-on-1" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                    Guest Email
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-xl py-3 px-4 focus:outline-none focus:border-violet-500 transition-all text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Notes */}
            <div>
              <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes..."
                rows={3}
                className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-xl py-3 px-4 focus:outline-none focus:border-violet-500 transition-all text-sm resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            {/* Submit and Cancle button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer"
            >
              {loading ? "Creating..." : "Create Event"}
            </motion.button>
          </main>
        </motion.main>
      </motion.section>
    </AnimatePresence>
  );
};

export default AddEvent;
