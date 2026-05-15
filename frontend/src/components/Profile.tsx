import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Profile: React.FC = () => {
  const { username: routeUsername } = useParams<{ username: string }>();
  const { user } = useAuth();
  const displayName =
    user?.name ??
    (routeUsername ? decodeURIComponent(routeUsername) : "Dashboard");

  const avatarUrl = user?.profile_picture ?? user?.google_avatar ?? undefined;
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
        <button className="flex cursor-pointer h-9.5 w-10.25 items-center justify-center py-[2.5px] px-2 overflow-hidden rounded-xl bg-Violet text-[14px] font-[400px] leading-[130%] tracking-normal font-outfit text-white">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${displayName} profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{initials}</span>
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
