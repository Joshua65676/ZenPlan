import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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

const Profile: React.FC = () => {
  const { username: routeUsername } = useParams<{ username: string }>();
  const { user } = useAuth();
  const displayName =
    user?.name ??
    (routeUsername ? decodeURIComponent(routeUsername) : "Dashboard");

  const avatarUrl = resolveAvatarUrl(
    user?.profile_picture ?? user?.google_avatar ?? undefined,
  );
  const initials = displayName
    ? displayName
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "D";

  return (
    <main className="flex flex-col items-start justify-start gap-3">
      <div className="w-62 border-[0.5px] text-white"></div>

      <div className="flex flex-row items-center justify-center gap-3">
        <button type="button" className="overflow-hidden rounded-xl">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${displayName} profile`}
              className="h-10 w-10 rounded-xl object-cover"
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-LightPurple text-xs font-bold text-white">
              {initials}
            </span>
          )}
        </button>
        <h2 className="font-outfit font-bold text-[14px] text-white leading-[130%] tracking-normal">
          {displayName}
        </h2>
      </div>
    </main>
  );
};

export default Profile;
