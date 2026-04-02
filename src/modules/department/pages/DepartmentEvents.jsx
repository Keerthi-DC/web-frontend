import React from "react";
import { useParams, Link } from "react-router-dom";
import EventCard from "../../../components/common/EventCard";
import { useAppSync } from "../../../hooks/useAppSync";
import { LIST_EVENTS } from "../../../graphql/department/events";

const DepartmentEvents = () => {
  const { shortName } = useParams();

  const { data, loading, error } = useAppSync(
    LIST_EVENTS,
    shortName
      ? {
          department: shortName,
          status: "upcoming",
          approvalStatus: "approved",
          limit: 100,
          tenantId: "biet-college",
        }
      : null
  );

  console.log("shortName:", shortName);
  console.log("EVENT DATA:", data);
  console.log("ERROR:", error);

  if (loading)
    return <div className="p-8 text-center">Loading…</div>;

  if (error)
    return (
      <div className="p-8 text-red-500">
        Error loading events
      </div>
    );

  const events = data?.listEvents?.items ?? [];

  // ✅ Sort by nearest event
  const sortedEvents = events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  if (!sortedEvents.length)
    return (
      <div className="p-8 text-center">
        No events available.
      </div>
    );

  return (
    <section className="h-full flex flex-col">

      {/* HEADER */}
      <div className="relative mb-8">
        <div className="inline-flex items-center gap-4 px-5 py-3 rounded-xl bg-white/60 backdrop-blur-md shadow-lg border border-white/40">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg">
            ✨
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Events
            </p>
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming Events
            </h2>
          </div>
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-4 p-4">
        {sortedEvents.map((e) => (
          <EventCard key={e.eventId} event={e} />
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="mt-3 pt-2 border-t text-center">
        <Link
          to="/events"
          className="inline-flex items-center px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          View All Events
        </Link>
      </div>

    </section>
  );
};

export default DepartmentEvents;