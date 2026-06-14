import { useState, useCallback } from "react";
import { loadAuthToken, resolveToken, storeAuthToken } from "../utils/auth";
import type { Event } from "../types/event";

const API = "http://localhost:8080";

const getToken = (): string | null => {
  const savedToken = loadAuthToken();
  if (typeof window === "undefined") {
    return savedToken;
  }

  const urlToken = resolveToken(new URLSearchParams(window.location.search));
  if (urlToken && !savedToken) {
    storeAuthToken(urlToken);
  }

  return savedToken || urlToken;
};

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const token = getToken();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const url = token ? `${API}/events?token=${token}` : `${API}/events`;
      const res = await fetch(url, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setEvents(data.events);
      else throw new Error(data.error ?? "Failed to fetch events");
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createEvent = async (payload: {
    title: string;
    meeting_type: string;
    event_date: string;
    event_time: string;
    notes: string;
    guest_email: string;
  }) => {
    const url = token ? `${API}/events?token=${token}` : `${API}/events`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
      setEvents((prev) => [...prev, data.event]);
      return data.event;
    }
    throw new Error(data.error || "Failed to create event");
  };

  const deleteEvent = async (id: number) => {
    const url = token
      ? `${API}/events/${id}?token=${token}`
      : `${API}/events/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      return true;
    }
    throw new Error(data.error || "Failed to delete event");
  };

  return { events, loading, fetchEvents, createEvent, deleteEvent };
};
