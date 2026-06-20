import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TasksIcon, Close } from "../../assets";

const priorityOptions = ["low", "medium", "high"] as const;
const categoryOptions = [
  "personal",
  "work",
  "health",
  "finance",
  "education",
  "home",
  "travel",
  "shopping",
] as const;

type Priority = (typeof priorityOptions)[number];
type Category = (typeof categoryOptions)[number];

type TaskPayload = {
  title: string;
  priority: Priority;
  category: Category;
  tags: string[];
};

interface Props {
  onClose: () => void;
  onSubmit: (data: TaskPayload) => Promise<void>;
}
const tagOptions = [
  "urgents",
  "important",
  "hospital",
  "quick",
  "planning",
  "calls",
  "meeting",
];

const AddTask = ({ onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [category, setCategory] = useState<Category>("personal");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleTag = (value: string) => {
    setTags((prev) =>
      prev.includes(value)
        ? prev.filter((tag) => tag !== value)
        : [...prev, value],
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await onSubmit({
        title: title.trim(),
        priority,
        category,
        tags,
      });
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create task",
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
              <img src={TasksIcon} alt="Task Icon" />
              <h2 className="font-outfit font-medium text-[18px] text-black leading-[130%] tracking-normal">
                Create Task
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
                  htmlFor="task-title"
                  className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal"
                >
                  Task Title
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full h-8.5 rounded-xl border pl-4.5 py-0.5 px-[2.5px] bg-LightWhite text-Grey font-outfit font-[400px] leading-[130%] tracking-normal text-[14px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="flex flex-col gap-2 items-start justify-start">
                  <label
                    htmlFor="task-priority"
                    className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal"
                  >
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full h-8.5 rounded-xl border pl-3 py-0.5 px-[2.5px] bg-LightWhite text-black cursor-pointer font-outfit font-[400px] leading-[130%] tracking-normal text-[14px]"
                  >
                    {priorityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 items-start justify-start">
                  <label
                    htmlFor="task-category"
                    className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal"
                  >
                    Category
                  </label>
                  <select
                    id="task-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full h-8.5 rounded-xl border pl-3 py-0.5 px-[2.5px] bg-LightWhite text-black cursor-pointer font-outfit font-[400px] leading-[130%] tracking-normal text-[14px]"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <label className="font-outfit font-bold text-[14px] text-black leading-[130%] tracking-normal">
                  Tags
                </label>
                <div className="flex flex-wrap gap-0.5 w-full">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-[5px] px-1.5 flex items-center text-center text-[12px] font-outfit transition-all h-4 cursor-pointer${
                        tags.includes(tag)
                          ? "text-white cursor-pointer flex items-center border-Grey border"
                          : "text-black cursor-pointer"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
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
                {loading ? "Creating..." : "Create Task"}
              </motion.button>
            </div>
          </main>
        </motion.main>
      </motion.section>
    </AnimatePresence>
  );
};

export default AddTask;
