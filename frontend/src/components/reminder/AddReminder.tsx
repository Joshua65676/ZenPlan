import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Close, Gclock } from "../../assets";

const categoryOptions = [
  "One-time only",
  "Daily",
  "Weekly",
  "Monthly",
] as const;

type Category = (typeof categoryOptions)[number];

type RemindPayload = {
  title: string;
  category: Category;
  reminder_date: string;
  reminder_time: string;
  notes: string;
  is_active: boolean;
};

interface Props {
  onClose: () => void;
  onSubmit: (data: RemindPayload) => Promise<void>;
}

const AddReminder = ({ onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("One-time only");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    if (!title || !reminderDate || !reminderTime) {
      setError("Title, date and time are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onSubmit({
        title: title.trim(),
        category,
        reminder_date: reminderDate,
        reminder_time: reminderTime,
        notes,
        is_active: isActive,
      });
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create reminder",
      );
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2"
        onClick={onClose}
      >
        <motion.main
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-[10px] p-6 w-105 max-w-150 shadow-custom flex flex-col gap-8 items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <img src={Clock} alt="Task Icon" />
              <h2 className="font-outfit font-medium text-[18px] text-black leading-[130%] tracking-normal">
                Create Reminder
              </h2>
            </div>
            <button onClick={onClose} className="pl-5 cursor-pointer">
              <img src={Close} alt="Close Icon" />
            </button>
          </div>

          <main className="flex flex-col gap-15 items-start justify-start w-full">
            <div className="flex flex-col gap-5 items-start justify-start w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <label
                  htmlFor="reminder-title"
                  className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal"
                >
                  Title
                </label>
                <input
                  id="reminder-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter reminder title"
                  className="w-full h-8.5 rounded-xl border pl-4.5 py-0.5 px-[2.5px] bg-LightWhite text-Grey font-outfit font-[400px] leading-[130%] tracking-normal text-[14px]"
                />
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                  Note
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add additional details (optional)"
                  rows={3}
                  className="w-full h-13 align-middle placeholder-slate-500 bg-LightWhite border border-LightWhite text-Grey rounded-xl py-1.75 px-[2.5px] pl-4.5 transition-all text-[14px] font-outfit font-[400px] leading-[130%] tracking-0 resize-none"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="flex flex-col gap-2 items-start justify-start">
                  <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                    Due Date
                  </label>
                  <input
                    title="date"
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full h-8.5 rounded-xl border py-0.5 px-[2.5px] pl-2 bg-LightWhite font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-2 items-start justify-start">
                  <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                    Due Time
                  </label>
                  <input
                    title="time"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full pl-2 h-8.5 rounded-xl border py-0.5 px-[2.5px] bg-LightWhite font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal cursor-pointer"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="flex flex-col gap-2 items-start justify-start">
                  <label
                    htmlFor="reminder-category"
                    className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal"
                  >
                    Reminder
                  </label>

                  <div ref={categoryRef} className="relative w-full">
                    <button
                      id="reminder-category"
                      type="button"
                      onClick={() => setIsCategoryOpen((prev) => !prev)}
                      className="w-full h-8.5 rounded-xl border bg-LightWhite text-black cursor-pointer font-outfit font-[400px] leading-[130%] tracking-normal text-[14px] flex items-center justify-between px-3"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <img
                          src={Gclock}
                          alt="Reminder category icon"
                          className="w-4 h-4 shrink-0"
                        />
                        <span className="truncate">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      </span>

                      <span
                        className={`text-lg leading-none transition-transform duration-200 ${
                          isCategoryOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    {isCategoryOpen && (
                      <div className="absolute z-20 mt-1 w-full rounded-xl border border-LightWhite bg-white shadow-lg overflow-hidden">
                        {categoryOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setCategory(option);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left font-outfit text-[14px] leading-[130%] text-black transition-colors duration-150 ${
                              category === option
                                ? "bg-[#F1F3FF] text-black"
                                : "bg-white hover:bg-[#F7F8FF]"
                            }`}
                          >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <button
                  type="button"
                  title={isActive ? "Deactivate reminder" : "Activate reminder"}
                  aria-pressed={isActive}
                  onClick={() => setIsActive((prev) => !prev)}
                  className={`relative w-10 h-6 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "bg-violet-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                      isActive ? "left-5" : "left-1"
                    }`}
                  />
                </button>
                <span className="font-outfit font-bold text-[14px] leading-[130%] tracking-[0%] text-black">
                  {isActive ? "Active reminder" : "Inactive reminder"}
                </span>
              </div>
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}

            <div className="flex flex-row items-center justify-between gap-4 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                disabled={loading}
                className="w-47 h-8.5 bg-LightBlue hover:bg-LightBlue disabled:bg-LightBlue text-black text-[14px] leading-[130%] traking-0 font-[400px] font-outfit py-0.5 px-0.75 border border-black rounded-xl transition-all cursor-pointer"
              >
                {loading ? "Canceling..." : "Cancel"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="w-47 h-8.5 bg-Purple hover:bg-Purple disabled:bg-Purple text-white text-[14px] leading-[130%] tracking-0 font-[400px] font-outfit py-0.5 px-0.75 rounded-xl transition-all cursor-pointer"
              >
                {loading ? "Creating..." : "Create Reminder"}
              </motion.button>
            </div>
          </main>
        </motion.main>
      </motion.section>
    </AnimatePresence>
  );
};

export default AddReminder;
