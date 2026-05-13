import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { DAYS, TIMEZONES } from "../constants";
import { Clock, Logo, TimeZone } from "../assets";
import { resolveToken, storeAuthToken } from "../utils/auth";

interface DayHours {
  day: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

const WorkingHoursPage = () => {
  const [timezone, setTimezone] = useState("WAT");
  const [workingHours, setWorkingHours] = useState<DayHours[]>(
    DAYS.map((day) => ({
      day,
      start_time: "09:00",
      end_time: "17:00",
      is_available: day !== "Saturday" && day !== "Sunday",
    })),
  );
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = resolveToken(searchParams);

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken && queryToken !== "null") {
      storeAuthToken(queryToken);
    }
  }, [searchParams]);

  // Fetch existing settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const url = `http://localhost:8080/settings/working-hours${token ? `?token=${token}` : ""}`;
        const response = await fetch(url, { credentials: "include" });

        if (!response.ok) {
          navigate("/");
          return;
        }

        const data = await response.json();

        if (data.success) {
          setTimezone(data.data.timezone);
          setWorkingHours(data.data.workingHours);
        } else {
          navigate("/setup-profile");
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
        navigate("/");
      } finally {
        setFetching(false);
      }
    };

    fetchSettings();
  }, [token, navigate]);

  const toggleDay = (day: string) => {
    setWorkingHours((prev) =>
      prev.map((h) =>
        h.day === day ? { ...h, is_available: !h.is_available } : h,
      ),
    );
  };

  const updateTime = (
    day: string,
    field: "start_time" | "end_time",
    value: string,
  ) => {
    setWorkingHours((prev) =>
      prev.map((h) => (h.day === day ? { ...h, [field]: value } : h)),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const body: Record<string, unknown> = { timezone, workingHours };
      if (token) {
        body.token = token;
      }

      const response = await fetch(
        "http://localhost:8080/settings/working-hours",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.success) {
        navigate(`/notifications${token ? `?token=${token}` : ""}`);
      }
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-black font-outfit font-semibold text-xl animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white w-full container max-w-7xl mx-auto py-5">
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-10"
      >
        {/* navbar */}
        <main className="flex items-center justify-between flex-row">
          <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
            Zen<span className="text-Purple">Plan</span>
          </h2>
          <div className="flex flex-row items-center justify-center text-center gap-4">
            <span className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-normal text-Grey">
              Step 2 of 3
            </span>
            <div></div>
          </div>
        </main>

        {/* time setting */}
        <main className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <img src={Logo} alt="Logo" className="" />
            <div>
              <h2 className="font-outfit font-semibold text-[36px] leading-[130%] tracking-normal text-black">
                Protect Your Time
              </h2>
              <p className="font-outfit font-[400px] w-110.75 text-[16px] leading-[130%] tracking-normal text-Grey">
                Define your working hours so we know when you’re available for
                meetings.
              </p>
            </div>
          </div>

          {/* main time */}
          <main className="flex flex-col gap-6 w-113.25">
            <div className="flex flex-row gap-2 text-start">
              <img src={TimeZone} alt="Timezone" />
              <span className="font-outfit font-bold items-center flex text-black text-[14px] leading-[130%] tracking-normal">
                Timezone
              </span>
            </div>
            {/* Select timezone: */}
            <select
              title="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-112.5 h-11.25 bg-LightWhite border border-Grey text-black text-[16px] font-[400px] leading-[130%] tracking-normal font-outfit rounded-xl px-1.25 p-2.5 transition-all cursor-pointer"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            {/* Select working hours Title: */}
            <div className="flex flex-row gap-2 text-start">
              <img src={Clock} alt="Clock" />
              <span className="font-outfit font-bold items-center flex text-black text-[14px] leading-[130%] tracking-normal">
                Working Hours
              </span>
            </div>
            {/* Select working hours: */}
            <div className="flex flex-col gap-2">
              {workingHours.map((hour, index) => (
                <motion.div
                  key={hour.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between bg-white border-[0.5px] border-Grey rounded-xl p-2.5 md:w-113"
                >
                  <div className="flex items-center gap-2 w-32">
                    <button
                      title="button"
                      onClick={() => toggleDay(hour.day)}
                      className={`relative w-10 h-6 rounded-full transition-all duration-300 cursor-pointer ${
                        hour.is_available ? "bg-violet-600" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                          hour.is_available ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                    <span
                      className={`text-[14px] font-bold font-outfit leading-[130%] tracking-normal ${hour.is_available ? "text-black" : "text-black"}`}
                    >
                      {hour.day}
                    </span>
                  </div>

                  {hour.is_available ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        placeholder="time"
                        value={hour.start_time}
                        onChange={(e) =>
                          updateTime(hour.day, "start_time", e.target.value)
                        }
                        className="bg-LightWhite border-LightWhite border text-black text-[14px] rounded-xl px-[2.5px] py-0.5 w-25.75 h-13 font-outfit font-[400px] leading-[130%] tracking-normal cursor-pointer"
                      />
                      <span className="text-Grey text-[14px] font-outfit font-[400px] leading-[130%] tracking-normal">
                        to
                      </span>
                      <input
                        type="time"
                        placeholder="time"
                        value={hour.end_time}
                        onChange={(e) =>
                          updateTime(hour.day, "end_time", e.target.value)
                        }
                        className="bg-LightWhite border-LightWhite border text-black text-[14px] rounded-xl px-[2.5px] py-0.5 w-25.75 h-13 font-outfit font-[400px] leading-[130%] tracking-normal cursor-pointer"
                      />
                    </div>
                  ) : (
                    <span className="text-Grey font-outfit font-[400px] leading-[130%] tracking-normal text-[14px]">
                      Unavailable
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Button to Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-11.25 mb-10 bg-Purple hover:bg-violet-500 disabled:bg-violet-800 text-white text-[16px] leading-[130%] tracking-normal font-[400px] font-outfit px-1.25 py-0.75 rounded-xl transition-all duration-200 cursor-pointer"
            >
              {loading ? "Saving..." : "Continue"}
            </motion.button>
          </main>
        </main>
      </motion.main>
    </section>
  );
};

export default WorkingHoursPage;
