import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { username: routeUsername } = useParams<{ username: string }>();
  const { user } = useAuth();
  const displayName =
    user?.name ??
    (routeUsername ? decodeURIComponent(routeUsername) : "Dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-black font-outfit font-semibold text-xl">
        Dashboard for {displayName}
      </div>
    </div>
  );
};

export default Dashboard;
