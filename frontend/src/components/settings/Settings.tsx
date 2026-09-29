import React, { useState } from "react";
import Details from "./Details";
import SettingsForm from "./form";
import NotificationSettings from "./Notification";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../hooks/useAuth";

const Settings: React.FC = () => {
  const { user, setUser } = useAuth();
  const [fullName, setFullName] = useState(() => user?.name ?? "");
  const [email, setEmail] = useState(() => user?.email ?? "");
  const [saving, setSaving] = useState(false);

  const handleSaveChanges = async () => {
    if (!user) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: fullName.trim() || user.name,
          email: email.trim() || user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error ?? "Unable to save profile changes.");
      }

      setUser(data.user);
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-outfit font-medium text-[24px] leading-[130%] tracking-[0%] text-black">
          Settings
        </h1>
        <p className="font-[400px] font-outfit text-[12px] leading-[130%] tracking-[0%] text-Grey">
          Manage your reminders and alerts
        </p>
      </div>

      <main className="flex flex-col gap-6">
        <Details />
        <SettingsForm
          key={user?.id ?? "loading-user"}
          fullName={fullName}
          email={email}
          onFullNameChange={setFullName}
          onEmailChange={setEmail}
        />
        <NotificationSettings />
      </main>

      <div className="flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button className="h-9 w-full cursor-pointer rounded-xl border px-3 py-1.5 border-black font-outfit font-[400px] text-[12px] leading-[130%] tracking-normal text-black sm:w-15.25">
          Cancel
        </button>

        <button
          onClick={handleSaveChanges}
          disabled={saving}
          className="h-9 w-full cursor-pointer rounded-xl bg-LightPurple px-3 py-1.5 font-outfit font-[400px] text-[12px] leading-[130%] tracking-normal text-white disabled:opacity-70 disabled:cursor-not-allowed sm:w-25.25"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </section>
  );
};

export default Settings;
