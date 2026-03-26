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

  // ✅ Fix date issue (important)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allEvents = items.filter(
    (e) => new Date(e.date) >= today
  );

  // ✅ Handle boolean OR string "true"
  const isPinned = (val) => val === true || val === "true";

  const pinnedEvents = allEvents.filter((e) => isPinned(e.pinned));
  const normalEvents = allEvents.filter((e) => !isPinned(e.pinned));

  // 🔍 DEBUG (you can remove later)
  console.log("PINNED:", pinnedEvents);
  console.log("NORMAL:", normalEvents);

  if (!pinnedEvents.length && !normalEvents.length) {
    return (
      <p className="text-sm text-gray-500">
        No events available
      </p>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* 📌 PINNED EVENTS (ALWAYS FIXED) */}
      {pinnedEvents.length > 0 && (
        <div className="flex-shrink-0 px-2 py-2 border-b bg-white">
          {pinnedEvents.map((event, i) => (
            <div
              key={event.eventId || i}
              className="flex gap-2 bg-yellow-100 border-l-4 border-yellow-500 p-2 mb-2 rounded"
            >
              <span className="text-base">📌</span>

              <div className="text-sm">
                <p className="font-semibold text-gray-800">
                  {event.title}
                </p>
                <p className="text-xs text-gray-600">
                  {event.date} | {event.time}
                </p>
                <p className="text-xs text-gray-500">
                  {event.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔁 SCROLLING EVENTS */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute w-full animate-scrollEvents flex flex-col gap-3 px-2">
          
          {[...normalEvents, ...normalEvents].map((event, i) => (
            <div
              key={i}
              className="p-2 border-b hover:bg-gray-50 transition"
            >
              <p className="font-medium text-sm text-gray-800">
                {event.title}
              </p>
              <p className="text-xs text-gray-600">
                {event.date} | {event.time}
              </p>
              <p className="text-xs text-gray-500">
                {event.venue}
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default DepartmentEventsPreview;