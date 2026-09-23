import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const API_BASE_URL = "https://zenplan.onrender.com";

const resolveAvatarUrl = (value?: string | null) => {
  if (!value) return undefined;
  if (value.startsWith("data:") || /^https?:\/\//i.test(value)) {
    return value;
  }
  if (value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }
  return value;
};

const Details: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { username: routeUsername } = useParams<{ username: string }>();
  const { user, setUser } = useAuth();
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const displayName =
    user?.name ??
    (routeUsername ? decodeURIComponent(routeUsername) : "Dashboard");
  const userEmail = user?.email ?? "";

  const avatarUrl = resolveAvatarUrl(
    uploadPreview ?? user?.profile_picture ?? user?.google_avatar ?? undefined,
  );
  const initials = displayName
    ? displayName
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "D";

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setUploadPreview(base64);

      try {
        const response = await fetch(
          "https://zenplan.onrender.com/auth/setup-profile",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ profilePicture: base64 }),
          },
        );

        const data = await response.json();
        if (!response.ok || data.error) {
          console.error(
            "Profile picture update failed:",
            data.error || response.statusText,
          );
          return;
        }

        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <section className="flex flex-col gap-4">
      <main className="flex flex-row items-center justify-between gap-3">
        <div className="flex flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${displayName} profile`}
                className="h-25.5 w-25.5 object-cover rounded-full px-4.75 py-3.25"
              />
            ) : (
              <span>{initials}</span>
            )}
          </button>

          <div className="flex flex-col items-start justify-center gap-1">
            <h2 className="font-outfit font-bold text-[14px] text-Grey leading-[130%] tracking-normal">
              {displayName}
            </h2>
            {userEmail ? (
              <p className="font-outfit font-[400px] text-[12px] text-Grey leading-[130%] tracking-normal">
                {userEmail}
              </p>
            ) : null}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer w-31.75 h-7 rounded-xl bg-LightPurple px-3 py-1.5 text-[12px] leading-[130%] tracking-normal font-outfit font-[400px] text-white transition hover:opacity-90"
        >
          Upload new photo
        </button>
      </main>

      <>
        <div className="border-[0.5px] text-BorderColor"></div>
      </>
    </section>
  );
};

export default Details;
