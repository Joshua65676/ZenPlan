import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

const USER_STORAGE_KEY = "zenplan_user";

const loadStoredUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const savedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as User;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() => loadStoredUser());

  const setUser = (nextUser: User | null) => {
    setUserState(nextUser);

    if (nextUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
      return;
    }

    localStorage.removeItem(USER_STORAGE_KEY);
  };

  useEffect(() => {
    if (user) {
      return;
    }

    let isMounted = true;

    const restoreUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (isMounted && data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth restore failed:", error);
      }
    };

    void restoreUser();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
