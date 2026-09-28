const getEnvUrl = (name: string, fallback: string): string => {
  const value = import.meta.env[name];

  if (typeof value !== "string" || value.trim() === "") {
    return fallback;
  }

  return value.replace(/\/+$/, "");
};

export const API_BASE_URL = getEnvUrl(
  "VITE_API_URL",
  "https://zenplan.onrender.com",
);

export const FRONTEND_URL = getEnvUrl(
  "VITE_FRONTEND_URL",
  "https://zenplan-6whc.onrender.com",
);
