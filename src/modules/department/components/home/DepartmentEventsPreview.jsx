import React from "react";
import { useAppSync } from "../../../../hooks/useAppSync";
import { LIST_EVENTS } from "../../../../graphql/department/events";
import "./DepartmentEventsPreview.css";

const DepartmentEventsPreview = ({ deptId = "cse" }) => {
  const { data, loading, error } = useAppSync(LIST_EVENTS, {
    department: deptId,
    status: "upcoming",
    approvalStatus: "approved",
    limit: 10,
    tenantId: "biet-college",
  });

  if (loading) {
    return <p className="text-center py-20">Loading events…</p>;
  }

  if (error) {
    console.error("EVENT FETCH ERROR:", error);
    return (
      <p className="text-center text-red-600 py-20">
        Error loading events
      </p>
    );
  }

  const items = data?.listEvents?.items ?? [];

  const isPinned = (val) => {
    if (val === true || val === 1 || val === "1") return true;
    if (typeof val === "string") {
      return val.toLowerCase() === "true";
    }
    return false;
  };

  const pinnedEvents = items.filter((e) => isPinned(e.pinned));
  const normalEvents = items.filter((e) => !isPinned(e.pinned));

  if (!pinnedEvents.length && !normalEvents.length) {
    return (
      <p className="text-sm text-gray-500">
        No events available
      </p>
    );
  }

  return (
    <div className="events-card">

      {/* HEADER */}
      <div className="events-header">
        <h3>Upcoming Events 🗓️</h3>
      </div>

      {/* 📌 PINNED EVENTS */}
      {pinnedEvents.length > 0 && (
        <div className="pinned-section">
          {pinnedEvents.map((event, i) => (
            <EventItem key={event.eventId || i} event={event} pinned />
          ))}
        </div>
      )}

      {/* 🔁 SCROLLING EVENTS */}
      <div className="scroll-container">
        <div className="scroll-track">

          {[...normalEvents, ...normalEvents].map((event, i) => (
            <EventItem key={`${event.eventId || i}-${i}`} event={event} />
          ))}

        </div>
      </div>

      {/* BUTTON */}
      <div className="p-3 border-t bg-white">
              <a
                href={`/departments/${data?.id || "cse"}/events`}
                className="w-full inline-flex justify-center items-center px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                View All Events →
              </a>
            </div>
    </div>
  );
};

const EventItem = ({ event, pinned }) => {
  const dateObj = new Date(event.date);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "short" });

  return (
    <div className={`event-item ${pinned ? "pinned" : ""}`}>

      <div className="date-box">
        <span className="day">{day}</span>
        <span className="month">{month}</span>
      </div>

      <div className="event-content">
        <p className="event-title">{event.title}</p>
        <p className="event-meta">
          {event.time} • {event.venue}
        </p>
      </div>

    </div>
  );
};

export default DepartmentEventsPreview;