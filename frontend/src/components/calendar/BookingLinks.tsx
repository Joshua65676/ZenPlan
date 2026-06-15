import React, { useEffect, useMemo, useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { CopyIcon } from "../../assets";
import { motion } from "framer-motion";

const BookingLinks: React.FC = () => {
  const { events, fetchEvents, loading } = useEvents();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [emailConfirmationsEnabled, setEmailConfirmationsEnabled] =
    useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const groupEvent = useMemo(
    () => events.find((e) => e.meeting_type === "group"),
    [events],
  );
  const oneOnOneEvent = useMemo(
    () => events.find((e) => e.meeting_type === "1-on-1"),
    [events],
  );

  const handleCopy = (token: string) => {
    const shareUrl = `${window.location.origin}/booking/${token}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    });
  };

  const renderBlock = (
    title: string,
    enabled: boolean,
    token?: string | null,
    description?: string,
  ) => (
    <div className="w-full h-12 rounded-[18px] border-[0.5px] border-Grey p-2.5 flex flex-row justify-between items-center">
      <div className="flex items-center justify-between flex-row gap-2">
        <div
          aria-hidden
          className={`w-9 h-5 rounded-full flex items-center p-0.75 transition-colors ${
            enabled
              ? "bg-Purple border border-Purple justify-end"
              : "bg-gray-300 justify-start"
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
        </div>
        <h3 className="text-[14px] font-outfit font-[400px] leading-[130%] tracking-0 text-black">
          {title}
        </h3>
      </div>

      {enabled && token ? (
        <div className="flex flex-row items-center gap-2">
          <div className="flex-1 flex items-center gap-2.5 px-1.5 py-1.5 rounded-[3px] bg-LinkGB h-4.5">
            <p className="text-[14px] font-outfit font-[400px] leading-[130%] tracking-0 text-Grey truncate">
              {`${window.location.origin}/book/${title}/${token}`}
            </p>
            <span className="text-[12px] text-Green">
              {copiedToken === token ? "Copied!" : ""}
            </span>
          </div>
          <button
            onClick={() => handleCopy(token)}
            className="flex flex-row items-center justify-center w-23.25 h-7 rounded-xl border border-black py-[1.5px] px-0.73 gap-2 cursor-pointer"
          >
            <img src={CopyIcon} alt="copy" className="w-4 h-4" />
            <span className="font-outfit font-[400px] text-[12px] leading-[130%] tracking-0 text-black">
              Copy link
            </span>
          </button>
        </div>
      ) : (
        <p className="text-[13px] text-Grey">
          No {description ?? "meetings"} yet
        </p>
      )}
    </div>
  );

  return (
    <section className="rounded-[20px] h-115 border border-BorderLight p-6 shadow-sm">
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-start gap-7"
      >
        <div className="flex flex-col items-start gap-4 w-full">
          <h2 className="text-black text-[14px] font-outfit font-bold leading-[130%] tracking-0">
            Meeting types and booking links
          </h2>
          <div className="flex flex-col gap-4 w-full">
            {renderBlock(
              "Group",
              !!groupEvent,
              groupEvent?.share_token ?? null,
              "group meetings",
            )}

            {renderBlock(
              "1-on-1",
              !!oneOnOneEvent,
              oneOnOneEvent?.share_token ?? null,
              "1-on-1 meetings",
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 w-full">
          <h2 className="text-black text-[14px] font-outfit font-bold leading-[130%] tracking-0">
            Integration Settings
          </h2>

          <div className="w-full h-35.5 rounded-[10px] border-[0.5px] flex flex-col p-3 gap-2.5 border-Grey">
            <h2 className="text-black text-[14px] font-outfit font-bold leading-[130%] tracking-0">
              Google calendar Integration
            </h2>
            <div className="flex flex-row text-center items-center gap-5">
              <button className="flex flex-row items-center justify-center w-45 h-7 rounded-xl border border-black py-[1.5px] px-0.73 gap-2 cursor-pointer">
                <img src={CopyIcon} alt="copy" className="w-4 h-4" />
                <span className="font-outfit font-[400px] text-[12px] leading-[130%] tracking-0 text-black">
                  Connect Google calendar
                </span>
              </button>
              <p className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-0 text-Grey">
                Sync events with your Google Calendar
              </p>
            </div>
            <h2 className="text-black text-[14px] font-outfit font-bold leading-[130%] tracking-0">
              Email confirmations
            </h2>
            <div className="flex items-center w-full gap-4">
              <button
                type="button"
                disabled={loading}
                onClick={() => setEmailConfirmationsEnabled((prev) => !prev)}
                className={`w-9 h-5 rounded-full border p-0.5 transition-colors ${
                  emailConfirmationsEnabled
                    ? "bg-Purple justify-end"
                    : "bg-gray-300 justify-start"
                } flex items-center ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
              </button>
              <span className="font-outfit font-[400px] text-[14px] leading-[130%] tracking-0 text-Grey">
                Send automatic confirmation email to guests
              </span>
            </div>
          </div>
        </div>
      </motion.main>
    </section>
  );
};

export default BookingLinks;
