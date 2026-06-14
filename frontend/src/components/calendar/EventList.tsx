import React, { useEffect, useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import type { Event } from "../../types/event";
import {
  DeleteIcon,
  EmptyEvent,
  Gcalendar,
  Gclock,
  CopyIcon,
  PeopleIcon,
} from "../../assets";

const EventList: React.FC = () => {
  const { events, loading, fetchEvents, deleteEvent } = useEvents();
  const { user } = useAuth();
  const { username: routeUsername } = useParams<{ username: string }>();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const displayName =
    user?.name ??
    (routeUsername ? decodeURIComponent(routeUsername) : "Dashboard");

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getEventColor = (meetingType: string) => {
    return meetingType === "1-on-1" ? "bg-blue-100" : "bg-purple-100";
  };

  const getBadgeColor = (meetingType: string) => {
    return meetingType === "1-on-1"
      ? "bg-blue-500 text-white"
      : "bg-purple-500 text-white";
  };

  const handleDelete = async (eventId: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setDeleting(eventId);
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error("Failed to delete event:", error);
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleCopyLink = (event: Event) => {
    const shareUrl = `${window.location.origin}/booking/${event.share_token}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(event.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500 text-[14px] font-outfit">
          Loading events...
        </p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-48">
        <div className="text-center">
          <img src={EmptyEvent} alt="" />
          <p className="text-LightPurple text-[20px] font-outfit font-semibold leading-[130%] tracking-0">
            No events scheduled
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {events.map((event: Event) => (
        <main
          key={event.id}
          className={`rounded-[20px] flex flex-row justify-between border border-BorderColor shadow-custom p-5 ${getEventColor(
            event.meeting_type,
          )} hover:shadow-md transition-shadow cursor-`}
        >
          {/* Meeting Details */}
          <div className="flex flex-col gap-3">
            {/* Header with title and badge */}
            <div className="flex flex-row items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-black text-[14px] font-outfit font-bold leading-[130%] tracking-0">
                  {event.title}
                </h3>
              </div>
              <div className="w-auto h-4.5 rounded-[5px] px-1.5 bg-LightGreen text-center flex items-center justify-center">
                <span className="font-outfit font-[400px] text-[12px] leading-[130%] tracking-0 text-Green">
                  Organizer
                </span>
              </div>
              <span
                className={`rounded-[5px] px-1.5 border-[0.5px] text-black text-center flex items-center justify-center text-[12px] font-outfit font-[400px] leading-[130%] tracking-0 whitespace-nowrap ${getBadgeColor(
                  event.meeting_type,
                )}`}
              >
                {event.meeting_type === "1-on-1" ? "1-on-1" : "Group"}
              </span>
            </div>

            {/* Date and Time */}
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1">
                <img src={Gcalendar} alt="calendar" />
                <p className="text-[12px] font-outfit font-[400px] leading-[130%] tracking-0 text-Grey">
                  {formatDate(event.event_date)}
                </p>
              </div>
              <div className="flex flex-row items-center gap-1">
                <img src={Gclock} alt="clock" />
                <p className="text-[12px] font-outfit font-[400px] leading-[130%] tracking-0 text-Grey">
                  {formatTime(event.event_time)}
                </p>
              </div>
            </div>

            {/* Notes if present */}
            {event.notes && (
              <div className="border-t border-gray-200 pt-2">
                <p className="text-Grey text-[12px] font-outfit leading-[130%] tracking-0 font-[400px]">
                  {event.notes}
                </p>
              </div>
            )}

            {/* Guest email for 1-on-1 */}
            {event.meeting_type === "1-on-1" && event.guest_email && (
              <div className="flex flex-row items-center gap-2 text-gray-600">
                <span className="text-[11px] font-outfit font-medium">
                  Guest:
                </span>
                <span className="text-[12px] font-outfit font-[400px] leading-[130%] tracking-0 text-Grey">
                  {event.guest_email}
                </span>
              </div>
            )}

            {/* Event Organasation */}
            <div className="flex flex-row items-center gap-1">
              <img src={PeopleIcon} alt="people" />
              <span className="font-outfit leading-[130%] tracking-0 text-Grey font-[400px] text-[12px]">{displayName}</span>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-row gap-3">
            <button
              onClick={() => handleCopyLink(event)}
              disabled={deleting === event.id}
              className="flex items-center justify-center gap-2 w-28 h-7 px-2 border border-black text-[12px] font-outfit font-[400px] leading-[130%] text-black rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <img src={CopyIcon} alt="Copy icon" className="w-4 h-4" />
              {copiedId === event.id ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={() => handleDelete(event.id)}
              disabled={deleting === event.id}
              className="flex items-center h-7 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting === event.id ? (
                "Deleting..."
              ) : (
                <img src={DeleteIcon} alt="Delete icon" className="w-4 h-4" />
              )}
            </button>
          </div>
        </main>
      ))}
    </section>
  );
};

export default EventList;
