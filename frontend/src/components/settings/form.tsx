import React from "react";
import { useAuth } from "../../hooks/useAuth";

interface SettingsFormProps {
  fullName: string;
  email: string;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  fullName,
  email,
  onFullNameChange,
  onEmailChange,
}) => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col gap-4">
      <main className="flex flex-row gap-4 justify-between">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="full-name"
            className="font-outfit text-[14px] leading-[130%] tracking-normal font-[400px] text-black"
          >
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            value={fullName || user?.name || ""}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="Enter your full name"
            className="h-11 w-93.25 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 font-outfit font-[400px] leading-[130%] tracking-normal text-[14px] text-Grey outline-none transition focus:border-LightBlue focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="email"
            className="font-outfit text-[14px] leading-[130%] tracking-normal font-[400px] text-black"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email || user?.email || ""}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="yourname@gmail.com"
            className="h-11 w-93.25 rounded-xl border border-slate-200 bg-LightWhite p-4 px-2.5 py-2 font-outfit font-[400px] leading-[130%] tracking-normal text-[14px] text-Grey outline-none transition focus:border-LightBlue focus:bg-white"
          />
        </div>
      </main>

      <>
        <div className="border-[0.5px] text-BorderColor"></div>
      </>
    </section>
  );
};

export default SettingsForm;
