import { useCallback, useState } from "react";
import { loadAuthToken, resolveToken, storeAuthToken } from "../utils/auth";

export type ReminderCategory = "One-time only" | "Daily" | "Weekly" | "Monthly";

export type Reminder = {
  id: number;
  user_id: number;
  title: string;
  reminder_date: string;
  reminder_time: string;
  notes: string | null;
  reminder: string;
  is_active: boolean | number | string;
  created_at: string;
  updated_at: string;
};

export type ReminderPayload = {
  title: string;
  category: ReminderCategory;
  reminder_date: string;
  reminder_time: string;
  notes: string;
  is_active: boolean;
};

const API = "http://localhost:8080";

const getToken = (): string | null => {
  const savedToken = loadAuthToken();
  if (typeof window === "undefined") return savedToken;

  const urlToken = resolveToken(new URLSearchParams(window.location.search));
  if (urlToken && !savedToken) storeAuthToken(urlToken);

  return savedToken || urlToken;
};

const normalizeReminder = (reminder: Reminder): Reminder => ({
  ...reminder,
  is_active:
    reminder.is_active === true ||
    reminder.is_active === 1 ||
    reminder.is_active === "1",
});

export const useReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = getToken();

  const getUrl = useCallback(
    () => (token ? `${API}/reminders?token=${token}` : `${API}/reminders`),
    [token],
  );

  const fetchReminders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(getUrl(), { credentials: "include" });
      const data = (await response.json()) as {
        success: boolean;
        reminders?: Reminder[];
        error?: string;
      };

      if (!response.ok || !data.success || !data.reminders) {
        throw new Error(data.error ?? "Failed to fetch reminders");
      }

      setReminders(data.reminders.map(normalizeReminder));
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to fetch reminders";
      setError(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  }, [getUrl]);

  const createReminder = async (payload: ReminderPayload) => {
    const response = await fetch(getUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as {
      success: boolean;
      reminder?: Reminder;
      error?: string;
    };

    if (!response.ok || !data.success || !data.reminder) {
      throw new Error(data.error ?? "Failed to create reminder");
    }

    const reminder = normalizeReminder(data.reminder);
    setReminders((previous) => [...previous, reminder]);
    return reminder;
  };

  const deleteReminder = async (id: number) => {
    const url = token
      ? `${API}/reminders/${id}?token=${token}`
      : `${API}/reminders/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    const data = (await response.json()) as {
      success: boolean;
      error?: string;
    };

    if (!response.ok || !data.success) {
      throw new Error(data.error ?? "Failed to delete reminder");
    }

    setReminders((previous) =>
      previous.filter((reminder) => reminder.id !== id),
    );
    return true;
  };

  const updateReminderStatus = async (id: number, isActive: boolean) => {
    const url = token
      ? `${API}/reminders/${id}?token=${token}`
      : `${API}/reminders/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ is_active: isActive }),
    });
    const data = (await response.json()) as {
      success: boolean;
      reminder?: Reminder;
      error?: string;
    };

    if (!response.ok || !data.success || !data.reminder) {
      throw new Error(data.error ?? "Failed to update reminder");
    }

    const reminder = normalizeReminder(data.reminder);
    setReminders((previous) =>
      previous.map((item) => (item.id === id ? reminder : item)),
    );
    return reminder;
  };

  return {
    reminders,
    loading,
    error,
    fetchReminders,
    createReminder,
    deleteReminder,
    updateReminderStatus,
  };
};
